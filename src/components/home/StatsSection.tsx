'use client'

import React, { useCallback, useRef } from 'react'
import gsap from 'gsap'
import type { SiteSetting } from '@/payload-types'
import CountUp from '@/components/CountUp'

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
  const color = STAT_HOVER_COLORS[colorIndex % STAT_HOVER_COLORS.length]

  const handleMouseEnter = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    gsap.to(el, {
      backgroundColor: color.bg,
      color: color.fg,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [color.bg, color.fg])

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    gsap.to(el, {
      backgroundColor: 'var(--stats)',
      color: 'var(--stats-foreground)',
      duration: 0.25,
      ease: 'power2.in',
    })
  }, [])

  return (
    <div
      ref={cardRef}
      className="px-6 py-8 md:py-12 text-center bg-stats text-stats-foreground cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className="t-mega block"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
      >
        {prefix && <span>{prefix}</span>}
        <CountUp to={numericValue} from={0} duration={2} />
        {suffix && <span>{suffix}</span>}
      </span>
      <span className="t-comment block mt-3 opacity-70">{metric.name}</span>
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
