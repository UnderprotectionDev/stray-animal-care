import React from 'react'
import { Heading } from '@/components/shared/Heading'
import { PhotoGrid } from './PhotoGrid'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

type ActivitySectionProps = {
  title: string
  description: string
  images: (number | MediaType)[]
  isAlternate: boolean
}

export function ActivitySection({ title, description, images, isAlternate }: ActivitySectionProps) {
  return (
    <div className={cn('py-12 md:py-16', isAlternate && 'bg-muted/30')}>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="mb-6">
          <Heading as="h2" className="mb-3">
            {title}
          </Heading>
          <p className="text-muted-foreground max-w-2xl text-lg">{description}</p>
        </div>
        <PhotoGrid images={images} />
      </div>
    </div>
  )
}
