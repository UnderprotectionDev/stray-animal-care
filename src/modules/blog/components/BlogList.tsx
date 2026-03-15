'use client'

import React from 'react'
import { useQueryState } from 'nuqs'
import { BlogCard } from './BlogCard'
import type { Post } from '@/payload-types'

type BlogListProps = {
  posts: Post[]
  categoryLabels: Record<string, string>
  readMoreLabel: string
  emptyLabel: string
  locale?: string
}

export function BlogList({ posts, categoryLabels, readMoreLabel, emptyLabel, locale }: BlogListProps) {
  const [category] = useQueryState('category', { defaultValue: '' })

  const filtered = category
    ? posts.filter((p) => p.postCategory === category)
    : posts

  if (filtered.length === 0) {
    return (
      <div className="border border-border bg-background py-16 text-center t-meta">
        {emptyLabel}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-[1px] bg-foreground md:grid-cols-3">
      {filtered.map((post) => (
        <BlogCard
          key={post.id}
          post={post}
          categoryLabel={post.postCategory ? categoryLabels[post.postCategory] : undefined}
          readMoreLabel={readMoreLabel}
          locale={locale}
        />
      ))}
    </div>
  )
}
