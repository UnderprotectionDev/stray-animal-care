import { BaseCTA } from '@/components/shared/BaseCTA'

type Props = {
  title: string
  description: string
  donateLabel: string
  volunteerLabel: string
}

export function OurWorkCTA({ title, description, donateLabel, volunteerLabel }: Props) {
  return (
    <BaseCTA
      title={title}
      description={description}
      colorScheme="cta"
      buttons={[
        { label: donateLabel, href: '/destek-ol', variant: 'primary' },
        { label: volunteerLabel, href: '/gonullu-ol', variant: 'outline' },
      ]}
    />
  )
}
