'use client'

import React from 'react'
import dynamic from 'next/dynamic'
const BlurText = dynamic(() => import('@/components/BlurText'), { ssr: false })
const DotGridBackground = dynamic(() => import('@/components/home/DotGridBackground').then(mod => mod.DotGridBackground), { ssr: false })
import { FloatingPaws } from '@/components/shared/FloatingPaws'

type BlogDetailHeroProps = {
  title: string
  excerpt?: string | null
  categoryLabel?: string
  categorySlug?: string | null
  publishedDate?: string | null
  readingTime?: number | null
  authorNames?: string | null
  semanticToken: string
  locale: string
}

export function BlogDetailHero({
  title,
  excerpt,
  categorySlug,
  categoryLabel,
  publishedDate,
  readingTime,
  authorNames,
  semanticToken,
  locale,
}: BlogDetailHeroProps) {
  const isDefaultToken = semanticToken === 'palette-black'
  const bgColor = isDefaultToken ? 'var(--palette-black)' : `var(--${semanticToken})`
  const fgColor = isDefaultToken ? 'var(--palette-cream)' : `var(--${semanticToken}-foreground)`

  return (
    <div
      className="relative overflow-hidden px-4 py-8 md:px-6 md:py-10 lg:px-8"
      style={{ background: bgColor, color: fgColor }}
    >
      <DotGridBackground />
      <FloatingPaws color={fgColor} />

      <div className="relative z-10 mx-auto max-w-3xl flex flex-col gap-3">
        {/* Category + meta row */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono" style={{ opacity: 0.7 }}>
          {categorySlug && (
            <span className="uppercase font-bold tracking-wider">
              {categoryLabel ?? categorySlug}
            </span>
          )}
          {categorySlug && publishedDate && <span>·</span>}
          {publishedDate && <span>{publishedDate}</span>}
          {readingTime && (
            <>
              <span>·</span>
              <span>{readingTime} {locale === 'en' ? 'min read' : 'dk okuma'}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="t-h1 leading-tight">{title}</h1>

        {/* Excerpt */}
        {excerpt && (
          <div className="opacity-75">
            <BlurText
              text={excerpt}
              tag="p"
              className="text-sm md:text-base leading-relaxed"
              animateBy="words"
              delay={40}
              stepDuration={0.25}
              direction="bottom"
              threshold={0.15}
            />
          </div>
        )}

        {/* Author */}
        {authorNames && (
          <p className="text-xs font-mono" style={{ opacity: 0.6 }}>{authorNames}</p>
        )}
      </div>
    </div>
  )
}
