import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { StatusBadge } from '@/components/shared/StatusBadge'
import type { NeedsList } from '@/payload-types'

type StatusVariant = 'urgent' | 'pending' | 'active'

const urgencyVariantMap: Record<string, StatusVariant> = {
  acil: 'urgent',
  orta: 'pending',
  yeterli: 'active',
}

type NeedsTableProps = {
  items: NeedsList[]
  labels: {
    product: string
    brand: string
    urgency: string
    stock: string
  }
  urgencyLabels: Record<string, string>
}

export function NeedsTable({ items, labels, urgencyLabels }: NeedsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{labels.product}</TableHead>
            <TableHead>{labels.brand}</TableHead>
            <TableHead>{labels.urgency}</TableHead>
            <TableHead>{labels.stock}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.productName}</TableCell>
              <TableCell>{item.brandDetail || '—'}</TableCell>
              <TableCell>
                <StatusBadge status={urgencyVariantMap[item.urgency] ?? 'pending'}>
                  {urgencyLabels[item.urgency] ?? item.urgency}
                </StatusBadge>
              </TableCell>
              <TableCell>{item.stockStatus || '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
