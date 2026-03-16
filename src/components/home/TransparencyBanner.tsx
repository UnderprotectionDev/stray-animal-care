import React from 'react'
import type { SiteSetting, TransparencyReport } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import BlurText from '@/components/BlurText'
import { CountUpCurrency } from './CountUpCurrency'
import { CountUpNumber } from './CountUpNumber'

type TransparencyBannerBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeTransparencyBanner' }>

type Props = {
  block: TransparencyBannerBlock
  report: TransparencyReport | null
  locale: string
}

function formatMonth(month: string, locale: string): string {
  const date = new Date(month + '-01')
  return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', { month: 'long', year: 'numeric' })
}

export function TransparencyBanner({ block, report, locale }: Props) {
  return (
    <section>
      <div className="panel py-6 px-6 bg-trust text-trust-foreground">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <BlurText text={block.title || ''} tag="h2" className="t-h2" animateBy="words" delay={50} stepDuration={0.25} />
            {block.description && (
              <p className="t-meta text-muted-foreground mt-1">{block.description}</p>
            )}
          </div>
          {block.ctaLabel && block.ctaLink && (
            <Link href={block.ctaLink} className="btn-trust text-xs py-2 px-4 shrink-0">
              {block.ctaLabel}
            </Link>
          )}
        </div>

        {report && (
          <>
            <div className="g-1 md:g-3 mt-4">
              <div className="panel p-4 bg-background">
                <p className="t-meta text-muted-foreground uppercase text-xs">
                  {locale === 'en' ? 'Total Income' : 'Toplam Gelir'}
                </p>
                <p className="t-h2 mt-1">
                  <CountUpCurrency value={report.totalDonation} />
                </p>
              </div>
              <div className="panel p-4 bg-background">
                <p className="t-meta text-muted-foreground uppercase text-xs">
                  {locale === 'en' ? 'Total Expense' : 'Toplam Gider'}
                </p>
                <p className="t-h2 mt-1">
                  <CountUpCurrency value={report.totalExpense} />
                </p>
              </div>
              <div className="panel p-4 bg-background">
                <p className="t-meta text-muted-foreground uppercase text-xs">
                  {locale === 'en' ? 'Donor Count' : 'Bağışçı Sayısı'}
                </p>
                <p className="t-h2 mt-1">
                  <CountUpNumber target={report.donorList?.length ?? 0} />
                </p>
              </div>
            </div>
            <p className="t-meta text-muted-foreground mt-3 text-xs">
              {locale === 'en' ? 'Latest report: ' : 'Son rapor: '}
              {formatMonth(report.month, locale)}
            </p>
          </>
        )}
      </div>
    </section>
  )
}
