'use client'

import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, X } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useOutsideClick } from '@/hooks/use-outside-click'

export type BlogCardData = {
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
  cards: BlogCardData[]
  locale: string
}

export default function BlogCardsInteractive({ cards, locale }: Props) {
  const [active, setActive] = useState<BlogCardData | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const uniqueId = useId()

  // Escape key handler
  useEffect(() => {
    if (!active) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [active])

  // Body overflow lock
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  // Outside click
  useOutsideClick(modalRef, useCallback(() => setActive(null), []))

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null
    return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateStr))
  }

  return (
    <>
      {/* ─── Expanded modal ─── */}
      <AnimatePresence>
        {active && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/20"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                ref={modalRef}
                layoutId={`card-${active.id}-${uniqueId}`}
                className="bg-background w-full max-w-xl max-h-[85vh] overflow-auto relative"
                style={{ border: '1.5px solid var(--palette-black)' }}
              >
                {/* Close button */}
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 z-10 bg-foreground text-background w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Kapat"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Hero image */}
                {active.imageUrl && (
                  <motion.div
                    layoutId={`image-${active.id}-${uniqueId}`}
                    className="relative h-80 overflow-hidden"
                  >
                    <img
                      src={active.imageUrl}
                      alt={active.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </motion.div>
                )}

                {/* Content */}
                <div className="p-6 lg:p-8">
                  {active.categoryLabel && (
                    <span className="badge-sys bg-foreground text-background text-[10px] mb-3 inline-block">
                      {active.categoryLabel}
                    </span>
                  )}

                  <motion.h3
                    layoutId={`title-${active.id}-${uniqueId}`}
                    className="font-heading text-2xl lg:text-3xl font-bold uppercase"
                  >
                    {active.title}
                  </motion.h3>

                  {active.excerpt && (
                    <motion.p
                      layoutId={`desc-${active.id}-${uniqueId}`}
                      className="t-body text-muted-foreground mt-3"
                    >
                      {active.excerpt}
                    </motion.p>
                  )}

                  {active.publishedAt && (
                    <p className="t-meta text-muted-foreground text-xs mt-4">
                      {formatDate(active.publishedAt)}
                    </p>
                  )}

                  <div className="border-t border-border mt-6 pt-6">
                    <Link
                      href={`/gunluk/${active.slug}`}
                      className="btn-health inline-flex items-center gap-2"
                    >
                      {locale === 'en' ? 'Read More' : 'Devamını Oku'}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Card list ─── */}
      <ul
        className="grid grid-cols-1 lg:grid-cols-3"
        style={{ gap: '1.5px', background: 'var(--palette-black)' }}
      >
        {cards.map((card) => (
          <motion.li
            key={card.id}
            layoutId={`card-${card.id}-${uniqueId}`}
            onClick={() => setActive(card)}
            className="bg-background flex flex-col cursor-pointer group hover:bg-foreground/5 transition-colors"
          >
            {/* Thumbnail */}
            {card.imageUrl && (
              <motion.div
                layoutId={`image-${card.id}-${uniqueId}`}
                className="relative h-[200px] lg:h-[220px] overflow-hidden"
              >
                <img
                  src={card.imageUrl}
                  alt={card.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            )}

            {/* Text content */}
            <div className="p-5 lg:p-6 flex flex-col flex-1">
              {card.categoryLabel && (
                <span className="badge-sys bg-foreground text-background text-[10px] mb-3 inline-block w-fit">
                  {card.categoryLabel}
                </span>
              )}

              <motion.h3
                layoutId={`title-${card.id}-${uniqueId}`}
                className="font-heading text-lg lg:text-xl font-bold uppercase"
              >
                {card.title}
              </motion.h3>

              {card.excerpt && (
                <motion.p
                  layoutId={`desc-${card.id}-${uniqueId}`}
                  className="t-meta text-muted-foreground mt-2 line-clamp-2"
                >
                  {card.excerpt}
                </motion.p>
              )}

              <div className="mt-auto pt-4 flex items-center justify-between">
                {card.publishedAt && (
                  <p className="t-meta text-muted-foreground text-xs">
                    {formatDate(card.publishedAt)}
                  </p>
                )}
                <span className="font-heading text-xs font-bold uppercase tracking-wider flex items-center gap-1 text-muted-foreground group-hover:text-foreground transition-colors">
                  OKU
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  )
}
