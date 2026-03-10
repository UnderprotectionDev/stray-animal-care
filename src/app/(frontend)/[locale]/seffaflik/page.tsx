import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { ReportList } from '@/modules/transparency'
import { getReports } from '@/modules/transparency/lib/queries'
import { locales, defaultLocale, type Locale } from '@/i18n/config'

export const revalidate = 3600

type Args = {
  params: Promise<{ locale: string }>
}

export default async function TransparencyPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payloadLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale
  const [reports, t, tBreadcrumb] = await Promise.all([
    getReports(payloadLocale),
    getTranslations('transparency'),
    getTranslations('layout.breadcrumb'),
  ])

  const reportLabels = {
    expenses: t('report.expenses'),
    totalExpense: t('report.totalExpense'),
    donations: t('report.donations'),
    totalDonation: t('report.totalDonation'),
    category: t('report.category'),
    amount: t('report.amount'),
    comparison: t('report.comparison'),
    documents: t('report.documents'),
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

          {reports.length > 0 ? (
            <ReportList reports={reports} labels={reportLabels} currency={t('currency')} />
          ) : (
            <div className="py-16 text-center text-muted-foreground">{t('empty')}</div>
          )}
        </Container>
      </Section>
    </>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'transparency.meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}
