import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { ActivitySection } from '@/modules/our-work'
import { locales } from '@/i18n/config'
import type { Media as MediaType, UiString, SiteSetting } from '@/payload-types'

export const revalidate = 3600

type Args = {
  params: Promise<{ locale: string }>
}

const ACTIVITY_KEYS = ['feeding', 'treatment', 'spaying', 'emergency', 'vaccination', 'shelter'] as const

export default async function OurWorkPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  let siteSettings: SiteSetting | null = null
  let ui: UiString | null = null
  try {
    siteSettings = (await getCachedGlobal('site-settings', 1, locale)()) as SiteSetting
  } catch {
    // site-settings fetch failed
  }
  try {
    ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  } catch {
    // ui-strings fetch failed
  }

  const ourWorkBlock = siteSettings?.homepageBlocks?.find(
    (block) => block.blockType === 'homeOurWork',
  )
  const activities = ourWorkBlock && 'activities' in ourWorkBlock ? ourWorkBlock.activities ?? [] : []

  const activityMap = new Map<string, (number | MediaType)[]>()
  for (const activity of activities) {
    if (activity.key && activity.images) {
      activityMap.set(activity.key, activity.images as (number | MediaType)[])
    }
  }

  return (
    <>
      <Section padding="lg">
        <Container>
          <PageBreadcrumb
            items={[
              { label: ui?.layout?.breadcrumb?.home ?? 'Ana Sayfa', href: '/' },
              { label: ui?.ourWork?.title ?? 'Çalışmalarımız' },
            ]}
          />
          <div className="mb-8 text-center">
            <Heading as="h1" className="mb-3">
              {ui?.ourWork?.title ?? 'Çalışmalarımız'}
            </Heading>
            <p className="t-body text-lg">{ui?.ourWork?.subtitle ?? ''}</p>
          </div>
        </Container>
      </Section>

      {ACTIVITY_KEYS.filter((key) => activities.some((a) => a.key === key)).map((key, index) => {
        const activity = activities.find((a) => a.key === key)!
        return (
          <ActivitySection
            key={key}
            title={activity.title ?? key}
            description={activity.description ?? ''}
            images={activityMap.get(key) ?? []}
            isAlternate={index % 2 === 1}
          />
        )
      })}
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
    // ui-strings fetch failed
  }
  return {
    title: ui?.ourWork?.meta?.title ?? 'Çalışmalarımız — Paws of Hope',
    description: ui?.ourWork?.meta?.description ?? '',
  }
}
