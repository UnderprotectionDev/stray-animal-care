'use client'

import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'motion/react'
import { useQueryState } from 'nuqs'
import { X, ArrowRight, FilterX, Calendar } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'

const BlurFade = dynamic(() => import('@/components/BlurFade').then(mod => mod.BlurFade), { ssr: false })
import { BlogCardEnhanced } from './BlogCardEnhanced'
import { useOutsideClick } from '@/hooks/use-outside-click'
import { getCategoryStyle, getCategorySemanticToken } from '@/utilities/categoryTokens'
import { formatDate } from '@/utilities/formatDate'
import type { Post, Media as MediaType } from '@/payload-types'

type BlogListAnimatedProps = {
  posts: Post[]
  categoryLabels: Record<string, string>
  readMoreLabel: string
  emptyLabel: string
  locale?: string
}

export function BlogListAnimated({
  posts,
  categoryLabels,
  readMoreLabel,
  emptyLabel,
  locale = 'tr',
}: BlogListAnimatedProps) {
  const [category, setCurrent] = useQueryState('category', { defaultValue: '' })
  const [active, setActive] = useState<Post | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const expandedRef = useRef<HTMLDivElement>(null)

  const filtered = category
    ? posts.filter((p) => p.postCategory === category)
    : posts

  const showFeatured = !category && filtered.length > 1

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setActive(null)
    }

    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [active])

  useOutsideClick(expandedRef, () => setActive(null))

  if (filtered.length === 0) {
    return (
      <div className="py-12 text-center flex flex-col items-center gap-4 border border-border/20">
        <span className="text-6xl opacity-15">🐾</span>
        <h3 className="t-h2">{emptyLabel}</h3>
        {category && (
          <button
            type="button"
            onClick={() => setCurrent(null)}
            className="btn-cta text-xs py-2 px-5 inline-flex items-center gap-2"
          >
            <FilterX className="w-3.5 h-3.5" />
            Filtreyi Temizle
          </button>
        )}
      </div>
    )
  }

  const activeHeroImage = active ? (active.heroImage as MediaType | null) : null
  const activeDate = active?.publishedAt ? formatDate(active.publishedAt, locale) : null
  const activeSemanticToken = active?.postCategory ? getCategorySemanticToken(active.postCategory) : 'palette-black'

  const featuredPost = showFeatured ? filtered[0] : null
  const gridPosts = showFeatured ? filtered.slice(1) : filtered

  return (
    <>
      {/* Expanded Card Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[110] p-4">
            <motion.div
              layoutId={`card-${active.id}`}
              ref={expandedRef}
              className="w-full max-w-3xl bg-background border-[1.5px] border-[var(--border)] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-background/90 backdrop-blur-sm border-[1.5px] border-[var(--border)] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hero image */}
              <motion.div layoutId={`image-${active.id}`} className="relative h-56 sm:h-72 md:h-80 bg-muted shrink-0">
                {activeHeroImage && typeof activeHeroImage === 'object' && (
                  <Media
                    resource={activeHeroImage}
                    fill
                    imgClassName="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {active.postCategory && (
                  <span
                    className="badge-sys absolute bottom-4 left-6 z-10"
                    style={getCategoryStyle(active.postCategory)}
                  >
                    {categoryLabels[active.postCategory] ?? active.postCategory}
                  </span>
                )}
              </motion.div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col gap-5 overflow-y-auto">
                <motion.h3
                  layoutId={`title-${active.id}`}
                  className="font-heading text-xl sm:text-2xl md:text-3xl font-bold uppercase leading-tight"
                >
                  {active.title}
                </motion.h3>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4, ease: 'easeOut' }}
                  className="flex flex-col gap-5"
                >
                  {/* Accent bar + date */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-[3px] shrink-0"
                      style={{ background: `var(--${activeSemanticToken})` }}
                    />
                    {activeDate && (
                      <span className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {activeDate}
                      </span>
                    )}
                  </div>

                  {/* Excerpt as pull-quote */}
                  {active.excerpt && (
                    <div
                      className="border-l-[3px] pl-4 md:pl-5 py-1"
                      style={{ borderColor: `var(--${activeSemanticToken})` }}
                    >
                      <motion.p
                        layoutId={`excerpt-${active.id}`}
                        className="text-sm md:text-[0.938rem] text-muted-foreground font-mono leading-relaxed"
                      >
                        {active.excerpt}
                      </motion.p>
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/gunluk/${active.slug}`}
                    className="btn-cta inline-flex items-center gap-2 text-sm py-3 px-6 w-fit"
                  >
                    {readMoreLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card Layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col"
        >
          {/* Featured Card */}
          {featuredPost && (
            <>
              <BlurFade delay={0} inView direction="up" offset={10}>
                <BlogCardEnhanced
                  post={featuredPost}
                  categoryLabel={featuredPost.postCategory ? categoryLabels[featuredPost.postCategory] : undefined}
                  readMoreLabel={readMoreLabel}
                  locale={locale}
                  index={0}
                  onSelect={setActive}
                  isFeatured
                  isFocusDimmed={hovered !== null && hovered !== 0}
                  onMouseEnter={() => setHovered(0)}
                  onMouseLeave={() => setHovered(null)}
                />
              </BlurFade>
              <hr className="border-border/20 my-6" />
            </>
          )}

          {/* Remaining Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post, index) => {
              const actualIndex = showFeatured ? index + 1 : index
              return (
                <BlurFade
                  key={post.id}
                  delay={0.06 * index}
                  inView
                  direction="up"
                  offset={10}
                >
                  <BlogCardEnhanced
                    post={post}
                    categoryLabel={post.postCategory ? categoryLabels[post.postCategory] : undefined}
                    readMoreLabel={readMoreLabel}
                    locale={locale}
                    index={actualIndex}
                    onSelect={setActive}
                    isFeatured={false}
                    isFocusDimmed={hovered !== null && hovered !== actualIndex}
                    onMouseEnter={() => setHovered(actualIndex)}
                    onMouseLeave={() => setHovered(null)}
                  />
                </BlurFade>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
