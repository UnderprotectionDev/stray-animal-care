import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Container } from '@/components/shared/Container'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { BlogDetail } from '@/modules/blog'
import { BlogDetailClient } from '@/modules/blog/components/BlogDetailClient'
import { getBlogPostBySlug, getBlogPostSlugs } from '@/modules/blog/lib/queries'
import { getCategorySemanticToken } from '@/utilities/categoryTokens'
import { locales, type Locale } from '@/i18n/config'
import { getServerSideURL } from '@/utilities/getURL'
import type { Media as MediaType, UiString } from '@/payload-types'

export const revalidate = 300
export const dynamicParams = true

type Args = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function BlogPostPage({ params }: Args) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const [post, ui] = await Promise.all([
    getBlogPostBySlug(slug, locale as Locale),
    getCachedGlobal('ui-strings', 0, locale)() as Promise<UiString | null>,
  ])

  if (!post) notFound()

  const shareUrl = `${getServerSideURL()}/${locale}/gunluk/${post.slug}`
  const categoryToken = getCategorySemanticToken(post.postCategory ?? null)

  const categoryLabels: Record<string, string> = {
    kurtarma: ui?.blog?.filter?.kurtarma ?? 'Kurtarma',
    tedavi: ui?.blog?.filter?.tedavi ?? 'Tedavi',
    gunluk: ui?.blog?.filter?.gunluk ?? 'Günlük',
    duyuru: ui?.blog?.filter?.duyuru ?? 'Duyuru',
    etkinlik: ui?.blog?.filter?.etkinlik ?? 'Etkinlik',
  }

  const shareLabels = {
    title: ui?.blog?.share?.title ?? 'Paylaş',
    twitter: ui?.blog?.share?.twitter ?? 'Twitter',
    facebook: ui?.blog?.share?.facebook ?? 'Facebook',
    whatsapp: ui?.blog?.share?.whatsapp ?? 'WhatsApp',
    copy: ui?.blog?.share?.copy ?? 'Kopyala',
    copied: ui?.blog?.share?.copied ?? 'Kopyalandı!',
  }

  const relatedPostsLabel = locale === 'en' ? 'Related Posts' : 'İlgili Yazılar'

  return (
    <Container>
      <article className="my-8">
        <div className="px-4 md:px-6 mb-6">
          <PageBreadcrumb
            items={[
              { label: ui?.layout?.breadcrumb?.home ?? 'Ana Sayfa', href: '/' },
              { label: ui?.blog?.title ?? 'Günlük', href: '/gunluk' },
              { label: post.title },
            ]}
          />
        </div>

        <BlogDetailClient categoryToken={categoryToken}>
          <BlogDetail
            post={post}
            shareUrl={shareUrl}
            categoryLabel={post.postCategory ? categoryLabels[post.postCategory] : undefined}
            tagsLabel={ui?.blog?.tags ?? 'Etiketler'}
            shareLabels={shareLabels}
            locale={locale}
            categoryLabels={categoryLabels}
            relatedPostsLabel={relatedPostsLabel}
          />
        </BlogDetailClient>
      </article>
    </Container>
  )
}

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs()
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getBlogPostBySlug(slug, locale as Locale)

  if (!post) return {}

  const heroImage = post.heroImage as MediaType | null
  const ogImage =
    post.meta?.image && typeof post.meta.image === 'object'
      ? post.meta.image
      : heroImage

  return {
    title: post.meta?.title ?? `${post.title} — Paws of Hope`,
    description: post.meta?.description ?? post.excerpt ?? undefined,
    openGraph: {
      title: post.meta?.title ?? post.title,
      description: post.meta?.description ?? post.excerpt ?? undefined,
      ...(ogImage && typeof ogImage === 'object' && ogImage.url
        ? { images: [{ url: ogImage.url }] }
        : {}),
    },
  }
}
