import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
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
    <>
      <Section padding="lg">
        <Container>
          <PageBreadcrumb
            items={[
              { label: tBreadcrumb('home'), href: '/' },
              { label: t('title') },
            ]}
          />
          <div className="mb-8 text-center">
            <Heading as="h1" className="mb-3">
              {t('title')}
            </Heading>
            <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
          </div>
          <div className="mb-8 flex justify-center">
            <BlogFilter labels={filterLabels} />
          </div>
          <BlogList
            posts={posts}
            categoryLabels={categoryLabels}
            readMoreLabel={t('readMore')}
            emptyLabel={t('empty')}
          />
        </Container>
      </Section>
    </>
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
