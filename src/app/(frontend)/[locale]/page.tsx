import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { setRequestLocale } from 'next-intl/server'
import type { SiteSetting, UiString, Animal, EmergencyCase, Post, NeedsList as NeedsListType } from '@/payload-types'
import { locales, defaultLocale } from '@/i18n/config'
import type { Locale } from '@/i18n/config'

import { RenderHomepageBlocks } from '@/components/home/RenderHomepageBlocks'

export const revalidate = 60

type Args = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payloadLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale
  let siteSettings: SiteSetting | null = null
  try {
    siteSettings = (await getCachedGlobal('site-settings', 2, payloadLocale)()) as SiteSetting
  } catch {
    // site-settings fetch failed — continue with empty blocks
  }
  const blocks = siteSettings?.homepageBlocks ?? []

  // Determine which collections to query based on active blocks
  const blockTypes = new Set(blocks.filter((b) => b.enabled !== false).map((b) => b.blockType))
  const payload = await getPayload({ config: configPromise })

  const [animals, cases, completedCases, posts, needsItems] = await Promise.all([
    blockTypes.has('homeFeaturedAnimals')
      ? payload.find({
          collection: 'animals',
          where: { featured: { equals: true }, _status: { equals: 'published' } },
          limit: 6,
          locale: payloadLocale,
          depth: 1,
          select: { name: true, slug: true, photos: true, type: true, animalStatus: true, featured: true },
        })
      : Promise.resolve({ docs: [] }),
    blockTypes.has('homeActiveEmergencies')
      ? payload.find({
          collection: 'emergency-cases',
          where: { caseStatus: { equals: 'aktif' }, _status: { equals: 'published' } },
          limit: 5,
          locale: payloadLocale,
          depth: 1,
          select: { title: true, slug: true, targetAmount: true, collectedAmount: true, photos: true, caseStatus: true },
        })
      : Promise.resolve({ docs: [] }),
    blockTypes.has('homeSuccessStories')
      ? payload.find({
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
          select: { title: true, slug: true, beforePhoto: true, afterPhoto: true, collectedAmount: true, targetAmount: true, caseStatus: true },
        })
      : Promise.resolve({ docs: [] }),
    blockTypes.has('homeRecentPosts')
      ? payload.find({
          collection: 'posts',
          where: { _status: { equals: 'published' } },
          limit: 3,
          sort: '-publishedAt',
          locale: payloadLocale,
          depth: 1,
          select: { title: true, slug: true, heroImage: true, publishedAt: true, meta: true },
        })
      : Promise.resolve({ docs: [] }),
    blockTypes.has('homeNeedsList')
      ? payload.find({
          collection: 'needs-list',
          limit: 5,
          sort: 'order',
          locale: payloadLocale,
          depth: 0,
          select: { productName: true, brandDetail: true, urgency: true, currentStock: true, targetStock: true, unit: true },
        })
      : Promise.resolve({ docs: [] }),
  ])

  return (
    <div className="sys-wrap">
      <RenderHomepageBlocks
        blocks={blocks}
        data={{
          animals: animals.docs as Animal[],
          activeCases: cases.docs as EmergencyCase[],
          completedCases: completedCases.docs as EmergencyCase[],
          posts: posts.docs as Post[],
          needsItems: needsItems.docs as NeedsListType[],
          siteSettings,
          locale: payloadLocale,
        }}
      />
    </div>
  )
}

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }]
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  return {
    title: ui?.home?.meta?.title || 'Paws of Hope',
    description: ui?.home?.meta?.description || '',
  }
}
