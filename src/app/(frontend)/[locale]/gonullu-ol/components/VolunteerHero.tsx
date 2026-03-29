import { BaseHero } from '@/components/shared/BaseHero'

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
    <BaseHero
      title={title}
      subtitle={subtitle}
      colorScheme="warm"
      rotatingTexts={rotatingAreaNames}
      rotatingLabel="Alan:"
      statBadges={[{ value: volunteerCount, label: volunteerCountLabel }]}
      className="panel"
    />
  )
}
