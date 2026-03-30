import React from 'react'
import type { SiteSetting, TransparencyReport } from '@/payload-types'
import type { TransparencyStats } from './RenderHomepageBlocks'
import { Link } from '@/i18n/navigation'
import BlurText from '@/components/BlurText'
import { CountUpCurrency } from './CountUpCurrency'
import { CountUpNumber } from './CountUpNumber'
import { formatMonth } from '@/utilities/formatDate'

type TransparencyBannerBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeTransparencyBanner' }>

type Props = {
  block: TransparencyBannerBlock
  report: TransparencyReport | null
  transparencyStats?: TransparencyStats
  locale: string
}

export function TransparencyBanner({ block, report, transparencyStats, locale }: Props) {
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

        {(transparencyStats || report) && (
          <>
            <div className="g-1 md:g-3 mt-4">
              <div className="panel p-4 bg-background">
                <p className="t-meta text-muted-foreground uppercase text-xs">
                  {locale === 'en' ? 'Total Income' : 'Toplam Gelir'}
                </p>
                <p className="t-h2 mt-1">
                  <CountUpCurrency value={transparencyStats?.totalIncome ?? report?.totalDonation ?? 0} />
                </p>
              </div>
              <div className="panel p-4 bg-background">
                <p className="t-meta text-muted-foreground uppercase text-xs">
                  {locale === 'en' ? 'Total Expense' : 'Toplam Gider'}
                </p>
                <p className="t-h2 mt-1">
                  <CountUpCurrency value={transparencyStats?.totalExpense ?? report?.totalExpense ?? 0} />
                </p>
              </div>
              <div className="panel p-4 bg-background">
                <p className="t-meta text-muted-foreground uppercase text-xs">
                  {locale === 'en' ? 'Total Donors' : 'Toplam Bağışçı'}
                </p>
                <p className="t-h2 mt-1">
                  <CountUpNumber target={transparencyStats?.totalDonors ?? report?.donorList?.length ?? 0} />
                </p>
              </div>
            </div>
            {report && (
              <p className="t-meta text-muted-foreground mt-3 text-xs">
                {locale === 'en' ? 'Latest report: ' : 'Son rapor: '}
                {formatMonth(report.month, locale)}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
