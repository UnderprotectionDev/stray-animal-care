'use client'

import React, { useState } from 'react'
import { Media } from '@/components/Media'
import { Lightbox } from './Lightbox'
import type { Media as MediaType } from '@/payload-types'

type PhotoGalleryProps = {
  photos: MediaType[]
  animalName: string
  labels: {
    close: string
    prev: string
    next: string
    imageOf: string
    noPhotos: string
  }
}

export function PhotoGallery({ photos, animalName, labels }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!photos || photos.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <span>{labels.noPhotos}</span>
      </div>
    )
  }

  const heroPhoto = photos[0]
  const thumbnails = photos

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      {/* Hero image */}
      <button
        type="button"
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted"
        onClick={() => openLightbox(0)}
        aria-label={`${labels.imageOf} ${animalName}`}
      >
        <Media
          resource={heroPhoto}
          fill
          imgClassName="object-cover hover:scale-105 transition-transform duration-300"
          priority
        />
      </button>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="mt-2 grid grid-cols-4 gap-2">
          {thumbnails.map((photo, i) => (
            <button
              key={photo.id ?? i}
              type="button"
              onClick={() => openLightbox(i)}
              className="relative aspect-square overflow-hidden rounded-md bg-muted ring-2 ring-transparent hover:ring-primary/50 transition-all"
              aria-label={`${animalName} - ${i + 1}`}
            >
              <Media
                resource={photo}
                fill
                imgClassName="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <Lightbox
        photos={photos}
        open={lightboxOpen}
        initialIndex={selectedIndex}
        onOpenChange={setLightboxOpen}
        labels={labels}
      />
    </>
  )
}
