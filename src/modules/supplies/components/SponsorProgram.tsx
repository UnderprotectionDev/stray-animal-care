import React from 'react'
import { Link } from '@/i18n/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/shared/Heading'
import { Heart } from 'lucide-react'

type SponsorProgramProps = {
  labels: {
    title: string
    description: string
    cta: string
  }
}

export function SponsorProgram({ labels }: SponsorProgramProps) {
  return (
    <Card className="bg-primary/5 border-primary/20 p-6 text-center md:p-8">
      <Heart className="mx-auto mb-4 size-10 text-primary" />
      <Heading as="h2" className="mb-3">
        {labels.title}
      </Heading>
      <p className="text-muted-foreground mx-auto mb-6 max-w-lg">{labels.description}</p>
      <Button render={<Link href="/destek-ol" />} size="lg">
        {labels.cta}
      </Button>
    </Card>
  )
}
