import React from 'react'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'
import type { Animal, Media as MediaType } from '@/payload-types'

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
        {/* 1:1 square photo */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {firstPhoto && typeof firstPhoto === 'object' ? (
            <Media
              resource={firstPhoto}
              fill
              imgClassName="object-cover transition-all duration-300"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <span className="text-4xl">&#128062;</span>
            </div>
          )}
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
