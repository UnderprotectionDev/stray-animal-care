import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Container } from '@/components/shared/Container'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { BlogFilter, BlogList } from '@/modules/blog'
import { getBlogPosts } from '@/modules/blog/lib/queries'
import { locales, defaultLocale, type Locale } from '@/i18n/config'
import type { UiString } from '@/payload-types'

export const revalidate = 60

type Args = {
  params: Promise<{ locale: string }>
}

export default async function BlogPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payloadLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale
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

  return (
    <Container>
      <div className="sys-wrap my-8">
        <div className="panel p-6">
          <PageBreadcrumb
            items={[
              { label: ui?.layout?.breadcrumb?.home ?? 'Ana Sayfa', href: '/' },
              { label: ui?.blog?.title ?? 'Günlük' },
            ]}
          />
        </div>
        <div className="panel p-8 text-center">
          <h1 className="t-mega">{ui?.blog?.title ?? 'Günlük'}</h1>
          <p className="t-meta text-lg mt-2">{ui?.blog?.subtitle ?? ''}</p>
        </div>
        <div className="panel p-4 flex justify-center">
          <BlogFilter labels={filterLabels} />
        </div>
        <BlogList
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
  const ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  return {
    title: ui?.blog?.meta?.title ?? 'Günlük — Paws of Hope',
    description: ui?.blog?.meta?.description ?? 'Paws of Hope günlük yazıları ve haberler.',
  }
}
