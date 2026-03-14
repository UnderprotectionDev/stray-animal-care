import React from 'react'
import type { SiteSetting } from '@/payload-types'
import { CopyButton } from '@/components/shared/CopyButton'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { Link } from '@/i18n/navigation'
import { getSocialLink } from '@/utilities/socialLinks'

type SupportCardsBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeSupportCards' }>

type Props = {
  block: SupportCardsBlock
  siteSettings: SiteSetting | null
}

export function SupportCards({ block, siteSettings }: Props) {
  const labels = block.labels ?? {}

  const bankAccounts = siteSettings?.bankAccounts ?? []

  return (
    <section>
      <div className="panel py-6 px-6 border-b border-border">
        <h2 className="t-mega uppercase">{block.slogan}</h2>
      </div>

      <div className="panel border-b border-border">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="t-h2 uppercase">{block.ibanTitle}</h3>
        </div>
        {bankAccounts.length > 0 ? (
          <div className="divide-y divide-border">
            {bankAccounts.map((account) => (
              <div key={account.id} className="px-6 py-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="t-meta font-bold">{account.bankName}</span>
                  <span className="badge-sys">{account.currency || 'TRY'}</span>
                </div>
                <div className="flex items-center gap-3 bg-[var(--accent)] border border-border p-3">
                  <code className="font-mono text-sm break-all flex-1">
                    {account.iban}
                  </code>
                  <CopyButton
                    text={account.iban}
                    label={labels.copy || 'Copy'}
                    className="shrink-0"
                  />
                </div>
                {account.accountHolder && (
                  <p className="t-meta text-muted-foreground">
                    {account.accountHolder}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-8 text-center">
            <p className="t-meta text-muted-foreground">
              {labels.ibanPlaceholder || 'Banka hesap bilgileri yakında eklenecek.'}
            </p>
            <Link href="/destek-ol" className="btn-cta inline-flex mt-4 text-sm">
              {block.ibanTitle} →
            </Link>
          </div>
        )}
      </div>

      <div className="g-1 md:g-2">
        <div className="panel !bg-muted">
          <div className="flex items-center justify-between mb-4">
            <h3 className="t-h2 uppercase">{block.internationalTitle}</h3>
            <span className="badge-sys">{labels.comingSoon || 'YAKINDA'}</span>
          </div>
          <p className="t-meta text-muted-foreground">
            {block.internationalPlaceholder}
          </p>
        </div>

        <div className="panel !bg-black text-white">
          <h3 className="t-h2 uppercase mb-4">{block.volunteerTitle}</h3>
          <p className="t-body text-white/70 mb-4">
            {block.volunteerDescription}
          </p>
          {(() => {
            const wa = getSocialLink(siteSettings?.socialLinks, 'whatsapp')
            return wa ? (
              <WhatsAppButton
                phone={wa.url}
                className="!bg-[var(--accent)] !text-black !rounded-none w-fit font-bold uppercase text-sm tracking-wider"
              >
                WHATSAPP →
              </WhatsAppButton>
            ) : (
              <Link
                href="/gonullu-ol"
                className="inline-flex items-center bg-[var(--accent)] text-black px-4 py-2.5 text-sm font-bold uppercase tracking-wider"
              >
                {block.volunteerTitle} →
              </Link>
            )
          })()}
        </div>
      </div>
    </section>
  )
}
