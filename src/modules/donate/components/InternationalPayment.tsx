import React from 'react'
import { ExternalLink } from 'lucide-react'

type InternationalPaymentProps = {
  paypalLink?: string | null
  wiseLink?: string | null
  labels: {
    title: string
    paypal: string
    wise: string
  }
}

export function InternationalPayment({ paypalLink, wiseLink, labels }: InternationalPaymentProps) {
  if (!paypalLink && !wiseLink) return null

  return (
    <div className="border border-border bg-background p-6 space-y-4">
      <h2 className="t-h2 uppercase">{labels.title}</h2>
      <div className="flex flex-wrap gap-3">
        {paypalLink && (
          <a
            href={paypalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-medium uppercase tracking-wide hover:bg-foreground hover:text-background transition-colors"
          >
            <ExternalLink className="size-4" />
            {labels.paypal}
          </a>
        )}
        {wiseLink && (
          <a
            href={wiseLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-medium uppercase tracking-wide hover:bg-foreground hover:text-background transition-colors"
          >
            <ExternalLink className="size-4" />
            {labels.wise}
          </a>
        )}
      </div>
    </div>
  )
}
