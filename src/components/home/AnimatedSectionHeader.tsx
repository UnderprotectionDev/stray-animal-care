'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import BlurText from '@/components/BlurText'

type Props = {
  title: string | null | undefined
  viewAllLabel?: string | null
  viewAllLink?: string | null
}

export function AnimatedSectionHeader({ title, viewAllLabel, viewAllLink }: Props) {
  return (
    <div className="panel py-4 px-6 flex items-center justify-between border-b-[1.5px] border-border">
      {title ? (
        <BlurText
          text={title}
          tag="h2"
          className="t-h2"
          animateBy="words"
          delay={50}
          stepDuration={0.25}
          direction="top"
          threshold={0.2}
          rootMargin="-50px"
          animationFrom={{ filter: 'blur(8px)', opacity: 0, y: -25 }}
          animationTo={[{ filter: 'blur(0px)', opacity: 1, y: 0 }]}
          easing={[0.25, 0.46, 0.45, 0.94]}
        />
      ) : (
        <h2 className="t-h2" />
      )}
      {viewAllLabel && viewAllLink && (
        <Link href={viewAllLink} className="btn-cta text-xs py-2 px-4">
          {viewAllLabel}
        </Link>
      )}
    </div>
  )
}
