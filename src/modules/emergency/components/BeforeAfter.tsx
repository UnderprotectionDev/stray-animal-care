'use client'

import React from 'react'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import type { Media as MediaType } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type BeforeAfterProps = {
  before: MediaType
  after: MediaType
  labels: {
    before: string
    after: string
  }
}

export function BeforeAfter({ before, after, labels }: BeforeAfterProps) {
  if (!before.url || !after.url) return null

  const beforeUrl = getMediaUrl(before.url, before.updatedAt)
  const afterUrl = getMediaUrl(after.url, after.updatedAt)

  return (
    <div className="space-y-2">
      <div className="aspect-video w-full overflow-hidden border border-border">
        <ReactCompareSlider
          style={{ height: '100%', width: '100%' }}
          itemOne={
            <ReactCompareSliderImage
              src={beforeUrl}
              alt={before.alt || labels.before}
              style={{ objectFit: 'cover' }}
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={afterUrl}
              alt={after.alt || labels.after}
              style={{ objectFit: 'cover' }}
            />
          }
        />
      </div>
      <div className="flex justify-between text-[10px] uppercase tracking-widest font-mono text-foreground px-0">
        <span>← {labels.before}</span>
        <span>{labels.after} →</span>
      </div>
    </div>
  )
}
