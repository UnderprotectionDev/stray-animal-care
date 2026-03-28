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
    surplusLabel: string
    deficitLabel: string
  }
  currency: string
}

export function ReportList({ reports, labels, currency }: ReportListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      {reports.map((report, i) => (
        <ReportCard key={report.id} report={report} labels={labels} currency={currency} index={i} />
      ))}
    </div>
  )
}
