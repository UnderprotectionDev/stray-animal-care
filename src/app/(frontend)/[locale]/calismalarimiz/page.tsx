import type { Metadata } from 'next'
import { Suspense } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { AnimatedSectionHeader } from '@/components/home/AnimatedSectionHeader'
import { SectionDividerBand } from '@/components/home/SectionDividerBand'
import { OurWorkHero } from '@/modules/our-work/components/OurWorkHero'
import { OurWorkCTA } from '@/modules/our-work/components/OurWorkCTA'
import { OurWorkStats } from '@/modules/our-work/components/OurWorkStats'
import { ActivityShowcase } from '@/modules/our-work/components/ActivityShowcase'
import { OurWorkProcess } from '@/modules/our-work/components/OurWorkProcess'
import { OurWorkFAQ } from '@/modules/our-work/components/OurWorkFAQ'
import {
  ACTIVITY_KEYS,
  ACTIVITY_COLORS,
  ACTIVITY_FOREGROUNDS,
} from '@/modules/our-work/lib/constants'
import { locales } from '@/i18n/config'
import { generatePageMetadata } from '@/utilities/pageHelpers'
import type { Media as MediaType, UiString, SiteSetting } from '@/payload-types'

export const revalidate = 3600

type Args = {
  params: Promise<{ locale: string }>
}

function OurWorkSkeleton() {
  return (
    <div className="sys-wrap">
      {/* Hero skeleton */}
      <div className="panel p-8 md:p-12">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-3/4 bg-dark-cream rounded" />
          <div className="h-6 w-1/2 bg-dark-cream rounded" />
          <div className="h-10 w-40 bg-dark-cream rounded mt-6" />
        </div>
      </div>
      {/* Stats skeleton */}
      <div className="panel p-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-dark-cream rounded mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 bg-dark-cream rounded" />
            ))}
          </div>
        </div>
      </div>
      {/* Content skeleton */}
      <div className="panel p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-64 bg-dark-cream rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 bg-dark-cream rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

