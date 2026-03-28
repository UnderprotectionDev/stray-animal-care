'use client'

import React from 'react'
import { AnimatedMegaHeading } from '@/components/home/AnimatedMegaHeading'

type BlogPageHeaderProps = {
  title: string
  subtitle?: string
  postCount?: number
}

export function BlogPageHeader({ title, subtitle, postCount }: BlogPageHeaderProps) {
  return (
    <div className="py-2">
      <div className="flex items-end justify-between gap-4">
        <div>
          <AnimatedMegaHeading text={title} tag="h1" enableColorFlash />
          {subtitle && (
            <p className="t-body text-muted-foreground mt-2">{subtitle}</p>
          )}
        </div>
        {typeof postCount === 'number' && (
          <span className="t-meta shrink-0 text-muted-foreground tabular-nums">
            {postCount} yazı
          </span>
        )}
      </div>
    </div>
  )
}
