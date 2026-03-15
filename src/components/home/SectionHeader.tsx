import React from 'react'
import { Link } from '@/i18n/navigation'

type Props = {
  title: string | null | undefined
  viewAllLabel?: string | null
  viewAllLink?: string | null
}

export function SectionHeader({ title, viewAllLabel, viewAllLink }: Props) {
  return (
    <div className="panel py-4 px-6 flex items-center justify-between border-b-[1.5px] border-border">
      <div>
        <span className="t-comment mb-1 block">{title}</span>
        <h2 className="t-h2">{title}</h2>
      </div>
      {viewAllLabel && viewAllLink && (
        <Link href={viewAllLink} className="btn-cta text-xs py-2 px-4">
          {viewAllLabel}
        </Link>
      )}
    </div>
  )
}
