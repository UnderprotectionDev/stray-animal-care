import React from 'react'
import { Link } from '@/i18n/navigation'
import { Card } from '@/components/ui/card'
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
    <Card className="p-6 border-secondary/40 bg-secondary/5">
      <div className="flex gap-4">
        <ShieldCheck className="size-8 text-secondary shrink-0 mt-0.5" />
        <div className="space-y-2">
          <h3 className="font-heading font-semibold">{labels.title}</h3>
          <p className="text-sm text-muted-foreground">{labels.description}</p>
          <Link
            href="/posts"
            className="inline-flex items-center text-sm font-medium text-secondary hover:underline"
          >
            {labels.reports} →
          </Link>
        </div>
      </div>
    </Card>
  )
}
