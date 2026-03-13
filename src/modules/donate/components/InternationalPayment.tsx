import React from 'react'
import { ArrowUpRight } from 'lucide-react'

type InternationalPaymentProps = {
  paypalLink?: string | null
  wiseLink?: string | null
  labels: {
    title: string
    paypal: string
    wise: string
    comingSoon: string
    placeholder: string
  }
}

export function InternationalPayment({ paypalLink, wiseLink, labels }: InternationalPaymentProps) {
  const hasLinks = paypalLink || wiseLink

  return (
    <div className="bg-foreground text-background p-6 flex flex-col h-full">
      <div className="card-header" style={{ borderBottomColor: 'rgba(255,255,255,0.2)' }}>
        <div className="flex items-center gap-3">
          <h2 className="t-h1">{labels.title}</h2>
          {!hasLinks && (
            <span
              className="badge-sys"
              style={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: '#fff',
                background: 'transparent',
              }}
            >
              {labels.comingSoon}
            </span>
          )}
        </div>
        <span
          className="card-index"
          style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
        >
          2
        </span>
      </div>

      {hasLinks ? (
        <div className="flex flex-col gap-3 mt-4 flex-1 justify-center">
          {paypalLink && (
            <a
              href={paypalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-white/30 px-4 py-3 text-sm font-mono uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              <span>{labels.paypal}</span>
              <ArrowUpRight className="size-4" />
            </a>
          )}
          {wiseLink && (
            <a
              href={wiseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-white/30 px-4 py-3 text-sm font-mono uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              <span>{labels.wise}</span>
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      ) : (
        <>
          <p className="t-meta mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {labels.placeholder}
          </p>
          <div className="flex flex-wrap gap-3 mt-auto">
            <button type="button" disabled className="btn-disabled-intl">
              {labels.paypal}
            </button>
            <button type="button" disabled className="btn-disabled-intl">
              {labels.wise}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
