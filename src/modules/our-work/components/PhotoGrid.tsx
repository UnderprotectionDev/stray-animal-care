import React from 'react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type PhotoGridProps = {
  images: (number | MediaType)[]
}

export function PhotoGrid({ images }: PhotoGridProps) {
  if (!images || images.length === 0) return null

  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {images.map((image, index) => {
        if (typeof image === 'number') return null
        return (
          <div key={image.id ?? index} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
            <Media
              resource={image}
              fill
              imgClassName="object-cover"
            />
          </div>
        )
      })}
    </div>
  )
}
