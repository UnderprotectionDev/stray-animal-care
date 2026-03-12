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

  return (
    <section>
      <div className="panel py-4 px-6 border-b border-border">
        <h2 className="t-h2">{t('title')}</h2>
      </div>
      <div className="g-1 md:g-4">
        {/* IBAN */}
        <div className="panel space-y-3">
          <h3 className="t-meta font-bold uppercase tracking-wider">{t('iban')}</h3>
          {siteSettings.bankName && (
            <p className="t-meta text-muted-foreground">{siteSettings.bankName}</p>
          )}
          {siteSettings.accountHolder && (
            <p className="t-meta font-bold">{siteSettings.accountHolder}</p>
          )}
          {siteSettings.iban && (
            <div className="flex items-center gap-2 border border-border p-3">
              <code className="text-xs font-mono break-all flex-1">{siteSettings.iban}</code>
              <CopyButton text={siteSettings.iban} label={t('iban')} className="shrink-0" />
            </div>
          )}
        </div>

        {/* International */}
        <div className="panel space-y-3">
          <h3 className="t-meta font-bold uppercase tracking-wider">{t('international')}</h3>
          <div className="flex flex-col gap-2">
            {siteSettings.paypalLink && (
              <a
                href={siteSettings.paypalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta text-xs py-2 justify-start"
              >
                PayPal →
              </a>
            )}
            {siteSettings.wiseLink && (
              <a
                href={siteSettings.wiseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta text-xs py-2 justify-start"
              >
                Wise →
              </a>
            )}
          </div>
        </div>

        {/* Supplies */}
        <div className="panel space-y-3">
          <h3 className="t-meta font-bold uppercase tracking-wider">{t('supplies')}</h3>
          <p className="t-meta text-muted-foreground">{t('suppliesPlaceholder')}</p>
          <Link href="/ihtiyac-listesi" className="btn-cta text-xs py-2 inline-flex">
            {t('supplies')} →
          </Link>
        </div>

        {/* Volunteer */}
        <div className="panel space-y-3">
          <h3 className="t-meta font-bold uppercase tracking-wider">{t('volunteer')}</h3>
          {siteSettings.whatsapp && (
            <WhatsAppButton phone={siteSettings.whatsapp}>
              {t('volunteer')}
            </WhatsAppButton>
          )}
        </div>
      </div>
    </section>
  )
}
