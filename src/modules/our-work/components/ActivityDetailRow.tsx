'use client'

import React from 'react'
import { Media } from '@/components/Media'
import { BlurFade } from '@/components/BlurFade'
import { VerticalCutReveal } from '@/components/fancy/text/VerticalCutReveal'
import {
  ACTIVITY_COLORS,
  ACTIVITY_FOREGROUNDS,
  ACTIVITY_NUMBERS,
  ACTIVITY_ICONS,
} from '../lib/constants'
import type { Media as MediaType } from '@/payload-types'

type Props = {
  activityKey: string
  title: string
  description: string
  images: (number | MediaType)[]
  isAlternate: boolean
  index: number
}

export function ActivityDetailRow({
  activityKey,
  title,
  description,
  images,
  isAlternate,
  index,
}: Props) {
  const accentColor = ACTIVITY_COLORS[activityKey] || 'var(--health)'
  const fgColor = ACTIVITY_FOREGROUNDS[activityKey] || 'var(--health-foreground)'
  const number = ACTIVITY_NUMBERS[activityKey] || '01'
  const Icon = ACTIVITY_ICONS[activityKey]

  const mediaImages = images.filter((img): img is MediaType => typeof img !== 'number')
  const firstImage = mediaImages[0] ?? null
  const remainingImages = mediaImages.slice(1)

  return (
    <section className="border-b-[1.5px] border-border">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <div
          className={`flex flex-col gap-8 md:flex-row ${isAlternate ? 'md:flex-row-reverse' : ''}`}
        >
          {/* Image Column */}
          <div className="md:w-[55%]">
            {firstImage && (
              <BlurFade inView delay={index * 0.05}>
                <div
                  className="relative aspect-[3/2] overflow-hidden border-[1.5px] border-border"
                  style={{ borderLeftWidth: 4, borderLeftColor: accentColor }}
                >
                  <Media resource={firstImage} fill imgClassName="object-cover photo-sys" />
                </div>
              </BlurFade>
            )}

            {remainingImages.length > 0 && (
              <div
                className="mt-[1.5px] grid grid-cols-2"
                style={{ gap: '1.5px', background: 'var(--foreground)' }}
              >
                {remainingImages.map((img, i) => (
                  <BlurFade key={img.id ?? i} inView delay={index * 0.05 + 0.1 + i * 0.05}>
                    <div className="relative aspect-[4/3] bg-background">
                      <Media resource={img} fill imgClassName="object-cover photo-sys" />
                    </div>
                  </BlurFade>
                ))}
              </div>
            )}
          </div>

          {/* Content Column */}
          <div className="relative flex flex-col justify-center gap-4 md:w-[45%]">
            {/* Ghost number */}
            <span
              className="pointer-events-none absolute -bottom-4 -right-4 select-none font-heading leading-none"
              style={{
                fontSize: 'clamp(8rem, 15vw, 12rem)',
                color: accentColor,
                opacity: 0.06,
              }}
              aria-hidden="true"
            >
              {number}
            </span>

            {/* Icon box */}
            {Icon && (
              <div
                className="flex h-12 w-12 items-center justify-center border-[1.5px]"
                style={{ backgroundColor: accentColor, color: fgColor, borderColor: accentColor }}
              >
                <Icon className="h-6 w-6" />
              </div>
            )}

            {/* Animated title */}
            <VerticalCutReveal
              text={title}
              tag="h2"
              className="t-h1 uppercase"
              style={{ color: accentColor }}
              splitBy="words"
              staggerDelay={0.08}
              threshold={0.3}
            />

            {/* Description */}
            {description && (
              <BlurFade inView delay={0.2}>
                <p className="t-body max-w-md leading-relaxed">{description}</p>
              </BlurFade>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
