'use client'

import React from 'react'
import { ArrowRight, Calendar } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Carousel, Card } from '@/components/fancy/apple-cards-carousel'
import { getCategoryStyle, getCategorySemanticToken } from '@/utilities/categoryTokens'
import { formatDate } from '@/utilities/formatDate'

export type BlogCarouselCardData = {
  id: number
  title: string
  slug: string
  excerpt: string | null
  contentPreview: string | null
  readingTime: number | null
  category: string | null
  categoryLabel: string
  publishedAt: string | null
  imageUrl: string
  imageAlt: string
}

type Props = {
  cards: BlogCarouselCardData[]
  locale: string
  readMoreLabel?: string
}

function BlogCardContent({
  card,
  locale,
  readMoreLabel,
}: {
  card: BlogCarouselCardData
  locale: string
  readMoreLabel: string
}) {
  const semanticToken = getCategorySemanticToken(card.category)

  return (
    <div className="flex flex-col gap-5">
      {/* Meta row: date + reading time */}
      <div className="flex items-center gap-4 flex-wrap">
        <div
          className="w-8 h-[3px] shrink-0"
          style={{ background: `var(--${semanticToken})` }}
        />
        {card.publishedAt && (
          <span className="font-mono text-xs text-[var(--muted-foreground)] flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {formatDate(card.publishedAt, locale)}
          </span>
        )}
      </div>

      {/* Excerpt as editorial pull-quote */}
      {card.excerpt && (
        <div
          className="border-l-[3px] pl-4 md:pl-5 py-1"
          style={{ borderColor: `var(--${semanticToken})` }}
        >
          <p className="font-mono text-sm md:text-[0.938rem] leading-relaxed text-[var(--muted-foreground)]">
            {card.excerpt}
          </p>
        </div>
      )}

      {/* Content preview */}
      {card.contentPreview && (
        <div className="border-t border-[var(--border)] pt-4">
          <p className="font-mono text-sm leading-relaxed text-[var(--foreground)]/80 line-clamp-5">
            {card.contentPreview}
          </p>
        </div>
      )}

      {/* CTA */}
      <Link
        href={`/gunluk/${card.slug}`}
        className="btn-cta inline-flex items-center gap-2 text-sm py-3 px-6 w-fit"
      >
        {readMoreLabel}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

export default function BlogCardsCarousel({ cards, locale, readMoreLabel = 'Devamını Oku' }: Props) {
  if (!cards.length) return null

  const carouselCards = cards.map((card, index) => (
    <Card
      key={card.id}
      index={index}
      layout
      card={{
        src: card.imageUrl || '/placeholder.svg',
        title: card.title,
        category: card.categoryLabel,
        badgeStyle: getCategoryStyle(card.category),
        content: (
          <BlogCardContent
            card={card}
            locale={locale}
            readMoreLabel={readMoreLabel}
          />
        ),
      }}
    />
  ))

  return <Carousel items={carouselCards} />
}
