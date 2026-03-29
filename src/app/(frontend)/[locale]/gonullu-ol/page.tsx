import type { Metadata } from 'next'
import { Suspense } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { AnimatedSectionHeader } from '@/components/home/AnimatedSectionHeader'
import { SectionDividerBand } from '@/components/home/SectionDividerBand'
import { getSocialLink } from '@/utilities/socialLinks'
import { generatePageMetadata } from '@/utilities/pageHelpers'
import type { SiteSetting, UiString } from '@/payload-types'

import { VolunteerHero } from './components/VolunteerHero'
import { VolunteerCTA } from './components/VolunteerCTA'
import { VolunteerAreaCard } from './components/VolunteerAreaCard'
import { VolunteerTimeline } from './components/VolunteerTimeline'
import { VolunteerStats } from './components/VolunteerStats'
import { VolunteerTestimonials } from './components/VolunteerTestimonials'
import { VolunteerFAQ } from './components/VolunteerFAQ'

export const revalidate = 3600

type Args = {
  params: Promise<{ locale: string }>
}

const volunteerAreas = [
  { key: 'foster' as const, color: 'var(--warm)', fg: 'var(--warm-foreground)' },
  { key: 'health' as const, color: 'var(--health)', fg: 'var(--health-foreground)' },
  { key: 'feeding' as const, color: 'var(--adoption)', fg: 'var(--adoption-foreground)' },
  { key: 'shelter' as const, color: 'var(--trust)', fg: 'var(--trust-foreground)' },
] as const

function VolunteerSkeleton() {
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
      {/* Areas skeleton */}
      <div className="panel p-8">
        <div className="animate-pulse">
          <div className="h-8 w-56 bg-dark-cream rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-40 bg-dark-cream rounded" />
            ))}
          </div>
        </div>
      </div>
      {/* Timeline skeleton */}
      <div className="panel p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-dark-cream rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 bg-dark-cream rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}

