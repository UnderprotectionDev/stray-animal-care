import React from 'react'
import type { Post, SiteSetting, TransparencyReport } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { formatDate } from '@/utilities/formatDate'
import { formatCurrency } from '@/utilities/formatCurrency'
import { CATEGORY_LABELS_FALLBACK } from '@/utilities/categoryLabels'

type RecentPostsBlock = Extract<
  NonNullable<SiteSetting['homepageBlocks']>[number],
  { blockType: 'homeRecentPosts' }
>
type TransparencyBannerBlock = Extract<
  NonNullable<SiteSetting['homepageBlocks']>[number],
  { blockType: 'homeTransparencyBanner' }
>

type Props = {
  postsBlock: RecentPostsBlock
  transparencyBlock: TransparencyBannerBlock
  posts: Post[]
  report: TransparencyReport | null
  locale: string
}


export function PostsAndTransparency({
  postsBlock,
  transparencyBlock,
  posts,
  report,
  locale,
}: Props) {
  const hero = posts[0] ?? null
  const secondary = posts.slice(1, 3)

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] border-[1.5px] border-border">
        {/* ── Left Column: Posts ── */}
        <div className="flex flex-col">
          {/* Posts Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b-[1.5px] border-border bg-background">
            <h2 className="t-h2">{postsBlock.sectionTitle}</h2>
            {postsBlock.viewAllLabel && postsBlock.viewAllLink && (
              <Link
                href={postsBlock.viewAllLink}
                className="btn-cta text-xs py-2 px-4"
              >
                {postsBlock.viewAllLabel}
              </Link>
            )}
          </div>

          {/* Hero Post */}
          {hero && (
            <Link
              href={`/gunluk/${hero.slug}`}
              className="group flex flex-col justify-end p-6 lg:p-8 bg-background border-b-[1.5px] border-border min-h-[280px] lg:min-h-[340px] flex-1"
            >
              {hero.postCategory && (
                <span className="badge-sys text-[10px] mb-4 inline-block w-fit bg-warm text-warm-foreground border-warm">
                  {CATEGORY_LABELS_FALLBACK[hero.postCategory] ?? hero.postCategory}
                </span>
              )}
              <h3 className="t-h1 uppercase group-hover:text-muted-foreground transition-colors">
                {hero.title}
              </h3>
              {hero.excerpt && (
                <p className="t-body text-muted-foreground mt-3 line-clamp-2 max-w-2xl">
                  {hero.excerpt}
                </p>
              )}
              {hero.publishedAt && (
                <p className="t-meta text-muted-foreground mt-3 text-xs">
                  {formatDate(hero.publishedAt, locale)}
                </p>
              )}
            </Link>
          )}

          {/* Secondary Posts */}
          {secondary.length > 0 && (
            <div
              className={`grid ${secondary.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} divide-x divide-border`}
            >
              {secondary.map((post) => (
                <Link
                  key={post.id}
                  href={`/gunluk/${post.slug}`}
                  className="group flex flex-col justify-end p-5 lg:p-6 bg-background min-h-[180px]"
                >
                  {post.postCategory && (
                    <span className="badge-sys text-[10px] mb-3 inline-block w-fit bg-warm text-warm-foreground border-warm">
                      {CATEGORY_LABELS_FALLBACK[post.postCategory] ?? post.postCategory}
                    </span>
                  )}
                  <h3 className="t-h2 uppercase group-hover:text-muted-foreground transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="t-meta text-muted-foreground mt-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  {post.publishedAt && (
                    <p className="t-meta text-muted-foreground mt-2 text-xs">
                      {formatDate(post.publishedAt, locale)}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── Right Column: Transparency ── */}
        <div className="flex flex-col border-t-[1.5px] lg:border-t-0 lg:border-l-[1.5px] border-border">
          {/* Transparency Header */}
          <div className="px-6 py-5 bg-trust border-b-[1.5px] border-border text-trust-foreground">
            <h2 className="t-h2">{transparencyBlock.title}</h2>
            {transparencyBlock.description && (
              <p className="t-meta text-foreground/70 mt-1">
                {transparencyBlock.description}
              </p>
            )}
            {transparencyBlock.ctaLabel && transparencyBlock.ctaLink && (
              <Link
                href={transparencyBlock.ctaLink}
                className="btn-cta text-xs py-2 px-4 mt-3 inline-flex"
              >
                {transparencyBlock.ctaLabel}
              </Link>
            )}
          </div>

          {/* Stat Cards */}
          {report && (
            <div className="flex flex-col flex-1">
              {/* Total Income */}
              <div className="flex-1 p-6 bg-background border-b-[1.5px] border-border">
                <p className="t-meta text-muted-foreground uppercase text-xs">
                  {locale === 'en' ? 'Total Income' : 'Toplam Gelir'}
                </p>
                <p className="t-mega mt-2">
                  {report.totalDonation != null ? formatCurrency(report.totalDonation) : '—'}
                </p>
              </div>

              {/* Total Expense */}
              <div className="flex-1 p-6 bg-palette-dark-cream border-b-[1.5px] border-border">
                <p className="t-meta text-muted-foreground uppercase text-xs">
                  {locale === 'en' ? 'Total Expense' : 'Toplam Gider'}
                </p>
                <p className="t-mega mt-2 text-muted-foreground">
                  {report.totalExpense != null ? formatCurrency(report.totalExpense) : '—'}
                </p>
              </div>

              {/* Donor Count */}
              <div className="flex-1 p-6 bg-foreground text-background">
                <p className="t-meta text-palette-coral uppercase text-xs">
                  {locale === 'en' ? 'Donor Count' : 'Bağışçı Sayısı'}
                </p>
                <p className="t-mega mt-2">{report.donorList?.length ?? 0}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
