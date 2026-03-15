import React from 'react'
import type { SiteSetting, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { interpolate } from '@/utilities/interpolate'
import { SectionHeader } from './SectionHeader'

type OurWorkBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeOurWork' }>

const ACTIVITY_NUMBERS: Record<string, string> = {
  feeding: '01',
  treatment: '02',
  spaying: '03',
  emergency: '04',
  vaccination: '05',
  shelter: '06',
}

type Props = {
  block: OurWorkBlock
}

export function OurWorkShowcase({ block }: Props) {
  const activities = block.activities ?? []
  if (activities.length === 0) return null

  return (
    <section>
      <SectionHeader title={block.sectionTitle} viewAllLabel={block.viewAllLabel} viewAllLink={block.viewAllLink} />
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
            >
              {firstImage && (
                <Media
                  resource={firstImage}
                  fill
                  imgClassName="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              )}
              <div className="photo-overlay-gradient absolute inset-0" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-1">
                <span className="t-meta text-white/50 font-mono">
                  {ACTIVITY_NUMBERS[activity.key] || '00'} {'// '}{activity.title?.toUpperCase() ?? ''}
                </span>
                <span className="t-h2 text-white">
                  {activity.title}
                </span>
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
    </section>
  )
}
