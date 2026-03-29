import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Container } from '@/components/shared/Container'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { BlogFilter, BlogListAnimated, BlogPageHeader } from '@/modules/blog'
import { getBlogPosts } from '@/modules/blog/lib/queries'
import { locales } from '@/i18n/config'
import { generatePageMetadata, normalizeLocale } from '@/utilities/pageHelpers'
import type { UiString } from '@/payload-types'

export const revalidate = 60

type Args = {
  params: Promise<{ locale: string }>
}

export default async function BlogPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payloadLocale = normalizeLocale(locale)
  const [posts, ui] = await Promise.all([
    getBlogPosts(payloadLocale),
    getCachedGlobal('ui-strings', 0, locale)() as Promise<UiString | null>,
  ])

  const filterLabels = {
    all: ui?.blog?.filter?.all ?? 'Tümü',
    kurtarma: ui?.blog?.filter?.kurtarma ?? 'Kurtarma',
    tedavi: ui?.blog?.filter?.tedavi ?? 'Tedavi',
    gunluk: ui?.blog?.filter?.gunluk ?? 'Günlük',
    duyuru: ui?.blog?.filter?.duyuru ?? 'Duyuru',
    etkinlik: ui?.blog?.filter?.etkinlik ?? 'Etkinlik',
  }

  const categoryLabels: Record<string, string> = {
    kurtarma: ui?.blog?.filter?.kurtarma ?? 'Kurtarma',
    tedavi: ui?.blog?.filter?.tedavi ?? 'Tedavi',
    gunluk: ui?.blog?.filter?.gunluk ?? 'Günlük',
    duyuru: ui?.blog?.filter?.duyuru ?? 'Duyuru',
    etkinlik: ui?.blog?.filter?.etkinlik ?? 'Etkinlik',
  }

  const postCounts: Record<string, number> = {}
  for (const post of posts) {
    if (post.postCategory) {
      postCounts[post.postCategory] = (postCounts[post.postCategory] || 0) + 1
    }
  }

  return (
    <Container>
      <div className="my-8 space-y-6">
        <PageBreadcrumb
          items={[
            { label: ui?.layout?.breadcrumb?.home ?? 'Ana Sayfa', href: '/' },
            { label: ui?.blog?.title ?? 'Günlük' },
          ]}
        />
        <BlogPageHeader
          title={ui?.blog?.title ?? 'Günlük'}
          subtitle={ui?.blog?.subtitle ?? ''}
          postCount={posts.length}
        />
        <div className="border-b border-border/20 pb-4">
          <BlogFilter labels={filterLabels} postCounts={postCounts} />
        </div>
        <BlogListAnimated
          posts={posts}
          categoryLabels={categoryLabels}
          readMoreLabel={ui?.blog?.readMore ?? 'Devamını Oku'}
          emptyLabel={ui?.blog?.empty ?? 'Henüz yazı yok.'}
          locale={payloadLocale}
        />
      </div>
    </Container>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata(locale, 'blog', 'Günlük — Paws of Hope', 'Paws of Hope günlük yazıları ve haberler.')
}
