import { BaseHero } from '@/components/shared/BaseHero'

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
  const statBadges: Array<{ value: number; label: string; prefix?: string; isCurrency?: boolean }> = [
    { value: activeCaseCount, label: activeCaseLabel, prefix: '' },
  ]
  if (totalRaised > 0) {
    statBadges.push({ value: totalRaised, label: totalRaisedLabel, isCurrency: true })
  }

  return (
    <BaseHero
      title={title}
      subtitle={subtitle}
      colorScheme="emergency"
      badge={badge}
      rotatingTexts={rotatingNames}
      rotatingLabel={rotatingLabel}
      statBadges={statBadges}
      floatingPaws={{ paws: HERO_PAWS, color: 'var(--emergency-foreground)' }}
    />
  )
}
