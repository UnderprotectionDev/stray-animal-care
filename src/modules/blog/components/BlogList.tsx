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
}

export function BlogList({ posts, categoryLabels, readMoreLabel, emptyLabel }: BlogListProps) {
  const [category] = useQueryState('category', { defaultValue: '' })

  const filtered = category
    ? posts.filter((p) => p.postCategory === category)
    : posts

  if (filtered.length === 0) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        {emptyLabel}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((post) => (
        <BlogCard
          key={post.id}
          post={post}
          categoryLabel={post.postCategory ? categoryLabels[post.postCategory] : undefined}
          readMoreLabel={readMoreLabel}
        />
      ))}
    </div>
  )
}
