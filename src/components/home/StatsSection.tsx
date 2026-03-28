'use client'

import React, { useCallback, useRef } from 'react'
import gsap from 'gsap'
import type { SiteSetting } from '@/payload-types'
import CountUp from '@/components/CountUp'
import BlurText from '@/components/BlurText'
import { GlareOverlay } from '@/components/fancy/blocks/GlareOverlay'

type StatsBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeStats' }>

type Props = {
  block: StatsBlock
}

function parseStatValue(value: string) {
  const match = value.match(/^(0*)(\d+\.?\d*)\s*(.*)$/)
  if (!match) return { prefix: '', numericValue: 0, suffix: value }
  return {
    prefix: match[1],
    numericValue: parseFloat(match[2]),
    suffix: match[3],
  }
}

const STAT_HOVER_COLORS = [
  { bg: 'var(--emergency)', fg: 'var(--emergency-foreground)' },
  { bg: 'var(--cta)',       fg: 'var(--cta-foreground)' },
  { bg: 'var(--health)',    fg: 'var(--health-foreground)' },
  { bg: 'var(--adoption)',  fg: 'var(--adoption-foreground)' },
  { bg: 'var(--trust)',     fg: 'var(--trust-foreground)' },
  { bg: 'var(--warm)',      fg: 'var(--warm-foreground)' },
] as const

const StatCard: React.FC<{
  metric: { id?: string | null; value?: string | null; name?: string | null }
  colorIndex: number
}> = ({ metric, colorIndex }) => {
  const { prefix, numericValue, suffix } = parseStatValue(metric.value ?? '')
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const color = STAT_HOVER_COLORS[colorIndex % STAT_HOVER_COLORS.length]

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      const el = cardRef.current
      const content = contentRef.current
      const glare = glareRef.current
      if (!el) return

      // GSAP color change
      gsap.to(el, {
        backgroundColor: color.bg,
        color: color.fg,
        duration: 0.3,
        ease: 'power2.out',
      })

      // Wobble translate
      const rect = el.getBoundingClientRect()
      const mx = (e.clientX - (rect.left + rect.width / 2)) / 20
      const my = (e.clientY - (rect.top + rect.height / 2)) / 20
      el.style.transform = `translate3d(${mx}px, ${my}px, 0)`
      if (content) {
        content.style.transform = `translate3d(${-mx}px, ${-my}px, 0) scale3d(1.03, 1.03, 1)`
      }

      // Glare
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
    const content = contentRef.current
    const glare = glareRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()

    // Wobble translate
    const mx = (e.clientX - (rect.left + rect.width / 2)) / 20
    const my = (e.clientY - (rect.top + rect.height / 2)) / 20
    el.style.transform = `translate3d(${mx}px, ${my}px, 0)`
    if (content) {
      content.style.transform = `translate3d(${-mx}px, ${-my}px, 0) scale3d(1.03, 1.03, 1)`
    }

    // Glare position
    if (glare) {
      const gx = ((e.clientX - rect.left) / rect.width) * 100
      const gy = ((e.clientY - rect.top) / rect.height) * 100
      glare.style.setProperty('--glare-x', `${gx}%`)
      glare.style.setProperty('--glare-y', `${gy}%`)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    const content = contentRef.current
    const glare = glareRef.current
    if (!el) return

    // GSAP color reset
    gsap.to(el, {
      backgroundColor: 'var(--stats)',
      color: 'var(--stats-foreground)',
      duration: 0.25,
      ease: 'power2.in',
    })

    // Wobble reset
    el.style.transform = 'translate3d(0px, 0px, 0)'
    if (content) {
      content.style.transform = 'translate3d(0px, 0px, 0) scale3d(1, 1, 1)'
    }

    // Glare fade out
    if (glare) {
      glare.style.opacity = '0'
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden bg-stats text-stats-foreground cursor-default h-56 md:h-64"
      style={{ transition: 'transform 0.1s ease-out' }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={contentRef}
        className="relative z-10 h-full px-8 py-8 md:py-10 flex flex-col justify-between"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        <span className="t-comment block">
          {String(colorIndex + 1).padStart(2, '0')}
        </span>
        <div>
          <span
            className="block"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
            }}
          >
            {prefix && <span>{prefix}</span>}
            <CountUp to={numericValue} from={0} duration={2} />
            {suffix && <span>{suffix}</span>}
          </span>
          {metric.name && (
            <BlurText
              text={metric.name}
              tag="span"
              className="block mt-2 text-sm font-bold uppercase tracking-wider"
              animateBy="words"
              delay={80}
              stepDuration={0.3}
              direction="bottom"
              threshold={0.3}
              animationFrom={{ filter: 'blur(6px)', opacity: 0, y: 15 }}
              animationTo={[{ filter: 'blur(0px)', opacity: 1, y: 0 }]}
            />
          )}
        </div>
      </div>
      <GlareOverlay ref={glareRef} />
    </div>
  )
}

export function StatsSection({ block }: Props) {
  const metrics = block.metrics ?? []
  if (metrics.length === 0) return null

  return (
    <section>
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ gap: '1.5px', background: 'var(--foreground)' }}
      >
        {metrics.map((metric, i) => (
          <StatCard key={metric.id || i} metric={metric} colorIndex={i} />
        ))}
      </div>
    </section>
  )
}
