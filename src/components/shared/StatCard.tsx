'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { useCardHover } from '@/hooks/use-card-hover'
import { GlareOverlay } from '@/components/fancy/blocks/GlareOverlay'

const BlurText = dynamic(() => import('@/components/BlurText'), { ssr: false })

export type StatItem = {
  value: number
  label: string
  color: string
  colorFg: string
  suffix?: string
  isCurrency?: boolean
}

type StatCardProps = {
  stat: StatItem
  index: number
  hoverStat: StatItem
  renderValue: (stat: StatItem) => React.ReactNode
}

export function StatCard({ stat, index, hoverStat, renderValue }: StatCardProps) {
  const { cardRef, contentRef, glareRef, handlers } = useCardHover({
    hoverColor: hoverStat.color,
    hoverColorFg: hoverStat.colorFg,
    baseColor: stat.color,
    baseColorFg: stat.colorFg,
  })

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden cursor-default h-40 md:h-48"
      style={{
        backgroundColor: stat.color,
        color: stat.colorFg,
        transition: 'transform 0.1s ease-out',
      }}
      {...handlers}
    >
      <div
        ref={contentRef}
        className="relative z-10 h-full px-4 py-4 md:px-6 md:py-6 flex flex-col justify-between"
        style={{ transition: 'transform 0.1s ease-out' }}
      >
        <span className="t-comment block">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <span
            className="block"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
            }}
          >
            {renderValue(stat)}
          </span>
          <BlurText
            text={stat.label}
            tag="span"
            className="block mt-2 text-xs md:text-sm font-bold uppercase tracking-wider"
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
