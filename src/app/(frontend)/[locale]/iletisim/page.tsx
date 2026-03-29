import type { Metadata } from 'next'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { setRequestLocale } from 'next-intl/server'
import { generatePageMetadata } from '@/utilities/pageHelpers'
import type { SiteSetting, UiString } from '@/payload-types'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { ContactCard } from '@/components/contact/ContactCard'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { MessageCircle, Phone, Mail, Instagram } from 'lucide-react'
import { getSocialLink } from '@/utilities/socialLinks'

export const revalidate = 60

type Args = {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const [siteSettingsResult, uiResult] = await Promise.allSettled([
    getCachedGlobal('site-settings', 1)(),
    getCachedGlobal('ui-strings', 0, locale)(),
  ])
  const siteSettings = siteSettingsResult.status === 'fulfilled' ? (siteSettingsResult.value as SiteSetting) : null
  const ui = uiResult.status === 'fulfilled' ? (uiResult.value as UiString | null) : null

  return (
    <>
      <Section padding="sm">
        <Container>
          <PageBreadcrumb items={[{ label: ui?.contact?.title ?? 'İletişim' }]} />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-10 text-center">
            <Heading as="h1">{ui?.contact?.title ?? 'İletişim'}</Heading>
            <p className="mt-4 text-lg t-body">{ui?.contact?.subtitle ?? ''}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* WhatsApp */}
            {(() => {
              const wa = getSocialLink(siteSettings?.socialLinks, 'whatsapp')
              return (
                <ContactCard
                  icon={MessageCircle}
                  title={ui?.contact?.whatsapp?.label ?? 'WhatsApp'}
                  description={ui?.contact?.whatsapp?.description ?? ''}
                  href={wa ? `https://wa.me/${wa.url.replace(/\D/g, '')}` : '#'}
                >
                  {wa && (
                    <WhatsAppButton phone={wa.url} message={ui?.contact?.whatsapp?.message ?? ''}>
                      {ui?.contact?.whatsapp?.label ?? 'WhatsApp'}
                    </WhatsAppButton>
                  )}
                </ContactCard>
              )
            })()}

            {/* Phone */}
            {(() => {
              const phone = getSocialLink(siteSettings?.socialLinks, 'phone')
              return (
                <ContactCard
                  icon={Phone}
                  title={ui?.contact?.phone?.label ?? 'Telefon'}
                  description={ui?.contact?.phone?.description ?? ''}
                  href={phone ? `tel:${phone.url}` : '#'}
                />
              )
            })()}

            {/* Email */}
            {(() => {
              const email = getSocialLink(siteSettings?.socialLinks, 'email')
              return (
                <ContactCard
                  icon={Mail}
                  title={ui?.contact?.email?.label ?? 'E-posta'}
                  description={ui?.contact?.email?.description ?? ''}
                  href={email ? `mailto:${email.url}` : '#'}
                />
              )
            })()}

            {/* Instagram */}
            {(() => {
              const ig = getSocialLink(siteSettings?.socialLinks, 'instagram')
              return (
                <ContactCard
                  icon={Instagram}
                  title={ui?.contact?.instagram?.label ?? 'Instagram'}
                  description={ui?.contact?.instagram?.description ?? ''}
                  href={ig ? ig.url : '#'}
                  external
                />
              )
            })()}
          </div>
        </Container>
      </Section>
    </>
  )
}

export function generateStaticParams() {
  return [{ locale: 'tr' }, { locale: 'en' }]
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata(locale, 'contact', 'İletişim — Paws of Hope')
}
