import React from 'react'
import { CopyButton } from '@/components/shared/CopyButton'

type IBANCopyProps = {
  bankName?: string | null
  accountHolder?: string | null
  iban?: string | null
  labels: {
    title: string
    bank: string
    accountHolder: string
    iban: string
    copy: string
  }
}

export function IBANCopy({ bankName, accountHolder, iban, labels }: IBANCopyProps) {
  if (!iban) return null

  return (
    <div className="border border-border bg-background p-6 space-y-4">
      <h2 className="t-h2 uppercase">{labels.title}</h2>
      <dl className="space-y-3 t-body">
        {bankName && (
          <div className="flex justify-between border-b border-border pb-2">
            <dt className="t-meta">{labels.bank}</dt>
            <dd className="font-medium">{bankName}</dd>
          </div>
        )}
        {accountHolder && (
          <div className="flex justify-between border-b border-border pb-2">
            <dt className="t-meta">{labels.accountHolder}</dt>
            <dd className="font-medium">{accountHolder}</dd>
          </div>
        )}
        <div className="flex items-center justify-between gap-4 border border-border bg-muted p-3">
          <div>
            <dt className="t-meta mb-1">{labels.iban}</dt>
            <code className="font-mono text-sm font-medium break-all">{iban}</code>
          </div>
          <CopyButton text={iban} label={labels.copy} className="shrink-0" />
        </div>
      </dl>
    </div>
  )
}
