import React from 'react'
import { Link } from '@/i18n/navigation'
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
    <div className="border border-border bg-background p-6 text-center md:p-8">
      <Heart className="mx-auto mb-4 size-10 text-foreground" />
      <h2 className="t-h1 mb-3">{labels.title}</h2>
      <p className="t-meta mx-auto mb-6 max-w-lg">{labels.description}</p>
      <Link href="/destek-ol" className="btn-health inline-block">
        {labels.cta}
      </Link>
    </div>
  )
}
