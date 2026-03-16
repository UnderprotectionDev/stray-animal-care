'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import type { SiteSetting, Media as MediaType } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { interpolate } from '@/utilities/interpolate'
import { AnimatedCardTitle } from './AnimatedCardTitle'

type OurWorkBlock = Extract<
  NonNullable<SiteSetting['homepageBlocks']>[number],
  { blockType: 'homeOurWork' }
>

type Activity = NonNullable<OurWorkBlock['activities']>[number]

type Props = {
  activities: Activity[]
  photoCountTemplate?: string | null
}

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

const ACTIVITY_FOREGROUNDS: Record<string, string> = {
  feeding: 'var(--health-foreground)',
  treatment: 'var(--stats-foreground)',
  spaying: 'var(--trust-foreground)',
  emergency: 'var(--emergency-foreground)',
  vaccination: 'var(--adoption-foreground)',
  shelter: 'var(--warm-foreground)',
}

const SCALE_MULTIPLIER = 0.04

function StackingCardItem({
  activity,
  index,
  totalCards,
  photoCountTemplate,
}: {
  activity: Activity
  index: number
  totalCards: number
  photoCountTemplate?: string | null
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  })

  const scaleTo = 1 - (totalCards - index) * SCALE_MULTIPLIER
  const scale = useTransform(scrollYProgress, [0, 1], [1, scaleTo])

  const images = activity.images ?? []
  const firstImage =
    images.length > 0
      ? typeof images[0] === 'number'
        ? null
        : (images[0] as MediaType)
      : null
  const imageUrl = firstImage ? getMediaUrl(firstImage.url) : ''
  const photoCount = images.length
  const number = ACTIVITY_NUMBERS[activity.key] || '00'
  const accentColor = ACTIVITY_COLORS[activity.key] || 'var(--health)'

  return (
    <div
      ref={cardRef}
      className="group sticky top-0 pt-[calc(var(--card-index)*2rem)]"
      style={{ '--card-index': index } as React.CSSProperties}
    >
      <motion.div
        style={{ scale, transformOrigin: 'top center', borderLeftWidth: 4, borderLeftColor: accentColor }}
        className="border-[1.5px] border-[var(--border)] bg-palette-cream overflow-hidden transition-all duration-300 group-hover:border-l-[6px] group-hover:-translate-y-0.5"
      >
        <div className="flex flex-col md:flex-row min-h-[320px] md:min-h-[380px]">
          {/* Image */}
          {imageUrl && (
            <div className="relative w-full md:w-[45%] min-h-[220px] md:min-h-full overflow-hidden">
              <Image
                src={imageUrl}
                alt={activity.title || ''}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          )}

          {/* Content */}
          <div className="relative flex-1 p-5 md:p-8 flex flex-col justify-center gap-3 md:gap-4 overflow-hidden">
            <span
              className="absolute -right-4 -bottom-4 font-heading leading-none select-none pointer-events-none"
              style={{ fontSize: 'clamp(8rem, 15vw, 12rem)', color: accentColor, opacity: 0.06 }}
              aria-hidden="true"
            >
              {number}
            </span>

            <div className="flex items-baseline gap-3">
              <span
                className="font-heading text-4xl md:text-5xl font-bold leading-none"
                style={{ color: accentColor }}
              >
                {number}
              </span>
              <span className="t-comment">
                {'// '}{activity.key?.toUpperCase()}
              </span>
            </div>

            <AnimatedCardTitle
              text={activity.title}
              tag="h3"
              className="font-heading text-2xl md:text-3xl font-bold text-[var(--palette-black)] uppercase leading-tight"
            />

            {activity.description && (
              <p className="t-body text-[var(--warm-gray)] max-w-md leading-relaxed">
                {activity.description}
              </p>
            )}

            {photoCount > 0 && photoCountTemplate && (
              <span
                className="inline-flex items-center gap-2 self-start border-[1.5px] border-[var(--border)] px-3 py-1.5 font-mono text-xs uppercase tracking-wider"
                style={{ backgroundColor: accentColor, color: ACTIVITY_FOREGROUNDS[activity.key] || 'var(--palette-black)' }}
              >
                {interpolate(photoCountTemplate, { count: photoCount })}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function OurWorkStackingCards({ activities, photoCountTemplate }: Props) {
  if (activities.length === 0) return null

  return (
    <div className="relative">
      {activities.map((activity, index) => (
        <StackingCardItem
          key={activity.id || activity.key}
          activity={activity}
          index={index}
          totalCards={activities.length}
          photoCountTemplate={photoCountTemplate}
        />
      ))}
    </div>
  )
}
