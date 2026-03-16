'use client'

import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowRight, X } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useOutsideClick } from '@/hooks/use-outside-click'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

const CATEGORY_COLORS: Record<string, string> = {
  kurtarma: 'bg-cta text-cta-foreground',
  tedavi: 'bg-health text-health-foreground',
  'gunluk-hayat': 'bg-warm text-warm-foreground',
  gunluk: 'bg-warm text-warm-foreground',
  duyuru: 'bg-emergency text-emergency-foreground',
  etkinlik: 'bg-trust text-trust-foreground',
  sahiplendirme: 'bg-adoption text-adoption-foreground',
}

function getCategoryColor(category: string | null): string {
  if (!category) return 'bg-palette-black text-palette-cream'
  return CATEGORY_COLORS[category] || 'bg-palette-black text-palette-cream'
}

type Props = {
  cards: BentoCardData[]
  locale: string
}

/* ═══════════ Spotlight Wrapper ═══════════ */

function SpotlightCard({
  children,
  radius = 600,
  className = '',
  ...rest
}: {
  children: React.ReactNode
  radius?: number
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    setOpacity(1)
  }

  const handleMouseLeave = () => setOpacity(0)

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      {...rest}
    >
      {children}
      {/* Spotlight glow overlay — hover:hover ensures touch devices skip it */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 hidden [@media(hover:hover)]:block"
        style={{
          opacity,
          background: `radial-gradient(${radius}px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 50%)`,
        }}
      />
    </div>
  )
}

/* ═══════════ Main Component ═══════════ */

