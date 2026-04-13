import React from 'react'
import type { SiteSetting, TransparencyReport } from '@/payload-types'
import type { TransparencyStats } from './RenderHomepageBlocks'
import { Link } from '@/i18n/navigation'
import { AnimatedMegaHeading } from './AnimatedMegaHeading'
import { CountUpCurrency } from './CountUpCurrency'
import { CountUpNumber } from './CountUpNumber'
import { Heart, TrendingDown, Users } from 'lucide-react'

type TransparencyBannerBlock = Extract<
  NonNullable<SiteSetting['homepageBlocks']>[number],
  { blockType: 'homeTransparencyBanner' }
>

type Props = {
  block: TransparencyBannerBlock
  report: TransparencyReport | null
  transparencyStats?: TransparencyStats
  locale: string
}

export function TransparencyBanner({ block, report, transparencyStats, locale }: Props) {
  return (
    <section>
      <div className="bg-foreground py-5 px-6 lg:px-8 border-b-[1.5px] border-background/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <AnimatedMegaHeading text={block.title || ''} style={{ color: 'var(--background)' }} />
            <div className="w-24 h-1 mt-3" style={{ background: 'var(--trust)' }} />
            {block.description && (
              <p className="t-meta text-background/70 mt-2">{block.description}</p>
            )}
          </div>
          {block.ctaLabel && block.ctaLink && (
            <Link
              href={block.ctaLink}
              className="btn-stats text-xs py-2 px-5 self-start sm:self-auto"
            >
              {block.ctaLabel}
            </Link>
          )}
        </div>
      </div>

      {(transparencyStats || report) && (
        <div
          className="grid grid-cols-1 lg:grid-cols-3"
          style={{ gap: '1.5px', background: 'var(--palette-black)' }}
        >
          <div className="bg-foreground text-background py-8 lg:py-12 p-6 lg:p-8 flex flex-col justify-end">
            <p className="t-mega text-health">
              <CountUpCurrency
                value={transparencyStats?.totalIncome ?? report?.totalDonation ?? 0}
              />
            </p>
            <div className="border-t border-background/20 mt-4 pt-4 flex items-center justify-between">
              <p className="font-heading font-bold uppercase tracking-wider text-sm">
                {locale === 'en' ? 'TOTAL INCOME' : 'TOPLAM GELİR'}
              </p>
              <Heart className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-foreground text-background py-8 lg:py-12 p-6 lg:p-8 flex flex-col justify-end">
            <p className="t-mega text-emergency">
              <CountUpCurrency
                value={transparencyStats?.totalExpense ?? report?.totalExpense ?? 0}
              />
            </p>
            <div className="border-t border-background/20 mt-4 pt-4 flex items-center justify-between">
              <p className="font-heading font-bold uppercase tracking-wider text-sm">
                {locale === 'en' ? 'TOTAL EXPENSE' : 'TOPLAM GİDER'}
              </p>
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-foreground text-background py-8 lg:py-12 p-6 lg:p-8 flex flex-col justify-end">
            <p className="t-mega text-background">
              <CountUpNumber
                target={transparencyStats?.totalDonors ?? report?.donorList?.length ?? 0}
              />
            </p>
            <div className="border-t border-background/20 mt-4 pt-4 flex items-center justify-between">
              <p className="font-heading font-bold uppercase tracking-wider text-sm">
                {locale === 'en' ? 'TOTAL DONORS' : 'TOPLAM BAĞIŞÇI'}
              </p>
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
