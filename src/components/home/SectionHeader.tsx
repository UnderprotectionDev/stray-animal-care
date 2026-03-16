import React from 'react'
import { Link } from '@/i18n/navigation'

type AccentColor = 'cta' | 'adoption' | 'health' | 'trust' | 'warm' | 'stats' | 'emergency'

const btnClassMap: Record<AccentColor, string> = {
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
}

export function SectionHeader({ title, viewAllLabel, viewAllLink, accentColor = 'cta' }: Props) {
  return (
    <div className="panel py-4 px-6 flex items-center justify-between border-b-[1.5px] border-border">
      <h2 className="t-h2">{title}</h2>
      {viewAllLabel && viewAllLink && (
        <Link href={viewAllLink} className={`${btnClassMap[accentColor]} text-xs py-2 px-4`}>
          {viewAllLabel}
        </Link>
      )}
    </div>
  )
}
