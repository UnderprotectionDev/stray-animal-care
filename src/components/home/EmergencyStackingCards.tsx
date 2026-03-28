'use client'

import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import ElectricBorder from '@/components/ElectricBorder'
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack'

export type EmergencyCardData = {
  id: number
  title: string
  slug: string
  targetAmount: number
  collectedAmount: number
  imageUrl: string
  imageAlt: string
  description: string
  caseStatus: string
}

type Props = {
  cards: EmergencyCardData[]
}

function CardContent({ card, percentage }: { card: EmergencyCardData; percentage: number }) {
  return (
    <Link
      href={`/acil-vakalar/${card.slug}`}
      className="flex flex-col sm:flex-row border-[1.5px] border-[var(--border)] bg-white overflow-hidden min-h-[320px] sm:min-h-[380px]"
    >
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 gap-3 sm:gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="font-heading font-bold text-xl sm:text-3xl text-foreground">
            {card.title}
          </h3>
          <span className="badge-sys critical text-xs font-mono uppercase">
            {card.caseStatus === 'aktif' ? 'AKTİF' : 'TAMAMLANDI'}
          </span>
        </div>

        {card.description && (
          <p className="t-body text-sm sm:text-base text-muted-foreground line-clamp-2">
            {card.description}
          </p>
        )}

        {card.targetAmount > 0 && (
          <div className="space-y-2 mt-2 sm:mt-3">
            <span className="text-3xl sm:text-5xl font-black tabular-nums text-foreground">
              %{percentage}
            </span>
            <div
              className="h-3 sm:h-4 w-full bg-[var(--border)]"
              role="progressbar"
              aria-valuenow={card.collectedAmount}
              aria-valuemin={0}
              aria-valuemax={card.targetAmount}
            >
              <div
                className="h-full bg-emergency transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-xs sm:text-sm font-mono text-muted-foreground">
              {card.collectedAmount.toLocaleString('tr-TR')} /{' '}
              {card.targetAmount.toLocaleString('tr-TR')} TL
            </p>
          </div>
        )}
      </div>

      {card.imageUrl && (
        <div className="w-full sm:w-1/2 h-48 sm:h-auto relative overflow-hidden min-h-[200px] sm:min-h-[240px]">
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
  )
}

export default function EmergencyStackingCards({ cards }: Props) {
  if (cards.length === 0) return null

  return (
    <div className="h-[620px] overflow-hidden">
      <ScrollStack
        itemDistance={450}
        baseScale={0.92}
        itemScale={0.02}
        itemStackDistance={20}
        innerClassName="scroll-stack-inner pt-6 px-4 sm:px-8 pb-[30rem]"
      >
        {cards.map((card) => {
          const percentage =
            card.targetAmount > 0
              ? Math.min(Math.round((card.collectedAmount / card.targetAmount) * 100), 100)
              : 0

          return (
            <ScrollStackItem key={card.id}>
              {/* ElectricBorder only on desktop */}
              <div className="hidden sm:block">
                <ElectricBorder
                  color="#F5B62A"
                  borderRadius={0}
                  chaos={0.02}
                  speed={0.7}
                  className="w-full"
                >
                  <CardContent card={card} percentage={percentage} />
                </ElectricBorder>
              </div>
              <div className="sm:hidden">
                <CardContent card={card} percentage={percentage} />
              </div>
            </ScrollStackItem>
          )
        })}
      </ScrollStack>
    </div>
  )
}
