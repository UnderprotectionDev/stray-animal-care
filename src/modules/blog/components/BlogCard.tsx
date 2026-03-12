'use client'

import React, { useRef } from 'react'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'
import type { Post, Media as MediaType } from '@/payload-types'

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
    <div
      className="group cursor-pointer border border-border bg-background"
      onClick={() => linkRef.current?.click()}
    >
      <div className="relative aspect-video bg-muted">
        {heroImage && typeof heroImage === 'object' ? (
          <Media
            resource={heroImage}
            fill
            imgClassName="object-cover photo-sys"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-foreground/40">
            <span className="t-h1">--</span>
          </div>
        )}
        {post.postCategory && (
          <div className="absolute top-0 left-0">
            <span className="badge-sys">
              {categoryLabel ?? post.postCategory}
            </span>
          </div>
        )}
      </div>
      <div className="border-t border-border p-4 space-y-1">
        <Link
          ref={linkRef}
          href={`/gunluk/${post.slug}`}
          className="t-body font-semibold text-foreground hover:underline line-clamp-2 block"
        >
          {post.title}
        </Link>
        {publishedDate && (
          <p className="t-meta">{publishedDate}</p>
        )}
        {post.excerpt && (
          <p className="t-meta line-clamp-2">{post.excerpt}</p>
        )}
        <p className="t-meta font-medium uppercase tracking-wide pt-1">{readMoreLabel} &rarr;</p>
      </div>
    </div>
  )
}
