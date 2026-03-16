'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
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

/** Maps category slug → [bg CSS var, fg CSS var] for inline styles (avoids Tailwind purge issues) */
const CATEGORY_STYLE_MAP: Record<string, [string, string]> = {
  kurtarma: ['var(--cta)', 'var(--cta-foreground)'],
  tedavi: ['var(--health)', 'var(--health-foreground)'],
  'gunluk-hayat': ['var(--warm)', 'var(--warm-foreground)'],
  gunluk: ['var(--warm)', 'var(--warm-foreground)'],
  duyuru: ['var(--emergency)', 'var(--emergency-foreground)'],
  etkinlik: ['var(--trust)', 'var(--trust-foreground)'],
  sahiplendirme: ['var(--adoption)', 'var(--adoption-foreground)'],
}

const DEFAULT_BADGE_STYLE: [string, string] = ['var(--palette-black)', 'var(--palette-cream)']

function getCategoryStyle(category: string | null): React.CSSProperties {
  const [bg, fg] = (category && CATEGORY_STYLE_MAP[category]) || DEFAULT_BADGE_STYLE
  return { background: bg, color: fg, border: '1.5px solid var(--palette-black)' }
}

/** Maps category slug → CSS var name for accent border */
const CATEGORY_SEMANTIC_TOKENS: Record<string, string> = {
  kurtarma: 'cta',
  tedavi: 'health',
  'gunluk-hayat': 'warm',
  gunluk: 'warm',
  duyuru: 'emergency',
  etkinlik: 'trust',
  sahiplendirme: 'adoption',
}

function getCategorySemanticToken(category: string | null): string {
  if (!category) return 'palette-black'
  return CATEGORY_SEMANTIC_TOKENS[category] || 'palette-black'
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
  const gridRef = useRef<HTMLDivElement>(null)

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

  return (
    <div
      ref={gridRef}
      className="flex flex-col"
      style={{ gap: '1.5px', background: 'var(--palette-black)' }}
    >
      {/* ─── Featured Card ─── */}
      <FeaturedCard
        card={featured}
        locale={locale}
        formatDate={formatDate}
        reducedMotion={prefersReducedMotion}
      />

      {/* ─── Bottom Card Grid ─── */}
      {rest.length > 0 && (
        <div
          className={`grid grid-cols-1 ${rest.length === 1 ? '' : rest.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}
          style={{ gap: '1.5px', background: 'var(--palette-black)' }}
        >
          {rest.map((card) => (
            <SmallCard
              key={card.id}
              card={card}
              locale={locale}
              formatDate={formatDate}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      )}
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
  locale,
  formatDate,
  reducedMotion,
}: {
  card: BentoCardData
  locale: string
  formatDate: (d: string | null) => string | null
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

  const postHref = `/gunluk/${card.slug}` as const

  return (
    <SpotlightCard radius={800}>
      <Link href={postHref} data-blog-card className="bg-background group relative block">
        {/* Split layout: image left, text right */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]"
          style={{ gap: '1.5px', background: 'var(--palette-black)' }}
        >
          {/* Image panel with parallax */}
          {card.imageUrl && (
            <div
              className="relative min-h-[280px] md:min-h-[320px] overflow-hidden bg-background"
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
              {/* Light vignette only */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          )}

          {/* Text panel on cream */}
          <div
            className="bg-background p-6 lg:p-8 flex flex-col justify-center"
            style={{
              borderLeft: card.category
                ? `4px solid var(--${getCategorySemanticToken(card.category)})`
                : undefined,
            }}
          >
            {card.categoryLabel && (
              <span
                className="badge-sys mb-3 inline-block w-fit"
                style={getCategoryStyle(card.category)}
              >
                {card.categoryLabel}
              </span>
            )}
            <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold uppercase">
              {card.title}
            </h3>
            {card.excerpt && (
              <p className="t-body mt-3 text-muted-foreground max-w-xl">
                {card.excerpt}
              </p>
            )}
            <div
              className="flex items-center gap-4 mt-5 pt-4"
              style={{ borderTop: '1.5px solid var(--border)' }}
            >
              {card.publishedAt && (
                <p className="t-meta text-muted-foreground text-xs">
                  {formatDate(card.publishedAt)}
                </p>
              )}
              <span className="btn-stats inline-flex items-center gap-1.5 text-xs ml-auto">
                {locale === 'en' ? 'READ' : 'OKU'}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </SpotlightCard>
  )
}

/* ═══════════ Small Card ═══════════ */

function SmallCard({
  card,
  locale,
  formatDate,
  reducedMotion,
}: {
  card: BentoCardData
  locale: string
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

  const postHref = `/gunluk/${card.slug}` as const

  return (
    <SpotlightCard>
      <Link href={postHref} data-blog-card className="bg-background flex flex-col group h-full">
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
              className="badge-sys mb-2 inline-block w-fit"
              style={getCategoryStyle(card.category)}
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
            <span className="font-heading text-xs font-bold uppercase tracking-wider flex items-center gap-1 text-muted-foreground group-hover:text-foreground transition-colors underline-offset-4 group-hover:underline">
              {locale === 'en' ? 'READ' : 'OKU'}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </SpotlightCard>
  )
}
