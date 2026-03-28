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
    <div ref={containerRef} className="relative z-10 flex flex-col items-center justify-center px-6 py-14 md:px-12 md:py-20 lg:py-24">
      {sectionTitle && (
        <VariableProximity
          label={sectionTitle}
          fromFontVariationSettings="'wght' 100"
          toFontVariationSettings="'wght' 900"
          containerRef={containerRef}
          radius={120}
          falloff="gaussian"
          className="text-center leading-[0.95] tracking-tight text-white drop-shadow-lg"
          style={{
            fontFamily: 'var(--font-hero-variable)',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          }}
        />
      )}

      {rotatingWords && rotatingWords.length > 0 && (
        <div className="mt-5" style={{ fontFamily: 'var(--font-hero-variable)' }}>
          <HeroRotatingSubtitle texts={rotatingWords} className="text-center text-white/80" />
        </div>
      )}

      {tagline && (
        <p
          className="mt-6 text-center text-white/70 max-w-xl text-sm md:text-base leading-relaxed tracking-wide"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {tagline}
        </p>
      )}
    </div>
  )
}
