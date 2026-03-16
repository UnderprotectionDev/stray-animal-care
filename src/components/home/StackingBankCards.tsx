'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { CopyButton } from '@/components/shared/CopyButton'

type BankAccount = {
  id?: string | null
  bankName: string
  iban: string
  currency?: string | null
  accountHolder?: string | null
}

type Labels = {
  copy?: string | null
  ibanPlaceholder?: string | null
}

type Props = {
  accounts: BankAccount[]
  labels: Labels
}

const SCALE_MULTIPLIER = 0.04

function BankCardItem({
  account,
  index,
  totalCards,
  labels,
}: {
  account: BankAccount
  index: number
  totalCards: number
  labels: Labels
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  })

  const scaleTo = 1 - (totalCards - index) * SCALE_MULTIPLIER
  const scale = useTransform(scrollYProgress, [0, 1], [1, scaleTo])

  return (
    <div
      ref={cardRef}
      className="sticky top-0 pt-[calc(var(--card-index)*2rem)]"
      style={{ '--card-index': index } as React.CSSProperties}
    >
      <motion.div style={{ scale, transformOrigin: 'top center' }}>
        <div className="border-[1.5px] border-[var(--border)] bg-[var(--cream)] overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 bg-cta" />

          <div className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="t-meta font-bold font-heading text-lg uppercase">
                {account.bankName}
              </span>
              <span className="badge-sys">{account.currency || 'TRY'}</span>
            </div>

            <div className="flex items-center gap-3 bg-palette-dark-cream border-[1.5px] border-border p-3">
              <code className="font-mono text-sm break-all flex-1">{account.iban}</code>
              <CopyButton
                text={account.iban}
                label={labels.copy || 'Copy'}
                className="shrink-0"
              />
            </div>

            {account.accountHolder && (
              <p className="t-meta text-muted-foreground">{account.accountHolder}</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function StackingBankCards({ accounts, labels }: Props) {
  if (accounts.length === 0) return null

  return (
    <div className="relative">
      {accounts.map((account, index) => (
        <BankCardItem
          key={account.id || index}
          account={account}
          index={index}
          totalCards={accounts.length}
          labels={labels}
        />
      ))}
    </div>
  )
}
