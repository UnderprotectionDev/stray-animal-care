import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { EmergencyList } from '@/modules/emergency/components/EmergencyList'
import { getEmergencyCases } from '@/modules/emergency/lib/queries'
import { locales, defaultLocale, type Locale } from '@/i18n/config'

export const revalidate = 30

type Args = {
  params: Promise<{ locale: string }>
}

export default async function EmergencyPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payloadLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale
  const [cases, t] = await Promise.all([
    getEmergencyCases(payloadLocale),
    getTranslations('emergency'),
  ])

  return (
    <Section padding="lg">
      <Container>
        <div className="mb-8 text-center">
          <Heading as="h1">{t('title')}</Heading>
        </div>
        <EmergencyList
          cases={cases}
          labels={{
            activeCases: t('activeCases'),
            noActive: t('noActive'),
            completedCases: t('completedCases'),
          }}
        />
      </Container>
    </Section>
  )
}

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }]
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'emergency.meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}
