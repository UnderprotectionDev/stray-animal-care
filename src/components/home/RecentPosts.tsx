import React from 'react'
import type { Post, SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { CATEGORY_LABELS_FALLBACK } from '@/utilities/categoryLabels'
import { extractText, calculateReadingTime } from '@/modules/blog/lib/readingTime'
import { AnimatedSectionHeader } from './AnimatedSectionHeader'
import BlogCardsCarousel from './BlogCardsCarousel'
import type { BlogCarouselCardData } from './BlogCardsCarousel'

type RecentPostsBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeRecentPosts' }>

type Props = {
  block: RecentPostsBlock
  posts: Post[]
  locale: string
}

function serializePosts(posts: Post[]): BlogCarouselCardData[] {
  return posts.map((post) => {
    const img = post.heroImage ?? post.meta?.image
    const imageUrl = img && typeof img !== 'number' ? getMediaUrl(img.url) : ''
    const imageAlt = img && typeof img !== 'number' ? (img.alt || post.title) : post.title

    const fullText = post.content ? extractText(post.content) : ''
    console.log('[RecentPosts] post:', post.title, 'hasContent:', !!post.content, 'fullTextLen:', fullText.length, 'fullText:', fullText.slice(0, 100))
    const contentPreview = fullText.length > 300 ? fullText.slice(0, 300).trimEnd() + '…' : fullText || null
    const readingTime = post.content ? calculateReadingTime(post.content) : null

    return {
      id: post.id,
      title: post.title,
      slug: post.slug || '',
      excerpt: post.excerpt || null,
      contentPreview,
      readingTime,
      category: post.postCategory || null,
      categoryLabel: post.postCategory
        ? (CATEGORY_LABELS_FALLBACK[post.postCategory] ?? post.postCategory)
        : '',
      publishedAt: post.publishedAt || null,
      imageUrl,
      imageAlt,
    }
  })
}

export function RecentPosts({ block, posts, locale }: Props) {
  if (!posts.length) return null

  const cards = serializePosts(posts)

  return (
    <section>
      <AnimatedSectionHeader title={block.sectionTitle} viewAllLabel={block.viewAllLabel} viewAllLink={block.viewAllLink} accentColor="stats" />
      <BlogCardsCarousel
        cards={cards}
        locale={locale}
        readMoreLabel={locale === 'en' ? 'Read More' : 'Devamını Oku'}
      />
    </section>
  )
}
