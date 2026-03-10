import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { ActivitySection } from '@/modules/our-work'
import { getOurWorkActivities } from '@/modules/our-work/lib/queries'
import { locales } from '@/i18n/config'
import type { Media as MediaType } from '@/payload-types'

export const revalidate = 3600

type Args = {
  params: Promise<{ locale: string }>
}

const ACTIVITY_KEYS = ['feeding', 'treatment', 'spaying', 'emergency', 'vaccination', 'shelter'] as const

export default async function OurWorkPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const [activities, t, tBreadcrumb] = await Promise.all([
    getOurWorkActivities(),
    getTranslations('ourWork'),
    getTranslations('layout.breadcrumb'),
  ])

  const activityMap = new Map<string, (number | MediaType)[]>()
  if (activities) {
    for (const activity of activities) {
      if (activity.key && activity.images) {
        activityMap.set(activity.key, activity.images as (number | MediaType)[])
      }
    }
  }

  return (
    <>
      <Section padding="lg">
        <Container>
          <PageBreadcrumb
            items={[
              { label: tBreadcrumb('home'), href: '/' },
              { label: t('title') },
            ]}
          />
          <div className="mb-8 text-center">
            <Heading as="h1" className="mb-3">
              {t('title')}
            </Heading>
            <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
          </div>
        </Container>
      </Section>

      {ACTIVITY_KEYS.map((key, index) => (
        <ActivitySection
          key={key}
          title={t(`activities.${key}.title`)}
          description={t(`activities.${key}.description`)}
          images={activityMap.get(key) ?? []}
          isAlternate={index % 2 === 1}
        />
      ))}
    </>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ourWork.meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}
