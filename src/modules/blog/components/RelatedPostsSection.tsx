import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'
import { getCategoryStyle } from '@/utilities/categoryTokens'
import { formatDate } from '@/utilities/formatDate'
import type { Post, Media as MediaType } from '@/payload-types'

type RelatedPostsSectionProps = {
  posts: Post[]
  locale?: string
  categoryLabels?: Record<string, string>
  semanticToken?: string
  title?: string
}

export function RelatedPostsSection({
  posts,
  locale = 'tr',
  categoryLabels,
  semanticToken = 'palette-black',
  title = 'İlgili Yazılar',
}: RelatedPostsSectionProps) {
  const accentColor = semanticToken === 'palette-black' ? 'var(--palette-black)' : `var(--${semanticToken})`
  const resolvedPosts = posts.filter(
    (p): p is Post => typeof p === 'object' && p !== null && 'slug' in p,
  )

  if (resolvedPosts.length === 0) return null

  return (
    <div className="px-4 md:px-6 lg:px-8 py-10 mt-4 border-t border-border/10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-[3px] rounded-full" style={{ background: accentColor }} />
          <h3 className="font-heading text-lg font-bold uppercase tracking-wide">{title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {resolvedPosts.slice(0, 3).map((post) => {
            const heroImage = post.heroImage as MediaType | null
            const publishedDate = post.publishedAt
              ? formatDate(post.publishedAt, locale ?? 'tr')
              : null

            return (
              <Link
                key={post.id}
                href={`/gunluk/${post.slug}`}
                className="group block rounded-lg border border-border/15 bg-background overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[16/9] bg-muted overflow-hidden">
                  {heroImage && typeof heroImage === 'object' ? (
                    <Media
                      resource={heroImage}
                      fill
                      imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-foreground/30">
                      <span className="text-4xl">🐾</span>
                    </div>
                  )}
                  {post.postCategory && (
                    <span
                      className="badge-sys absolute top-2 left-2 z-10 text-[10px]"
                      style={getCategoryStyle(post.postCategory)}
                    >
                      {categoryLabels?.[post.postCategory] ?? post.postCategory}
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="font-heading text-sm font-bold uppercase leading-tight line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    {publishedDate && (
                      <span className="text-[11px] text-muted-foreground font-mono">
                        {publishedDate}
                      </span>
                    )}
                    <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-foreground transition-all group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
