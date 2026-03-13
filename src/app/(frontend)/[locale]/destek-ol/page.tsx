import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Container } from '@/components/shared/Container'
import { IBANCopy } from '@/modules/donate/components/IBANCopy'
import { InternationalPayment } from '@/modules/donate/components/InternationalPayment'
import { VolunteerCard } from '@/modules/donate/components/VolunteerCard'
import { DonateTicker } from '@/modules/donate/components/DonateTicker'
import { DonationCards } from '@/modules/donate/components/DonationCards'
import { DonateFAQ } from '@/modules/donate/components/DonateFAQ'
import { TransparencyNote } from '@/modules/donate/components/TransparencyNote'
import type { SiteSetting, UiString } from '@/payload-types'

export const revalidate = 60

const MOCK_BANK_ACCOUNTS: NonNullable<SiteSetting['bankAccounts']> = [
  {
    id: 'mock-1',
    bankName: 'Ziraat Bankası',
    accountHolder: 'Paws of Hope Derneği',
    iban: 'TR33 0006 1005 1978 6457 8413 26',
    currency: 'TRY',
  },
  {
    id: 'mock-2',
    bankName: 'Garanti BBVA',
    accountHolder: 'Paws of Hope Derneği',
    iban: 'TR76 0006 2000 8240 0006 2978 31',
    currency: 'TRY',
  },
  {
    id: 'mock-3',
    bankName: 'Garanti BBVA',
    accountHolder: 'Paws of Hope Derneği',
    iban: 'TR58 0006 2000 8240 0009 0712 49',
    currency: 'EUR',
  },
]

const MOCK_STATS = {
  catsCount: 347,
  dogsCount: 218,
  treatedCount: 1240,
}

type Args = {
  params: Promise<{ locale: string }>
}

