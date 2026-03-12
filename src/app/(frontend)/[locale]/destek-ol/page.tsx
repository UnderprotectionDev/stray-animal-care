import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Container } from '@/components/shared/Container'
import { IBANCopy } from '@/modules/donate/components/IBANCopy'
import { InternationalPayment } from '@/modules/donate/components/InternationalPayment'
import { DonationCards } from '@/modules/donate/components/DonationCards'
import { DonateFAQ } from '@/modules/donate/components/DonateFAQ'
import { TransparencyNote } from '@/modules/donate/components/TransparencyNote'
import type { SiteSetting } from '@/payload-types'

export const revalidate = 60

type Args = {
  params: Promise<{ locale: string }>
}

export default async function DonatePage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const [siteSettings, t] = await Promise.all([
    getCachedGlobal('site-settings', 1)() as Promise<SiteSetting>,
    getTranslations('donate'),
  ])

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
        {/* Header */}
        <div className="panel p-8 text-center">
          <h1 className="t-mega">{t('title')}</h1>
          <p className="t-meta text-lg mt-2">{t('subtitle')}</p>
        </div>

        <div className="mx-auto max-w-2xl space-y-[1px] bg-foreground">
          {/* IBAN */}
          <div className="bg-background">
            <IBANCopy
              bankName={siteSettings.bankName}
              accountHolder={siteSettings.accountHolder}
              iban={siteSettings.iban}
              labels={{
                title: t('iban.title'),
                bank: t('iban.bank'),
                accountHolder: t('iban.accountHolder'),
                iban: t('iban.iban'),
                copy: t('iban.copy'),
              }}
            />
          </div>

          {/* International */}
          <div className="bg-background">
            <InternationalPayment
              paypalLink={siteSettings.paypalLink}
              wiseLink={siteSettings.wiseLink}
              labels={{
                title: t('international.title'),
                paypal: t('international.paypal'),
                wise: t('international.wise'),
              }}
            />
          </div>

          {/* Donation Cards */}
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
