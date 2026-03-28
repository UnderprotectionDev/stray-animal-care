'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Media } from '@/components/Media'
import { BlurFade } from '@/components/BlurFade'
import { VerticalCutReveal } from '@/components/fancy/text/VerticalCutReveal'
import { GlareOverlay } from '@/components/fancy/blocks/GlareOverlay'
import {
  ACTIVITY_COLORS,
  ACTIVITY_FOREGROUNDS,
  ACTIVITY_NUMBERS,
  ACTIVITY_ICONS,
} from '../lib/constants'
import type { Media as MediaType } from '@/payload-types'

type Activity = {
  key: string
  title: string
  description: string
  images: (number | MediaType)[]
}

type Props = {
  activities: Activity[]
}

function ShowcaseCard({ activity }: { activity: Activity }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  const { key, title, description, images } = activity
  const accentColor = ACTIVITY_COLORS[key] ?? 'var(--cta)'
  const accentForeground = ACTIVITY_FOREGROUNDS[key] ?? 'var(--cta-foreground)'
  const ghostNumber = ACTIVITY_NUMBERS[key] ?? '01'
  const Icon = ACTIVITY_ICONS[key]

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current
      const glare = glareRef.current
      if (!el) return

      gsap.to(el, {
        backgroundColor: accentColor,
        color: accentForeground,
        duration: 0.3,
        ease: 'power2.out',
      })

      const rect = el.getBoundingClientRect()
      const mx = (e.clientX - (rect.left + rect.width / 2)) / 25
      const my = (e.clientY - (rect.top + rect.height / 2)) / 25
      el.style.transform = `translate3d(${mx}px, ${my}px, 0)`
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${-mx}px, ${-my}px, 0) scale3d(1.02, 1.02, 1)`
      }

      if (glare) {
        const gx = ((e.clientX - rect.left) / rect.width) * 100
        const gy = ((e.clientY - rect.top) / rect.height) * 100
        glare.style.setProperty('--glare-x', `${gx}%`)
        glare.style.setProperty('--glare-y', `${gy}%`)
        glare.style.opacity = '1'
      }
    },
    [accentColor, accentForeground],
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current
    const glare = glareRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    const mx = (e.clientX - (rect.left + rect.width / 2)) / 25
    const my = (e.clientY - (rect.top + rect.height / 2)) / 25
    el.style.transform = `translate3d(${mx}px, ${my}px, 0)`
    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(${-mx}px, ${-my}px, 0) scale3d(1.02, 1.02, 1)`
    }

    if (glare) {
      const gx = ((e.clientX - rect.left) / rect.width) * 100
      const gy = ((e.clientY - rect.top) / rect.height) * 100
      glare.style.setProperty('--glare-x', `${gx}%`)
      glare.style.setProperty('--glare-y', `${gy}%`)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    const glare = glareRef.current
    if (!el) return

    gsap.to(el, {
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      duration: 0.25,
      ease: 'power2.in',
    })

    el.style.transform = 'translate3d(0px, 0px, 0)'
    if (contentRef.current) {
      contentRef.current.style.transform = 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)'
    }
    if (glare) {
      glare.style.opacity = '0'
    }
  }, [])

  const primaryImage = images?.[0]

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden bg-background text-foreground cursor-default"
      style={{ transition: 'transform 0.1s ease-out' }}
      onMouseEnter={reducedMotion ? undefined : handleMouseEnter}
      onMouseMove={reducedMotion ? undefined : handleMouseMove}
      onMouseLeave={reducedMotion ? undefined : handleMouseLeave}
    >
      <div
        ref={contentRef}
        className="relative z-10 p-6 lg:p-8 flex flex-col gap-4 h-full"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        {/* Icon box + ghost number */}
        <div className="relative">
          {Icon && (
            <div
              className="flex h-14 w-14 items-center justify-center border-[1.5px] border-current"
              style={{ backgroundColor: accentColor, color: accentForeground }}
            >
              <Icon className="h-7 w-7" />
            </div>
          )}

          {/* Ghost number */}
          <span
            className="absolute top-0 right-0 font-heading font-bold select-none pointer-events-none leading-none"
            style={{
              fontSize: '8rem',
              opacity: 0.06,
              color: accentColor,
            }}
            aria-hidden="true"
          >
            {ghostNumber}
          </span>
        </div>

        {/* Title */}
        <VerticalCutReveal
          text={title}
          tag="h3"
          className="font-heading text-lg font-bold uppercase"
        />

        {/* Description */}
        <p className="t-body text-sm opacity-80">{description}</p>

        {/* Primary image */}
        {primaryImage && (
          <div className="relative mt-auto aspect-[4/3] overflow-hidden border-[1.5px] border-current">
            <Media
              resource={primaryImage}
              fill
              imgClassName="object-cover photo-sys"
            />
          </div>
        )}
      </div>
      <GlareOverlay ref={glareRef} />
    </div>
  )
}

export function ActivityShowcase({ activities }: Props) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3"
      style={{ gap: '1.5px', background: 'var(--palette-black)' }}
    >
      {activities.map((activity, index) => (
        <BlurFade key={activity.key} delay={index * 0.1} inView>
          <ShowcaseCard activity={activity} />
        </BlurFade>
      ))}
    </div>
  )
}