export default async function DonatePage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  let siteSettings: SiteSetting | null = null
  try {
    siteSettings = await getCachedGlobal('site-settings', 1)() as SiteSetting
  } catch {
    // DB unreachable — fall through to mock data
  }

  let ui: UiString | null = null
  try {
    ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  } catch {
    // ui-strings fetch failed
  }

  // Use CMS data if available, otherwise fall back to mock data
  const bankAccounts =
    siteSettings?.bankAccounts && siteSettings.bankAccounts.length > 0
      ? siteSettings.bankAccounts
      : MOCK_BANK_ACCOUNTS

  const stats = {
    catsCount: siteSettings?.catsCount || MOCK_STATS.catsCount,
    dogsCount: siteSettings?.dogsCount || MOCK_STATS.dogsCount,
    treatedCount: siteSettings?.treatedCount || MOCK_STATS.treatedCount,
  }

  const faqItems = [
    { q: ui?.donate?.faq?.q1 ?? '', a: ui?.donate?.faq?.a1 ?? '' },
    { q: ui?.donate?.faq?.q2 ?? '', a: ui?.donate?.faq?.a2 ?? '' },
    { q: ui?.donate?.faq?.q3 ?? '', a: ui?.donate?.faq?.a3 ?? '' },
    { q: ui?.donate?.faq?.q4 ?? '', a: ui?.donate?.faq?.a4 ?? '' },
    { q: ui?.donate?.faq?.q5 ?? '', a: ui?.donate?.faq?.a5 ?? '' },
  ].filter(item => item.q && item.a)

  return (
    <Container>
      <div className="sys-wrap my-8">
        {/* Hero */}
        <div className="panel p-8 md:p-12 relative overflow-hidden">
          <span className="badge-sys mint absolute top-6 right-6 rotate-3">
            {ui?.donate?.hero?.badge ?? 'HAYAT KURTAR'}
          </span>
          <h1 className="t-mega">{ui?.donate?.hero?.title ?? 'BİR CAN KURTAR'}</h1>
          <p className="t-body mt-4 max-w-xl">{ui?.donate?.hero?.subtitle ?? ''}</p>
        </div>

        {/* Cards Grid */}
        <div className="donate-grid">
          {/* IBAN — spans left column, rows 1-2 on desktop */}
          <div className="md:row-span-2">
            <IBANCopy
              bankAccounts={bankAccounts}
              labels={{
                title: ui?.donate?.iban?.title ?? 'IBAN İLE BAĞIŞ',
                bank: ui?.donate?.iban?.bank ?? 'Banka',
                accountHolder: ui?.donate?.iban?.accountHolder ?? 'Hesap Sahibi',
                iban: ui?.donate?.iban?.iban ?? 'IBAN',
                copy: ui?.donate?.iban?.copy ?? "IBAN'ı Kopyala",
                placeholder: ui?.donate?.iban?.placeholder ?? 'Banka hesap bilgileri yakında eklenecek.',
              }}
            />
          </div>

          {/* International — right column, row 1 */}
          <div>
            <InternationalPayment
              labels={{
                title: ui?.donate?.international?.title ?? 'Uluslararası Destek',
                comingSoon: ui?.donate?.international?.comingSoon ?? 'YAKINDA',
                placeholder: ui?.donate?.international?.placeholder ?? 'Yurtdışı ödeme seçenekleri hazırlanıyor.',
              }}
            />
          </div>

          {/* Volunteer — right column, row 2 */}
          <div>
            <VolunteerCard
              labels={{
                title: ui?.donate?.volunteer?.title ?? 'GÖNÜLLÜ OL',
                description: ui?.donate?.volunteer?.description ?? '',
                cta: ui?.donate?.volunteer?.cta ?? 'BAŞVURU FORMU →',
              }}
            />
          </div>
        </div>

        {/* Ticker */}
        <DonateTicker
          stats={stats}
          labels={{
            slogan1: ui?.donate?.ticker?.slogan1 ?? 'YAŞAM HAKKINA SAYGI',
            slogan2: ui?.donate?.ticker?.slogan2 ?? 'DESTEK OL HAYAT KURTAR',
            slogan3: ui?.donate?.ticker?.slogan3 ?? 'HER CAN DEĞERLİ',
            cats: ui?.donate?.ticker?.cats ?? 'KEDİ',
            dogs: ui?.donate?.ticker?.dogs ?? 'KÖPEK',
            treated: ui?.donate?.ticker?.treated ?? 'TEDAVİ EDİLEN',
          }}
        />

        {/* Impact Cards */}
        <div className="bg-background p-6">
          <DonationCards
            labels={{
              title: ui?.donate?.cards?.title ?? 'Bağışınız Neye Yarar?',
              food: {
                title: ui?.donate?.cards?.foodTitle ?? 'Mama Desteği',
                description: ui?.donate?.cards?.foodDescription ?? '',
              },
              vet: {
                title: ui?.donate?.cards?.vetTitle ?? 'Veteriner Ziyareti',
                description: ui?.donate?.cards?.vetDescription ?? '',
              },
              surgery: {
                title: ui?.donate?.cards?.surgeryTitle ?? 'Cerrahi Destek',
                description: ui?.donate?.cards?.surgeryDescription ?? '',
              },
            }}
          />
        </div>

        {/* FAQ */}
        <div className="bg-background p-6">
          <DonateFAQ title={ui?.donate?.faq?.title ?? 'Sık Sorulan Sorular'} items={faqItems} />
        </div>

        {/* Transparency */}
        <div className="bg-background">
          <TransparencyNote
            labels={{
              title: ui?.donate?.transparency?.title ?? 'Şeffaf Yönetim',
              description: ui?.donate?.transparency?.description ?? '',
              reports: ui?.donate?.transparency?.reports ?? 'Şeffaflık Raporları',
            }}
          />
        </div>
      </div>
    </Container>
  )
}

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }]
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
    title: ui?.donate?.meta?.title ?? 'Destek Ol — Paws of Hope',
    description: ui?.donate?.meta?.description ?? '',
  }
}
