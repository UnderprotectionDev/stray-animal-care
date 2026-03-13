import React from 'react'

type InternationalPaymentProps = {
  labels: {
    title: string
    comingSoon: string
    placeholder: string
  }
}

export function InternationalPayment({ labels }: InternationalPaymentProps) {
  return (
    <div className="bg-foreground text-background p-6 flex flex-col h-full">
      <div className="card-header" style={{ borderBottomColor: 'rgba(255,255,255,0.2)' }}>
        <div className="flex items-center gap-3">
          <h2 className="t-h1">{labels.title}</h2>
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
        </div>
        <span
          className="card-index"
          style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
        >
          2
        </span>
      </div>

      <p className="t-meta mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
        {labels.placeholder}
      </p>
      <div className="flex flex-wrap gap-3 mt-auto">
        <button type="button" disabled className="btn-disabled-intl">
          PayPal
        </button>
        <button type="button" disabled className="btn-disabled-intl">
          Wise
        </button>
      </div>
    </div>
  )
}
