import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { UiString } from '@/payload-types'
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
  const [items, ui] = await Promise.all([
    getNeedsList(payloadLocale),
    getCachedGlobal('ui-strings', 0, locale)() as Promise<UiString | null>,
  ])

  const tableLabels = {
    product: ui?.supplies?.table?.product || '',
    brand: ui?.supplies?.table?.brand || '',
    urgency: ui?.supplies?.table?.urgency || '',
    stock: ui?.supplies?.table?.stock || '',
  }

  const urgencyLabels: Record<string, string> = {
    acil: ui?.supplies?.urgency?.acil || '',
    orta: ui?.supplies?.urgency?.orta || '',
    yeterli: ui?.supplies?.urgency?.yeterli || '',
  }

  const shippingLabels = {
    title: ui?.supplies?.shipping?.title || '',
    description: ui?.supplies?.shipping?.description || '',
    cargo: ui?.supplies?.shipping?.cargo || '',
    inPerson: ui?.supplies?.shipping?.inPerson || '',
    online: ui?.supplies?.shipping?.online || '',
  }

  const sponsorLabels = {
    title: ui?.supplies?.sponsor?.title || '',
    description: ui?.supplies?.sponsor?.description || '',
    cta: ui?.supplies?.sponsor?.cta || '',
  }

  return (
    <>
      <Section padding="lg">
        <Container>
          <PageBreadcrumb
            items={[
              { label: ui?.layout?.breadcrumb?.home || '', href: '/' },
              { label: ui?.supplies?.title || '' },
            ]}
          />
          <div className="mb-8 text-center">
            <Heading as="h1" className="mb-3">
              {ui?.supplies?.title}
            </Heading>
            <p className="t-body text-lg">{ui?.supplies?.subtitle}</p>
          </div>

          {items.length > 0 ? (
            <NeedsTable items={items} labels={tableLabels} urgencyLabels={urgencyLabels} />
          ) : (
            <div className="py-16 text-center t-body">{ui?.supplies?.empty}</div>
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
  const ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  return {
    title: ui?.supplies?.meta?.title || '',
    description: ui?.supplies?.meta?.description || '',
  }
}
