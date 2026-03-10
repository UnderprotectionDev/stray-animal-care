import React from 'react'
import { Card } from '@/components/ui/card'
import { Heading } from '@/components/shared/Heading'
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
      <Heading as="h2" className="mb-3">
        {labels.title}
      </Heading>
      <p className="text-muted-foreground mb-6">{labels.description}</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {methods.map(({ key, Icon }) => (
          <Card key={key} className="flex items-start gap-3 p-4">
            <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
            <p className="text-sm">{labels[key]}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
