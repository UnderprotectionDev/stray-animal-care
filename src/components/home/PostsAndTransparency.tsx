import React from 'react'
import type { Post, SiteSetting, TransparencyReport } from '@/payload-types'
import type { TransparencyStats } from './RenderHomepageBlocks'
import { Link } from '@/i18n/navigation'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { CATEGORY_LABELS_FALLBACK } from '@/utilities/categoryLabels'
import { extractText, calculateReadingTime } from '@/modules/blog/lib/readingTime'
import { Heart, TrendingDown, Users } from 'lucide-react'
import BlogCardsCarousel from './BlogCardsCarousel'
import type { BlogCarouselCardData } from './BlogCardsCarousel'
import { AnimatedMegaHeading } from './AnimatedMegaHeading'
import { SectionDividerBand } from './SectionDividerBand'
import { CountUpCurrency } from './CountUpCurrency'
import { CountUpNumber } from './CountUpNumber'

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
  transparencyStats?: TransparencyStats
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

function serializeBlogCards(posts: Post[]): BlogCarouselCardData[] {
  return posts.map((post) => {
    const image = getPostImage(post)
    const fullText = post.content ? extractText(post.content) : ''
    const contentPreview = fullText.length > 600 ? fullText.slice(0, 600).trimEnd() + '…' : fullText || null
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
  transparencyStats,
  locale,
}: Props) {
  const serializedCards = serializeBlogCards(posts)

  return (
    <>
      {/* ═══════════ BLOG SECTION ═══════════ */}
      <section className="bg-background pb-6">
        {/* Header bar */}
        <div className="panel py-5 px-6 lg:px-8 flex flex-col gap-1 border-b-[1.5px] border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <AnimatedMegaHeading text={postsBlock.sectionTitle} enableColorFlash />
              <div className="w-24 h-1 mt-3" style={{ background: 'var(--stats)' }} />
            </div>
            {postsBlock.viewAllLabel && postsBlock.viewAllLink && (
              <Link href={postsBlock.viewAllLink} className="btn-stats text-xs py-2 px-5 self-start sm:self-auto">
                {postsBlock.viewAllLabel}
              </Link>
            )}
          </div>
        </div>

        {/* Blog carousel */}
        <BlogCardsCarousel
          cards={serializedCards}
          locale={locale}
          readMoreLabel={locale === 'en' ? 'Read More' : 'Devamını Oku'}
        />
      </section>

      {/* ═══════════ DIVIDER ═══════════ */}
      <SectionDividerBand
        texts={['GÜNLÜK', 'HABERLER', 'HİKAYELER', 'DUYURULAR', 'ETKİNLİKLER']}
        bgColor="var(--palette-forest)"
        textColor="var(--palette-cream)"
        velocity={45}
      />

      {/* ═══════════ TRANSPARENCY SECTION ═══════════ */}
      <section>
        {/* Header bar — matches blog section layout (inverted colors) */}
        <div className="bg-foreground py-5 px-6 lg:px-8 border-b-[1.5px] border-background/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <AnimatedMegaHeading text={transparencyBlock.title} style={{ color: 'var(--background)' }} />
              <div className="w-24 h-1 mt-3" style={{ background: 'var(--trust)' }} />
            </div>
            {transparencyBlock.ctaLabel && transparencyBlock.ctaLink && (
              <Link href={transparencyBlock.ctaLink} className="btn-stats text-xs py-2 px-5 self-start sm:self-auto">
                {transparencyBlock.ctaLabel}
              </Link>
            )}
          </div>
        </div>

        {/* Stat grid */}
        {(transparencyStats || report) && (
          <div
            className="grid grid-cols-1 lg:grid-cols-3"
            style={{ gap: '1.5px', background: 'var(--palette-black)' }}
          >
            {/* Total Income */}
            <div className="bg-foreground text-background py-8 lg:py-12 p-6 lg:p-8 flex flex-col justify-end">
              <p className="t-mega text-health">
                <CountUpCurrency value={transparencyStats?.totalIncome ?? report?.totalDonation ?? 0} />
              </p>
              <div className="border-t border-background/20 mt-4 pt-4 flex items-center justify-between">
                <p className="font-heading font-bold uppercase tracking-wider text-sm">
                  {locale === 'en' ? 'TOTAL INCOME' : 'TOPLAM GELİR'}
                </p>
                <Heart className="w-5 h-5" />
              </div>
            </div>

            {/* Total Expense */}
            <div className="bg-foreground text-background py-8 lg:py-12 p-6 lg:p-8 flex flex-col justify-end">
              <p className="t-mega text-emergency">
                <CountUpCurrency value={transparencyStats?.totalExpense ?? report?.totalExpense ?? 0} />
              </p>
              <div className="border-t border-background/20 mt-4 pt-4 flex items-center justify-between">
                <p className="font-heading font-bold uppercase tracking-wider text-sm">
                  {locale === 'en' ? 'TOTAL EXPENSE' : 'TOPLAM GİDER'}
                </p>
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>

            {/* Total Donors */}
            <div className="bg-foreground text-background py-8 lg:py-12 p-6 lg:p-8 flex flex-col justify-end">
              <p className="t-mega text-background">
                <CountUpNumber target={transparencyStats?.totalDonors ?? report?.donorList?.length ?? 0} />
              </p>
              <div className="border-t border-background/20 mt-4 pt-4 flex items-center justify-between">
                <p className="font-heading font-bold uppercase tracking-wider text-sm">
                  {locale === 'en' ? 'TOTAL DONORS' : 'TOPLAM BAĞIŞÇI'}
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
