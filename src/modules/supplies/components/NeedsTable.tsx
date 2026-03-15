import React from 'react'
import type { NeedsList } from '@/payload-types'

const urgencyClassMap: Record<string, string> = {
  acil: 'badge-sys critical',
  orta: 'badge-sys',
  yeterli: 'badge-sys cta',
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
    <div className="border border-border">
      <table className="sys-table w-full">
        <thead>
          <tr className="border-b border-border bg-foreground text-background">
            <th className="p-3 text-left t-meta font-medium uppercase tracking-wide">{labels.product}</th>
            <th className="p-3 text-left t-meta font-medium uppercase tracking-wide">{labels.brand}</th>
            <th className="p-3 text-left t-meta font-medium uppercase tracking-wide">{labels.urgency}</th>
            <th className="p-3 text-left t-meta font-medium uppercase tracking-wide">{labels.stock}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-border last:border-b-0">
              <td className="p-3 font-medium t-body">{item.productName}</td>
              <td className="p-3 t-body">{item.brandDetail || '\u2014'}</td>
              <td className="p-3">
                <span className={urgencyClassMap[item.urgency] ?? 'badge-sys'}>
                  {urgencyLabels[item.urgency] ?? item.urgency}
                </span>
              </td>
              <td className="p-3 t-body">{item.stockStatus || '\u2014'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
