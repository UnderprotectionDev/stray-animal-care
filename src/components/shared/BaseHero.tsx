'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const AnimatedMegaHeading = dynamic(
  () => import('@/components/home/AnimatedMegaHeading').then((mod) => mod.AnimatedMegaHeading),
  { ssr: false },
)
import RotatingText from '@/components/RotatingText'

const BlurText = dynamic(() => import('@/components/BlurText'), { ssr: false })
const CountUp = dynamic(() => import('@/components/CountUp'), { ssr: false })
const DotGridBackground = dynamic(
  () => import('@/components/home/DotGridBackground').then((mod) => mod.DotGridBackground),
  { ssr: false },
)
import { FloatingPaws, type PawPosition } from '@/components/shared/FloatingPaws'

type StatBadge = {
  value: number
  label: string
  /** Prefix shown between the count and the label, e.g. "+" */
  prefix?: string
  /** Render value as currency (TRY) instead of plain number */
  isCurrency?: boolean
}

type FloatingPawsConfig =
  | { color?: string; paws?: undefined }
  | { paws: PawPosition[]; color: string }

export type BaseHeroProps = {
  /** Page title rendered with AnimatedMegaHeading */
  title: string
  /** Subtitle rendered with BlurText */
  subtitle: string
  /** Background color scheme — maps to Tailwind semantic classes like bg-{colorScheme} */
  colorScheme: string
  /** Optional badge text shown above the title */
  badge?: string
  /** Rotating text items shown on the right side (desktop) */
  rotatingTexts?: string[]
  /** Label next to the rotating text (e.g. "Alan:", "İhtiyaç:") */
  rotatingLabel?: string
  /** Stat badges shown on the right side */
  statBadges?: StatBadge[]
  /** FloatingPaws configuration */
  floatingPaws?: FloatingPawsConfig
  /** Additional class on the root element (e.g. "panel") */
  className?: string
}

const fmtCurrency = (n: number) =>
  new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(n)

export function BaseHero({
  title,
  subtitle,
  colorScheme,
  badge,
  rotatingTexts = [],
  rotatingLabel,
  statBadges = [],
  floatingPaws,
  className,
}: BaseHeroProps) {
  const bgClass = `bg-${colorScheme}`
  const textClass = `text-${colorScheme}-foreground`
  const subtitleClass = `t-body text-lg text-${colorScheme}-foreground/80`
  const metaClass = `t-meta text-${colorScheme}-foreground/60 uppercase`
  const rotatingClass = `t-h2 text-${colorScheme}-foreground font-heading uppercase overflow-hidden h-[1.2em]`

  return (
    <div
      className={`relative overflow-hidden ${bgClass} ${textClass} p-6 py-8 lg:py-12 lg:px-8 ${className ?? ''}`}
    >
      <DotGridBackground />
      {floatingPaws?.paws ? (
        <FloatingPaws paws={floatingPaws.paws} color={floatingPaws.color} />
      ) : (
        <FloatingPaws color={floatingPaws?.color} />
      )}

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        {/* Left: Badge + Title + Subtitle */}
        <div className="flex-1 min-w-0">
          {badge && (
            <span className="badge-sys !bg-background !text-foreground !border-foreground inline-block mb-4 rotate-[-2deg]">
              {badge}
            </span>
          )}
          <AnimatedMegaHeading text={title} tag="h1" enableColorFlash />
          <div className="mt-4 max-w-xl">
            <BlurText
              text={subtitle}
              tag="p"
              className={subtitleClass}
              animateBy="words"
              delay={60}
              stepDuration={0.3}
              direction="bottom"
              threshold={0.15}
            />
          </div>
        </div>

        {/* Right: Rotating text + stat badges */}
        <div className="flex flex-col items-start lg:items-end gap-4 shrink-0">
          {rotatingTexts.length > 0 && (
            <div className="hidden lg:flex items-center gap-2">
              {rotatingLabel && <span className={metaClass}>{rotatingLabel}</span>}
              <RotatingText
                texts={rotatingTexts}
                mainClassName={rotatingClass}
                staggerFrom="last"
                staggerDuration={0.025}
                rotationInterval={2500}
                transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              />
            </div>
          )}
          {statBadges.map((sb, i) => (
            <div
              key={i}
              className="badge-sys !bg-background !text-foreground !border-foreground inline-flex items-center gap-2 text-sm font-bold"
            >
              {sb.isCurrency ? (
                <span>{fmtCurrency(sb.value)}</span>
              ) : (
                <CountUp to={sb.value} from={0} duration={2} />
              )}
              <span>
                {sb.prefix ?? '+'} {sb.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative bar */}
      <div className="relative z-10 w-24 h-1 bg-background mt-4" />
    </div>
  )
}
