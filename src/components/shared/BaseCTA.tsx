'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Link } from '@/i18n/navigation'
import { MagneticTilt } from '@/components/fancy/blocks/MagneticTilt'
import ElectricBorder from '@/components/ElectricBorder'
import { FloatingPaws, type PawPosition } from '@/components/shared/FloatingPaws'

const AnimatedMegaHeading = dynamic(
  () => import('@/components/home/AnimatedMegaHeading').then((mod) => mod.AnimatedMegaHeading),
  { ssr: false },
)
const BlurText = dynamic(() => import('@/components/BlurText'), { ssr: false })
const DotGridBackground = dynamic(
  () => import('@/components/home/DotGridBackground').then((mod) => mod.DotGridBackground),
  { ssr: false },
)
const MovingBorder = dynamic(
  () => import('@/components/fancy/blocks/MovingBorder').then((mod) => mod.MovingBorder),
  { ssr: false },
)

const DEFAULT_CTA_PAWS: PawPosition[] = [
  { top: '12%', left: '6%', size: '2rem', opacity: 0.06, rotation: -20 },
  { top: '60%', left: '88%', size: '2.5rem', opacity: 0.05, rotation: 15 },
  { top: '20%', right: '10%', size: '1.8rem', opacity: 0.07, rotation: -35 },
  { top: '75%', left: '18%', size: '2.2rem', opacity: 0.04, rotation: 25 },
]

type CTAButton = {
  label: string
  href: string
  variant: 'primary' | 'outline'
}

export type BaseCTAProps = {
  title: string
  description: string
  colorScheme: string
  buttons: CTAButton[]
  paws?: PawPosition[]
  electricBorderColor?: string
}

export function BaseCTA({
  title,
  description,
  colorScheme,
  buttons,
  paws = DEFAULT_CTA_PAWS,
  electricBorderColor = '#EF303B',
}: BaseCTAProps) {
  const bgClass = `bg-${colorScheme}`
  const textClass = `text-${colorScheme}-foreground`
  const subtitleClass = `t-body text-lg text-${colorScheme}-foreground/80`
  const outlineBorderClass = `border-[1.5px] border-${colorScheme}-foreground text-${colorScheme}-foreground`

  return (
    <ElectricBorder color={electricBorderColor} speed={0.8} chaos={0.08} borderRadius={0}>
      <div className={`${bgClass} ${textClass} relative overflow-hidden py-10 px-6 lg:py-14 lg:px-8`}>
        <DotGridBackground />
        <FloatingPaws paws={paws} color={`var(--${colorScheme}-foreground)`} />
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
          <AnimatedMegaHeading text={title} tag="h2" enableColorFlash />
          <div className="mt-4 mb-8">
            <BlurText
              text={description}
              tag="p"
              className={subtitleClass}
              animateBy="words"
              delay={60}
              stepDuration={0.3}
              direction="bottom"
              threshold={0.3}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {buttons.map((btn) =>
              btn.variant === 'primary' ? (
                <MagneticTilt key={btn.href} maxRotation={4}>
                  <MovingBorder color="var(--background)" speed={3}>
                    <Link
                      href={btn.href}
                      className="!bg-background !text-foreground !rounded-none px-8 py-4 font-bold uppercase text-sm tracking-wider inline-block"
                    >
                      {btn.label}
                    </Link>
                  </MovingBorder>
                </MagneticTilt>
              ) : (
                <Link
                  key={btn.href}
                  href={btn.href}
                  className={`${outlineBorderClass} px-8 py-4 font-bold uppercase text-sm tracking-wider inline-block hover:bg-${colorScheme}-foreground/10 transition-colors`}
                >
                  {btn.label}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </ElectricBorder>
  )
}