async function VolunteerDataSection({ locale, ui }: { locale: string; ui: UiString | null }) {
  const payloadPromise = getPayload({ config: configPromise })
  const [siteSettingsResult, volunteersResult, animalsResult] = await Promise.allSettled([
    getCachedGlobal('site-settings', 1, locale)(),
    payloadPromise.then((p) => p.count({ collection: 'volunteers', where: { applicationStatus: { equals: 'onaylandi' } } })),
    payloadPromise.then((p) => p.count({ collection: 'animals', where: { _status: { equals: 'published' } } })),
  ])
  const siteSettings = siteSettingsResult.status === 'fulfilled' ? (siteSettingsResult.value as SiteSetting) : null
  const volunteerCount = volunteersResult.status === 'fulfilled' ? volunteersResult.value.totalDocs : 0
  const animalsHelpedCount = animalsResult.status === 'fulfilled' ? animalsResult.value.totalDocs : 0

  const feedingPointsCount = siteSettings?.feedingPointsCount ?? 0

  const stats = [
    { value: volunteerCount, suffix: '+', label: ui?.volunteer?.stats?.volunteers || 'Aktif Gönüllü' },
    { value: animalsHelpedCount, suffix: '+', label: ui?.volunteer?.stats?.animalsHelped || 'Yardım Edilen Hayvan' },
    { value: feedingPointsCount, suffix: '+', label: ui?.volunteer?.stats?.feedingPoints || 'Besleme Noktası' },
  ]

  const faqItems = [
    { q: ui?.volunteer?.faq?.q1, a: ui?.volunteer?.faq?.a1 },
    { q: ui?.volunteer?.faq?.q2, a: ui?.volunteer?.faq?.a2 },
    { q: ui?.volunteer?.faq?.q3, a: ui?.volunteer?.faq?.a3 },
    { q: ui?.volunteer?.faq?.q4, a: ui?.volunteer?.faq?.a4 },
  ].filter((item): item is { q: string; a: string } => Boolean(item.q && item.a))

  const timelineSteps = [
    {
      number: '01',
      title: ui?.volunteer?.timeline?.step1Title || 'Başvuru',
      description: ui?.volunteer?.timeline?.step1Desc || '',
    },
    {
      number: '02',
      title: ui?.volunteer?.timeline?.step2Title || 'Eğitim',
      description: ui?.volunteer?.timeline?.step2Desc || '',
    },
    {
      number: '03',
      title: ui?.volunteer?.timeline?.step3Title || 'Aktif Gönüllü',
      description: ui?.volunteer?.timeline?.step3Desc || '',
    },
  ]

  const testimonials = [
    {
      quote: ui?.volunteer?.testimonials?.t1Quote || '',
      name: ui?.volunteer?.testimonials?.t1Name || '',
      role: ui?.volunteer?.testimonials?.t1Role || '',
      roleColor: 'var(--warm)',
    },
    {
      quote: ui?.volunteer?.testimonials?.t2Quote || '',
      name: ui?.volunteer?.testimonials?.t2Name || '',
      role: ui?.volunteer?.testimonials?.t2Role || '',
      roleColor: 'var(--trust)',
    },
    {
      quote: ui?.volunteer?.testimonials?.t3Quote || '',
      name: ui?.volunteer?.testimonials?.t3Name || '',
      role: ui?.volunteer?.testimonials?.t3Role || '',
      roleColor: 'var(--health)',
    },
  ].filter((t) => t.quote && t.name)

  const dividerTexts = [
    ui?.volunteer?.divider?.text1 || 'GÖNÜLLÜ OL',
    ui?.volunteer?.divider?.text2 || 'HAYAT KURTAR',
    ui?.volunteer?.divider?.text3 || 'FARK YARAT',
    ui?.volunteer?.divider?.text4 || 'BİRLİKTE GÜÇLÜYÜZ',
  ]

  const rotatingAreaNames = [
    ui?.volunteer?.areas?.fosterTitle,
    ui?.volunteer?.areas?.healthTitle,
    ui?.volunteer?.areas?.feedingTitle,
    ui?.volunteer?.areas?.shelterTitle,
  ].filter(Boolean) as string[]

  const wa = getSocialLink(siteSettings?.socialLinks, 'whatsapp')

  return (
    <div className="sys-wrap">
      {/* 1. Hero */}
      <VolunteerHero
        title={ui?.volunteer?.title || 'Gönüllü Ol'}
        subtitle={ui?.volunteer?.subtitle || 'Sokak hayvanlarına yardım etmek için aramıza katılın.'}
        volunteerCount={volunteerCount}
        volunteerCountLabel={ui?.volunteer?.stats?.volunteers || 'Aktif Gönüllü'}
        rotatingAreaNames={rotatingAreaNames}
      />

      {/* 2. Volunteer Areas */}
      <section>
        <AnimatedSectionHeader
          title={ui?.volunteer?.areas?.title || 'Gönüllülük Alanları'}
          accentColor="warm"
          comment=""
        />
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '1.5px', background: 'var(--palette-black)' }}
        >
          {volunteerAreas.map(({ key, color, fg }) => (
            <VolunteerAreaCard
              key={key}
              iconKey={key}
              title={ui?.volunteer?.areas?.[`${key}Title`] || ''}
              description={ui?.volunteer?.areas?.[`${key}Description`] || ''}
              accentColor={color}
              accentForeground={fg}
            />
          ))}
        </div>
      </section>

      {/* 3. Timeline */}
      <section>
        <AnimatedSectionHeader
          title={ui?.volunteer?.timeline?.title || 'Gönüllü Süreci'}
          accentColor="trust"
          comment=""
        />
        <VolunteerTimeline steps={timelineSteps} />
      </section>

      {/* 4. Divider Band */}
      <SectionDividerBand texts={dividerTexts} />

      {/* 5. Stats */}
      <section>
        <AnimatedSectionHeader
          title={ui?.volunteer?.stats?.title || 'Gönüllü Ailemiz'}
          accentColor="stats"
          comment=""
        />
        <VolunteerStats stats={stats} />
      </section>

      {/* 6. Testimonials */}
      {testimonials.length > 0 && (
        <section>
          <AnimatedSectionHeader
            title={ui?.volunteer?.testimonials?.title || 'Gönüllü Hikayeleri'}
            accentColor="trust"
            comment=""
          />
          <VolunteerTestimonials testimonials={testimonials} />
        </section>
      )}

      {/* 7. FAQ */}
      {faqItems.length > 0 && (
        <section>
          <AnimatedSectionHeader
            title={ui?.volunteer?.faq?.title || 'Sık Sorulan Sorular'}
            accentColor="warm"
            comment=""
          />
          <VolunteerFAQ items={faqItems} />
        </section>
      )}

      {/* 8. CTA */}
      {wa && (
        <VolunteerCTA
          title={ui?.volunteer?.cta?.title || 'Aramıza Katılın!'}
          description={ui?.volunteer?.cta?.description || 'Gönüllü olmak için WhatsApp üzerinden bizimle iletişime geçin.'}
          phone={wa.url}
          whatsappMessage={ui?.volunteer?.cta?.whatsappMessage || 'Merhaba, gönüllü olmak istiyorum.'}
          buttonLabel={ui?.volunteer?.cta?.buttonLabel || 'WHATSAPP İLE BAŞVUR'}
        />
      )}
    </div>
  )
}

export default async function VolunteerPage({ params }: Args) {
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
            { label: ui?.layout?.breadcrumb?.home || 'Ana Sayfa', href: '/' },
            { label: ui?.volunteer?.title || 'Gönüllü Ol' },
          ]}
          className="mb-0"
        />
      </div>

      {/* Main content streams in */}
      <Suspense fallback={<VolunteerSkeleton />}>
        <VolunteerDataSection locale={locale} ui={ui} />
      </Suspense>
    </>
  )
}

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }]
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata(locale, 'volunteer', 'Gönüllü Ol — Paws of Hope')
}
