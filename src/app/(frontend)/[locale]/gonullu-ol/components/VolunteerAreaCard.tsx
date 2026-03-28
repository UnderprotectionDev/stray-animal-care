'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { VerticalCutReveal } from '@/components/fancy/text/VerticalCutReveal'
import { GlareOverlay } from '@/components/fancy/blocks/GlareOverlay'
import { Heart, Stethoscope, UtensilsCrossed, Home } from 'lucide-react'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  foster: Heart,
  health: Stethoscope,
  feeding: UtensilsCrossed,
  shelter: Home,
}

type Props = {
  iconKey: string
  title: string
  description: string
  accentColor: string
  accentForeground: string
}

export function VolunteerAreaCard({
  iconKey,
  title,
  description,
  accentColor,
  accentForeground,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

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
        {/* Icon */}
        {(() => {
          const Icon = ICON_MAP[iconKey] || Heart
          return (
            <div
              className="flex h-14 w-14 items-center justify-center border-[1.5px] border-current"
              style={{ backgroundColor: accentColor, color: accentForeground }}
            >
              <Icon className="h-7 w-7" />
            </div>
          )
        })()}

        {/* Title */}
        <VerticalCutReveal
          text={title}
          tag="h3"
          className="font-heading text-lg font-bold uppercase"
        />

        {/* Description */}
        <p className="t-body text-sm opacity-80">{description}</p>
      </div>
      <GlareOverlay ref={glareRef} />
    </div>
  )
}
