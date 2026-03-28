'use client'

import React from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Media } from '@/components/Media'
import { formatDate } from '@/utilities/formatDate'
import { getCategoryStyle } from '@/utilities/categoryTokens'
import type { Post, Media as MediaType } from '@/payload-types'

type BlogCardEnhancedProps = {
  post: Post
  categoryLabel?: string
  readMoreLabel: string
  locale?: string
  index: number
  onSelect: (post: Post) => void
  isFocusDimmed?: boolean
  isFeatured?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function BlogCardEnhanced({
  post,
  categoryLabel,
  readMoreLabel,
  locale = 'tr',
  index: _index,
  onSelect,
  isFocusDimmed = false,
  isFeatured = false,
  onMouseEnter,
  onMouseLeave,
}: BlogCardEnhancedProps) {
  const heroImage = post.heroImage as MediaType | null
  const publishedDate = post.publishedAt ? formatDate(post.publishedAt, locale) : null

  if (isFeatured) {
    return (
      <motion.div
        layoutId={`card-${post.id}`}
        onClick={() => onSelect(post)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="group cursor-pointer border border-border/20 bg-background overflow-hidden transition-all duration-300 grid grid-cols-1 md:grid-cols-2"
        data-blog-list-card
      >
        {/* Left: Large Image */}
        <motion.div
          layoutId={`image-${post.id}`}
          className="relative bg-muted overflow-hidden aspect-[16/10] md:aspect-auto md:min-h-[320px]"
        >
          {heroImage && typeof heroImage === 'object' ? (
            <Media
              resource={heroImage}
              fill
              imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-foreground/30">
              <span className="text-5xl">🐾</span>
            </div>
          )}
          {post.postCategory && (
            <span
              className="badge-sys absolute top-3 left-3 z-10"
              style={getCategoryStyle(post.postCategory)}
            >
              {categoryLabel ?? post.postCategory}
            </span>
          )}
        </motion.div>

        {/* Right: Content */}
        <div className="p-6 md:p-8 flex flex-col justify-center space-y-3">
          {publishedDate && (
            <span className="text-xs text-muted-foreground font-mono">
              {publishedDate}
            </span>
          )}
          <motion.h3
            layoutId={`title-${post.id}`}
            className="font-heading text-xl md:text-2xl font-bold uppercase leading-tight line-clamp-3"
          >
            {post.title}
          </motion.h3>
          {post.excerpt && (
            <motion.p
              layoutId={`excerpt-${post.id}`}
              className="text-sm text-muted-foreground font-mono line-clamp-3 leading-relaxed"
            >
              {post.excerpt}
            </motion.p>
          )}
          <p className="font-heading text-xs font-bold uppercase tracking-wider flex items-center gap-1 text-muted-foreground group-hover:text-foreground transition-colors pt-2">
            {readMoreLabel}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layoutId={`card-${post.id}`}
      onClick={() => onSelect(post)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group cursor-pointer border border-border/20 bg-background overflow-hidden transition-all duration-300 ${
        isFocusDimmed ? 'scale-[0.98] brightness-75' : 'scale-100 brightness-100'
      }`}
      data-blog-list-card
    >
      <motion.div
        layoutId={`image-${post.id}`}
        className="relative bg-muted overflow-hidden aspect-[4/3]"
      >
        {heroImage && typeof heroImage === 'object' ? (
          <Media
            resource={heroImage}
            fill
            imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-foreground/30">
            <span className="text-5xl">🐾</span>
          </div>
        )}
        {post.postCategory && (
          <span
            className="badge-sys absolute top-3 left-3 z-10"
            style={getCategoryStyle(post.postCategory)}
          >
            {categoryLabel ?? post.postCategory}
          </span>
        )}
      </motion.div>

      <div className="p-4 space-y-2">
        {publishedDate && (
          <span className="text-xs text-muted-foreground font-mono">
            {publishedDate}
          </span>
        )}

        <motion.h3
          layoutId={`title-${post.id}`}
          className="font-heading text-base font-bold uppercase leading-tight line-clamp-2"
        >
          {post.title}
        </motion.h3>

        {post.excerpt && (
          <motion.p
            layoutId={`excerpt-${post.id}`}
            className="text-sm text-muted-foreground font-mono line-clamp-2"
          >
            {post.excerpt}
          </motion.p>
        )}

        <p className="font-heading text-xs font-bold uppercase tracking-wider flex items-center gap-1 text-muted-foreground group-hover:text-foreground transition-colors pt-1">
          {readMoreLabel}
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </p>
      </div>
    </motion.div>
  )
}