export default function BlogCardsBento({ cards, locale }: Props) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const expandedRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const triggerRefs = useRef<Map<number, HTMLElement>>(new Map())
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const uniqueId = useId()

  const prefersReducedMotion = useRef(false)
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // GSAP scroll reveal
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    if (prefersReducedMotion.current) return

    const items = grid.querySelectorAll('[data-blog-card]')
    gsap.fromTo(
      items,
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          once: true,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === grid) t.kill()
      })
    }
  }, [cards])

  // Escape key
  useEffect(() => {
    if (expandedId === null) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setExpandedId(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [expandedId])

  // Outside click
  useOutsideClick(
    expandedRef,
    useCallback(() => setExpandedId(null), []),
  )

  // Focus management
  useEffect(() => {
    if (expandedId !== null) {
      // Focus close button after expand
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus()
      })
    } else {
      // Return focus to the card that was expanded
      // triggerRefs tracks the last expanded card
    }
  }, [expandedId])

  const handleCollapse = useCallback(
    (id: number) => {
      setExpandedId(null)
      // Return focus to trigger card
      requestAnimationFrame(() => {
        triggerRefs.current.get(id)?.focus()
      })
    },
    [],
  )

  const handleToggle = useCallback(
    (card: BentoCardData, el: HTMLElement) => {
      triggerRefs.current.set(card.id, el)
      if (expandedId === card.id) {
        handleCollapse(card.id)
      } else {
        setExpandedId(card.id)
        // Scroll into view after animation
        requestAnimationFrame(() => {
          setTimeout(() => {
            expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          }, 350)
        })
      }
    },
    [expandedId, handleCollapse],
  )

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null
    return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateStr))
  }

  if (!cards.length) return null

  const [featured, ...allRest] = cards
  const rest = allRest.slice(0, 3)
  const expandedFeatured = expandedId === featured.id
  const expandedBottomCard = rest.find((c) => c.id === expandedId) ?? null

  return (
    <div
      ref={gridRef}
      className="flex flex-col"
      style={{ gap: '1.5px', background: 'var(--palette-black)' }}
    >
      {/* ─── Featured Card ─── */}
      <FeaturedCard
        card={featured}
        uniqueId={uniqueId}
        locale={locale}
        isExpanded={expandedFeatured}
        dimmed={expandedId !== null && !expandedFeatured}
        onToggle={handleToggle}
        onCollapse={handleCollapse}
        formatDate={formatDate}
        expandedRef={expandedFeatured ? expandedRef : undefined}
        closeButtonRef={expandedFeatured ? closeButtonRef : undefined}
        reducedMotion={prefersReducedMotion}
      />

      {/* ─── Expanded Bottom Card Panel ─── */}
      <AnimatePresence>
        {expandedBottomCard && (
          <motion.div
            ref={expandedRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <ExpandedContent
              card={expandedBottomCard}
              locale={locale}
              formatDate={formatDate}
              onClose={() => handleCollapse(expandedBottomCard.id)}
              closeButtonRef={closeButtonRef}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Bottom 3-Card Grid ─── */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: '1.5px', background: 'var(--palette-black)' }}
      >
        {rest.map((card) => (
          <SmallCard
            key={card.id}
            card={card}
            uniqueId={uniqueId}
            locale={locale}
            isExpanded={expandedId === card.id}
            dimmed={expandedId !== null && expandedId !== card.id}
            onToggle={handleToggle}
            formatDate={formatDate}
            reducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  )
}

/* ═══════════ Parallax Image Hook ═══════════ */

function useParallaxImage(opts: {
  range: number
  maxScale: number
  stiffness: number
  damping: number
  reducedMotion: React.RefObject<boolean>
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useMotionValue(1)
  const springX = useSpring(x, { stiffness: opts.stiffness, damping: opts.damping })
  const springY = useSpring(y, { stiffness: opts.stiffness, damping: opts.damping })
  const springScale = useSpring(scale, { stiffness: opts.stiffness, damping: opts.damping })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (opts.reducedMotion.current) return
      const rect = e.currentTarget.getBoundingClientRect()
      const px = ((e.clientX - rect.left) / rect.width - 0.5) * opts.range * 2
      const py = ((e.clientY - rect.top) / rect.height - 0.5) * opts.range * 2
      x.set(px)
      y.set(py)
      scale.set(opts.maxScale)
    },
    [x, y, scale, opts.range, opts.maxScale, opts.reducedMotion],
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    scale.set(1)
  }, [x, y, scale])

  return { springX, springY, springScale, handleMouseMove, handleMouseLeave }
}

/* ═══════════ Featured Card ═══════════ */

function FeaturedCard({
  card,
  uniqueId: _uniqueId,
  locale,
  isExpanded,
  dimmed,
  onToggle,
  onCollapse,
  formatDate,
  expandedRef,
  closeButtonRef,
  reducedMotion,
}: {
  card: BentoCardData
  uniqueId: string
  locale: string
  isExpanded: boolean
  dimmed: boolean
  onToggle: (card: BentoCardData, el: HTMLElement) => void
  onCollapse: (id: number) => void
  formatDate: (d: string | null) => string | null
  expandedRef?: React.Ref<HTMLDivElement>
  closeButtonRef?: React.RefObject<HTMLButtonElement | null>
  reducedMotion: React.RefObject<boolean>
}) {
  const { springX, springY, springScale, handleMouseMove, handleMouseLeave } =
    useParallaxImage({
      range: 30,
      maxScale: 1.08,
      stiffness: 100,
      damping: 25,
      reducedMotion,
    })

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle(card, e.currentTarget)
    }
  }

  return (
    <SpotlightCard radius={800}>
      <motion.div
        ref={expandedRef}
        data-blog-card
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onClick={(e) => onToggle(card, e.currentTarget)}
        onKeyDown={handleKeyDown}
        animate={{
          opacity: dimmed ? 0.3 : 1,
          scale: dimmed ? 0.95 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="bg-background cursor-pointer group relative"
      >
        {/* Image with parallax */}
        {card.imageUrl && (
          <div
            className="relative h-[280px] md:h-[360px] lg:h-[420px] overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.img
              src={card.imageUrl}
              alt={card.imageAlt}
              className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-300 group-hover:brightness-110"
              style={{ x: springX, y: springY, scale: springScale }}
              loading="eager"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Overlaid content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
              {card.categoryLabel && (
                <span
                  className={`badge-sys mb-3 inline-block backdrop-blur-sm ${getCategoryColor(card.category)}`}
                  style={{ border: '1.5px solid var(--palette-black)' }}
                >
                  {card.categoryLabel}
                </span>
              )}
              <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold uppercase">
                {card.title}
              </h3>
              {card.excerpt && (
                <p className="t-body mt-2 text-white/80 max-w-xl">
                  {card.excerpt}
                </p>
              )}
              <div className="flex items-center gap-4 mt-4">
                {card.publishedAt && (
                  <p className="text-xs text-white/60">{formatDate(card.publishedAt)}</p>
                )}
                <span className="font-heading text-xs font-bold uppercase tracking-wider flex items-center gap-1 text-white/80 group-hover:text-white transition-colors underline-offset-4 group-hover:underline">
                  OKU
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Expanded featured content panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="p-6 lg:p-8 flex flex-col md:flex-row gap-6">
                {/* Larger image preview */}
                {card.imageUrl && (
                  <div className="w-full md:w-1/2 h-[240px] md:h-[300px] overflow-hidden flex-shrink-0">
                    <img
                      src={card.imageUrl}
                      alt={card.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-between flex-1">
                  {card.categoryLabel && (
                    <span
                      className={`badge-sys mb-3 inline-block w-fit ${getCategoryColor(card.category)}`}
                      style={{ border: '1.5px solid var(--palette-black)' }}
                    >
                      {card.categoryLabel}
                    </span>
                  )}
                  <h3 className="font-heading text-2xl lg:text-3xl font-bold uppercase">
                    {card.title}
                  </h3>
                  {card.excerpt && (
                    <p className="t-body text-muted-foreground mt-3">{card.excerpt}</p>
                  )}
                  {card.publishedAt && (
                    <p className="t-meta text-muted-foreground text-xs mt-4">
                      {formatDate(card.publishedAt)}
                    </p>
                  )}
                  <div className="mt-6">
                    <Link
                      href={`/gunluk/${card.slug}`}
                      className="btn-stats inline-flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {locale === 'en' ? 'Read More' : 'Devamını Oku'}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Close button — brutalist offset */}
        <AnimatePresence>
          {isExpanded && (
            <motion.button
              ref={closeButtonRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation()
                onCollapse(card.id)
              }}
              className="absolute -top-3 -right-3 z-20 bg-foreground text-background w-9 h-9 flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ border: '1.5px solid var(--palette-black)' }}
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </SpotlightCard>
  )
}

/* ═══════════ Small Card ═══════════ */

function SmallCard({
  card,
  uniqueId: _uniqueId,
  locale: _locale,
  isExpanded,
  dimmed,
  onToggle,
  formatDate,
  reducedMotion,
}: {
  card: BentoCardData
  uniqueId: string
  locale: string
  isExpanded: boolean
  dimmed: boolean
  onToggle: (card: BentoCardData, el: HTMLElement) => void
  formatDate: (d: string | null) => string | null
  reducedMotion: React.RefObject<boolean>
}) {
  const { springX, springY, springScale, handleMouseMove, handleMouseLeave } =
    useParallaxImage({
      range: 15,
      maxScale: 1.05,
      stiffness: 120,
      damping: 20,
      reducedMotion,
    })

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle(card, e.currentTarget)
    }
  }

  return (
    <SpotlightCard>
      <motion.div
        data-blog-card
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onClick={(e) => onToggle(card, e.currentTarget)}
        onKeyDown={handleKeyDown}
        animate={{
          opacity: dimmed ? 0.3 : 1,
          scale: dimmed ? 0.95 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="bg-background flex flex-col cursor-pointer group h-full"
      >
        {/* Image with parallax or placeholder */}
        {card.imageUrl ? (
          <div
            className="relative h-[200px] overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.img
              src={card.imageUrl}
              alt={card.imageAlt}
              className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-300 group-hover:brightness-110"
              style={{ x: springX, y: springY, scale: springScale }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
          </div>
        ) : (
          <div className="h-[200px] bg-palette-dark-cream flex items-center justify-center">
            <span className="text-4xl">🐾</span>
          </div>
        )}

        {/* Text content */}
        <div className="p-4 lg:p-5 flex flex-col flex-1">
          {card.categoryLabel && (
            <span
              className={`badge-sys mb-2 inline-block w-fit ${getCategoryColor(card.category)}`}
              style={{ border: '1.5px solid var(--palette-black)' }}
            >
              {card.categoryLabel}
            </span>
          )}

          <h3 className="font-heading text-base lg:text-lg font-bold uppercase">
            {card.title}
          </h3>

          {card.excerpt && (
            <p className="t-meta text-muted-foreground mt-1.5 line-clamp-2">
              {card.excerpt}
            </p>
          )}

          <div className="mt-auto pt-3 flex items-center justify-between">
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
      </motion.div>
    </SpotlightCard>
  )
}

/* ═══════════ Expanded Content (Bottom Cards) ═══════════ */

function ExpandedContent({
  card,
  locale,
  formatDate,
  onClose,
  closeButtonRef,
}: {
  card: BentoCardData
  locale: string
  formatDate: (d: string | null) => string | null
  onClose: () => void
  closeButtonRef: React.RefObject<HTMLButtonElement | null>
}) {
  return (
    <div
      className="bg-background relative p-6 lg:p-8"
      style={{ border: '1.5px solid var(--palette-black)' }}
    >
      {/* Close button — brutalist offset */}
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute -top-3 -right-3 z-20 bg-foreground text-background w-9 h-9 flex items-center justify-center hover:opacity-80 transition-opacity"
        style={{ border: '1.5px solid var(--palette-black)' }}
        aria-label="Kapat"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Larger image */}
        {card.imageUrl && (
          <div className="w-full md:w-1/2 h-[240px] md:h-[300px] overflow-hidden flex-shrink-0">
            <img
              src={card.imageUrl}
              alt={card.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-col justify-between flex-1">
          {card.categoryLabel && (
            <span
              className={`badge-sys mb-3 inline-block w-fit ${getCategoryColor(card.category)}`}
              style={{ border: '1.5px solid var(--palette-black)' }}
            >
              {card.categoryLabel}
            </span>
          )}
          <h3 className="font-heading text-2xl lg:text-3xl font-bold uppercase">
            {card.title}
          </h3>
          {card.excerpt && (
            <p className="t-body text-muted-foreground mt-3">{card.excerpt}</p>
          )}
          {card.publishedAt && (
            <p className="t-meta text-muted-foreground text-xs mt-4">
              {formatDate(card.publishedAt)}
            </p>
          )}
          <div className="mt-6">
            <Link
              href={`/gunluk/${card.slug}`}
              className="btn-stats inline-flex items-center gap-2"
            >
              {locale === 'en' ? 'Read More' : 'Devamını Oku'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
