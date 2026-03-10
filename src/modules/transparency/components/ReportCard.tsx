'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { TransparencyReport } from '@/payload-types'
import { ExpenseBreakdown } from './ExpenseBreakdown'
import { DonationComparison } from './DonationComparison'

type ReportCardProps = {
  report: TransparencyReport
  labels: {
    expenses: string
    totalExpense: string
    donations: string
    totalDonation: string
    category: string
    amount: string
    comparison: string
    documents: string
  }
  currency: string
}

export function ReportCard({ report, labels, currency }: ReportCardProps) {
  const [expanded, setExpanded] = useState(false)

  const monthDate = new Date(report.month + 'T00:00:00')
  const monthLabel = !isNaN(monthDate.getTime())
    ? monthDate.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
      })
    : report.month

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4 text-left md:p-6"
      >
        <div>
          <h3 className="font-heading text-lg font-semibold">{report.title}</h3>
          <p className="text-sm text-muted-foreground">{monthLabel}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm text-muted-foreground">{labels.totalExpense}</p>
            <p className="font-semibold">
              {(report.totalExpense ?? 0).toLocaleString('tr-TR')} {currency}
            </p>
          </div>
          {expanded ? (
            <ChevronUp className="size-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="space-y-6 border-t px-4 py-6 md:px-6">
          {report.expenses && report.expenses.length > 0 && (
            <ExpenseBreakdown
              expenses={report.expenses}
              totalExpense={report.totalExpense ?? 0}
              labels={labels}
              currency={currency}
            />
          )}

          <DonationComparison
            totalDonation={report.totalDonation ?? 0}
            totalExpense={report.totalExpense ?? 0}
            labels={labels}
            currency={currency}
          />
        </div>
      )}
    </Card>
  )
}
