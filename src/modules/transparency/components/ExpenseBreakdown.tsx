import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table'

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
      <h4 className="mb-3 font-heading font-semibold">{labels.expenses}</h4>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{labels.category}</TableHead>
              <TableHead className="text-right">{labels.amount}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.category || '—'}</TableCell>
                <TableCell className="text-right">
                  {(expense.amount ?? 0).toLocaleString('tr-TR')} {currency}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-semibold">{labels.totalExpense}</TableCell>
              <TableCell className="text-right font-semibold">
                {totalExpense.toLocaleString('tr-TR')} {currency}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}
