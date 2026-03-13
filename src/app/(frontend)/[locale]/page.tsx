import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { SiteSetting } from '@/payload-types'
import { locales, defaultLocale } from '@/i18n/config'
import type { Locale } from '@/i18n/config'

import { HomeHero } from '@/components/home/HomeHero'
import { StatsSection } from '@/components/home/StatsSection'
import { StorySection } from '@/components/home/StorySection'
import { OurWorkShowcase } from '@/components/home/OurWorkShowcase'
import { FeaturedAnimals } from '@/components/home/FeaturedAnimals'
import { SuccessStories } from '@/components/home/SuccessStories'
import { ActiveEmergencies } from '@/components/home/ActiveEmergencies'
import { SupportCards } from '@/components/home/SupportCards'
import { NeedsList } from '@/components/home/NeedsList'
import { RecentPosts } from '@/components/home/RecentPosts'
import { TransparencyBanner } from '@/components/home/TransparencyBanner'

export const revalidate = 60

type Args = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const siteSettings = (await getCachedGlobal('site-settings', 1)()) as SiteSetting
  const payload = await getPayload({ config: configPromise })

  const payloadLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale

  const [animals, cases, completedCases, posts] = await Promise.all([
    payload.find({
      collection: 'animals',
      where: {
        featured: { equals: true },
        _status: { equals: 'published' },
      },
      limit: 5,
      locale: payloadLocale,
      depth: 1,
    }),
    payload.find({
      collection: 'emergency-cases',
      where: {
        caseStatus: { equals: 'aktif' },
        _status: { equals: 'published' },
      },
      limit: 5,
      locale: payloadLocale,
      depth: 1,
    }),
    payload.find({
      collection: 'emergency-cases',
      where: {
        caseStatus: { equals: 'tamamlandi' },
        _status: { equals: 'published' },
        beforePhoto: { exists: true },
        afterPhoto: { exists: true },
      },
      limit: 4,
      sort: '-updatedAt',
      locale: payloadLocale,
      depth: 1,
    }),
    payload.find({
      collection: 'posts',
      where: {
        _status: { equals: 'published' },
      },
      limit: 3,
      sort: '-publishedAt',
      locale: payloadLocale,
      depth: 1,
    }),
  ])

  return (
    <div className="sys-wrap">
      <HomeHero />
      <StatsSection siteSettings={siteSettings} />
      <StorySection />
      <OurWorkShowcase siteSettings={siteSettings} />
      <FeaturedAnimals animals={animals.docs} />
      <SuccessStories stories={completedCases.docs} />
      <ActiveEmergencies cases={cases.docs} />
      <SupportCards siteSettings={siteSettings} />
      <NeedsList />
      <RecentPosts posts={posts.docs} />
      <TransparencyBanner />
    </div>
  )
}

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }]
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home.meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}
