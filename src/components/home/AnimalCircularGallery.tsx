'use client'

import { useMemo } from 'react'
import type { Animal, Media as MediaType } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import CircularGallery from '@/components/CircularGallery'

type Props = {
  animals: Animal[]
}

export default function AnimalCircularGallery({ animals }: Props) {
  const items = useMemo(
    () =>
      animals.map((animal) => {
        const firstPhoto =
          animal.photos && animal.photos.length > 0 ? animal.photos[0] : null
        const photo =
          firstPhoto && typeof firstPhoto !== 'number'
            ? (firstPhoto as MediaType)
            : null
        const imageUrl = photo ? getMediaUrl(photo.url) : ''

        return {
          image: imageUrl,
          text: animal.name,
        }
      }),
    [animals],
  )

  return (
    <div className="relative w-full h-[clamp(350px,50vw,600px)] border-[1.5px] border-[var(--border)] bg-[var(--palette-cream)] overflow-hidden cursor-grab active:cursor-grabbing">
      <CircularGallery
        items={items}
        bend={3}
        textColor="#111111"
        borderRadius={0}
        font="bold 24px var(--font-heading)"
      />
    </div>
  )
}
