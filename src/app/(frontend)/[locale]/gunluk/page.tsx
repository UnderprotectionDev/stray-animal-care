import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Container } from '@/components/shared/Container'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { BlogFilter, BlogList } from '@/modules/blog'
import { getBlogPosts } from '@/modules/blog/lib/queries'
import { locales, defaultLocale, type Locale } from '@/i18n/config'

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
  const [posts, t, tBreadcrumb] = await Promise.all([
    getBlogPosts(payloadLocale),
    getTranslations('blog'),
    getTranslations('layout.breadcrumb'),
  ])

  const filterLabels = {
    all: t('filter.all'),
    kurtarma: t('filter.kurtarma'),
    tedavi: t('filter.tedavi'),
    gunluk: t('filter.gunluk'),
    duyuru: t('filter.duyuru'),
    etkinlik: t('filter.etkinlik'),
  }

  const categoryLabels: Record<string, string> = {
    kurtarma: t('filter.kurtarma'),
    tedavi: t('filter.tedavi'),
    gunluk: t('filter.gunluk'),
    duyuru: t('filter.duyuru'),
    etkinlik: t('filter.etkinlik'),
  }

  return (
    <Container>
      <div className="sys-wrap my-8">
        <div className="panel p-6">
          <PageBreadcrumb
            items={[
              { label: tBreadcrumb('home'), href: '/' },
              { label: t('title') },
            ]}
          />
        </div>
        <div className="panel p-8 text-center">
          <h1 className="t-mega">{t('title')}</h1>
          <p className="t-meta text-lg mt-2">{t('subtitle')}</p>
        </div>
        <div className="panel p-4 flex justify-center">
          <BlogFilter labels={filterLabels} />
        </div>
        <BlogList
          posts={posts}
          categoryLabels={categoryLabels}
          readMoreLabel={t('readMore')}
          emptyLabel={t('empty')}
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
  const t = await getTranslations({ locale, namespace: 'blog.meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}
