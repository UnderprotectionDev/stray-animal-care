import React from 'react'
import { CopyButton } from '@/components/shared/CopyButton'

type BankAccount = {
  id?: string | null
  bankName: string
  accountHolder: string
  iban: string
  currency?: ('TRY' | 'USD' | 'EUR') | null
}

type IBANCopyProps = {
  bankAccounts?: BankAccount[] | null
  labels: {
    title: string
    bank: string
    accountHolder: string
    iban: string
    copy: string
    placeholder?: string
  }
}

export function IBANCopy({ bankAccounts, labels }: IBANCopyProps) {
  const accounts: BankAccount[] = bankAccounts ?? []

  return (
    <div className="bg-background p-6 flex flex-col h-full">
      <div className="card-header">
        <h2 className="t-h1">{labels.title}</h2>
        <span className="card-index">1</span>
      </div>

      {accounts.length === 0 ? (
        <p className="t-meta">{labels.placeholder || 'No bank accounts configured.'}</p>
      ) : (
        <div className="space-y-6 flex-1">
          {accounts.map((account, i) => (
            <div key={account.id || i}>
              {i > 0 && <div className="border-t border-dashed border-border mb-6" />}
              <div className="flex items-center justify-between mb-3">
                <span className="t-body font-medium">{account.bankName}</span>
                {account.currency && (
                  <span className="badge-sys text-xs">{account.currency}</span>
                )}
              </div>
              <div className="flex items-center justify-between gap-3 border border-border bg-palette-dark-cream p-3">
                <code className="font-mono text-sm font-bold break-all">{account.iban}</code>
                <CopyButton text={account.iban} label={labels.copy} className="shrink-0" />
              </div>
              {account.accountHolder && (
                <p className="t-meta mt-2">{labels.accountHolder}: {account.accountHolder}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
