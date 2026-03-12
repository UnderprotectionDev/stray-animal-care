import React from 'react'
import { PhotoGrid } from './PhotoGrid'
import type { Media as MediaType } from '@/payload-types'

type ActivitySectionProps = {
  title: string
  description: string
  images: (number | MediaType)[]
  isAlternate: boolean
}

export function ActivitySection({ title, description, images, isAlternate: _isAlternate }: ActivitySectionProps) {
  return (
    <div className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 py-8">
        <div className="mb-6">
          <h2 className="t-h1 mb-2">{title}</h2>
          <p className="t-meta max-w-2xl text-lg">{description}</p>
        </div>
        <PhotoGrid images={images} />
      </div>
    </div>
  )
}
