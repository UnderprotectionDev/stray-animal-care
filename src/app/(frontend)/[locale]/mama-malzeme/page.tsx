import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { NeedsTable, ShippingInfo, SponsorProgram } from '@/modules/supplies'
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
  const [items, t, tBreadcrumb] = await Promise.all([
    getNeedsList(payloadLocale),
    getTranslations('supplies'),
    getTranslations('layout.breadcrumb'),
  ])

  const tableLabels = {
    product: t('table.product'),
    brand: t('table.brand'),
    urgency: t('table.urgency'),
    stock: t('table.stock'),
  }

  const urgencyLabels: Record<string, string> = {
    acil: t('urgency.acil'),
    orta: t('urgency.orta'),
    yeterli: t('urgency.yeterli'),
  }

  const shippingLabels = {
    title: t('shipping.title'),
    description: t('shipping.description'),
    cargo: t('shipping.cargo'),
    inPerson: t('shipping.inPerson'),
    online: t('shipping.online'),
  }

  const sponsorLabels = {
    title: t('sponsor.title'),
    description: t('sponsor.description'),
    cta: t('sponsor.cta'),
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
            <p className="t-body text-lg">{t('subtitle')}</p>
          </div>

          {items.length > 0 ? (
            <NeedsTable items={items} labels={tableLabels} urgencyLabels={urgencyLabels} />
          ) : (
            <div className="py-16 text-center t-body">{t('empty')}</div>
          )}
        </Container>
      </Section>

      <Section padding="md">
        <Container>
          <ShippingInfo labels={shippingLabels} />
        </Container>
      </Section>

      <Section padding="md">
        <Container>
          <SponsorProgram labels={sponsorLabels} />
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
  const t = await getTranslations({ locale, namespace: 'supplies.meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}
