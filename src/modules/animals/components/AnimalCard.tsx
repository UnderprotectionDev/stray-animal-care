import React from 'react'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Card } from '@/components/ui/card'
import type { Animal, Media as MediaType } from '@/payload-types'

type StatusVariant = 'pending' | 'active' | 'urgent'

const statusVariantMap: Record<NonNullable<Animal['animalStatus']>, StatusVariant> = {
  tedavide: 'pending',
  'kalici-bakim': 'active',
  acil: 'urgent',
}

type AnimalCardProps = {
  animal: Animal
  typeLabel: string
  statusLabel: string
}

export function AnimalCard({ animal, typeLabel, statusLabel }: AnimalCardProps) {
  const firstPhoto =
    animal.photos && animal.photos.length > 0
      ? (animal.photos[0] as MediaType)
      : null

  return (
    <Link href={`/canlarimiz/${animal.slug}`} className="group block">
      <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-warm-md">
        <div className="relative aspect-square bg-muted">
          {firstPhoto && typeof firstPhoto === 'object' ? (
            <Media
              resource={firstPhoto}
              fill
              imgClassName="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <span className="text-4xl">🐾</span>
            </div>
          )}
          {animal.animalStatus && (
            <div className="absolute top-2 left-2">
              <StatusBadge status={statusVariantMap[animal.animalStatus] ?? 'pending'}>
                {statusLabel}
              </StatusBadge>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
            {animal.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{typeLabel}</p>
        </div>
      </Card>
    </Link>
  )
}
