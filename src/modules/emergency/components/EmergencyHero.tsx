'use client'

import React from 'react'
import { AnimatedMegaHeading } from '@/components/home/AnimatedMegaHeading'
import BlurText from '@/components/BlurText'
import RotatingText from '@/components/RotatingText'
import CountUp from '@/components/CountUp'
import { DotGridBackground } from '@/components/home/DotGridBackground'
import { FloatingPaws } from '@/components/shared/FloatingPaws'

const HERO_PAWS = [
  { top: '10%', left: '5%', size: '2.2rem', opacity: 0.08, rotation: -15 },
  { top: '55%', left: '90%', size: '2.8rem', opacity: 0.06, rotation: 20 },
  { top: '25%', right: '8%', size: '1.6rem', opacity: 0.07, rotation: -30 },
  { top: '70%', left: '15%', size: '2rem', opacity: 0.05, rotation: 10 },
]

type Props = {
  title: string
  subtitle: string
  badge: string
  activeCaseCount: number
  activeCaseLabel: string
  totalRaised: number
  totalRaisedLabel: string
  rotatingNames: string[]
  rotatingLabel: string
}

const fmt = (n: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n)

export function EmergencyHero({
  title,
  subtitle,
  badge,
  activeCaseCount,
  activeCaseLabel,
  totalRaised,
  totalRaisedLabel,
  rotatingNames,
  rotatingLabel,
}: Props) {
  return (
    <div className="relative overflow-hidden bg-emergency text-emergency-foreground p-6 py-8 lg:py-12 lg:px-8">
      <DotGridBackground />
      <FloatingPaws paws={HERO_PAWS} color="var(--emergency-foreground)" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        {/* Left: Badge + Title + Subtitle */}
        <div className="flex-1 min-w-0">
          <span className="badge-sys !bg-background !text-foreground !border-foreground inline-block mb-4 rotate-[-2deg]">
            {badge}
          </span>
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

        {/* Right: Rotating names + stats */}
        <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
          {rotatingNames.length > 0 && (
            <div className="hidden lg:flex items-center gap-2">
              <span className="t-meta text-emergency-foreground/60 uppercase">
                {rotatingLabel}
              </span>
              <RotatingText
                texts={rotatingNames}
                mainClassName="t-h2 text-emergency-foreground font-heading uppercase overflow-hidden h-[1.2em]"
                staggerFrom="last"
                staggerDuration={0.025}
                rotationInterval={2500}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              />
            </div>
          )}
          <div className="badge-sys !bg-background !text-foreground !border-foreground inline-flex items-center gap-2 text-sm font-bold">
            <CountUp to={activeCaseCount} from={0} duration={1.5} />
            <span>{activeCaseLabel}</span>
          </div>
          {totalRaised > 0 && (
            <div className="badge-sys !bg-background !text-foreground !border-foreground inline-flex items-center gap-2 text-sm font-bold">
              <span>{fmt(totalRaised)}</span>
              <span>{totalRaisedLabel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Decorative bar */}
      <div className="relative z-10 w-24 h-1 bg-background mt-4" />
    </div>
  )
}
