import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { AnimalFilter } from '@/modules/animals/components/AnimalFilter'
import { AnimalList } from '@/modules/animals/components/AnimalList'
import { getAnimals } from '@/modules/animals/lib/queries'
import { locales, defaultLocale, type Locale } from '@/i18n/config'

export const revalidate = 60

type Args = {
  params: Promise<{ locale: string }>
}

export default async function AnimalsPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payloadLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale
  const [animals, t] = await Promise.all([
    getAnimals(payloadLocale),
    getTranslations('animals'),
  ])

  const filterLabels = {
    all: t('filter.all'),
    kedi: t('filter.kedi'),
    kopek: t('filter.kopek'),
  }

  const listLabels = {
    typeLabels: {
      kedi: t('filter.kedi'),
      kopek: t('filter.kopek'),
    },
    statusLabels: {
      tedavide: t('filter.tedavide'),
      'kalici-bakim': t('filter.kalici-bakim'),
      acil: t('filter.acil'),
    },
    noResults: t('filter.noResults'),
  }

  return (
    <div className="sys-wrap">
      <div className="px-4 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="t-mega">{t('title')}</h1>
          <p className="t-meta mt-2">{t('subtitle')}</p>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <AnimalFilter labels={filterLabels} />
        </div>

        {/* Grid */}
        <AnimalList animals={animals} labels={listLabels} />
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }]
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'animals.meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}
