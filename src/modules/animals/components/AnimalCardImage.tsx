'use client'

import React from 'react'
import PixelTransition from '@/components/PixelTransition'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type AnimalCardImageProps = {
  photo: MediaType | null
  animalType: string
  animalName: string
}

export function AnimalCardImage({ photo, animalType, animalName }: AnimalCardImageProps) {
  const soundText = animalType === 'kedi' ? 'Miyav!' : 'Hav hav!'
  const soundEmoji = animalType === 'kedi' ? '🐱' : '🐶'
  const bgColor = animalType === 'kedi' ? '#F5B62A' : '#F26E41'

  if (!photo || typeof photo !== 'object') {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        <span className="text-4xl">&#128062;</span>
      </div>
    )
  }

  return (
    <PixelTransition
      firstContent={
        <div className="absolute inset-0 w-full h-full">
          <Media
            resource={photo}
            fill
            imgClassName="object-cover"
          />
        </div>
      }
      secondContent={
        <div
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-1"
          style={{ backgroundColor: bgColor }}
          aria-hidden="true"
        >
          <span className="text-4xl md:text-5xl">{soundEmoji}</span>
          <span className="font-heading text-xl md:text-2xl font-bold text-foreground tracking-tight">
            {soundText}
          </span>
          <span className="text-xs text-foreground/70 uppercase tracking-wider mt-1">
            {animalName}
          </span>
        </div>
      }
      gridSize={10}
      pixelColor="#111111"
      animationStepDuration={0.3}
      aspectRatio="100%"
    />
  )
}
