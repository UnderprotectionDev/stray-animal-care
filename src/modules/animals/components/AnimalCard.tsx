import React from 'react'
import { Link } from '@/i18n/navigation'
import type { Animal, Media as MediaType } from '@/payload-types'
import { AnimalCardImage } from './AnimalCardImage'

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

  const badgeClass =
    animal.animalStatus === 'acil' ? 'badge-sys critical' : 'badge-sys cta'

  return (
    <Link href={`/canlarimiz/${animal.slug}`} className="group block">
      <div className="border border-border bg-background">
        {/* 1:1 square photo with pixel transition */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <AnimalCardImage
            photo={firstPhoto}
            animalType={animal.type}
            animalName={animal.name}
          />
        </div>

        {/* Data rows */}
        <div className="border-t border-border">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">
              {animal.name}
            </span>
            {animal.animalStatus && (
              <span className={badgeClass}>{statusLabel}</span>
            )}
          </div>
          <div className="px-3 py-2">
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              {typeLabel}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
