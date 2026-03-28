import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { TagList } from './TagList'
import { SocialShare } from './SocialShare'
import { BlogAuthorBlock } from './BlogAuthorBlock'
import { BlogDetailHero } from './BlogDetailHero'
import { RelatedPostsSection } from './RelatedPostsSection'
import { getCategorySemanticToken } from '@/utilities/categoryTokens'
import { calculateReadingTime } from '../lib/readingTime'
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
  categoryLabels?: Record<string, string>
  relatedPostsLabel?: string
}

export function BlogDetail({
  post,
  shareUrl,
  categoryLabel,
  tagsLabel,
  shareLabels,
  locale = 'tr',
  categoryLabels,
  relatedPostsLabel,
}: BlogDetailProps) {
  const heroImage = post.heroImage as MediaType | null
  const semanticToken = getCategorySemanticToken(post.postCategory ?? null)
  const readingTime = post.content ? calculateReadingTime(post.content) : null

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
    <div className="blog-detail">
      {/* ── Colored Hero Section ── */}
      <BlogDetailHero
        title={post.title}
        excerpt={post.excerpt}
        categoryLabel={categoryLabel}
        categorySlug={post.postCategory}
        publishedDate={publishedDate}
        readingTime={readingTime}
        authorNames={authorNames}
        semanticToken={semanticToken}
        locale={locale}
      />

      {/* ── Hero Image ── */}
      {heroImage && typeof heroImage === 'object' && (
        <div className="px-4 md:px-6 lg:px-8 mt-6 mb-8">
          <div className="mx-auto max-w-3xl">
            <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '2/1', maxHeight: '340px' }}>
              <Media resource={heroImage} fill imgClassName="object-cover" />
            </div>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      {post.content && (
        <div className="px-4 md:px-6 lg:px-8 pb-10">
          <div className="mx-auto max-w-3xl prose-blog prose-blog--clean">
            <RichText data={post.content} enableGutter={false} />
          </div>
        </div>
      )}

      {/* ── Author Block ── */}
      {authorNames && (
        <BlogAuthorBlock
          authorName={authorNames}
          label={locale === 'en' ? 'Author' : 'Yazar'}
          semanticToken={semanticToken}
        />
      )}

      {/* ── Tags & Share ── */}
      {((post.tags && post.tags.length > 0) || shareUrl) && (
        <div className="px-4 md:px-6 lg:px-8 py-8">
          <div className="mx-auto max-w-3xl">
            {post.tags && post.tags.length > 0 && (
              <TagList tags={post.tags} label={tagsLabel} semanticToken={semanticToken} />
            )}

            <SocialShare
              url={shareUrl}
              title={post.title}
              labels={shareLabels}
              semanticToken={semanticToken}
              className={post.tags && post.tags.length > 0 ? 'mt-6' : ''}
            />
          </div>
        </div>
      )}

      {/* ── Related Posts ── */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <RelatedPostsSection
          posts={post.relatedPosts as Post[]}
          locale={locale}
          categoryLabels={categoryLabels}
          semanticToken={semanticToken}
          title={relatedPostsLabel ?? (locale === 'en' ? 'Related Posts' : 'İlgili Yazılar')}
        />
      )}
    </div>
  )
}
