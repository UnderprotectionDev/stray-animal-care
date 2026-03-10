import React from 'react'
import { Button } from '@/components/ui/button'
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
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <h2 className="font-heading text-xl font-semibold">{labels.title}</h2>
      <div className="flex flex-wrap gap-3">
        {paypalLink && (
          <Button
            variant="outline"
            render={<a href={paypalLink} target="_blank" rel="noopener noreferrer" />}
          >
            <ExternalLink className="size-4" />
            {labels.paypal}
          </Button>
        )}
        {wiseLink && (
          <Button
            variant="outline"
            render={<a href={wiseLink} target="_blank" rel="noopener noreferrer" />}
          >
            <ExternalLink className="size-4" />
            {labels.wise}
          </Button>
        )}
      </div>
    </div>
  )
}
