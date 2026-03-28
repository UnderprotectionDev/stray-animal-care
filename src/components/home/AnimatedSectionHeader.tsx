'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import { AnimatedMegaHeading } from './AnimatedMegaHeading'

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
}

export function AnimatedSectionHeader({ title, viewAllLabel, viewAllLink, accentColor = 'cta', comment }: Props) {
  return (
    <div className="panel py-5 px-6 lg:px-8 flex flex-col gap-1 border-b-[1.5px] border-border">
      <div className="flex items-start justify-between">
        <div>
          {comment && <p className="t-comment mb-1">{comment}</p>}
          {title ? (
            <AnimatedMegaHeading text={title} enableColorFlash />
          ) : (
            <h2 className="t-mega" />
          )}
        </div>
        {viewAllLabel && viewAllLink && (
          <Link href={viewAllLink} className={`${accentButtonStyles[accentColor]} text-xs py-2 px-5 shrink-0`}>
            {viewAllLabel}
          </Link>
        )}
      </div>
    </div>
  )
}
