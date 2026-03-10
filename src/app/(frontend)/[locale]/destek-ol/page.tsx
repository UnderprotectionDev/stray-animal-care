import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
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
    <Section padding="lg">
      <Container>
        {/* Header */}
        <div className="mb-10 text-center">
          <Heading as="h1" className="mb-3">{t('title')}</Heading>
          <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
        </div>

        <div className="mx-auto max-w-2xl space-y-8">
          {/* IBAN */}
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

          {/* International */}
          <InternationalPayment
            paypalLink={siteSettings.paypalLink}
            wiseLink={siteSettings.wiseLink}
            labels={{
              title: t('international.title'),
              paypal: t('international.paypal'),
              wise: t('international.wise'),
            }}
          />

          {/* Donation Cards */}
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

          {/* FAQ */}
          <DonateFAQ title={t('faq.title')} items={faqItems} />

          {/* Transparency */}
          <TransparencyNote
            labels={{
              title: t('transparency.title'),
              description: t('transparency.description'),
              reports: t('transparency.reports'),
            }}
          />
        </div>
      </Container>
    </Section>
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
