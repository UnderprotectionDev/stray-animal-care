import React from 'react'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'

type VolunteerCardProps = {
  labels: {
    title: string
    description: string
    cta: string
  }
}

export function VolunteerCard({ labels }: VolunteerCardProps) {
  return (
    <div className="bg-background p-6 flex flex-col justify-between h-full">
      <div>
        <div className="card-header">
          <h2 className="t-h1">{labels.title}</h2>
          <span className="card-index">3</span>
        </div>
        <p className="t-body">{labels.description}</p>
      </div>
      <Link href="/gonullu-ol" className="btn-donate-cta mt-6">
        <span>{labels.cta}</span>
        <ArrowRight className="size-5" />
      </Link>
    </div>
  )
}
