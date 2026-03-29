import { BaseHero } from '@/components/shared/BaseHero'

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
    <BaseHero
      title={title}
      subtitle={subtitle}
      colorScheme="emergency"
      rotatingTexts={rotatingWords}
      rotatingLabel={rotatingLabel}
      statBadges={[{ value: totalItemCount, label: totalItemLabel }]}
      floatingPaws={{ color: 'var(--emergency-foreground)' }}
    />
  )
}
