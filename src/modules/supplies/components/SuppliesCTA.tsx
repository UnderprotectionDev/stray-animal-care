'use client'

import React from 'react'
import { AnimatedMegaHeading } from '@/components/home/AnimatedMegaHeading'
import BlurText from '@/components/BlurText'
import { DotGridBackground } from '@/components/home/DotGridBackground'
import { MagneticTilt } from '@/components/fancy/blocks/MagneticTilt'
import { MovingBorder } from '@/components/fancy/blocks/MovingBorder'
import ElectricBorder from '@/components/ElectricBorder'
import { FloatingPaws } from '@/components/shared/FloatingPaws'
import { Link } from '@/i18n/navigation'

const CTA_PAWS = [
  { top: '12%', left: '6%', size: '2rem', opacity: 0.06, rotation: -20 },
  { top: '60%', left: '88%', size: '2.5rem', opacity: 0.05, rotation: 15 },
  { top: '20%', right: '10%', size: '1.8rem', opacity: 0.07, rotation: -35 },
  { top: '75%', left: '18%', size: '2.2rem', opacity: 0.04, rotation: 25 },
]

type Props = {
  title: string
  description: string
  ctaLabel: string
}

export function SuppliesCTA({ title, description, ctaLabel }: Props) {
  return (
    <ElectricBorder color="#EF303B" speed={0.8} chaos={0.08} borderRadius={0}>
      <div className="bg-warm text-warm-foreground relative overflow-hidden py-10 px-6 lg:py-14 lg:px-8">
        <DotGridBackground />
        <FloatingPaws paws={CTA_PAWS} color="var(--warm-foreground)" />
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
          <AnimatedMegaHeading text={title} tag="h2" enableColorFlash />
          <div className="mt-4 mb-8">
            <BlurText
              text={description}
              tag="p"
              className="t-body text-lg text-warm-foreground/80"
              animateBy="words"
              delay={60}
              stepDuration={0.3}
              direction="bottom"
              threshold={0.3}
            />
          </div>
          <MagneticTilt maxRotation={4}>
            <MovingBorder color="var(--background)" speed={3}>
              <Link
                href="/destek-ol"
                className="!bg-background !text-foreground !rounded-none px-8 py-4 font-bold uppercase text-sm tracking-wider inline-block"
              >
                {ctaLabel}
              </Link>
            </MovingBorder>
          </MagneticTilt>
        </div>
      </div>
    </ElectricBorder>
  )
}
