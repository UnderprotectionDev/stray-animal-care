import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { BlogDetail } from '@/modules/blog'
import { getBlogPostBySlug, getBlogPostSlugs } from '@/modules/blog/lib/queries'
import { locales, type Locale } from '@/i18n/config'
import { getServerSideURL } from '@/utilities/getURL'
import type { Media as MediaType } from '@/payload-types'

export const revalidate = 300
export const dynamicParams = true

type Args = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function BlogPostPage({ params }: Args) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const [post, t, tBreadcrumb] = await Promise.all([
    getBlogPostBySlug(slug, locale as Locale),
    getTranslations('blog'),
    getTranslations('layout.breadcrumb'),
  ])

  if (!post) notFound()

  const shareUrl = `${getServerSideURL()}/${locale}/gunluk/${post.slug}`

  const categoryLabels: Record<string, string> = {
    kurtarma: t('filter.kurtarma'),
    tedavi: t('filter.tedavi'),
    gunluk: t('filter.gunluk'),
    duyuru: t('filter.duyuru'),
    etkinlik: t('filter.etkinlik'),
  }

  const shareLabels = {
    title: t('share.title'),
    twitter: t('share.twitter'),
    facebook: t('share.facebook'),
    whatsapp: t('share.whatsapp'),
    copy: t('share.copy'),
    copied: t('share.copied'),
  }

  return (
    <>
      <Section padding="sm">
        <Container>
          <PageBreadcrumb
            items={[
              { label: tBreadcrumb('home'), href: '/' },
              { label: t('title'), href: '/gunluk' },
              { label: post.title },
            ]}
          />
        </Container>
      </Section>

      <BlogDetail
        post={post}
        shareUrl={shareUrl}
        categoryLabel={post.postCategory ? categoryLabels[post.postCategory] : undefined}
        tagsLabel={t('tags')}
        shareLabels={shareLabels}
      />
    </>
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
