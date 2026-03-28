'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { getCategoryStyle, getCategorySemanticToken } from '@/utilities/categoryTokens'

export type BentoCardData = {
  id: number
  title: string
  slug: string
  excerpt: string | null
  category: string | null
  categoryLabel: string
  publishedAt: string | null
  imageUrl: string
  imageAlt: string
}

type Props = {
  cards: BentoCardData[]
  locale: string
}

/* ═══════════ Main Component — Focus Cards + Masonry ═══════════ */

export default function BlogCardsBento({ cards, locale }: Props) {
  const [hovered, setHovered] = useState<number | null>(null)

  if (!cards.length) return null

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-[1.5px] bg-[var(--palette-black)]">
      {cards.map((card, index) => (
        <MasonryCard
          key={card.id}
          card={card}
          index={index}
          locale={locale}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  )
}

/* ═══════════ Masonry Card with Focus Effect ═══════════ */

const CARD_HEIGHTS = [
  'h-[420px]',  // 0 — tall
  'h-[320px]',  // 1 — medium
  'h-[380px]',  // 2 — tall-ish
  'h-[300px]',  // 3 — medium
  'h-[360px]',  // 4 — tall-ish
  'h-[340px]',  // 5 — medium
]

function MasonryCard({
  card,
  index,
  locale,
  hovered,
  setHovered,
}: {
  card: BentoCardData
  index: number
  locale: string
  hovered: number | null
  setHovered: React.Dispatch<React.SetStateAction<number | null>>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const semanticToken = getCategorySemanticToken(card.category)
  const heightClass = CARD_HEIGHTS[index % CARD_HEIGHTS.length]
  const postHref = `/gunluk/${card.slug}` as const

  const isFocusDimmed = hovered !== null && hovered !== index

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.5, delay: 0.08 * index, ease: 'easeOut' }}
      className="break-inside-avoid mb-[1.5px]"
    >
      <Link
        href={postHref}
        className={`group relative block overflow-hidden bg-background ${heightClass} transition-all duration-300 ease-out ${
          isFocusDimmed ? 'scale-[0.98] brightness-50' : 'scale-100 brightness-100'
        }`}
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Full-bleed image */}
        <div className="absolute inset-0">
          {card.imageUrl ? (
            <Image
              src={card.imageUrl}
              alt={card.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading={index < 3 ? 'eager' : 'lazy'}
            />
          ) : (
            <div className="h-full w-full bg-muted flex items-center justify-center">
              <span className="text-5xl opacity-15">🐾</span>
            </div>
          )}
        </div>

        {/* Gradient scrim — bottom heavy */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />

        {/* Category badge — top left */}
        {card.categoryLabel && (
          <span
            className="badge-sys absolute top-3 left-3 z-10"
            style={getCategoryStyle(card.category)}
          >
            {card.categoryLabel}
          </span>
        )}

        {/* Content — bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5 z-10 flex flex-col">
          {/* Accent bar */}
          <div
            className="w-10 h-[3px] mb-3"
            style={{ background: `var(--${semanticToken})` }}
          />

          {/* Title — always visible */}
          <h3 className="font-heading text-base lg:text-lg font-bold uppercase leading-tight text-white">
            {card.title}
          </h3>

          {/* Excerpt — revealed on hover via max-height transition */}
          {card.excerpt && (
            <p className="text-xs text-white/70 font-mono mt-2 line-clamp-2 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[60px] transition-all duration-300 ease-out overflow-hidden">
              {card.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/15">
            {card.publishedAt && (
              <span className="text-[11px] text-white/50 font-mono">
                {formatDate(card.publishedAt, locale)}
              </span>
            )}
            <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-heading font-bold uppercase tracking-wider text-white/70 group-hover:text-white transition-colors">
              {locale === 'en' ? 'READ' : 'OKU'}
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ═══════════ Helper ═══════════ */

function formatDate(dateStr: string, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateStr))
}
