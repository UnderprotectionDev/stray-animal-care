import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { UiString } from '@/payload-types'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { AnimatedSectionHeader } from '@/components/home/AnimatedSectionHeader'
import { SectionDividerBand } from '@/components/home/SectionDividerBand'
import { SuppliesHero } from '@/modules/supplies/components/SuppliesHero'
import { SuppliesStats } from '@/modules/supplies/components/SuppliesStats'
import { SuppliesNeedsGrid } from '@/modules/supplies/components/SuppliesNeedsGrid'
import { SuppliesShipping } from '@/modules/supplies/components/SuppliesShipping'
import { SuppliesCTA } from '@/modules/supplies/components/SuppliesCTA'
import { getNeedsList } from '@/modules/supplies/lib/queries'
import { locales, defaultLocale, type Locale } from '@/i18n/config'

export const revalidate = 60

type Args = {
  params: Promise<{ locale: string }>
}

export default async function SuppliesPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const payloadLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale
  const [items, ui] = await Promise.all([
    getNeedsList(payloadLocale),
    getCachedGlobal('ui-strings', 0, locale)() as Promise<UiString | null>,
  ])

  // Aggregate stats
  const totalItems = items.length
  const urgentItems = items.filter((i) => i.urgency === 'acil').length
  const avgCoverage =
    items.length > 0
      ? Math.round(
          items.reduce(
            (sum, i) => sum + ((i.currentStock ?? 0) / Math.max(i.targetStock, 1)) * 100,
            0,
          ) / items.length,
        )
      : 0

  const stats = [
    {
      value: totalItems,
      suffix: '',
      label: ui?.supplies?.stats?.totalItems || 'Toplam Ürün',
      color: 'var(--warm)',
      colorFg: 'var(--warm-foreground)',
    },
    {
      value: urgentItems,
      suffix: '',
      label: ui?.supplies?.stats?.urgentItems || 'Acil İhtiyaç',
      color: 'var(--emergency)',
      colorFg: 'var(--emergency-foreground)',
    },
    {
      value: avgCoverage,
      suffix: '%',
      label: ui?.supplies?.stats?.coverage || 'Stok Karşılama',
      color: 'var(--health)',
      colorFg: 'var(--health-foreground)',
    },
  ]

  const urgencyLabels: Record<string, string> = {
    acil: ui?.supplies?.urgency?.acil || 'Acil',
    orta: ui?.supplies?.urgency?.orta || 'Orta',
    yeterli: ui?.supplies?.urgency?.yeterli || 'Yeterli',
  }

  const shippingLabels = {
    title: ui?.supplies?.shipping?.title || 'Nasıl Gönderebilirsiniz?',
    description: ui?.supplies?.shipping?.description || '',
    cargo: ui?.supplies?.shipping?.cargo || '',
    inPerson: ui?.supplies?.shipping?.inPerson || '',
    online: ui?.supplies?.shipping?.online || '',
  }

  const rotatingWords = [
    ui?.supplies?.hero?.rotatingWord1,
    ui?.supplies?.hero?.rotatingWord2,
    ui?.supplies?.hero?.rotatingWord3,
  ].filter(Boolean) as string[]

  const dividerTexts = [
    ui?.supplies?.divider?.text1 || 'MAMA',
    ui?.supplies?.divider?.text2 || 'İLAÇ',
    ui?.supplies?.divider?.text3 || 'KEDİ KUMU',
    ui?.supplies?.divider?.text4 || 'DESTEK OL',
  ]

  return (
    <>
      {/* Breadcrumb */}
      <div className="panel px-4 md:px-8 py-3">
        <PageBreadcrumb
          items={[
            { label: ui?.layout?.breadcrumb?.home || 'Ana Sayfa', href: '/' },
            { label: ui?.supplies?.title || 'Mama & Malzeme' },
          ]}
          className="mb-0"
        />
      </div>

      {/* Main content in sys-wrap */}
      <div className="sys-wrap">
        {/* 1. Hero */}
        <SuppliesHero
          title={ui?.supplies?.title || 'Mama & Malzeme İhtiyaçları'}
          subtitle={ui?.supplies?.subtitle || 'Hayvanlarımızın güncel ihtiyaç listesini burada bulabilirsiniz.'}
          totalItemCount={totalItems}
          totalItemLabel={ui?.supplies?.hero?.badgeLabel || 'Aktif İhtiyaç'}
          rotatingWords={rotatingWords}
        />

        {/* 2. Stats */}
        <section>
          <AnimatedSectionHeader
            title={ui?.supplies?.stats?.title || 'Stok Durumu'}
            accentColor="stats"
          />
          <SuppliesStats stats={stats} />
        </section>

        {/* 3. Divider */}
        <SectionDividerBand texts={dividerTexts} />

        {/* 4. Needs Grid */}
        <section>
          <AnimatedSectionHeader
            title={ui?.supplies?.needsSection?.title || 'İhtiyaç Listesi'}
            accentColor="emergency"
          />
          {items.length > 0 ? (
            <SuppliesNeedsGrid items={items} urgencyLabels={urgencyLabels} />
          ) : (
            <div className="panel py-16 text-center t-body bg-background">
              {ui?.supplies?.empty || 'Şu anda ihtiyaç listesi bulunmuyor.'}
            </div>
          )}
        </section>

        {/* 5. Shipping */}
        <section>
          <AnimatedSectionHeader
            title={shippingLabels.title}
            accentColor="trust"
          />
          <SuppliesShipping labels={shippingLabels} />
        </section>

        {/* 6. CTA */}
        <SuppliesCTA
          title={ui?.supplies?.sponsor?.title || 'Mama Sponsoru Ol'}
          description={ui?.supplies?.sponsor?.description || 'Aylık düzenli mama desteği sağlayarak hayvanlarımızın beslenmesine katkıda bulunun.'}
          ctaLabel={ui?.supplies?.sponsor?.cta || 'Destek Ol'}
        />
      </div>
    </>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  return {
    title: ui?.supplies?.meta?.title || 'Mama & Malzeme — Paws of Hope',
    description: ui?.supplies?.meta?.description || '',
  }
}
