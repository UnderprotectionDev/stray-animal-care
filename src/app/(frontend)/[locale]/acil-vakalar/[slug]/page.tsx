import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { EmergencyDetail } from '@/modules/emergency/components/EmergencyDetail'
import { getEmergencyCaseBySlug, getEmergencyCaseSlugs } from '@/modules/emergency/lib/queries'
import type { Locale } from '@/i18n/config'
import { locales } from '@/i18n/config'

export const revalidate = 30
export const dynamicParams = true

type Args = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function EmergencyCaseDetailPage({ params }: Args) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const ec = await getEmergencyCaseBySlug(slug, locale as Locale)

  if (!ec) notFound()

  return (
    <div className="min-h-screen bg-background">
      <EmergencyDetail ec={ec} locale={locale} />
    </div>
  )
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
