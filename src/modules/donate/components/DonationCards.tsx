import React from 'react'
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
  { key: 'food' as const, Icon: UtensilsCrossed },
  { key: 'vet' as const, Icon: Stethoscope },
  { key: 'surgery' as const, Icon: Scissors },
]

export function DonationCards({ labels }: DonationCardsProps) {
  return (
    <div className="space-y-4">
      <h2 className="t-h2 uppercase">{labels.title}</h2>
      <div className="grid grid-cols-1 gap-[1px] bg-foreground sm:grid-cols-3">
        {CARDS.map(({ key, Icon }) => (
          <div key={key} className="panel bg-background p-5 space-y-3">
            <Icon className="size-8 text-foreground" />
            <div>
              <p className="font-semibold uppercase text-sm tracking-wide">{labels[key].title}</p>
              <p className="mt-1 t-meta">{labels[key].description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