async function OurWorkDataSection({ locale, ui }: { locale: string; ui: UiString | null }) {
  const [siteSettingsResult, animalsResult] = await Promise.allSettled([
    getCachedGlobal('site-settings', 1, locale)(),
    getPayload({ config: configPromise }).then((payload) =>
      payload.count({ collection: 'animals', where: { _status: { equals: 'published' } } }),
    ),
  ])
  const siteSettings =
    siteSettingsResult.status === 'fulfilled' ? (siteSettingsResult.value as SiteSetting) : null
  const animalsHelpedCount =
    animalsResult.status === 'fulfilled' ? animalsResult.value.totalDocs : 0

  const ourWorkBlock = siteSettings?.homepageBlocks?.find(
    (block) => block.blockType === 'homeOurWork',
  )
  const activities =
    ourWorkBlock && 'activities' in ourWorkBlock ? (ourWorkBlock.activities ?? []) : []

  const activityMap = new Map(
    activities
      .filter((a): a is typeof a & { key: string } => typeof a.key === 'string' && a.key.length > 0)
      .map((a) => [a.key, a]),
  )
  const filteredActivities = ACTIVITY_KEYS.filter((key) => activityMap.has(key)).map((key) => {
    const a = activityMap.get(key)!
    return {
      key: a.key,
      title: a.title ?? a.key,
      description: a.description ?? '',
      images: (a.images ?? []) as (number | MediaType)[],
    }
  })

  const rotatingActivityNames = filteredActivities
    .map((a) => a.title)
    .filter((title): title is string => typeof title === 'string' && title.length > 0)

  const dividerTexts = [
    ui?.ourWork?.divider?.text1 || 'BESLEME',
    ui?.ourWork?.divider?.text2 || 'TEDAVİ',
    ui?.ourWork?.divider?.text3 || 'KISIRLAŞTIRMA',
    ui?.ourWork?.divider?.text4 || 'AŞILAMA',
  ]

  const stats = [
    {
      value: siteSettings?.treatedCount ?? 0,
      suffix: '+',
      label: ui?.ourWork?.stats?.treated || 'Tedavi Edilen',
      color: ACTIVITY_COLORS.treatment,
      colorFg: ACTIVITY_FOREGROUNDS.treatment,
    },
    {
      value: siteSettings?.spayedCount ?? 0,
      suffix: '+',
      label: ui?.ourWork?.stats?.spayed || 'Kısırlaştırılan',
      color: ACTIVITY_COLORS.spaying,
      colorFg: ACTIVITY_FOREGROUNDS.spaying,
    },
    {
      value: siteSettings?.vaccinatedCount ?? 0,
      suffix: '+',
      label: ui?.ourWork?.stats?.vaccinated || 'Aşılanan',
      color: ACTIVITY_COLORS.vaccination,
      colorFg: ACTIVITY_FOREGROUNDS.vaccination,
    },
    {
      value: siteSettings?.feedingPointsCount ?? 0,
      suffix: '+',
      label: ui?.ourWork?.stats?.feedingPoints || 'Besleme Noktası',
      color: ACTIVITY_COLORS.feeding,
      colorFg: ACTIVITY_FOREGROUNDS.feeding,
    },
    {
      value: siteSettings?.catsCount ?? 0,
      suffix: '+',
      label: ui?.ourWork?.stats?.cats || 'Kedi',
      color: ACTIVITY_COLORS.emergency,
      colorFg: ACTIVITY_FOREGROUNDS.emergency,
    },
    {
      value: siteSettings?.dogsCount ?? 0,
      suffix: '+',
      label: ui?.ourWork?.stats?.dogs || 'Köpek',
      color: ACTIVITY_COLORS.shelter,
      colorFg: ACTIVITY_FOREGROUNDS.shelter,
    },
  ]

  const processSteps = [
    {
      number: '01',
      title: ui?.ourWork?.process?.step1Title || 'Bildirim',
      description: ui?.ourWork?.process?.step1Desc || '',
    },
    {
      number: '02',
      title: ui?.ourWork?.process?.step2Title || 'Müdahale',
      description: ui?.ourWork?.process?.step2Desc || '',
    },
    {
      number: '03',
      title: ui?.ourWork?.process?.step3Title || 'Tedavi',
      description: ui?.ourWork?.process?.step3Desc || '',
    },
    {
      number: '04',
      title: ui?.ourWork?.process?.step4Title || 'Takip',
      description: ui?.ourWork?.process?.step4Desc || '',
    },
  ]

  const faqItems = [
    { q: ui?.ourWork?.faq?.q1, a: ui?.ourWork?.faq?.a1 },
    { q: ui?.ourWork?.faq?.q2, a: ui?.ourWork?.faq?.a2 },
    { q: ui?.ourWork?.faq?.q3, a: ui?.ourWork?.faq?.a3 },
    { q: ui?.ourWork?.faq?.q4, a: ui?.ourWork?.faq?.a4 },
  ].filter((item): item is { q: string; a: string } => Boolean(item.q && item.a))

  return (
    <div className="sys-wrap">
      {/* 1. Hero */}
      <OurWorkHero
        title={ui?.ourWork?.title ?? 'Çalışmalarımız'}
        subtitle={ui?.ourWork?.subtitle ?? 'Sokak hayvanları için yaptığımız çalışmaları keşfedin.'}
        animalsHelpedCount={animalsHelpedCount}
        animalsHelpedLabel={ui?.ourWork?.stats?.treated || 'Hayvan'}
        rotatingActivityNames={rotatingActivityNames}
      />

      {/* 2. Impact Stats */}
      <section>
        <AnimatedSectionHeader title={ui?.ourWork?.stats?.title || 'Etkimiz'} accentColor="stats" />
        <OurWorkStats stats={stats} />
      </section>

      {/* 3. Divider Band */}
      <SectionDividerBand texts={dividerTexts} />

      {/* 4. Activity Showcase (all 6) */}
      {filteredActivities.length > 0 && (
        <section>
          <AnimatedSectionHeader
            title={ui?.ourWork?.title || 'Çalışmalarımız'}
            accentColor="health"
          />
          <ActivityShowcase activities={filteredActivities} />
        </section>
      )}

      {/* 5. Process Timeline */}
      <section>
        <AnimatedSectionHeader
          title={ui?.ourWork?.process?.title || 'Nasıl Çalışıyoruz'}
          accentColor="trust"
        />
        <OurWorkProcess steps={processSteps} />
      </section>

      {/* 7. FAQ */}
      {faqItems.length > 0 && (
        <section>
          <AnimatedSectionHeader
            title={ui?.ourWork?.faq?.title || 'Sık Sorulan Sorular'}
            accentColor="warm"
          />
          <OurWorkFAQ items={faqItems} />
        </section>
      )}

      {/* 8. CTA */}
      <OurWorkCTA
        title={ui?.ourWork?.cta?.title || 'Birlikte Daha Güçlüyüz'}
        description={
          ui?.ourWork?.cta?.description ||
          'Her katkı bir hayat kurtarır. Çalışmalarımıza destek olun.'
        }
        donateLabel={ui?.ourWork?.cta?.donateLabel || 'DESTEK OL'}
        volunteerLabel={ui?.ourWork?.cta?.volunteerLabel || 'GÖNÜLLÜ OL'}
      />
    </div>
  )
}

export default async function OurWorkPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const uiResult = await getCachedGlobal('ui-strings', 0, locale)()
  const ui = (uiResult as UiString | null) ?? null

  return (
    <>
      {/* Breadcrumb — renders immediately */}
      <div className="panel px-4 md:px-8 py-3">
        <PageBreadcrumb
          items={[
            { label: ui?.layout?.breadcrumb?.home ?? 'Ana Sayfa', href: '/' },
            { label: ui?.ourWork?.title ?? 'Çalışmalarımız' },
          ]}
          className="mb-0"
        />
      </div>

      {/* Main content streams in */}
      <Suspense fallback={<OurWorkSkeleton />}>
        <OurWorkDataSection locale={locale} ui={ui} />
      </Suspense>
    </>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata(locale, 'ourWork', 'Çalışmalarımız — Paws of Hope')
}
