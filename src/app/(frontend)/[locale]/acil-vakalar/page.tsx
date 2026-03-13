import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { EmergencyList } from '@/modules/emergency/components/EmergencyList'
import { getEmergencyCases } from '@/modules/emergency/lib/queries'
import { locales, defaultLocale, type Locale } from '@/i18n/config'
import type { UiString } from '@/payload-types'

export const revalidate = 30

type Args = {
  params: Promise<{ locale: string }>
}

export default async function EmergencyPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payloadLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale
  const [cases, ui] = await Promise.all([
    getEmergencyCases(payloadLocale),
    getCachedGlobal('ui-strings', 0, locale)() as Promise<UiString | null>,
  ])

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="mb-10 border-b border-border pb-4">
          <h1 className="font-bold text-3xl md:text-4xl uppercase tracking-widest text-foreground">
            {ui?.emergency?.title ?? 'Acil Vakalar'}
          </h1>
        </div>
        <EmergencyList
          cases={cases}
          labels={{
            activeCases: ui?.emergency?.activeCases ?? 'Aktif Vakalar',
            noActive: ui?.emergency?.noActive ?? 'Şu anda aktif acil vaka bulunmuyor.',
            completedCases: ui?.emergency?.completedCases ?? 'Tamamlanan Vakalar',
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
  const ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  return {
    title: ui?.emergency?.meta?.title ?? 'Acil Vakalar — Paws of Hope',
    description: ui?.emergency?.meta?.description ?? '',
  }
}
