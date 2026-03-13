import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { AnimalDetail } from '@/modules/animals/components/AnimalDetail'
import { getAnimalBySlug, getAnimalSlugs } from '@/modules/animals/lib/queries'
import type { Locale } from '@/i18n/config'
import type { SiteSetting } from '@/payload-types'
import { locales } from '@/i18n/config'

export const revalidate = 60
export const dynamicParams = true

type Args = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function AnimalDetailPage({ params }: Args) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const animal = await getAnimalBySlug(slug, locale as Locale)
  if (!animal) notFound()

  let siteSettings: SiteSetting | null = null
  try {
    siteSettings = (await getCachedGlobal('site-settings', 1)()) as SiteSetting
  } catch {
    // site-settings fetch failed
  }

  return <AnimalDetail animal={animal} siteSettings={siteSettings} locale={locale} />
}

export async function generateStaticParams() {
  const slugs = await getAnimalSlugs()
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  const animal = await getAnimalBySlug(slug, locale as Locale)

  if (!animal) return {}

  return {
    title: animal.meta?.title ?? `${animal.name} — Paws of Hope`,
    description: animal.meta?.description ?? undefined,
  }
}
