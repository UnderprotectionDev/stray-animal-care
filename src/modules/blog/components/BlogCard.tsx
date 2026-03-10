'use client'

import React, { useRef } from 'react'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'
import { Card } from '@/components/ui/card'
import type { Post, Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

const categoryColorMap: Record<string, string> = {
  kurtarma: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  tedavi: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  gunluk: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  duyuru: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  etkinlik: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
}

type BlogCardProps = {
  post: Post
  categoryLabel?: string
  readMoreLabel: string
}

export function BlogCard({ post, categoryLabel, readMoreLabel }: BlogCardProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const heroImage = post.heroImage as MediaType | null

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-shadow duration-200 hover:shadow-warm-md"
      onClick={() => linkRef.current?.click()}
    >
      <div className="relative aspect-video bg-muted">
        {heroImage && typeof heroImage === 'object' ? (
          <Media
            resource={heroImage}
            fill
            imgClassName="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <span className="text-4xl">📝</span>
          </div>
        )}
        {post.postCategory && (
          <div className="absolute top-2 left-2">
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                categoryColorMap[post.postCategory] ?? 'bg-muted text-foreground',
              )}
            >
              {categoryLabel ?? post.postCategory}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <Link
          ref={linkRef}
          href={`/gunluk/${post.slug}`}
          className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2"
        >
          {post.title}
        </Link>
        {publishedDate && (
          <p className="mt-1 text-xs text-muted-foreground">{publishedDate}</p>
        )}
        {post.excerpt && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
        )}
        <p className="mt-3 text-sm font-medium text-primary">{readMoreLabel}</p>
      </div>
    </Card>
  )
}
