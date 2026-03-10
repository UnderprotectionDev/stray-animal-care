import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
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
    <>
      <Section padding="lg">
        <Container>
          <div className="mb-8 text-center">
            <Heading as="h1" className="mb-3">
              {t('title')}
            </Heading>
            <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
          </div>
          <div className="mb-8 flex justify-center">
            <AnimalFilter labels={filterLabels} />
          </div>
          <AnimalList animals={animals} labels={listLabels} />
        </Container>
      </Section>
    </>
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
