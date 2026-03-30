'use client'

import { useRef } from 'react'
import VariableProximity from '@/components/VariableProximity'
import { HeroRotatingSubtitle } from './HeroRotatingSubtitle'

type Props = {
  sectionTitle?: string | null
  tagline?: string | null
  rotatingWords?: string[]
}

export function HomeHeroClient({ sectionTitle, tagline, rotatingWords }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative z-10 flex flex-col items-center px-6 pt-6 pb-0 md:px-12 md:pt-10 lg:pt-12">
      {sectionTitle && (
        <VariableProximity
          label={sectionTitle}
          fromFontVariationSettings="'wght' 100"
          toFontVariationSettings="'wght' 900"
          containerRef={containerRef}
          radius={120}
          falloff="gaussian"
          className="text-center leading-[0.95] tracking-tight text-foreground"
          style={{
            fontFamily: 'var(--font-hero-variable)',
            fontSize: 'clamp(2rem, 5.5vw, 4rem)',
          }}
        />
      )}

      {rotatingWords && rotatingWords.length > 0 && (
        <div className="mt-3" style={{ fontFamily: 'var(--font-hero-variable)' }}>
          <HeroRotatingSubtitle texts={rotatingWords} className="text-center text-cta" />
        </div>
      )}

      {tagline && (
        <p
          className="mt-3 text-center text-warm-gray max-w-xl text-xs md:text-sm leading-relaxed tracking-wide"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {tagline}
        </p>
      )}
    </div>
  )
}
