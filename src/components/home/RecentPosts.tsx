import React from 'react'
import { getTranslations, getFormatter } from 'next-intl/server'
import type { Post } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'

type RecentPostsProps = {
  posts: Post[]
}

export async function RecentPosts({ posts }: RecentPostsProps) {
  const t = await getTranslations('home.posts')
  const format = await getFormatter()

  if (!posts.length) return null

  return (
    <section>
      <div className="panel py-4 px-6 flex items-center justify-between border-b border-border">
        <h2 className="t-h2">{t('title')}</h2>
        <Link href="/gunluk" className="btn-cta text-xs py-2 px-4">
          {t('viewAll')}
        </Link>
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
                    {format.dateTime(new Date(post.publishedAt), { dateStyle: 'medium' })}
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
