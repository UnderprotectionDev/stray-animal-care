import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { SiteSetting } from '@/payload-types'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { CopyButton } from '@/components/shared/CopyButton'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Landmark, Globe, Package, HandHeart } from 'lucide-react'

type SupportCardsProps = {
  siteSettings: SiteSetting
}

export async function SupportCards({ siteSettings }: SupportCardsProps) {
  const t = await getTranslations('home.support')

  return (
    <Section>
      <Container>
        <Heading as="h2" className="mb-10 text-center">{t('title')}</Heading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* IBAN Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Landmark className="size-5 text-primary" />
                {t('iban')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {siteSettings.bankName && (
                <p className="text-sm text-muted-foreground">{siteSettings.bankName}</p>
              )}
              {siteSettings.accountHolder && (
                <p className="text-sm font-medium">{siteSettings.accountHolder}</p>
              )}
              {siteSettings.iban && <CopyButton text={siteSettings.iban} label={siteSettings.iban} />}
            </CardContent>
          </Card>

          {/* International Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="size-5 text-primary" />
                {t('international')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {siteSettings.paypalLink && (
                <a
                  href={siteSettings.paypalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-primary underline-offset-4 hover:underline"
                >
                  PayPal
                </a>
              )}
              {siteSettings.wiseLink && (
                <a
                  href={siteSettings.wiseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-primary underline-offset-4 hover:underline"
                >
                  Wise
                </a>
              )}
            </CardContent>
          </Card>

          {/* Supplies Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="size-5 text-primary" />
                {t('supplies')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {t('suppliesPlaceholder')}
              </p>
            </CardContent>
          </Card>

          {/* Volunteer Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HandHeart className="size-5 text-primary" />
                {t('volunteer')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {siteSettings.whatsapp && (
                <WhatsAppButton phone={siteSettings.whatsapp}>
                  {t('volunteer')}
                </WhatsAppButton>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  )
}
