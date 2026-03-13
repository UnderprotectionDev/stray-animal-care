import React from 'react'
import type { Post, SiteSetting } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'
import { formatDate } from '@/utilities/formatDate'

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
      <div className="panel py-4 px-6 flex items-center justify-between border-b border-border">
        <h2 className="t-h2">{block.sectionTitle}</h2>
        {block.viewAllLabel && block.viewAllLink && (
          <Link href={block.viewAllLink} className="btn-cta text-xs py-2 px-4">
            {block.viewAllLabel}
          </Link>
        )}
      </div>
      <div className="g-1 md:g-3">
        {posts.map((post) => {
          const image = post.meta?.image
          return (
            <Link key={post.id} href={`/posts/${post.slug}`} className="panel p-0 group">
              {image && typeof image !== 'number' && (
                <div className="aspect-video overflow-hidden">
                  <Media
                    resource={image}
                    className="h-full w-full object-cover photo-sys"
                  />
                </div>
              )}
              <div className="p-4 border-t border-border">
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
