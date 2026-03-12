import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
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
import type { SiteSetting } from '@/payload-types'
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

const stats = [
  { key: 'volunteers', value: '25+' },
  { key: 'animalsHelped', value: '150+' },
  { key: 'feedingPoints', value: '40+' },
] as const

export default async function VolunteerPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const [siteSettings, t, tBreadcrumb] = await Promise.all([
    getCachedGlobal('site-settings', 1)() as Promise<SiteSetting>,
    getTranslations('volunteer'),
    getTranslations('layout.breadcrumb'),
  ])

  const faqItems = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
  ]

  return (
    <Section padding="lg">
      <Container>
        {/* Breadcrumb */}
        <PageBreadcrumb
          items={[
            { label: tBreadcrumb('home'), href: '/' },
            { label: t('title') },
          ]}
        />

        {/* Header */}
        <div className="mb-12 text-center">
          <Heading as="h1" className="mb-3">
            {t('title')}
          </Heading>
          <p className="t-body text-lg">{t('subtitle')}</p>
        </div>

        {/* Volunteer Areas */}
        <div className="mb-16">
          <Heading as="h2" className="mb-8 text-center">
            {t('areas.title')}
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
                  {t(`areas.${key}.title`)}
                </h3>
                <p className="t-body text-sm">
                  {t(`areas.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteer Stats */}
        <div className="mb-16 border border-border bg-background px-6 py-10">
          <Heading as="h2" className="mb-8 text-center">
            {t('stats.title')}
          </Heading>
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map(({ key, value }) => (
              <div key={key} className="text-center">
                <p className="font-heading text-4xl font-bold text-foreground">
                  {value}
                </p>
                <p className="t-body mt-1 text-sm font-medium">
                  {t(`stats.${key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mb-16 max-w-2xl">
          <Heading as="h2" className="mb-6 text-center">
            {t('faq.title')}
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
            {t('cta.title')}
          </Heading>
          <p className="t-body mb-6 text-lg">
            {t('cta.description')}
          </p>
          {siteSettings.whatsapp && (
            <WhatsAppButton
              phone={siteSettings.whatsapp}
              message={t('cta.whatsappMessage')}
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
  const t = await getTranslations({ locale, namespace: 'volunteer.meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}
