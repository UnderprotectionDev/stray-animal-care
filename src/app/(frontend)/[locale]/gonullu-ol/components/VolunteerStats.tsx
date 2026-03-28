'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import CountUp from '@/components/CountUp'
import BlurText from '@/components/BlurText'
import { GlareOverlay } from '@/components/fancy/blocks/GlareOverlay'

type StatItem = {
  value: number
  suffix: string
  label: string
}

type Props = {
  stats: StatItem[]
}

const HOVER_COLORS = [
  { bg: 'var(--warm)', fg: 'var(--warm-foreground)' },
  { bg: 'var(--health)', fg: 'var(--health-foreground)' },
  { bg: 'var(--trust)', fg: 'var(--trust-foreground)' },
  { bg: 'var(--adoption)', fg: 'var(--adoption-foreground)' },
] as const

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const color = HOVER_COLORS[index % HOVER_COLORS.length]
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
        backgroundColor: color.bg,
        color: color.fg,
        duration: 0.3,
        ease: 'power2.out',
      })

      const rect = el.getBoundingClientRect()
      const mx = (e.clientX - (rect.left + rect.width / 2)) / 20
      const my = (e.clientY - (rect.top + rect.height / 2)) / 20
      el.style.transform = `translate3d(${mx}px, ${my}px, 0)`
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${-mx}px, ${-my}px, 0) scale3d(1.03, 1.03, 1)`
      }

      if (glare) {
        const gx = ((e.clientX - rect.left) / rect.width) * 100
        const gy = ((e.clientY - rect.top) / rect.height) * 100
        glare.style.setProperty('--glare-x', `${gx}%`)
        glare.style.setProperty('--glare-y', `${gy}%`)
        glare.style.opacity = '1'
      }
    },
    [color.bg, color.fg],
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current
    const glare = glareRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    const mx = (e.clientX - (rect.left + rect.width / 2)) / 20
    const my = (e.clientY - (rect.top + rect.height / 2)) / 20
    el.style.transform = `translate3d(${mx}px, ${my}px, 0)`
    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(${-mx}px, ${-my}px, 0) scale3d(1.03, 1.03, 1)`
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
      backgroundColor: 'var(--stats)',
      color: 'var(--stats-foreground)',
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
      className="relative overflow-hidden bg-stats text-stats-foreground cursor-default h-48 md:h-56"
      style={{ transition: 'transform 0.1s ease-out' }}
      onMouseEnter={reducedMotion ? undefined : handleMouseEnter}
      onMouseMove={reducedMotion ? undefined : handleMouseMove}
      onMouseLeave={reducedMotion ? undefined : handleMouseLeave}
    >
      <div
        ref={contentRef}
        className="relative z-10 h-full px-6 py-6 md:px-8 md:py-8 flex flex-col justify-between"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        <span className="t-comment block">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <span
            className="block"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
            }}
          >
            <CountUp to={stat.value} from={0} duration={2} />
            <span>{stat.suffix}</span>
          </span>
          <BlurText
            text={stat.label}
            tag="span"
            className="block mt-2 text-sm font-bold uppercase tracking-wider"
            animateBy="words"
            delay={80}
            stepDuration={0.3}
            direction="bottom"
            threshold={0.3}
          />
        </div>
      </div>
      <GlareOverlay ref={glareRef} />
    </div>
  )
}

export function VolunteerStats({ stats }: Props) {
  if (stats.length === 0) return null

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3"
      style={{ gap: '1.5px', background: 'var(--foreground)' }}
    >
      {stats.map((stat, i) => (
        <StatCard key={i} stat={stat} index={i} />
      ))}
    </div>
  )
}
