'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Link } from '@/i18n/navigation'
const AnimatedMegaHeading = dynamic(() => import('./AnimatedMegaHeading').then(mod => mod.AnimatedMegaHeading), { ssr: false })

type AccentColor = 'cta' | 'adoption' | 'health' | 'trust' | 'warm' | 'stats' | 'emergency'

const accentButtonStyles: Record<AccentColor, string> = {
  cta: 'btn-cta',
  adoption: 'btn-adoption',
  health: 'btn-health',
  trust: 'btn-trust',
  warm: 'btn-warm',
  stats: 'btn-stats',
  emergency: 'btn-emergency',
}

type Props = {
  title: string | null | undefined
  viewAllLabel?: string | null
  viewAllLink?: string | null
  accentColor?: AccentColor
  comment?: string
  showAccentLine?: boolean
}

export function AnimatedSectionHeader({ title, viewAllLabel, viewAllLink, accentColor = 'cta', comment, showAccentLine = true }: Props) {
  const accentColorVar: Record<AccentColor, string> = {
    cta: 'var(--cta)',
    adoption: 'var(--adoption)',
    health: 'var(--health)',
    trust: 'var(--trust)',
    warm: 'var(--warm)',
    stats: 'var(--stats)',
    emergency: 'var(--emergency)',
  }

  return (
    <div className="panel py-5 px-6 lg:px-8 flex flex-col gap-1 border-b-[1.5px] border-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          {comment ? <p className="t-comment mb-1">{comment}</p> : null}
          {title ? (
            <AnimatedMegaHeading text={title} enableColorFlash />
          ) : (
            <h2 className="t-mega" />
          )}
          {showAccentLine && (
            <div className="w-24 h-1 mt-3" style={{ background: accentColorVar[accentColor] }} />
          )}
        </div>
        {viewAllLabel && viewAllLink && (
          <Link href={viewAllLink} className={`${accentButtonStyles[accentColor]} text-xs py-2 px-5 self-start sm:self-auto`}>
            {viewAllLabel}
          </Link>
        )}
      </div>
    </div>
  )
}
