'use client'

import React from 'react'
import type { SiteSetting } from '@/payload-types'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { Link } from '@/i18n/navigation'
import { getSocialLink } from '@/utilities/socialLinks'
import TextHighlighter from '@/components/TextHighlighter'
import StackingBankCards from './StackingBankCards'
import BlurText from '@/components/BlurText'

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
        {block.slogan ? (
          <TextHighlighter
            highlightColor="var(--cta)"
            triggerType="inView"
            direction="ltr"
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            useInViewOptions={{ once: true, amount: 0.3 }}
          >
            <h2 className="t-mega uppercase">{block.slogan}</h2>
          </TextHighlighter>
        ) : (
          <h2 className="t-mega uppercase" />
        )}
      </div>

      <div className="panel border-b border-border">
        <div className="px-6 py-4 border-b border-border">
          {block.ibanTitle ? (
            <TextHighlighter
              highlightColor="var(--cta)"
              triggerType="inView"
              direction="ltr"
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              useInViewOptions={{ once: true, amount: 0.5 }}
            >
              <h3 className="t-h2 uppercase">{block.ibanTitle}</h3>
            </TextHighlighter>
          ) : (
            <h3 className="t-h2 uppercase" />
          )}
        </div>
        {bankAccounts.length > 0 ? (
          <StackingBankCards accounts={bankAccounts} labels={labels} />
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
          {block.volunteerTitle ? (
            <BlurText
              text={block.volunteerTitle}
              tag="h3"
              className="t-h2 uppercase mb-4"
              animateBy="words"
              delay={50}
              stepDuration={0.25}
              direction="top"
              threshold={0.2}
              animationFrom={{ filter: 'blur(8px)', opacity: 0, y: -25 }}
              animationTo={[{ filter: 'blur(0px)', opacity: 1, y: 0 }]}
              easing={[0.25, 0.46, 0.45, 0.94]}
            />
          ) : (
            <h3 className="t-h2 uppercase mb-4" />
          )}
          <p className="t-body text-white/70 mb-4">
            {block.volunteerDescription}
          </p>
          {(() => {
            const wa = getSocialLink(siteSettings?.socialLinks, 'whatsapp')
            return wa ? (
              <WhatsAppButton
                phone={wa.url}
                className="!bg-cta !text-cta-foreground !rounded-none w-fit font-bold uppercase text-sm tracking-wider"
              >
                WHATSAPP →
              </WhatsAppButton>
            ) : (
              <Link
                href="/gonullu-ol"
                className="inline-flex items-center bg-cta text-cta-foreground px-4 py-2.5 text-sm font-bold uppercase tracking-wider"
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
