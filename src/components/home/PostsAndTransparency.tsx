import React from 'react'
import type { Post, SiteSetting, TransparencyReport } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'
import { formatDate } from '@/utilities/formatDate'
import { formatCurrency } from '@/utilities/formatCurrency'
import { CATEGORY_LABELS_FALLBACK } from '@/utilities/categoryLabels'
import { ArrowUp, ArrowDown, Users } from 'lucide-react'
import { AnimatedMegaHeading } from './AnimatedMegaHeading'
import BlurText from '@/components/BlurText'

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
  const heroImage = hero ? (hero.heroImage ?? hero.meta?.image) : null

  return (
    <>
      {/* ═══════════ BLOG SECTION ═══════════ */}
      <section>
        {/* Header bar */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto]"
          style={{ gap: '1.5px', background: 'var(--palette-black)' }}
        >
          <div className="bg-background px-6 py-5 lg:px-8 lg:py-6">
            <p className="t-comment mb-1">{'// BLOG & HABERLER'}</p>
            <AnimatedMegaHeading text={postsBlock.sectionTitle} tag="h2" />
          </div>
          {postsBlock.viewAllLabel && postsBlock.viewAllLink && (
            <Link
              href={postsBlock.viewAllLink}
              className="flex items-center justify-center bg-cta text-cta-foreground px-8 py-4 font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
            >
              {postsBlock.viewAllLabel}
            </Link>
          )}
        </div>

        {/* Content grid: 8 + 4 */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12"
          style={{ gap: '1.5px', background: 'var(--palette-black)' }}
        >
          {/* Featured post */}
          {hero && (
            <Link
              href={`/gunluk/${hero.slug}`}
              className="group lg:col-span-8 bg-background flex flex-col"
            >
              {heroImage && typeof heroImage !== 'number' && (
                <div className="relative h-[300px] lg:h-[450px] overflow-hidden">
                  <Media
                    resource={heroImage}
                    fill
                    imgClassName="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {hero.postCategory && (
                    <span className="badge-sys bg-foreground text-background absolute top-4 left-4 text-[10px]">
                      {CATEGORY_LABELS_FALLBACK[hero.postCategory] ?? hero.postCategory}
                    </span>
                  )}
                </div>
              )}
              <div className="p-6 lg:p-8 flex flex-col flex-1">
                {!heroImage && hero.postCategory && (
                  <span className="badge-sys bg-foreground text-background text-[10px] mb-4 inline-block w-fit">
                    {CATEGORY_LABELS_FALLBACK[hero.postCategory] ?? hero.postCategory}
                  </span>
                )}
                <BlurText
                  text={hero.title}
                  tag="h3"
                  className="font-heading text-2xl lg:text-4xl font-bold uppercase group-hover:text-muted-foreground transition-colors"
                  animateBy="words"
                  delay={60}
                  stepDuration={0.3}
                  direction="bottom"
                  threshold={0.2}
                  animationFrom={{ filter: 'blur(6px)', opacity: 0, y: 15 }}
                  animationTo={[{ filter: 'blur(0px)', opacity: 1, y: 0 }]}
                />
                {hero.excerpt && (
                  <p className="t-body text-muted-foreground mt-3 line-clamp-3 max-w-2xl">
                    {hero.excerpt}
                  </p>
                )}
                {hero.publishedAt && (
                  <>
                    <div className="border-t border-border mt-auto pt-4">
                      <p className="t-meta text-muted-foreground text-xs">
                        {formatDate(hero.publishedAt, locale)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </Link>
          )}

          {/* Secondary posts */}
          <div
            className="lg:col-span-4 grid grid-rows-1 lg:grid-rows-2"
            style={{ gap: '1.5px', background: 'var(--palette-black)' }}
          >
            {secondary.map((post) => (
              <Link
                key={post.id}
                href={`/gunluk/${post.slug}`}
                className="group bg-background hover:bg-white transition-colors flex flex-col p-5 lg:p-6"
              >
                {post.postCategory && (
                  <span className="badge-sys bg-warm text-warm-foreground border-warm group-hover:bg-foreground group-hover:text-background text-[10px] mb-3 inline-block w-fit transition-colors">
                    {CATEGORY_LABELS_FALLBACK[post.postCategory] ?? post.postCategory}
                  </span>
                )}
                <h3 className="font-heading text-lg lg:text-xl font-bold uppercase group-hover:text-muted-foreground transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="t-meta text-muted-foreground mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-auto pt-4">
                  {post.publishedAt && (
                    <p className="t-meta text-muted-foreground text-xs">
                      {formatDate(post.publishedAt, locale)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TRANSPARENCY SECTION ═══════════ */}
      <section>
        {/* Header bar */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto]"
          style={{ gap: '1.5px', background: 'var(--palette-black)' }}
        >
          <div className="bg-foreground text-background px-6 py-5 lg:px-8 lg:py-6">
            <p className="t-comment mb-1">{'// AÇIK DEFTER'}</p>
            <AnimatedMegaHeading text={transparencyBlock.title} tag="h2" />
          </div>
          {transparencyBlock.ctaLabel && transparencyBlock.ctaLink && (
            <Link
              href={transparencyBlock.ctaLink}
              className="flex items-center justify-center bg-foreground text-background px-8 py-4 font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
            >
              {transparencyBlock.ctaLabel}
            </Link>
          )}
        </div>

        {/* Stat grid */}
        {report && (
          <div
            className="grid grid-cols-1 lg:grid-cols-3"
            style={{ gap: '1.5px', background: 'var(--palette-black)' }}
          >
            {/* Income */}
            <div className="bg-foreground text-background py-8 lg:py-12 p-6 lg:p-8 flex flex-col justify-end">
              <p className="t-mega text-health">
                {report.totalDonation != null ? formatCurrency(report.totalDonation) : '—'}
              </p>
              <div className="border-t border-background/20 mt-4 pt-4 flex items-center justify-between">
                <p className="font-heading font-bold uppercase tracking-wider text-sm">
                  {locale === 'en' ? 'MONTHLY INCOME' : 'AYLIK GELİR'}
                </p>
                <ArrowUp className="w-5 h-5" />
              </div>
            </div>

            {/* Expense */}
            <div className="bg-foreground text-background py-8 lg:py-12 p-6 lg:p-8 flex flex-col justify-end">
              <p className="t-mega text-emergency">
                {report.totalExpense != null ? formatCurrency(report.totalExpense) : '—'}
              </p>
              <div className="border-t border-background/20 mt-4 pt-4 flex items-center justify-between">
                <p className="font-heading font-bold uppercase tracking-wider text-sm">
                  {locale === 'en' ? 'MONTHLY EXPENSE' : 'AYLIK GİDER'}
                </p>
                <ArrowDown className="w-5 h-5" />
              </div>
            </div>

            {/* Donors */}
            <div className="bg-foreground text-background py-8 lg:py-12 p-6 lg:p-8 flex flex-col justify-end">
              <p className="t-mega text-background">
                {report.donorList?.length ?? 0}
              </p>
              <div className="border-t border-background/20 mt-4 pt-4 flex items-center justify-between">
                <p className="font-heading font-bold uppercase tracking-wider text-sm">
                  {locale === 'en' ? 'CORPORATE SUPPORTERS' : 'KURUMSAL DESTEKÇİ'}
                </p>
                <Users className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
