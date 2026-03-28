'use client'

import React from 'react'

const ROW_ACCENT_COLORS = [
  '#2D936C', // health
  '#4A46E4', // trust
  '#F26E41', // adoption
  '#FF6B6B', // warm
  '#F5B62A', // emergency
  '#EF303B', // cta
  '#9E74F9', // lilac
]

type Expense = {
  category?: string | null
  amount?: number | null
  id?: string | null
}

type ExpenseBreakdownProps = {
  expenses: Expense[]
  totalExpense: number
  labels: {
    expenses: string
    totalExpense: string
    category: string
    amount: string
  }
  currency: string
}

export function ExpenseBreakdown({
  expenses,
  totalExpense,
  labels,
  currency,
}: ExpenseBreakdownProps) {
  return (
    <div>
      <h4 className="t-h2 mb-3">{labels.expenses}</h4>
      <div className="border border-border">
        <table className="w-full border-collapse" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
          <thead>
            <tr className="border-b-2 border-foreground">
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider text-foreground w-8">#</th>
              <th className="p-3 text-left text-xs font-bold uppercase tracking-wider text-foreground">
                {labels.category}
              </th>
              <th className="p-3 text-right text-xs font-bold uppercase tracking-wider text-foreground">
                {labels.amount}
              </th>
              <th className="p-3 text-right text-xs font-bold uppercase tracking-wider text-foreground hidden sm:table-cell w-32">
                %
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, i) => {
              const pct = totalExpense > 0 ? ((expense.amount ?? 0) / totalExpense) * 100 : 0
              const color = ROW_ACCENT_COLORS[i % ROW_ACCENT_COLORS.length]
              return (
                <tr
                  key={expense.id ?? i}
                  className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="p-3">
                    <span
                      className="inline-flex items-center justify-center size-5 text-[10px] font-bold text-white"
                      style={{ backgroundColor: color }}
                    >
                      {i + 1}
                    </span>
                  </td>
                  <td className="p-3 t-body font-medium">{expense.category || '\u2014'}</td>
                  <td className="p-3 text-right t-body tabular-nums">
                    {(expense.amount ?? 0).toLocaleString('tr-TR')} {currency}
                  </td>
                  <td className="p-3 text-right hidden sm:table-cell">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 h-2.5 bg-background overflow-hidden border border-border">
                        <div
                          className="h-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: color }}
                        />
                      </div>
                      <span className="t-meta tabular-nums text-xs w-10 text-right font-bold">
                        %{pct.toFixed(0)}
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-foreground">
              <td className="p-3" />
              <td className="p-3 font-heading text-sm uppercase tracking-wide">
                {labels.totalExpense}
              </td>
              <td className="p-3 text-right font-heading text-lg">
                {totalExpense.toLocaleString('tr-TR')} {currency}
              </td>
              <td className="p-3 hidden sm:table-cell" />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
