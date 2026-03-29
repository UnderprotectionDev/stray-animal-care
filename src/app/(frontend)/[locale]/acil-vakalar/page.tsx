import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { SectionDividerBand } from '@/components/home/SectionDividerBand'
import { EmergencyHero } from '@/modules/emergency/components/EmergencyHero'
import { EmergencyList } from '@/modules/emergency/components/EmergencyList'
import { EmergencyCTA } from '@/modules/emergency/components/EmergencyCTA'
import { getEmergencyCases } from '@/modules/emergency/lib/queries'
import { generatePageMetadata, normalizeLocale } from '@/utilities/pageHelpers'
import type { Animal, UiString } from '@/payload-types'

export const revalidate = 30

type Args = {
  params: Promise<{ locale: string }>
}

export default async function EmergencyPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payloadLocale = normalizeLocale(locale)
  const [cases, ui] = await Promise.all([
    getEmergencyCases(payloadLocale),
    getCachedGlobal('ui-strings', 0, locale)() as Promise<UiString | null>,
  ])

  // Aggregate stats for hero
  const totalRaised = cases.reduce((sum, c) => sum + (c.collectedAmount ?? 0), 0)
  const activeCases = cases.filter((c) => c.caseStatus === 'aktif')
  const rotatingNames = activeCases
    .map((c) => (c.animal && typeof c.animal === 'object' ? (c.animal as Animal).name : null))
    .filter(Boolean) as string[]

  return (
    <>
      {/* Breadcrumb */}
      <div className="panel px-4 md:px-8 py-3">
        <PageBreadcrumb
          items={[
            { label: ui?.layout?.breadcrumb?.home ?? 'Ana Sayfa', href: '/' },
            { label: ui?.emergency?.title ?? 'Acil Vakalar' },
          ]}
          className="mb-0"
        />
      </div>

      {/* Main content in sys-wrap */}
      <div className="sys-wrap">
        {/* 1. Hero */}
        <EmergencyHero
          title={ui?.emergency?.title ?? 'Acil Vakalar'}
          subtitle="Acil yardıma ihtiyaç duyan sokak hayvanları için destek bekliyoruz."
          badge="ACİL"
          activeCaseCount={activeCases.length}
          activeCaseLabel="Aktif Vaka"
          totalRaised={totalRaised}
          totalRaisedLabel="Toplanan"
          rotatingNames={rotatingNames}
          rotatingLabel="Yardım Bekleyen:"
        />

        {/* 2. Divider Band */}
        <SectionDividerBand texts={['ACİL', 'TEDAVİ', 'YARDIM', 'DESTEK OL']} />

        {/* 3. Emergency List */}
        <EmergencyList
          cases={cases}
          labels={{
            activeCases: ui?.emergency?.activeCases ?? 'Aktif Vakalar',
            noActive: ui?.emergency?.noActive ?? 'Şu anda aktif acil vaka bulunmuyor.',
            completedCases: ui?.emergency?.completedCases ?? 'Tamamlanan Vakalar',
            donateButton: ui?.emergency?.donateButton ?? 'Destek Ol',
          }}
        />

        {/* 4. CTA */}
        <EmergencyCTA
          title="Her Katkı Bir Hayat Kurtarır"
          description="Acil yardıma ihtiyaç duyan hayvanlar sizin desteğinizi bekliyor. Küçük bir katkı, büyük bir fark yaratır."
          donateLabel={ui?.emergency?.donateButton ?? 'Destek Ol'}
          volunteerLabel="Gönüllü Ol"
        />
      </div>
    </>
  )
}

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }]
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata(locale, 'emergency', 'Acil Vakalar — Paws of Hope')
}
