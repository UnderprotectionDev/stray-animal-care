'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'motion/react'
import { Link } from '@/i18n/navigation'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { MobileDonateBar } from '@/components/shared/MobileDonateBar'
import { Heart, ExternalLink } from 'lucide-react'

const CountUp = dynamic(() => import('@/components/CountUp'), { ssr: false })

const fmt = (n: number, locale = 'tr') =>
  new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(n)

type EmergencyDetailSidebarProps = {
  collected: number
  target: number
  progressLabel?: string
  collectedLabel?: string
  targetLabel?: string
  donateLabel?: string
  relatedAnimal?: { name: string; slug: string } | null
  relatedAnimalLabel?: string
  whatsAppPhone?: string
  whatsAppMessage?: string
  whatsAppLabel?: string
  mobileDonateLabel?: string
  locale?: string
}

export function EmergencyDetailSidebar({
  collected,
  target,
  progressLabel,
  collectedLabel,
  targetLabel,
  donateLabel,
  relatedAnimal,
  relatedAnimalLabel,
  whatsAppPhone,
  whatsAppMessage,
  whatsAppLabel,
  mobileDonateLabel,
  locale,
}: EmergencyDetailSidebarProps) {
  const pct = target > 0 ? Math.min(Math.round((collected / target) * 100), 100) : 0

  return (
    <>
      <motion.aside
        className="lg:sticky lg:top-24 lg:self-start border border-border/60 bg-background"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
      >
        {/* Progress */}
        {target > 0 && (
          <div className="p-5 space-y-3 border-b border-border/40">
            <ProgressBar
              current={collected}
              target={target}
              label={progressLabel ?? 'İlerleme'}
              colorClass="bg-emergency"
            />
            <div className="flex justify-between text-sm font-mono">
              <div>
                <p className="t-comment">
                  {collectedLabel ?? 'Toplanan'}
                </p>
                <p className="font-bold text-foreground mt-0.5">
                  <CountUp to={collected} separator="." duration={1.5} />
                  <span className="text-xs ml-0.5">₺</span>
                </p>
              </div>
              <div className="text-right">
                <p className="t-comment">
                  {targetLabel ?? 'Hedef'}
                </p>
                <p className="font-bold text-foreground mt-0.5">{fmt(target, locale)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Related animal */}
        {relatedAnimal && (
          <div className="p-5 border-b border-border/40">
            <p className="t-comment mb-1">
              {relatedAnimalLabel ?? 'İlgili Hayvan'}
            </p>
            <Link
              href={`/canlarimiz/${relatedAnimal.slug}`}
              className="inline-flex items-center gap-1.5 font-bold text-foreground hover:text-emergency transition-colors uppercase tracking-wide text-sm"
            >
              {relatedAnimal.name}
              <ExternalLink className="size-3.5" />
            </Link>
          </div>
        )}

        {/* Donate CTA */}
        <div className="p-5 space-y-3">
          <Link
            href="/destek-ol"
            className="btn-emergency w-full justify-center"
          >
            <Heart className="size-4" />
            {donateLabel ?? 'Destek Ol'}
          </Link>

          {whatsAppPhone && (
            <WhatsAppButton
              phone={whatsAppPhone}
              message={whatsAppMessage}
              className="w-full justify-center border-[1.5px] border-border bg-background text-foreground hover:bg-muted text-xs font-bold uppercase tracking-wider font-mono"
            >
              {whatsAppLabel ?? 'WhatsApp'}
            </WhatsAppButton>
          )}
        </div>
      </motion.aside>

      <MobileDonateBar label={mobileDonateLabel ?? donateLabel} />
    </>
  )
}
