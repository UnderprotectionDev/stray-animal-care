import type { Metadata } from 'next'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { SiteSetting } from '@/payload-types'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { ContactCard } from '@/components/contact/ContactCard'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { MessageCircle, Phone, Mail, Instagram } from 'lucide-react'

export const revalidate = 60

type Args = {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: Args) {
  const { locale } = await params
  setRequestLocale(locale)

  const siteSettings = (await getCachedGlobal('site-settings', 1)()) as SiteSetting
  const t = await getTranslations('contact')

  return (
    <>
      <Section padding="sm">
        <Container>
          <PageBreadcrumb items={[{ label: t('title') }]} />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-10 text-center">
            <Heading as="h1">{t('title')}</Heading>
            <p className="mt-4 text-lg t-body">{t('subtitle')}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* WhatsApp */}
            <ContactCard
              icon={MessageCircle}
              title={t('whatsapp.label')}
              description={t('whatsapp.description')}
              href={siteSettings.whatsapp ? `https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}` : '#'}
            >
              {siteSettings.whatsapp && (
                <WhatsAppButton phone={siteSettings.whatsapp} message={t('whatsapp.message')}>
                  {t('whatsapp.label')}
                </WhatsAppButton>
              )}
            </ContactCard>

            {/* Phone */}
            <ContactCard
              icon={Phone}
              title={t('phone.label')}
              description={t('phone.description')}
              href={siteSettings.phone ? `tel:${siteSettings.phone}` : '#'}
            />

            {/* Email */}
            <ContactCard
              icon={Mail}
              title={t('email.label')}
              description={t('email.description')}
              href={siteSettings.email ? `mailto:${siteSettings.email}` : '#'}
            />

            {/* Instagram */}
            <ContactCard
              icon={Instagram}
              title={t('instagram.label')}
              description={t('instagram.description')}
              href={
                siteSettings.instagram
                  ? `https://instagram.com/${siteSettings.instagram.replace('@', '')}`
                  : '#'
              }
              external
            />
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
  const t = await getTranslations({ locale, namespace: 'contact.meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}
