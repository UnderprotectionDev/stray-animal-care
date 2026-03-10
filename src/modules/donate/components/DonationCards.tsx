import React from 'react'
import { Card } from '@/components/ui/card'
import { UtensilsCrossed, Stethoscope, Scissors } from 'lucide-react'

type DonationCardsProps = {
  labels: {
    title: string
    food: { title: string; description: string }
    vet: { title: string; description: string }
    surgery: { title: string; description: string }
  }
}

const CARDS = [
  { key: 'food' as const, Icon: UtensilsCrossed, color: 'text-primary' },
  { key: 'vet' as const, Icon: Stethoscope, color: 'text-secondary' },
  { key: 'surgery' as const, Icon: Scissors, color: 'text-accent' },
]

export function DonationCards({ labels }: DonationCardsProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-xl font-semibold">{labels.title}</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {CARDS.map(({ key, Icon, color }) => (
          <Card key={key} className="p-5 space-y-3">
            <Icon className={`size-8 ${color}`} />
            <div>
              <p className="font-semibold">{labels[key].title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{labels[key].description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
