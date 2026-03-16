'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { Link } from '@/i18n/navigation'
import { ProgressBar } from '@/components/shared/ProgressBar'

export type EmergencyCardData = {
  id: number
  title: string
  slug: string
  targetAmount: number
  collectedAmount: number
  imageUrl: string
  imageAlt: string
}

type Props = {
  cards: EmergencyCardData[]
  codeRedLabel?: string | null
}

const SCALE_MULTIPLIER = 0.04

function EmergencyCardItem({
  card,
  index,
  totalCards,
  codeRedLabel,
}: {
  card: EmergencyCardData
  index: number
  totalCards: number
  codeRedLabel?: string | null
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  })

  const scaleTo = 1 - (totalCards - index) * SCALE_MULTIPLIER
  const scale = useTransform(scrollYProgress, [0, 1], [1, scaleTo])

  const label = codeRedLabel || 'CODE RED'
  const amountText =
    card.targetAmount > 0
      ? `${card.collectedAmount.toLocaleString('tr-TR')} / ${card.targetAmount.toLocaleString('tr-TR')} TL`
      : ''

  return (
    <div
      ref={cardRef}
      className="sticky top-0 pt-[calc(var(--card-index)*2rem)]"
      style={{ '--card-index': index } as React.CSSProperties}
    >
      <motion.div style={{ scale, transformOrigin: 'top center' }} className="bg-palette-cream">
        <Link
          href={`/acil-vakalar/${card.slug}`}
          className="block border-[1.5px] border-[var(--border)] overflow-hidden group"
        >
          {/* Top accent bar */}
          <div className="h-1 bg-emergency" />

          <div className="flex flex-col md:flex-row min-h-[280px] md:min-h-[340px]">
            {/* Image or solid background */}
            {card.imageUrl ? (
              <div className="relative w-full md:w-[45%] min-h-[200px] md:min-h-full overflow-hidden">
                <Image
                  src={card.imageUrl}
                  alt={card.imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            ) : (
              <div className="w-full md:w-[45%] min-h-[200px] md:min-h-full bg-emergency" />
            )}

            {/* Content panel */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center gap-4">
              <span className="t-meta font-bold text-destructive border border-destructive px-2 py-1 w-fit uppercase">
                {label} {String(index + 1).padStart(3, '0')}
              </span>

              <h3 className="font-heading text-2xl md:text-3xl font-bold text-[var(--palette-black)] uppercase leading-tight">
                {card.title}
              </h3>

              {card.targetAmount > 0 && (
                <>
                  <ProgressBar current={card.collectedAmount} target={card.targetAmount} />
                  <p className="t-meta font-bold text-[var(--palette-black)]">{amountText}</p>
                </>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  )
}

export default function EmergencyStackingCards({ cards, codeRedLabel }: Props) {
  if (cards.length === 0) return null

  return (
    <div className="relative">
      {cards.map((card, index) => (
        <EmergencyCardItem
          key={card.id}
          card={card}
          index={index}
          totalCards={cards.length}
          codeRedLabel={codeRedLabel}
        />
      ))}
    </div>
  )
}
