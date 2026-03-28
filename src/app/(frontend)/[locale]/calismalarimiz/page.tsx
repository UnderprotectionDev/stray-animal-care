import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { AnimatedSectionHeader } from '@/components/home/AnimatedSectionHeader'
import { SectionDividerBand } from '@/components/home/SectionDividerBand'
import { OurWorkHero } from '@/modules/our-work/components/OurWorkHero'
import { OurWorkStats } from '@/modules/our-work/components/OurWorkStats'
import { ActivityShowcase } from '@/modules/our-work/components/ActivityShowcase'
import { OurWorkProcess } from '@/modules/our-work/components/OurWorkProcess'
import { OurWorkFAQ } from '@/modules/our-work/components/OurWorkFAQ'
import { OurWorkCTA } from '@/modules/our-work/components/OurWorkCTA'
import { ACTIVITY_KEYS, ACTIVITY_COLORS, ACTIVITY_FOREGROUNDS } from '@/modules/our-work/lib/constants'
import { locales } from '@/i18n/config'
import type { Media as MediaType, UiString, SiteSetting } from '@/payload-types'

export const revalidate = 3600

type Args = {
  params: Promise<{ locale: string }>
}

export default async function OurWorkPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  let siteSettings: SiteSetting | null = null
  let ui: UiString | null = null
  try {
    siteSettings = (await getCachedGlobal('site-settings', 1, locale)()) as SiteSetting
  } catch {
  }
  try {
    ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  } catch {
  }

  let animalsHelpedCount = 0
  try {
    const payload = await getPayload({ config: configPromise })
    const animals = await payload.count({
      collection: 'animals',
      where: { _status: { equals: 'published' } },
    })
    animalsHelpedCount = animals.totalDocs
  } catch {
  }

  const ourWorkBlock = siteSettings?.homepageBlocks?.find(
    (block) => block.blockType === 'homeOurWork',
  )
  const activities = ourWorkBlock && 'activities' in ourWorkBlock ? ourWorkBlock.activities ?? [] : []

  const filteredActivities = ACTIVITY_KEYS.filter((key) =>
    activities.some((a) => a.key === key),
  ).map((key) => {
    const a = activities.find((act) => act.key === key)!
    return {
      key: a.key,
      title: a.title ?? a.key,
      description: a.description ?? '',
      images: (a.images ?? []) as (number | MediaType)[],
    }
  })

  const rotatingActivityNames = filteredActivities.map((a) => a.title).filter(Boolean)

  const dividerTexts = [
    ui?.ourWork?.divider?.text1 || 'BESLEME',
    ui?.ourWork?.divider?.text2 || 'TEDAVİ',
    ui?.ourWork?.divider?.text3 || 'KISIRLAŞTIRMA',
    ui?.ourWork?.divider?.text4 || 'AŞILAMA',
  ]

  const stats = [
    { value: siteSettings?.treatedCount ?? 0, suffix: '+', label: ui?.ourWork?.stats?.treated || 'Tedavi Edilen', color: ACTIVITY_COLORS.treatment, colorFg: ACTIVITY_FOREGROUNDS.treatment },
    { value: siteSettings?.spayedCount ?? 0, suffix: '+', label: ui?.ourWork?.stats?.spayed || 'Kısırlaştırılan', color: ACTIVITY_COLORS.spaying, colorFg: ACTIVITY_FOREGROUNDS.spaying },
    { value: siteSettings?.vaccinatedCount ?? 0, suffix: '+', label: ui?.ourWork?.stats?.vaccinated || 'Aşılanan', color: ACTIVITY_COLORS.vaccination, colorFg: ACTIVITY_FOREGROUNDS.vaccination },
    { value: siteSettings?.feedingPointsCount ?? 0, suffix: '+', label: ui?.ourWork?.stats?.feedingPoints || 'Besleme Noktası', color: ACTIVITY_COLORS.feeding, colorFg: ACTIVITY_FOREGROUNDS.feeding },
    { value: siteSettings?.catsCount ?? 0, suffix: '+', label: ui?.ourWork?.stats?.cats || 'Kedi', color: ACTIVITY_COLORS.emergency, colorFg: ACTIVITY_FOREGROUNDS.emergency },
    { value: siteSettings?.dogsCount ?? 0, suffix: '+', label: ui?.ourWork?.stats?.dogs || 'Köpek', color: ACTIVITY_COLORS.shelter, colorFg: ACTIVITY_FOREGROUNDS.shelter },
  ]

  const processSteps = [
    { number: '01', title: ui?.ourWork?.process?.step1Title || 'Bildirim', description: ui?.ourWork?.process?.step1Desc || '' },
    { number: '02', title: ui?.ourWork?.process?.step2Title || 'Müdahale', description: ui?.ourWork?.process?.step2Desc || '' },
    { number: '03', title: ui?.ourWork?.process?.step3Title || 'Tedavi', description: ui?.ourWork?.process?.step3Desc || '' },
    { number: '04', title: ui?.ourWork?.process?.step4Title || 'Takip', description: ui?.ourWork?.process?.step4Desc || '' },
  ]

  const faqItems = [
    { q: ui?.ourWork?.faq?.q1, a: ui?.ourWork?.faq?.a1 },
    { q: ui?.ourWork?.faq?.q2, a: ui?.ourWork?.faq?.a2 },
    { q: ui?.ourWork?.faq?.q3, a: ui?.ourWork?.faq?.a3 },
    { q: ui?.ourWork?.faq?.q4, a: ui?.ourWork?.faq?.a4 },
  ].filter((item): item is { q: string; a: string } => Boolean(item.q && item.a))

  return (
    <>
      {/* Breadcrumb */}
      <div className="panel px-4 md:px-8 py-3">
        <PageBreadcrumb
          items={[
            { label: ui?.layout?.breadcrumb?.home ?? 'Ana Sayfa', href: '/' },
            { label: ui?.ourWork?.title ?? 'Çalışmalarımız' },
          ]}
          className="mb-0"
        />
      </div>

      {/* Main content in sys-wrap */}
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
          <AnimatedSectionHeader
            title={ui?.ourWork?.stats?.title || 'Etkimiz'}
            accentColor="stats"
          />
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
          description={ui?.ourWork?.cta?.description || 'Her katkı bir hayat kurtarır. Çalışmalarımıza destek olun.'}
          donateLabel={ui?.ourWork?.cta?.donateLabel || 'DESTEK OL'}
          volunteerLabel={ui?.ourWork?.cta?.volunteerLabel || 'GÖNÜLLÜ OL'}
        />
      </div>
    </>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  let ui: UiString | null = null
  try {
    ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  } catch {
  }
  return {
    title: ui?.ourWork?.meta?.title ?? 'Çalışmalarımız — Paws of Hope',
    description: ui?.ourWork?.meta?.description ?? '',
  }
}
