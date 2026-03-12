import React from 'react'
import { Package, HandHeart, ShoppingCart } from 'lucide-react'

type ShippingInfoProps = {
  labels: {
    title: string
    description: string
    cargo: string
    inPerson: string
    online: string
  }
}

const methods = [
  { key: 'cargo' as const, Icon: Package },
  { key: 'inPerson' as const, Icon: HandHeart },
  { key: 'online' as const, Icon: ShoppingCart },
]

export function ShippingInfo({ labels }: ShippingInfoProps) {
  return (
    <div>
      <h2 className="t-h1 mb-2">{labels.title}</h2>
      <p className="t-meta mb-6">{labels.description}</p>
      <div className="grid grid-cols-1 gap-[1px] bg-foreground sm:grid-cols-3 border border-border">
        {methods.map(({ key, Icon }) => (
          <div key={key} className="panel flex items-start gap-3 p-4 bg-background">
            <Icon className="mt-0.5 size-5 shrink-0 text-foreground" />
            <p className="t-body">{labels[key]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
