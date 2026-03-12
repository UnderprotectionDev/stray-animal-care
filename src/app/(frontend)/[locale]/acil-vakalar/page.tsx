import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
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
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="mb-10 border-b border-border pb-4">
          <h1 className="font-bold text-3xl md:text-4xl uppercase tracking-widest text-foreground">
            {t('title')}
          </h1>
        </div>
        <EmergencyList
          cases={cases}
          labels={{
            activeCases: t('activeCases'),
            noActive: t('noActive'),
            completedCases: t('completedCases'),
          }}
        />
      </div>
    </div>
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
