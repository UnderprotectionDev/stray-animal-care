import React from 'react'

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
  const percentage = totalExpense > 0 ? Math.min((totalDonation / totalExpense) * 100, 100) : 0

  return (
    <div>
      <h4 className="t-h2 mb-3">{labels.comparison}</h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between t-meta">
          <span>{labels.totalDonation}</span>
          <span className="font-medium t-body">
            {totalDonation.toLocaleString('tr-TR')} {currency}
          </span>
        </div>
        <div className="h-6 w-full border border-border bg-background">
          <div
            className="h-full bg-trust"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between t-meta">
          <span>{labels.totalExpense}</span>
          <span className="font-medium t-body">
            {totalExpense.toLocaleString('tr-TR')} {currency}
          </span>
        </div>
      </div>
    </div>
  )
}
