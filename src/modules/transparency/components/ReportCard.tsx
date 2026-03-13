'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, FileText, Download } from 'lucide-react'
import type { Media, TransparencyReport } from '@/payload-types'
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
    <div className="border border-border bg-background">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4 text-left md:p-6 hover:bg-muted transition-colors"
      >
        <div>
          <h3 className="t-h2">{report.title}</h3>
          <p className="t-meta">{monthLabel}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="t-meta">{labels.totalExpense}</p>
            <p className="font-semibold t-body">
              {(report.totalExpense ?? 0).toLocaleString('tr-TR')} {currency}
            </p>
          </div>
          {expanded ? (
            <ChevronUp className="size-5 text-foreground" />
          ) : (
            <ChevronDown className="size-5 text-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="space-y-6 border-t border-border px-4 py-6 md:px-6">
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

          {report.documents && report.documents.length > 0 && (
            <div>
              <h4 className="t-h2 mb-4">{labels.documents}</h4>
              <div className="space-y-2">
                {report.documents.map((doc) => {
                  const media = typeof doc === 'number' ? null : (doc as Media)
                  if (!media?.url) return null
                  return (
                    <a
                      key={media.id}
                      href={media.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 border border-border p-3 hover:bg-muted transition-colors"
                    >
                      <FileText className="size-5 shrink-0" />
                      <span className="t-body flex-1 truncate">
                        {media.filename ?? labels.documents}
                      </span>
                      <Download className="size-4 shrink-0 text-muted-foreground" />
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
