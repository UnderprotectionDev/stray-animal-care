'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { cn } from '@/utilities/ui'
import StackingCards, { StackingCardItem } from '@/components/fancy/blocks/stacking-cards'

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
}

const CARD_COLORS = [
  'bg-[#f97316]',
  'bg-[#0015ff]',
  'bg-[#ff5941]',
  'bg-[#1f464d]',
  'bg-[#0015ff]',
]

export default function EmergencyStackingCards({ cards }: Props) {
  const container = useRef<HTMLDivElement>(null)

  if (cards.length === 0) return null

  return (
    <div
      className="h-[620px] bg-palette-cream overflow-auto text-white"
      ref={container}
    >
      <StackingCards
        totalCards={cards.length}
        scrollOptions={{ container: container }}
        stickyTop="40px"
      >
        {cards.map((card, index) => {
          const bgColor = CARD_COLORS[index % CARD_COLORS.length]
          const percentage =
            card.targetAmount > 0
              ? Math.min(Math.round((card.collectedAmount / card.targetAmount) * 100), 100)
              : 0

          return (
            <StackingCardItem key={card.id} index={index} className="h-[620px]">
              <Link
                href={`/acil-vakalar/${card.slug}`}
                className={cn(
                  bgColor,
                  'h-[80%] sm:h-[70%] flex-col sm:flex-row pl-8 pr-0 py-10 flex w-11/12 rounded-3xl mx-auto relative overflow-hidden',
                )}
              >
                <div className="flex-1 flex flex-col justify-center pr-6 sm:pr-8">
                  <h3 className="font-bold text-2xl mb-5">{card.title}</h3>

                  {card.targetAmount > 0 && (
                    <div className="space-y-3">
                      <span className="text-4xl sm:text-5xl font-black tabular-nums">
                        %{percentage}
                      </span>
                      <div
                        className="h-4 w-full bg-white/20"
                        role="progressbar"
                        aria-valuenow={card.collectedAmount}
                        aria-valuemin={0}
                        aria-valuemax={card.targetAmount}
                      >
                        <div
                          className="h-full bg-white transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-sm font-mono text-white/80">
                        {card.collectedAmount.toLocaleString('tr-TR')} / {card.targetAmount.toLocaleString('tr-TR')} TL
                      </p>
                    </div>
                  )}
                </div>

                {card.imageUrl && (
                  <div className="w-full -ml-8 -mb-10 sm:ml-0 sm:mb-0 sm:w-1/2 sm:h-auto h-48 relative overflow-hidden">
                    <Image
                      src={card.imageUrl}
                      alt={card.imageAlt}
                      className="object-cover"
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                )}
              </Link>
            </StackingCardItem>
          )
        })}
      </StackingCards>
    </div>
  )
}
