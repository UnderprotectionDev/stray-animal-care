import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { UiString } from '@/payload-types'
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
  const [reports, ui] = await Promise.all([
    getReports(payloadLocale),
    getCachedGlobal('ui-strings', 0, locale)() as Promise<UiString | null>,
  ])

  const reportLabels = {
    expenses: ui?.transparency?.report?.expenses || '',
    totalExpense: ui?.transparency?.report?.totalExpense || '',
    donations: ui?.transparency?.report?.donations || '',
    totalDonation: ui?.transparency?.report?.totalDonation || '',
    category: ui?.transparency?.report?.category || '',
    amount: ui?.transparency?.report?.amount || '',
    comparison: ui?.transparency?.report?.comparison || '',
    documents: ui?.transparency?.report?.documents || '',
  }

  return (
    <>
      <Section padding="lg">
        <Container>
          <PageBreadcrumb
            items={[
              { label: ui?.layout?.breadcrumb?.home || '', href: '/' },
              { label: ui?.transparency?.title || '' },
            ]}
          />
          <div className="mb-8 text-center">
            <Heading as="h1" className="mb-3">
              {ui?.transparency?.title || 'Şeffaflık'}
            </Heading>
            <p className="t-body text-lg">{ui?.transparency?.subtitle || ''}</p>
          </div>

          {reports.length > 0 ? (
            <ReportList reports={reports} labels={reportLabels} currency={ui?.transparency?.currency || ''} />
          ) : (
            <div className="py-16 text-center t-body">{ui?.transparency?.empty || 'Henüz rapor bulunmuyor.'}</div>
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
  let ui: UiString | null = null
  try {
    ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  } catch {
    // ui-strings fetch failed
  }
  return {
    title: ui?.transparency?.meta?.title || 'Şeffaflık — Paws of Hope',
    description: ui?.transparency?.meta?.description || '',
  }
}
