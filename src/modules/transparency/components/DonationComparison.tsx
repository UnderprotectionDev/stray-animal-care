import React from 'react'
import { ProgressBar } from '@/components/shared/ProgressBar'

type DonationComparisonProps = {
  totalDonation: number
  totalExpense: number
  labels: {
    comparison: string
    totalDonation: string
    totalExpense: string
  }
  currency: string
}

export function DonationComparison({
  totalDonation,
  totalExpense,
  labels,
  currency,
}: DonationComparisonProps) {
  return (
    <div>
      <h4 className="mb-3 font-heading font-semibold">{labels.comparison}</h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{labels.totalDonation}</span>
          <span className="font-medium">
            {totalDonation.toLocaleString('tr-TR')} {currency}
          </span>
        </div>
        <ProgressBar
          current={totalDonation}
          target={Math.max(totalExpense, 1)}
        />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{labels.totalExpense}</span>
          <span className="font-medium">
            {totalExpense.toLocaleString('tr-TR')} {currency}
          </span>
        </div>
      </div>
    </div>
  )
}
