import { BaseCTA } from '@/components/shared/BaseCTA'

type Props = {
  title: string
  description: string
  ctaLabel: string
}

export function SuppliesCTA({ title, description, ctaLabel }: Props) {
  return (
    <BaseCTA
      title={title}
      description={description}
      colorScheme="warm"
      buttons={[{ label: ctaLabel, href: '/destek-ol', variant: 'primary' }]}
    />
  )
}
