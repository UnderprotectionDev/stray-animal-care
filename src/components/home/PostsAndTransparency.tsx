import React from 'react'
import type { Post, SiteSetting, TransparencyReport } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { formatCurrency } from '@/utilities/formatCurrency'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { CATEGORY_LABELS_FALLBACK } from '@/utilities/categoryLabels'
import { ArrowUp, ArrowDown, Users } from 'lucide-react'
import BlogCardsInteractive from './BlogCardsInteractive'
import type { BlogCardData } from './BlogCardsInteractive'

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

function getPostImage(post: Post): { url: string; alt: string } {
  const img = post.heroImage ?? post.meta?.image
  if (img && typeof img !== 'number') {
    return {
      url: getMediaUrl(img.url),
      alt: img.alt || post.title,
    }
  }
  return { url: '', alt: post.title }
}

function serializeBlogCards(posts: Post[]): BlogCardData[] {
  return posts.slice(0, 3).map((post) => {
    const image = getPostImage(post)
    return {
      id: post.id,
      title: post.title,
      slug: post.slug || '',
      excerpt: post.excerpt || null,
      category: post.postCategory || null,
      categoryLabel: post.postCategory
        ? (CATEGORY_LABELS_FALLBACK[post.postCategory] ?? post.postCategory)
        : '',
      publishedAt: post.publishedAt || null,
      imageUrl: image.url,
      imageAlt: image.alt,
    }
  })
}

export function PostsAndTransparency({
  postsBlock,
  transparencyBlock,
  posts,
  report,
  locale,
}: Props) {
  const serializedCards = serializeBlogCards(posts)

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
            <h2 className="t-mega">{postsBlock.sectionTitle}</h2>
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

        {/* Interactive blog cards */}
        <BlogCardsInteractive cards={serializedCards} locale={locale} />
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
            <h2 className="t-mega">{transparencyBlock.title}</h2>
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
