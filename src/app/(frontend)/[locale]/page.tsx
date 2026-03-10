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
import { FeaturedAnimals } from '@/components/home/FeaturedAnimals'
import { ActiveEmergencies } from '@/components/home/ActiveEmergencies'
import { SupportCards } from '@/components/home/SupportCards'
import { SupporterCommentsSection } from '@/components/home/SupporterCommentsSection'
import { RecentPosts } from '@/components/home/RecentPosts'
import { InstagramFeedPlaceholder } from '@/components/home/InstagramFeedPlaceholder'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

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

  const [animals, cases, posts, comments] = await Promise.all([
    payload.find({
      collection: 'animals',
      where: {
        featured: { equals: true },
        _status: { equals: 'published' },
      },
      limit: 4,
      locale: payloadLocale,
      depth: 1,
    }),
    payload.find({
      collection: 'emergency-cases',
      where: {
        caseStatus: { equals: 'aktif' },
        _status: { equals: 'published' },
      },
      limit: 3,
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
    payload.find({
      collection: 'supporter-comments',
      where: {
        approved: { equals: true },
      },
      limit: 12,
      sort: '-date',
      locale: payloadLocale,
    }),
  ])

  return (
    <>
      <HomeHero />
      <ScrollReveal>
        <StatsSection siteSettings={siteSettings} />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <FeaturedAnimals animals={animals.docs} />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <ActiveEmergencies cases={cases.docs} />
      </ScrollReveal>
      <ScrollReveal>
        <SupportCards siteSettings={siteSettings} />
      </ScrollReveal>
      <ScrollReveal>
        <SupporterCommentsSection comments={comments.docs} />
      </ScrollReveal>
      <ScrollReveal>
        <RecentPosts posts={posts.docs} />
      </ScrollReveal>
      <ScrollReveal>
        <InstagramFeedPlaceholder siteSettings={siteSettings} />
      </ScrollReveal>
    </>
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
