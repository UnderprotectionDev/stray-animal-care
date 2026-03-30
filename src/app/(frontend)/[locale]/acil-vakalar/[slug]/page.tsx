import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { EmergencyDetail } from '@/modules/emergency/components/EmergencyDetail'
import { getEmergencyCaseBySlug, getEmergencyCaseSlugs } from '@/modules/emergency/lib/queries'
import type { Locale } from '@/i18n/config'
import { locales } from '@/i18n/config'
import type { SiteSetting } from '@/payload-types'

export const revalidate = 30
export const dynamicParams = true

type Args = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function EmergencyCaseDetailPage({ params }: Args) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const [ec, siteSettings] = await Promise.all([
    getEmergencyCaseBySlug(slug, locale as Locale),
    getCachedGlobal('site-settings', 1, locale)() as Promise<SiteSetting>,
  ])

  if (!ec) notFound()

  return <EmergencyDetail ec={ec} locale={locale} siteSettings={siteSettings} />
}

export async function generateStaticParams() {
  const slugs = await getEmergencyCaseSlugs()
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  const ec = await getEmergencyCaseBySlug(slug, locale as Locale)

  if (!ec) return {}

  return {
    title: ec.meta?.title ?? `${ec.title} — Paws of Hope`,
    description: ec.meta?.description ?? undefined,
  }
}
