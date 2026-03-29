import { BaseHero } from '@/components/shared/BaseHero'

type Props = {
  title: string
  subtitle: string
  animalsHelpedCount: number
  animalsHelpedLabel: string
  rotatingActivityNames: string[]
}

export function OurWorkHero({
  title,
  subtitle,
  animalsHelpedCount,
  animalsHelpedLabel,
  rotatingActivityNames,
}: Props) {
  return (
    <BaseHero
      title={title}
      subtitle={subtitle}
      colorScheme="health"
      rotatingTexts={rotatingActivityNames}
      rotatingLabel="Alan:"
      statBadges={[{ value: animalsHelpedCount, label: animalsHelpedLabel }]}
      floatingPaws={{ color: 'var(--health-foreground)' }}
    />
  )
}
