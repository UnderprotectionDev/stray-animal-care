import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { SiteSetting } from '@/payload-types'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { Button } from '@/components/ui/button'
import { Instagram } from 'lucide-react'

type InstagramFeedPlaceholderProps = {
  siteSettings: SiteSetting
}

export async function InstagramFeedPlaceholder({ siteSettings }: InstagramFeedPlaceholderProps) {
  const t = await getTranslations('home.instagram')
  const instagramUrl = siteSettings.instagram
    ? `https://instagram.com/${siteSettings.instagram.replace('@', '')}`
    : null

  return (
    <Section className="bg-muted/50">
      <Container>
        <Heading as="h2" className="mb-10 text-center">{t('title')}</Heading>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-3 md:gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-muted animate-pulse"
            />
          ))}
        </div>
        {instagramUrl && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              render={
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" />
              }
            >
              <Instagram className="size-4" data-icon="inline-start" />
              {t('followUs')}
            </Button>
          </div>
        )}
      </Container>
    </Section>
  )
}
