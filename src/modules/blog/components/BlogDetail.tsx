import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { TagList } from './TagList'
import { SocialShare } from './SocialShare'
import type { Post, Media as MediaType } from '@/payload-types'

type BlogDetailProps = {
  post: Post
  shareUrl: string
  categoryLabel?: string
  tagsLabel: string
  locale?: string
  shareLabels: {
    title: string
    twitter: string
    facebook: string
    whatsapp: string
    copy: string
    copied: string
  }
}

export function BlogDetail({ post, shareUrl, categoryLabel, tagsLabel, shareLabels, locale = 'tr' }: BlogDetailProps) {
  const heroImage = post.heroImage as MediaType | null

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', {
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
        <div className="relative aspect-video w-full bg-muted border-b border-border">
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
              <span className="badge-sys">
                {categoryLabel ?? post.postCategory}
              </span>
            )}
            {publishedDate && (
              <span className="t-meta">{publishedDate}</span>
            )}
            {authorNames && (
              <span className="t-meta">{authorNames}</span>
            )}
          </div>
          <h1 className="t-mega">{post.title}</h1>
        </div>

        {post.content && (
          <div className="panel border border-border p-6 mb-8">
            <RichText data={post.content} enableGutter={false} />
          </div>
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
