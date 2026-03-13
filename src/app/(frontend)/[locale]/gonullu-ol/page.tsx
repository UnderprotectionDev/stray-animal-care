import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import type { SiteSetting, UiString } from '@/payload-types'
import { Heart, Stethoscope, UtensilsCrossed, Home } from 'lucide-react'

export const revalidate = 3600

type Args = {
  params: Promise<{ locale: string }>
}

const volunteerAreas = [
  { key: 'foster', icon: Heart },
  { key: 'health', icon: Stethoscope },
  { key: 'feeding', icon: UtensilsCrossed },
  { key: 'shelter', icon: Home },
] as const

export default async function VolunteerPage({ params }: Args) {
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

  let volunteerCount = 0
  let animalsHelpedCount = 0
  try {
    const payload = await getPayload({ config: configPromise })
    const [volunteers, animals] = await Promise.all([
      payload.count({
        collection: 'volunteers',
        where: { applicationStatus: { equals: 'onaylandi' } },
      }),
      payload.count({
        collection: 'animals',
        where: { _status: { equals: 'published' } },
      }),
    ])
    volunteerCount = volunteers.totalDocs
    animalsHelpedCount = animals.totalDocs
  } catch {
    // count queries failed — fallback to 0
  }

  const feedingPointsCount = siteSettings?.feedingPointsCount ?? 0

  const stats = [
    { key: 'volunteers' as const, value: `${volunteerCount}+` },
    { key: 'animalsHelped' as const, value: `${animalsHelpedCount}+` },
    { key: 'feedingPoints' as const, value: `${feedingPointsCount}+` },
  ]

  const faqItems = [
    { q: ui?.volunteer?.faq?.q1, a: ui?.volunteer?.faq?.a1 },
    { q: ui?.volunteer?.faq?.q2, a: ui?.volunteer?.faq?.a2 },
    { q: ui?.volunteer?.faq?.q3, a: ui?.volunteer?.faq?.a3 },
    { q: ui?.volunteer?.faq?.q4, a: ui?.volunteer?.faq?.a4 },
  ].filter(item => item.q && item.a)

  return (
    <Section padding="lg">
      <Container>
        {/* Breadcrumb */}
        <PageBreadcrumb
          items={[
            { label: ui?.layout?.breadcrumb?.home || '', href: '/' },
            { label: ui?.volunteer?.title || '' },
          ]}
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <Heading as="h1" className="mb-3">
            {ui?.volunteer?.title}
          </Heading>
          <p className="t-body text-lg">{ui?.volunteer?.subtitle}</p>
        </div>

        {/* Volunteer Areas */}
        <div className="mb-16">
          <Heading as="h2" className="mb-8 text-center">
            {ui?.volunteer?.areas?.title}
          </Heading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {volunteerAreas.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="panel border border-border p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border border-border bg-accent">
                  <Icon className="h-7 w-7 text-foreground" />
                </div>
                <h3 className="font-heading mb-2 text-lg font-semibold">
                  {ui?.volunteer?.areas?.[`${key}Title`]}
                </h3>
                <p className="t-body text-sm">
                  {ui?.volunteer?.areas?.[`${key}Description`]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteer Stats */}
        <div className="mb-16 border border-border bg-background px-6 py-10">
          <Heading as="h2" className="mb-8 text-center">
            {ui?.volunteer?.stats?.title}
          </Heading>
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map(({ key, value }) => (
              <div key={key} className="text-center">
                <p className="font-heading text-4xl font-bold text-foreground">
                  {value}
                </p>
                <p className="t-body mt-1 text-sm font-medium">
                  {ui?.volunteer?.stats?.[key]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mb-16 max-w-2xl">
          <Heading as="h2" className="mb-6 text-center">
            {ui?.volunteer?.faq?.title}
          </Heading>
          <Accordion>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="border border-border bg-background px-6 py-10 text-center">
          <Heading as="h2" className="mb-3">
            {ui?.volunteer?.cta?.title}
          </Heading>
          <p className="t-body mb-6 text-lg">
            {ui?.volunteer?.cta?.description}
          </p>
          {siteSettings?.whatsapp && (
            <WhatsAppButton
              phone={siteSettings.whatsapp}
              message={ui?.volunteer?.cta?.whatsappMessage || ''}
              className="text-base px-6 py-3"
            >
              WhatsApp
            </WhatsAppButton>
          )}
        </div>
      </Container>
    </Section>
  )
}

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }]
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
    title: ui?.volunteer?.meta?.title || 'Gönüllü Ol — Paws of Hope',
    description: ui?.volunteer?.meta?.description || '',
  }
}
