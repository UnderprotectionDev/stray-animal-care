'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { GlareOverlay } from '@/components/fancy/blocks/GlareOverlay'
import { ScrollAnimationTrigger } from '@/components/ui/scroll-animation-trigger'
import type { NeedsList } from '@/payload-types'

const URGENCY_BADGE: Record<string, string> = {
  acil: 'badge-sys critical',
  orta: 'badge-sys',
  yeterli: 'badge-sys cta',
}

const URGENCY_COLOR: Record<string, { bg: string; hover: string; hoverFg: string }> = {
  acil: { bg: 'var(--cta)', hover: 'var(--cta)', hoverFg: 'var(--cta-foreground)' },
  orta: { bg: 'var(--emergency)', hover: 'var(--emergency)', hoverFg: 'var(--emergency-foreground)' },
  yeterli: { bg: 'var(--health)', hover: 'var(--health)', hoverFg: 'var(--health-foreground)' },
}

const DEFAULT_UNIT_LABELS: Record<string, string> = {
  kutu: 'Kutu',
  kg: 'Kg',
  adet: 'Adet',
}

type Props = {
  items: NeedsList[]
  urgencyLabels: Record<string, string>
  unitLabels?: Record<string, string>
}

function StockProgress({ current, target, urgency }: { current: number; target: number; urgency: string }) {
  const safeTarget = Math.max(target, 1)
  const percentage = Math.min(100, Math.round((current / safeTarget) * 100))
  const fillColor = URGENCY_COLOR[urgency]?.bg ?? 'var(--foreground)'

  return (
    <div className="w-full mt-auto">
      <div className="flex justify-between mb-1">
        <span className="t-meta text-xs">{current} / {target}</span>
        <span className="t-meta text-xs font-bold">{percentage}%</span>
      </div>
      <div
        className="w-full h-2.5 bg-background border border-border"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={target}
        aria-label={`${current} / ${target}`}
      >
        <div
          className="h-full transition-all duration-1000"
          style={{ width: `${percentage}%`, background: fillColor }}
        />
      </div>
    </div>
  )
}

function NeedCard({ item, index, urgencyLabels, unitLabels }: { item: NeedsList; index: number; urgencyLabels: Record<string, string>; unitLabels: Record<string, string> }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  const colors = URGENCY_COLOR[item.urgency] ?? URGENCY_COLOR.orta

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const accentBarRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current
      const glare = glareRef.current
      if (!el) return

      // Subtle scale + accent bar expansion instead of full background color change
      const rect = el.getBoundingClientRect()
      const mx = (e.clientX - (rect.left + rect.width / 2)) / 30
      const my = (e.clientY - (rect.top + rect.height / 2)) / 30
      el.style.transform = `translate3d(${mx}px, ${my}px, 0)`
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${-mx}px, ${-my}px, 0) scale3d(1.01, 1.01, 1)`
      }
      if (accentBarRef.current) {
        gsap.to(accentBarRef.current, { height: 6, duration: 0.25, ease: 'power2.out' })
      }

      if (glare) {
        const gx = ((e.clientX - rect.left) / rect.width) * 100
        const gy = ((e.clientY - rect.top) / rect.height) * 100
        glare.style.setProperty('--glare-x', `${gx}%`)
        glare.style.setProperty('--glare-y', `${gy}%`)
        glare.style.opacity = '1'
      }
    },
    [],
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current
    const glare = glareRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    const mx = (e.clientX - (rect.left + rect.width / 2)) / 30
    const my = (e.clientY - (rect.top + rect.height / 2)) / 30
    el.style.transform = `translate3d(${mx}px, ${my}px, 0)`
    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(${-mx}px, ${-my}px, 0) scale3d(1.01, 1.01, 1)`
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

    el.style.transform = 'translate3d(0px, 0px, 0)'
    if (contentRef.current) {
      contentRef.current.style.transform = 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)'
    }
    if (accentBarRef.current) {
      gsap.to(accentBarRef.current, { height: 3, duration: 0.2, ease: 'power2.in' })
    }
    if (glare) {
      glare.style.opacity = '0'
    }
  }, [])

  return (
    <ScrollAnimationTrigger effect="slide" direction="up" delay={index * 0.08} once>
      <div
        ref={cardRef}
        className="relative overflow-hidden bg-background text-foreground cursor-default h-full border border-border"
        style={{ transition: 'transform 0.1s ease-out' }}
        onMouseEnter={reducedMotion ? undefined : handleMouseEnter}
        onMouseMove={reducedMotion ? undefined : handleMouseMove}
        onMouseLeave={reducedMotion ? undefined : handleMouseLeave}
      >
        {/* Top accent bar — colored by urgency */}
        <div
          ref={accentBarRef}
          className="w-full"
          style={{ height: 3, backgroundColor: colors.bg, transition: 'height 0.2s ease' }}
        />
        <div
          ref={contentRef}
          className="relative z-10 p-5 lg:p-6 flex flex-col gap-3 h-full min-h-[200px]"
          style={{ transition: 'transform 0.1s ease-out' }}
        >
          {/* Top row: urgency badge + unit */}
          <div className="flex items-center justify-between">
            <span className={URGENCY_BADGE[item.urgency] ?? 'badge-sys'}>
              {urgencyLabels[item.urgency] ?? item.urgency}
            </span>
            {item.unit && (
              <span className="t-meta text-xs uppercase tracking-wider opacity-60">
                {unitLabels[item.unit] ?? item.unit}
              </span>
            )}
          </div>

          {/* Product name */}
          <h3
            className="font-bold uppercase leading-tight"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
          >
            {item.productName}
          </h3>

          {/* Brand detail */}
          {item.brandDetail && (
            <p className="t-meta text-sm opacity-70">{item.brandDetail}</p>
          )}

          {/* Progress bar */}
          <StockProgress
            current={item.currentStock ?? 0}
            target={item.targetStock}
            urgency={item.urgency}
          />
        </div>
        <GlareOverlay ref={glareRef} />
      </div>
    </ScrollAnimationTrigger>
  )
}

export function SuppliesNeedsGrid({ items, urgencyLabels, unitLabels }: Props) {
  const units = unitLabels ?? DEFAULT_UNIT_LABELS

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-background"
      style={{ gap: '1.5px' }}
    >
      {items.map((item, i) => (
        <NeedCard key={item.id} item={item} index={i} urgencyLabels={urgencyLabels} unitLabels={units} />
      ))}
    </div>
  )
}
