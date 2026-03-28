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
  volunteerCount: number
  volunteerCountLabel: string
  rotatingAreaNames: string[]
}

export function VolunteerHero({
  title,
  subtitle,
  volunteerCount,
  volunteerCountLabel,
  rotatingAreaNames,
}: Props) {
  return (
    <div className="panel relative overflow-hidden bg-warm text-warm-foreground py-8 px-6 lg:py-12 lg:px-8">
      <DotGridBackground />
      <FloatingPaws />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        {/* Left: Title + subtitle */}
        <div className="flex-1 min-w-0">
          <AnimatedMegaHeading text={title} tag="h1" enableColorFlash />
          <div className="mt-4 max-w-xl">
            <BlurText
              text={subtitle}
              tag="p"
              className="t-body text-lg text-warm-foreground/80"
              animateBy="words"
              delay={60}
              stepDuration={0.3}
              direction="bottom"
              threshold={0.15}
            />
          </div>
        </div>

        {/* Right: Rotating area names + volunteer count badge */}
        <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
          {rotatingAreaNames.length > 0 && (
            <div className="hidden lg:flex items-center gap-2">
              <span className="t-meta text-warm-foreground/60 uppercase">Alan:</span>
              <RotatingText
                texts={rotatingAreaNames}
                mainClassName="t-h2 text-warm-foreground font-heading uppercase overflow-hidden h-[1.2em]"
                staggerFrom="last"
                staggerDuration={0.025}
                rotationInterval={2500}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              />
            </div>
          )}
          <div className="badge-sys !bg-background !text-foreground !border-foreground inline-flex items-center gap-2 text-sm font-bold">
            <CountUp to={volunteerCount} from={0} duration={2} />
            <span>+ {volunteerCountLabel}</span>
          </div>
        </div>
      </div>

      {/* Decorative bar */}
      <div className="relative z-10 w-24 h-1 bg-background mt-4" />
    </div>
  )
}
