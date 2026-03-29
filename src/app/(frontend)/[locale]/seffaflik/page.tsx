import { Suspense } from 'react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { UiString } from '@/payload-types'
import { Container } from '@/components/shared/Container'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { AnimatedMegaHeading } from '@/components/home/AnimatedMegaHeading'
import { AnimatedSectionHeader } from '@/components/home/AnimatedSectionHeader'
import { getReports } from '@/modules/transparency'
import { TransparencyStats } from '@/modules/transparency/components/TransparencyStats'
import { ReportList } from '@/modules/transparency/components/ReportList'
import { locales, type Locale } from '@/i18n/config'
import { generatePageMetadata, normalizeLocale } from '@/utilities/pageHelpers'

export const revalidate = 3600

type Args = {
  params: Promise<{ locale: string }>
}

function ReportsSkeleton() {
  return (
    <div className="py-16 text-center t-body animate-pulse">
      Yükleniyor...
    </div>
  )
}

type ReportLabels = {
  expenses: string
  totalExpense: string
  donations: string
  totalDonation: string
  category: string
  amount: string
  comparison: string
  documents: string
  surplusLabel: string
  deficitLabel: string
}

async function ReportsSection({
  locale,
  ui,
  reportLabels,
}: {
  locale: Locale
  ui: UiString | null
  reportLabels: ReportLabels
}) {
  const reports = await getReports(locale)

  const aggregateIncome = reports.reduce((sum, r) => sum + (r.totalDonation ?? 0), 0)
  const aggregateExpense = reports.reduce((sum, r) => sum + (r.totalExpense ?? 0), 0)
  const uniqueDonors = new Set(
    reports.flatMap((r) => (r.donorList ?? []).map((d) => d.name).filter(Boolean)),
  ).size

  const statsData = [
    {
      value: aggregateIncome,
      label: ui?.transparency?.stats?.totalIncome || 'Toplam Gelir',
      color: 'var(--health)',
      colorFg: 'var(--health-foreground)',
      isCurrency: true,
    },
    {
      value: aggregateExpense,
      label: ui?.transparency?.stats?.totalExpenses || 'Toplam Gider',
      color: 'var(--emergency)',
      colorFg: 'var(--emergency-foreground)',
      isCurrency: true,
    },
    {
      value: uniqueDonors,
      label: ui?.transparency?.stats?.donorCount || 'Bağışçı Sayısı',
      color: 'var(--trust)',
      colorFg: 'var(--trust-foreground)',
    },
    {
      value: reports.length,
      label: ui?.transparency?.stats?.reportCount || 'Rapor Sayısı',
      color: 'var(--adoption)',
      colorFg: 'var(--adoption-foreground)',
    },
  ]

  return (
    <>
      {/* Aggregate Stats */}
      {reports.length > 0 && <TransparencyStats stats={statsData} />}

      {/* Reports Section */}
      <AnimatedSectionHeader
        title={ui?.transparency?.reportsHeading || 'Aylık Raporlar'}
        accentColor="trust"
      />

      {reports.length > 0 ? (
        <ReportList reports={reports} labels={reportLabels} currency={ui?.transparency?.currency || '₺'} />
      ) : (
        <div className="py-16 text-center t-body">
          {ui?.transparency?.empty || 'Henüz rapor bulunmuyor.'}
        </div>
      )}
    </>
  )
}

export default async function TransparencyPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payloadLocale = normalizeLocale(locale)

  const ui = await (getCachedGlobal('ui-strings', 0, locale)() as Promise<UiString | null>)

  const reportLabels = {
    expenses: ui?.transparency?.report?.expenses || '',
    totalExpense: ui?.transparency?.report?.totalExpense || '',
    donations: ui?.transparency?.report?.donations || '',
    totalDonation: ui?.transparency?.report?.totalDonation || '',
    category: ui?.transparency?.report?.category || '',
    amount: ui?.transparency?.report?.amount || '',
    comparison: ui?.transparency?.report?.comparison || '',
    documents: ui?.transparency?.report?.documents || '',
    surplusLabel: ui?.transparency?.report?.surplus || 'Fazla',
    deficitLabel: ui?.transparency?.report?.deficit || 'Açık',
  }

  return (
    <Container>
      <div className="my-8 space-y-6">
        <PageBreadcrumb
          items={[
            { label: ui?.layout?.breadcrumb?.home || 'Ana Sayfa', href: '/' },
            { label: ui?.transparency?.title || 'Şeffaflık Raporları' },
          ]}
        />

        {/* Header — like BlogPageHeader */}
        <div className="py-2">
          <div className="flex items-end justify-between gap-4">
            <div>
              <AnimatedMegaHeading
                text={ui?.transparency?.title || 'Şeffaflık Raporları'}
                tag="h1"
                enableColorFlash
              />
              {ui?.transparency?.subtitle && (
                <p className="t-body text-muted-foreground mt-2">
                  {ui.transparency.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        <Suspense fallback={<ReportsSkeleton />}>
          <ReportsSection locale={payloadLocale} ui={ui} reportLabels={reportLabels} />
        </Suspense>
      </div>
    </Container>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata(locale, 'transparency', 'Şeffaflık — Paws of Hope')
}
