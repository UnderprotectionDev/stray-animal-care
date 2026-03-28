'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Carousel, Card } from '@/components/fancy/apple-cards-carousel'
import { getCategoryStyle, getCategorySemanticToken } from '@/utilities/categoryTokens'

export type BlogCarouselCardData = {
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
    <div className="px-8 pb-8 flex flex-col gap-4">
      {/* Accent bar */}
      <div
        className="w-10 h-[3px]"
        style={{ background: `var(--${semanticToken})` }}
      />

      {card.excerpt && (
        <p className="font-mono text-sm leading-relaxed text-[var(--muted-foreground)]">
          {card.excerpt}
        </p>
      )}

      {card.publishedAt && (
        <span className="font-mono text-xs text-[var(--muted-foreground)]">
          {new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(new Date(card.publishedAt))}
        </span>
      )}

      <Link
        href={`/gunluk/${card.slug}`}
        className="inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider hover:underline underline-offset-4 mt-2"
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
