import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { SiteSetting } from '@/payload-types'
import { CopyButton } from '@/components/shared/CopyButton'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { Link } from '@/i18n/navigation'

type SupportCardsProps = {
  siteSettings: SiteSetting
}

export async function SupportCards({ siteSettings }: SupportCardsProps) {
  const t = await getTranslations('home.support')

  // Build bank accounts array — prefer new array field, fallback to legacy single fields
  const bankAccounts =
    siteSettings.bankAccounts && siteSettings.bankAccounts.length > 0
      ? siteSettings.bankAccounts
      : siteSettings.iban
        ? [
            {
              id: 'legacy',
              bankName: siteSettings.bankName || '',
              accountHolder: siteSettings.accountHolder || '',
              iban: siteSettings.iban,
              currency: 'TRY' as const,
            },
          ]
        : []

  return (
    <section>
      {/* Hero title */}
      <div className="panel py-6 px-6 border-b border-border">
        <h2 className="t-mega uppercase">{t('slogan')}</h2>
      </div>

      {/* IBAN Card — full width */}
      <div className="panel border-b border-border">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="t-h2 uppercase">{t('iban')}</h3>
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
                    label={t('copy')}
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
              {t('ibanPlaceholder')}
            </p>
            <Link href="/destek-ol" className="btn-cta inline-flex mt-4 text-sm">
              {t('iban')} →
            </Link>
          </div>
        )}
      </div>

      {/* Bottom row: International + Volunteer */}
      <div className="g-1 md:g-2">
        {/* International — muted bg */}
        <div className="panel !bg-muted">
          <div className="flex items-center justify-between mb-4">
            <h3 className="t-h2 uppercase">{t('international')}</h3>
            <span className="badge-sys">{t('comingSoon')}</span>
          </div>
          <p className="t-meta text-muted-foreground">
            {t('internationalPlaceholder')}
          </p>
        </div>

        {/* Volunteer — black bg */}
        <div className="panel !bg-black text-white">
          <h3 className="t-h2 uppercase mb-4">{t('volunteer')}</h3>
          <p className="t-body text-white/70 mb-4">
            {t('volunteerDescription')}
          </p>
          {siteSettings.whatsapp ? (
            <WhatsAppButton
              phone={siteSettings.whatsapp}
              className="!bg-[var(--accent)] !text-black !rounded-none w-fit font-bold uppercase text-sm tracking-wider"
            >
              WHATSAPP →
            </WhatsAppButton>
          ) : (
            <Link
              href="/gonullu-ol"
              className="inline-flex items-center bg-[var(--accent)] text-black px-4 py-2.5 text-sm font-bold uppercase tracking-wider"
            >
              {t('volunteer')} →
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
