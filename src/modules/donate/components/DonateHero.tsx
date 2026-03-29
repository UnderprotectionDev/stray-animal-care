import { BaseHero } from '@/components/shared/BaseHero'

type Props = {
  title: string
  subtitle: string
  badge: string
  treatedCount: number
  treatedLabel: string
  rotatingTexts: string[]
  rotatingLabel: string
}

export function DonateHero({
  title,
  subtitle,
  badge,
  treatedCount,
  treatedLabel,
  rotatingTexts,
  rotatingLabel,
}: Props) {
  return (
    <BaseHero
      title={title}
      subtitle={subtitle}
      colorScheme="cta"
      badge={badge}
      rotatingTexts={rotatingTexts}
      rotatingLabel={rotatingLabel}
      statBadges={[{ value: treatedCount, label: treatedLabel }]}
      floatingPaws={{ color: 'var(--cta-foreground)' }}
    />
  )
}
