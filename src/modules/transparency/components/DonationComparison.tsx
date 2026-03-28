'use client'

import React from 'react'
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown } from 'lucide-react'

type DonationComparisonProps = {
  totalDonation: number
  totalExpense: number
  labels: {
    comparison: string
    totalDonation: string
    totalExpense: string
    surplusLabel: string
    deficitLabel: string
  }
  currency: string
}

export function DonationComparison({
  totalDonation,
  totalExpense,
  labels,
  currency,
}: DonationComparisonProps) {
  const rawPercentage = totalExpense > 0 ? (totalDonation / totalExpense) * 100 : 0
  const barPercentage = Math.min(rawPercentage, 100)
  const surplus = totalDonation - totalExpense
  const isSurplus = surplus >= 0

  return (
    <div>
      <h4 className="t-h2 mb-4">{labels.comparison}</h4>
      <div className="border border-border overflow-hidden">
        {/* Income vs Expense — colored panel cards */}
        <div
          className="grid grid-cols-2"
          style={{ gap: '1.5px', background: 'var(--palette-black)' }}
        >
          {/* Income (Donation) */}
          <div className="bg-health p-4 md:p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="size-7 bg-health-foreground/20 border border-health-foreground/30 flex items-center justify-center">
                <ArrowUp className="size-4 text-health-foreground" strokeWidth={2.5} />
              </div>
              <span
                className="text-health-foreground/80 text-xs uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {labels.totalDonation}
              </span>
            </div>
            <p
              className="text-health-foreground tabular-nums"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {totalDonation.toLocaleString('tr-TR')} {currency}
            </p>
          </div>

          {/* Expense */}
          <div className="bg-cta p-4 md:p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="size-7 bg-cta-foreground/20 border border-cta-foreground/30 flex items-center justify-center">
                <ArrowDown className="size-4 text-cta-foreground" strokeWidth={2.5} />
              </div>
              <span
                className="text-cta-foreground/80 text-xs uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {labels.totalExpense}
              </span>
            </div>
            <p
              className="text-cta-foreground tabular-nums"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {totalExpense.toLocaleString('tr-TR')} {currency}
            </p>
          </div>
        </div>

        {/* Comparison bar + result */}
        <div className="border-t border-border p-4 md:p-5 bg-background">
          {/* Bar header */}
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs uppercase tracking-wider text-muted-foreground"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {labels.comparison}
            </span>
            <span
              className="font-bold tabular-nums"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                color: isSurplus ? 'var(--health)' : 'var(--cta)',
              }}
            >
              %{rawPercentage.toFixed(1)}
            </span>
          </div>

          {/* Progress bar */}
          <div className="relative h-6 w-full border-[1.5px] border-foreground bg-muted/10 overflow-hidden">
            <div
              className="h-full transition-all duration-700 ease-out"
              style={{
                width: `${barPercentage}%`,
                backgroundColor: isSurplus ? 'var(--health)' : 'var(--cta)',
              }}
            />
            {/* Subtle stripe texture */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent, transparent 10px, var(--foreground) 10px, var(--foreground) 11px)',
              }}
            />
          </div>

          {/* Balance badge */}
          <div className="mt-3">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 border-[1.5px]"
              style={{
                borderColor: isSurplus ? 'var(--health)' : 'var(--cta)',
                backgroundColor: isSurplus ? 'var(--health)' : 'var(--cta)',
                color: isSurplus ? 'var(--health-foreground)' : 'var(--cta-foreground)',
              }}
            >
              {isSurplus ? (
                <TrendingUp className="size-4" />
              ) : (
                <TrendingDown className="size-4" />
              )}
              <span
                className="text-xs uppercase tracking-wider font-bold"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {isSurplus ? labels.surplusLabel : labels.deficitLabel}
              </span>
              <span
                className="font-bold tabular-nums"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                }}
              >
                {Math.abs(surplus).toLocaleString('tr-TR')} {currency}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
