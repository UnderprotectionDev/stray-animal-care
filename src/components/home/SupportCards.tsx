'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SiteSetting } from '@/payload-types'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { Link } from '@/i18n/navigation'
import { getSocialLink } from '@/utilities/socialLinks'
import { AnimatedMegaHeading } from '@/components/home/AnimatedMegaHeading'
import { VerticalCutReveal } from '@/components/fancy/text/VerticalCutReveal'
import { MagneticTilt } from '@/components/fancy/blocks/MagneticTilt'
import { InteractiveBankCard } from '@/components/home/InteractiveBankCard'

gsap.registerPlugin(ScrollTrigger)

type SupportCardsBlock = Extract<
  NonNullable<SiteSetting['homepageBlocks']>[number],
  { blockType: 'homeSupportCards' }
>

type Props = {
  block: SupportCardsBlock
  siteSettings: SiteSetting | null
}

export function SupportCards({ block, siteSettings }: Props) {
  const labels = block.labels ?? {}
  const bankAccounts = siteSettings?.bankAccounts ?? []
  const cardsRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Staggered scroll reveal for bank cards
  useEffect(() => {
    if (reducedMotion || !cardsRef.current) return
    const cards = cardsRef.current.querySelectorAll<HTMLElement>('[data-bank-card]')
    if (cards.length === 0) return

    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          once: true,
        },
      },
    )
  }, [reducedMotion, bankAccounts.length])

  return (
    <section>
      {/* ── Zone A: Hero heading ── */}
      <div className="panel py-6 px-6 border-b border-border relative overflow-hidden">
        {/* Decorative heart watermark */}
        <span
          className="absolute top-1/2 right-8 -translate-y-1/2 text-[12rem] leading-none font-heading select-none pointer-events-none"
          style={{ color: 'var(--cta)', opacity: 0.06 }}
          aria-hidden="true"
        >
          &hearts;
        </span>

        <span className="t-comment block mb-2">{'// DESTEK'}</span>
        <AnimatedMegaHeading text={block.slogan} />
        <div className="w-24 h-1 bg-cta mt-4" />
      </div>

      {/* ── Zone B: Bank cards ── */}
      <div className="panel border-b border-border">
        <div className="px-6 py-4 border-b border-border">
          {block.ibanTitle ? (
            <VerticalCutReveal text={block.ibanTitle} tag="h3" className="t-h2 uppercase" />
          ) : (
            <h3 className="t-h2 uppercase" />
          )}
        </div>

        {bankAccounts.length > 0 ? (
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 p-6"
            style={{ gap: '1.5px', background: 'var(--palette-black)' }}
          >
            {bankAccounts.map((account, index) => (
              <div
                key={account.id || index}
                data-bank-card
                className={
                  bankAccounts.length % 2 !== 0 && index === bankAccounts.length - 1
                    ? 'md:col-span-2'
                    : ''
                }
              >
                <InteractiveBankCard
                  account={account}
                  colorIndex={index}
                  copyLabel={labels.copy || 'KOPYALA'}
                />
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

      {/* ── Zone C: Bottom action grid ── */}
      <div className="g-1 md:g-2">
        {/* International card */}
        <MagneticTilt>
          <div className="bg-foreground text-background p-6 relative overflow-hidden h-full">
            {/* Decorative $ watermark */}
            <span
              className="absolute -bottom-4 -right-2 text-[10rem] leading-none font-heading select-none pointer-events-none opacity-[0.08]"
              style={{ color: 'var(--background)' }}
              aria-hidden="true"
            >
              $
            </span>

            <div className="flex items-center justify-between mb-4 relative z-10">
              {block.internationalTitle ? (
                <VerticalCutReveal
                  text={block.internationalTitle}
                  tag="h3"
                  className="t-h2 uppercase text-background"
                />
              ) : (
                <h3 className="t-h2 uppercase" />
              )}
              <span className="badge-sys !bg-emergency !text-emergency-foreground !border-emergency">
                {labels.comingSoon || 'YAKINDA'}
              </span>
            </div>
            <p className="t-meta text-background/70 relative z-10">
              {block.internationalPlaceholder}
            </p>
          </div>
        </MagneticTilt>

        {/* Volunteer card */}
        <MagneticTilt>
          <div className="bg-cta text-cta-foreground p-6 relative overflow-hidden h-full">
            {/* Decorative heart watermark */}
            <span
              className="absolute -bottom-4 -right-2 text-[10rem] leading-none font-heading select-none pointer-events-none opacity-[0.08]"
              style={{ color: 'var(--cta-foreground)' }}
              aria-hidden="true"
            >
              &hearts;
            </span>

            <div className="mb-4 relative z-10">
              {block.volunteerTitle ? (
                <VerticalCutReveal
                  text={block.volunteerTitle}
                  tag="h3"
                  className="t-h2 uppercase text-cta-foreground"
                />
              ) : (
                <h3 className="t-h2 uppercase mb-4" />
              )}
            </div>
            <p className="t-body text-cta-foreground/70 mb-4 relative z-10">
              {block.volunteerDescription}
            </p>
            <div className="relative z-10">
              {(() => {
                const wa = getSocialLink(siteSettings?.socialLinks, 'whatsapp')
                return wa ? (
                  <WhatsAppButton
                    phone={wa.url}
                    className="!bg-background !text-foreground !rounded-none w-fit font-bold uppercase text-sm tracking-wider"
                  >
                    WHATSAPP →
                  </WhatsAppButton>
                ) : (
                  <Link
                    href="/gonullu-ol"
                    className="inline-flex items-center bg-background text-foreground px-4 py-2.5 text-sm font-bold uppercase tracking-wider border-[1.5px] border-border"
                  >
                    {block.volunteerTitle} →
                  </Link>
                )
              })()}
            </div>
          </div>
        </MagneticTilt>
      </div>
    </section>
  )
}
