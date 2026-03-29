import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { AnimalFilter } from '@/modules/animals/components/AnimalFilter'
import { AnimalList } from '@/modules/animals/components/AnimalList'
import { getAnimals } from '@/modules/animals/lib/queries'
import { generatePageMetadata, normalizeLocale } from '@/utilities/pageHelpers'
import type { UiString } from '@/payload-types'

export const revalidate = 60

type Args = {
  params: Promise<{ locale: string }>
}

export default async function AnimalsPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payloadLocale = normalizeLocale(locale)
  const [animals, ui] = await Promise.all([
    getAnimals(payloadLocale),
    getCachedGlobal('ui-strings', 0, payloadLocale)() as Promise<UiString | null>,
  ])

  const filterLabels = {
    all: ui?.animals?.filter?.all ?? 'Tümü',
    kedi: ui?.animals?.filter?.kedi ?? 'Kediler',
    kopek: ui?.animals?.filter?.kopek ?? 'Köpekler',
  }

  const listLabels = {
    typeLabels: {
      kedi: ui?.animals?.filter?.kedi ?? 'Kediler',
      kopek: ui?.animals?.filter?.kopek ?? 'Köpekler',
    },
    statusLabels: {
      tedavide: ui?.animals?.filter?.tedavide ?? 'Tedavide',
      'kalici-bakim': ui?.animals?.filter?.kaliciBakim ?? 'Kalıcı Bakım',
      acil: ui?.animals?.filter?.acil ?? 'Acil',
    },
    noResults: ui?.animals?.filter?.noResults ?? 'Bu filtreyle eşleşen hayvan bulunamadı.',
  }

  return (
    <div className="sys-wrap">
      <div className="px-4 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="t-mega">{ui?.animals?.title ?? 'Canlarımız'}</h1>
          <p className="t-meta mt-2">{ui?.animals?.subtitle ?? ''}</p>
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
  return generatePageMetadata(locale, 'animals', 'Canlarımız — Paws of Hope')
}
