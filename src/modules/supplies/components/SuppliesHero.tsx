'use client'

import React from 'react'
import { AnimatedMegaHeading } from '@/components/home/AnimatedMegaHeading'
import BlurText from '@/components/BlurText'
import RotatingText from '@/components/RotatingText'
import CountUp from '@/components/CountUp'
import { DotGridBackground } from '@/components/home/DotGridBackground'
import { FloatingPaws } from '@/components/shared/FloatingPaws'

type Props = {
  title: string
  subtitle: string
  totalItemCount: number
  totalItemLabel: string
  rotatingWords: string[]
  rotatingLabel?: string
}

export function SuppliesHero({
  title,
  subtitle,
  totalItemCount,
  totalItemLabel,
  rotatingWords,
  rotatingLabel = 'İhtiyaç:',
}: Props) {
  return (
    <div className="relative overflow-hidden bg-emergency text-emergency-foreground p-6 py-8 lg:py-12 lg:px-8">
      <DotGridBackground />
      <FloatingPaws color="var(--emergency-foreground)" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        {/* Left: Title + subtitle */}
        <div className="flex-1 min-w-0">
          <AnimatedMegaHeading text={title} tag="h1" enableColorFlash />
          <div className="mt-4 max-w-xl">
            <BlurText
              text={subtitle}
              tag="p"
              className="t-body text-lg text-emergency-foreground/80"
              animateBy="words"
              delay={60}
              stepDuration={0.3}
              direction="bottom"
              threshold={0.15}
            />
          </div>
        </div>

        {/* Right: Rotating words + count badge */}
        <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
          {rotatingWords.length > 0 && (
            <div className="hidden lg:flex items-center gap-2">
              <span className="t-meta text-emergency-foreground/60 uppercase">{rotatingLabel}</span>
              <RotatingText
                texts={rotatingWords}
                mainClassName="t-h2 text-emergency-foreground font-heading uppercase overflow-hidden h-[1.2em]"
                staggerFrom="last"
                staggerDuration={0.025}
                rotationInterval={2500}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              />
            </div>
          )}
          <div className="badge-sys !bg-background !text-foreground !border-foreground inline-flex items-center gap-2 text-sm font-bold">
            <CountUp to={totalItemCount} from={0} duration={2} />
            <span>+ {totalItemLabel}</span>
          </div>
        </div>
      </div>

      {/* Decorative bar */}
      <div className="relative z-10 w-24 h-1 bg-background mt-4" />
    </div>
  )
}
