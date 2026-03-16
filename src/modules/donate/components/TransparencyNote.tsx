import React from 'react'
import { Link } from '@/i18n/navigation'
import { ShieldCheck } from 'lucide-react'

type TransparencyNoteProps = {
  labels: {
    title: string
    description: string
    reports: string
  }
}

export function TransparencyNote({ labels }: TransparencyNoteProps) {
  return (
    <div className="border border-border bg-background p-6">
      <div className="flex gap-4">
        <ShieldCheck className="size-8 text-foreground shrink-0 mt-0.5" />
        <div className="space-y-2">
          <h3 className="t-h2">{labels.title}</h3>
          <p className="t-meta">{labels.description}</p>
          <Link
            href="/seffaflik"
            className="btn-trust inline-block mt-2"
          >
            {labels.reports}
          </Link>
        </div>
      </div>
    </div>
  )
}
