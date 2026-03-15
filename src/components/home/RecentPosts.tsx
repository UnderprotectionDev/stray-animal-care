import React from 'react'
import type { Post, SiteSetting } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'
import { formatDate } from '@/utilities/formatDate'
import { CATEGORY_LABELS_FALLBACK } from '@/utilities/categoryLabels'
import { SectionHeader } from './SectionHeader'

type RecentPostsBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeRecentPosts' }>

type Props = {
  block: RecentPostsBlock
  posts: Post[]
  locale: string
}

export function RecentPosts({ block, posts, locale }: Props) {
  if (!posts.length) return null

  return (
    <section>
      <SectionHeader title={block.sectionTitle} viewAllLabel={block.viewAllLabel} viewAllLink={block.viewAllLink} />
      <div className="g-1 md:g-3">
        {posts.map((post) => {
          const image = post.heroImage ?? post.meta?.image
          return (
            <Link key={post.id} href={`/gunluk/${post.slug}`} className="panel p-0 group">
              {image && typeof image !== 'number' && (
                <div className="aspect-video overflow-hidden">
                  <Media
                    resource={image}
                    className="h-full w-full object-cover photo-sys"
                  />
                </div>
              )}
              <div className="p-4 border-t border-border">
                {post.postCategory && (
                  <span className="badge-sys text-[10px] mb-2 inline-block bg-warm text-warm-foreground border-warm">
                    {CATEGORY_LABELS_FALLBACK[post.postCategory] ?? post.postCategory}
                  </span>
                )}
                <h3 className="t-meta font-bold uppercase">{post.title}</h3>
                {post.excerpt && (
                  <p className="t-meta text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
                )}
                {post.publishedAt && (
                  <p className="t-meta text-muted-foreground mt-2 text-xs">
                    {formatDate(post.publishedAt, locale)}
                  </p>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
