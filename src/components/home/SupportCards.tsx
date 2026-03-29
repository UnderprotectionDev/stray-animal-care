'use client'

import React, { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SiteSetting } from '@/payload-types'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { Link } from '@/i18n/navigation'
import { getSocialLink } from '@/utilities/socialLinks'
const AnimatedMegaHeading = dynamic(() => import('@/components/home/AnimatedMegaHeading').then(mod => mod.AnimatedMegaHeading), { ssr: false })
import { VerticalCutReveal } from '@/components/fancy/text/VerticalCutReveal'
import { MagneticTilt } from '@/components/fancy/blocks/MagneticTilt'
const MovingBorder = dynamic(() => import('@/components/fancy/blocks/MovingBorder').then(mod => mod.MovingBorder), { ssr: false })
const FlipBankCard = dynamic(() => import('@/components/home/FlipBankCard').then(mod => mod.FlipBankCard), { ssr: false })
const DotGridBackground = dynamic(() => import('@/components/home/DotGridBackground').then(mod => mod.DotGridBackground), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

type SupportCardsBlock = Extract<
  NonNullable<SiteSetting['homepageBlocks']>[number],
  { blockType: 'homeSupportCards' }
>

type Props = {
  block: SupportCardsBlock
  siteSettings: SiteSetting | null
}

/* ── Floating Paw Prints (Zone A decoration) ── */
const PAW_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8" cy="6" rx="2.5" ry="3" />
    <ellipse cx="16" cy="6" rx="2.5" ry="3" />
    <ellipse cx="4" cy="12" rx="2" ry="2.5" />
    <ellipse cx="20" cy="12" rx="2" ry="2.5" />
    <path d="M7 16c0-3 2.5-5 5-5s5 2 5 5c0 2.5-2 4.5-5 4.5S7 18.5 7 16z" />
  </svg>
)

const PAWS: { top: string; left?: string; right?: string; size: string; opacity: number; rotation: number }[] = [
  { top: '15%', left: '8%', size: '2rem', opacity: 0.06, rotation: -15 },
  { top: '60%', left: '85%', size: '2.5rem', opacity: 0.05, rotation: 20 },
  { top: '30%', right: '15%', size: '1.5rem', opacity: 0.07, rotation: -30 },
  { top: '75%', left: '20%', size: '3rem', opacity: 0.04, rotation: 10 },
  { top: '10%', right: '30%', size: '1.8rem', opacity: 0.06, rotation: 35 },
]

function FloatingPaws() {
  const pawRefs = useRef<(HTMLDivElement | null)[]>([])
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const tweens = pawRefs.current
      .filter(Boolean)
      .map((el) =>
        gsap.to(el!, {
          y: '+=15',
          x: '+=8',
          rotation: '+=10',
          yoyo: true,
          repeat: -1,
          duration: 3 + Math.random() * 2,
          ease: 'sine.inOut',
        }),
      )

    return () => tweens.forEach((t) => t.kill())
  }, [reducedMotion])

  return (
    <>
      {PAWS.map((paw, i) => (
        <div
          key={i}
          ref={(el) => { pawRefs.current[i] = el }}
          className="absolute pointer-events-none select-none"
          style={{
            top: paw.top,
            left: paw.left,
            right: paw.right,
            width: paw.size,
            height: paw.size,
            opacity: paw.opacity,
            color: 'var(--warm)',
            transform: `rotate(${paw.rotation}deg)`,
          }}
          aria-hidden="true"
        >
          {PAW_SVG}
        </div>
      ))}
    </>
  )
}

export function SupportCards({ block, siteSettings }: Props) {
  const labels = block.labels ?? {}
  const bankAccounts = siteSettings?.bankAccounts ?? []
  const cardsRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

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
    <section style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
      {/* ── Zone A: Hero heading ── */}
      <div className="panel py-4 px-6 border-b border-border relative overflow-hidden">
        {/* Effect 2: Dot grid background */}
        <DotGridBackground />
        {/* Effect 5: Floating paw prints (replaces heart watermark) */}
        <FloatingPaws />

        {/* label removed */}
        {/* Effect 3: Color flash on heading */}
        <AnimatedMegaHeading text={block.slogan} enableColorFlash />
        <div className="w-24 h-1 bg-warm mt-2 relative z-10" />
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
            className="g-1 md:g-2 overflow-visible"
          >
            {bankAccounts.map((account, index) => (
              <div
                key={account.id || index}
                data-bank-card
                className={`h-full ${
                  bankAccounts.length % 2 !== 0 && index === bankAccounts.length - 1
                    ? 'md:col-span-2'
                    : ''
                }`}
              >
                <FlipBankCard
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
            <Link href="/destek-ol" className="btn-warm inline-flex mt-4 text-sm">
              {block.ibanTitle} →
            </Link>
          </div>
        )}
      </div>

      {/* ── Zone C: Bottom action grid ── */}
      <div className="g-1 md:g-2">
        {/* International card — Effect 4: Moving border */}
        <MagneticTilt>
          <MovingBorder color="var(--emergency)">
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
          </MovingBorder>
        </MagneticTilt>

        {/* Volunteer card — Effect 4: Moving border */}
        <MagneticTilt>
          <MovingBorder color="var(--warm-foreground)">
            <div className="bg-warm text-warm-foreground p-6 relative overflow-hidden h-full">
              {/* Decorative heart watermark */}
              <span
                className="absolute -bottom-4 -right-2 text-[10rem] leading-none font-heading select-none pointer-events-none opacity-[0.08]"
                style={{ color: 'var(--warm-foreground)' }}
                aria-hidden="true"
              >
                &hearts;
              </span>

              <div className="mb-4 relative z-10">
                {block.volunteerTitle ? (
                  <VerticalCutReveal
                    text={block.volunteerTitle}
                    tag="h3"
                    className="t-h2 uppercase text-warm-foreground"
                  />
                ) : (
                  <h3 className="t-h2 uppercase mb-4" />
                )}
              </div>
              <p className="t-body text-warm-foreground/70 mb-4 relative z-10">
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
          </MovingBorder>
        </MagneticTilt>
      </div>
    </section>
  )
}
