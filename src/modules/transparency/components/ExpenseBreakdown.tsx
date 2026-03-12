import React from 'react'

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
        <table className="sys-table w-full">
          <thead>
            <tr className="border-b border-border bg-foreground text-background">
              <th className="p-3 text-left t-meta font-medium uppercase tracking-wide">{labels.category}</th>
              <th className="p-3 text-right t-meta font-medium uppercase tracking-wide">{labels.amount}</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b border-border last:border-b-0">
                <td className="p-3 t-body">{expense.category || '\u2014'}</td>
                <td className="p-3 text-right t-body">
                  {(expense.amount ?? 0).toLocaleString('tr-TR')} {currency}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-border bg-muted">
              <td className="p-3 font-semibold t-body">{labels.totalExpense}</td>
              <td className="p-3 text-right font-semibold t-body">
                {totalExpense.toLocaleString('tr-TR')} {currency}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
