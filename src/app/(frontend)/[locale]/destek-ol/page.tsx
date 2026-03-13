import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Container } from '@/components/shared/Container'
import { IBANCopy } from '@/modules/donate/components/IBANCopy'
import { InternationalPayment } from '@/modules/donate/components/InternationalPayment'
import { VolunteerCard } from '@/modules/donate/components/VolunteerCard'
import { DonateTicker } from '@/modules/donate/components/DonateTicker'
import { DonationCards } from '@/modules/donate/components/DonationCards'
import { DonateFAQ } from '@/modules/donate/components/DonateFAQ'
import { TransparencyNote } from '@/modules/donate/components/TransparencyNote'
import type { SiteSetting } from '@/payload-types'

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

  const t = await getTranslations('donate')

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
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
  ]

  return (
    <Container>
      <div className="sys-wrap my-8">
        {/* Hero */}
        <div className="panel p-8 md:p-12 relative overflow-hidden">
          <span className="badge-sys mint absolute top-6 right-6 rotate-3">
            {t('hero.badge')}
          </span>
          <h1 className="t-mega">{t('hero.title')}</h1>
          <p className="t-body mt-4 max-w-xl">{t('hero.subtitle')}</p>
        </div>

        {/* Cards Grid */}
        <div className="donate-grid">
          {/* ① IBAN — spans left column, rows 1-2 on desktop */}
          <div className="md:row-span-2">
            <IBANCopy
              bankAccounts={bankAccounts}
              bankName={siteSettings?.bankName}
              accountHolder={siteSettings?.accountHolder}
              iban={siteSettings?.iban}
              labels={{
                title: t('iban.title'),
                bank: t('iban.bank'),
                accountHolder: t('iban.accountHolder'),
                iban: t('iban.iban'),
                copy: t('iban.copy'),
                placeholder: t('iban.placeholder'),
              }}
            />
          </div>

          {/* ② International — right column, row 1 */}
          <div>
            <InternationalPayment
              paypalLink={siteSettings?.paypalLink || 'https://paypal.me/pawsofhope'}
              wiseLink={siteSettings?.wiseLink || 'https://wise.com/pay/pawsofhope'}
              labels={{
                title: t('international.title'),
                paypal: t('international.paypal'),
                wise: t('international.wise'),
                comingSoon: t('international.comingSoon'),
                placeholder: t('international.placeholder'),
              }}
            />
          </div>

          {/* ③ Volunteer — right column, row 2 */}
          <div>
            <VolunteerCard
              labels={{
                title: t('volunteer.title'),
                description: t('volunteer.description'),
                cta: t('volunteer.cta'),
              }}
            />
          </div>
        </div>

        {/* Ticker */}
        <DonateTicker
          stats={stats}
          labels={{
            slogan1: t('ticker.slogan1'),
            slogan2: t('ticker.slogan2'),
            slogan3: t('ticker.slogan3'),
            cats: t('ticker.cats'),
            dogs: t('ticker.dogs'),
            treated: t('ticker.treated'),
          }}
        />

        {/* Impact Cards */}
        <div className="bg-background p-6">
          <DonationCards
            labels={{
              title: t('cards.title'),
              food: {
                title: t('cards.food.title'),
                description: t('cards.food.description'),
              },
              vet: {
                title: t('cards.vet.title'),
                description: t('cards.vet.description'),
              },
              surgery: {
                title: t('cards.surgery.title'),
                description: t('cards.surgery.description'),
              },
            }}
          />
        </div>

        {/* FAQ */}
        <div className="bg-background p-6">
          <DonateFAQ title={t('faq.title')} items={faqItems} />
        </div>

        {/* Transparency */}
        <div className="bg-background">
          <TransparencyNote
            labels={{
              title: t('transparency.title'),
              description: t('transparency.description'),
              reports: t('transparency.reports'),
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
  const t = await getTranslations({ locale, namespace: 'donate.meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}
