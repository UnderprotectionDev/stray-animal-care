'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import type { SiteSetting, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { interpolate } from '@/utilities/interpolate'
import { AnimatedSectionHeader } from './AnimatedSectionHeader'
import { AnimatedCardTitle } from './AnimatedCardTitle'
import OurWorkCircularGallery from './OurWorkCircularGallery'

const OurWorkStackingCards = dynamic(() => import('./OurWorkStackingCards'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '400px' }} />,
})

type OurWorkBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeOurWork' }>

const ACTIVITY_NUMBERS: Record<string, string> = {
  feeding: '01',
  treatment: '02',
  spaying: '03',
  emergency: '04',
  vaccination: '05',
  shelter: '06',
}

const ACTIVITY_COLORS: Record<string, string> = {
  feeding: 'var(--health)',
  treatment: 'var(--stats)',
  spaying: 'var(--trust)',
  emergency: 'var(--emergency)',
  vaccination: 'var(--adoption)',
  shelter: 'var(--warm)',
}

type Props = {
  block: OurWorkBlock
}

export function OurWorkShowcase({ block }: Props) {
  const activities = block.activities ?? []
  if (activities.length === 0) return null

  const variant = block.galleryVariant ?? 'stacking'

  return (
    <section>
      <AnimatedSectionHeader title={block.sectionTitle} viewAllLabel={block.viewAllLabel} viewAllLink={block.viewAllLink} />
      {variant === 'stacking' ? (
        <OurWorkStackingCards activities={activities} photoCountTemplate={block.photoCountTemplate} />
      ) : variant === 'circular' ? (
        <OurWorkCircularGallery activities={activities} />
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => {
          const images = activity.images
          const firstImage =
            images && images.length > 0
              ? typeof images[0] === 'number'
                ? null
                : (images[0] as MediaType)
              : null
          const photoCount = images?.length ?? 0

          return (
            <div
              key={activity.id || activity.key}
              className="relative group overflow-hidden bg-[var(--muted)] border-b border-r border-border h-[280px]"
              style={{ borderLeftWidth: '4px', borderLeftColor: ACTIVITY_COLORS[activity.key] || 'var(--border)' }}
            >
              {firstImage && (
                <Media
                  resource={firstImage}
                  fill
                  imgClassName="object-cover transition-all duration-300"
                />
              )}
              <div className="photo-overlay-gradient absolute inset-0" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1">
                <span className="t-meta text-white/50 font-mono">
                  {ACTIVITY_NUMBERS[activity.key] || '00'} {'// '}{activity.title?.toUpperCase() ?? ''}
                </span>
                <AnimatedCardTitle text={activity.title} className="t-h2 text-white" />
                {activity.description && (
                  <span className="t-meta text-white/70">
                    {activity.description}
                  </span>
                )}
                {photoCount > 0 && block.photoCountTemplate && (
                  <span className="badge-sys mt-1 self-start">
                    {interpolate(block.photoCountTemplate, { count: photoCount })}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
      )}
    </section>
  )
}
