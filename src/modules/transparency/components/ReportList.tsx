'use client'

import React from 'react'
import { ReportCard } from './ReportCard'
import type { TransparencyReport } from '@/payload-types'

type ReportListProps = {
  reports: TransparencyReport[]
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

export function ReportList({ reports, labels, currency }: ReportListProps) {
  return (
    <div className="grid grid-cols-1 gap-[1px] bg-foreground md:grid-cols-2">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} labels={labels} currency={currency} />
      ))}
    </div>
  )
}
