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
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] border-4 border-foreground">
        {/* ── Left Column: Posts ── */}
        <div className="flex flex-col">
          {/* Posts Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b-4 border-foreground bg-background">
            <h2 className="t-neo-title">{postsBlock.sectionTitle}</h2>
            {postsBlock.viewAllLabel && postsBlock.viewAllLink && (
              <Link
                href={postsBlock.viewAllLink}
                className="border-2 border-foreground bg-accent px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest neo-shadow transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                {postsBlock.viewAllLabel} →
              </Link>
            )}
          </div>

          {/* Hero Post */}
          {hero && (
            <Link
              href={`/gunluk/${hero.slug}`}
              className="group flex flex-col justify-end p-6 lg:p-8 bg-background border-b-4 border-foreground min-h-[280px] lg:min-h-[340px] flex-1"
            >
              {hero.postCategory && (
                <span className="inline-block w-fit border-2 border-foreground bg-accent px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-widest neo-shadow-sm mb-4 transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none">
                  {CATEGORY_LABELS_FALLBACK[hero.postCategory] ?? hero.postCategory}
                </span>
              )}
              <h3 className="font-heading font-black text-4xl lg:text-5xl uppercase leading-[0.95] tracking-tight group-hover:text-accent-foreground/70 transition-colors">
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
              className={`grid ${secondary.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-[1px] bg-foreground`}
            >
              {secondary.map((post) => (
                <Link
                  key={post.id}
                  href={`/gunluk/${post.slug}`}
                  className="group flex flex-col justify-end p-5 lg:p-6 bg-background min-h-[180px]"
                >
                  {post.postCategory && (
                    <span className="inline-block w-fit border-2 border-foreground bg-accent px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest neo-shadow-sm mb-3 transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none">
                      {CATEGORY_LABELS_FALLBACK[post.postCategory] ?? post.postCategory}
                    </span>
                  )}
                  <h3 className="font-heading font-black text-2xl lg:text-3xl uppercase leading-[0.95] tracking-tight group-hover:text-muted-foreground transition-colors">
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
        <div className="flex flex-col border-t-4 lg:border-t-0 lg:border-l-4 border-foreground">
          {/* Transparency Header */}
          <div className="px-6 py-5 bg-accent border-b-4 border-foreground">
            <h2 className="t-h2">{transparencyBlock.title}</h2>
            {transparencyBlock.description && (
              <p className="t-meta text-foreground/70 mt-1">
                {transparencyBlock.description}
              </p>
            )}
            {transparencyBlock.ctaLabel && transparencyBlock.ctaLink && (
              <Link
                href={transparencyBlock.ctaLink}
                className="inline-block mt-3 border-2 border-foreground bg-background px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest neo-shadow transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                {transparencyBlock.ctaLabel} →
              </Link>
            )}
          </div>

          {/* Stat Cards */}
          {report && (
            <div className="flex flex-col flex-1">
              {/* Total Income */}
              <div className="relative flex-1 p-6 bg-background border-b-4 border-foreground overflow-hidden">
                {/* Faint decorative lines */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <pattern id="diag" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0 20L20 0" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#diag)" />
                </svg>
                <p className="t-meta text-muted-foreground uppercase text-xs relative">
                  {locale === 'en' ? 'Total Income' : 'Toplam Gelir'}
                </p>
                <p className="t-neo-stat mt-2 relative">
                  {report.totalDonation != null ? formatCurrency(report.totalDonation) : '—'}
                </p>
              </div>

              {/* Total Expense */}
              <div className="flex-1 p-6 bg-[#f8f9fa] border-b-4 border-foreground">
                <p className="t-meta text-muted-foreground uppercase text-xs">
                  {locale === 'en' ? 'Total Expense' : 'Toplam Gider'}
                </p>
                <p className="t-neo-stat mt-2 text-muted-foreground">
                  {report.totalExpense != null ? formatCurrency(report.totalExpense) : '—'}
                </p>
              </div>

              {/* Donor Count */}
              <div className="relative flex-1 p-6 bg-foreground text-background overflow-hidden">
                {/* Heart SVG decoration */}
                <svg
                  className="absolute right-4 bottom-4 w-16 h-16 opacity-10 pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <p className="t-meta text-accent uppercase text-xs relative">
                  {locale === 'en' ? 'Donor Count' : 'Bağışçı Sayısı'}
                </p>
                <p className="t-neo-stat mt-2 relative">{report.donorList?.length ?? 0}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
