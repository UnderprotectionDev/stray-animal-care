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
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <h2 className="font-heading text-xl font-semibold">{labels.title}</h2>
      <dl className="space-y-3 text-sm">
        {bankName && (
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{labels.bank}</dt>
            <dd className="font-medium">{bankName}</dd>
          </div>
        )}
        {accountHolder && (
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{labels.accountHolder}</dt>
            <dd className="font-medium">{accountHolder}</dd>
          </div>
        )}
        <div className="flex items-center justify-between gap-4 rounded-lg bg-muted/50 p-3">
          <div>
            <dt className="text-xs text-muted-foreground mb-1">{labels.iban}</dt>
            <code className="font-mono text-sm font-medium break-all">{iban}</code>
          </div>
          <CopyButton text={iban} label={labels.copy} className="shrink-0" />
        </div>
      </dl>
    </div>
  )
}
