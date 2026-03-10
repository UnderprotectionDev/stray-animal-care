import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Heading } from '@/components/shared/Heading'
import { TagList } from './TagList'
import { SocialShare } from './SocialShare'
import type { Post, Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

const categoryColorMap: Record<string, string> = {
  kurtarma: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  tedavi: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  gunluk: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  duyuru: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  etkinlik: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
}

type BlogDetailProps = {
  post: Post
  shareUrl: string
  categoryLabel?: string
  tagsLabel: string
  shareLabels: {
    title: string
    twitter: string
    facebook: string
    whatsapp: string
    copy: string
    copied: string
  }
}

export function BlogDetail({ post, shareUrl, categoryLabel, tagsLabel, shareLabels }: BlogDetailProps) {
  const heroImage = post.heroImage as MediaType | null

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  const authorNames =
    post.populatedAuthors
      ?.map((a) => a.name)
      .filter(Boolean)
      .join(', ') || null

  return (
    <article>
      {heroImage && typeof heroImage === 'object' && (
        <div className="relative aspect-video w-full bg-muted">
          <Media
            resource={heroImage}
            fill
            imgClassName="object-cover"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12">
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {post.postCategory && (
              <span
                className={cn(
                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                  categoryColorMap[post.postCategory] ?? 'bg-muted text-foreground',
                )}
              >
                {categoryLabel ?? post.postCategory}
              </span>
            )}
            {publishedDate && (
              <span className="text-sm text-muted-foreground">{publishedDate}</span>
            )}
            {authorNames && (
              <span className="text-sm text-muted-foreground">{authorNames}</span>
            )}
          </div>
          <Heading as="h1">{post.title}</Heading>
        </div>

        {post.content && (
          <RichText data={post.content} enableGutter={false} className="mb-8" />
        )}

        {post.tags && post.tags.length > 0 && (
          <TagList tags={post.tags} label={tagsLabel} />
        )}

        <hr className="my-8 border-border" />

        <SocialShare
          url={shareUrl}
          title={post.title}
          labels={shareLabels}
        />
      </div>
    </article>
  )
}
