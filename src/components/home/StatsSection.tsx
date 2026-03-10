import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { SiteSetting } from '@/payload-types'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { CountUpNumber } from './CountUpNumber'
import { Cat, Dog, Stethoscope, Scissors, Syringe } from 'lucide-react'

type StatsSectionProps = {
  siteSettings: SiteSetting
}

const statIcons = [Cat, Dog, Stethoscope, Scissors, Syringe] as const

export async function StatsSection({ siteSettings }: StatsSectionProps) {
  const t = await getTranslations('home.stats')

  const stats = [
    { key: 'cats', value: siteSettings.catsCount ?? 0, icon: statIcons[0] },
    { key: 'dogs', value: siteSettings.dogsCount ?? 0, icon: statIcons[1] },
    { key: 'treated', value: siteSettings.treatedCount ?? 0, icon: statIcons[2] },
    { key: 'spayed', value: siteSettings.spayedCount ?? 0, icon: statIcons[3] },
    { key: 'vaccinated', value: siteSettings.vaccinatedCount ?? 0, icon: statIcons[4] },
  ]

  return (
    <Section className="bg-muted/50">
      <Container>
        <Heading as="h2" className="mb-10 text-center">{t('title')}</Heading>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.key} className="flex flex-col items-center gap-2 text-center">
                <Icon className="size-8 text-primary" />
                <CountUpNumber
                  target={stat.value}
                  className="font-heading text-3xl font-bold"
                />
                <span className="text-sm text-muted-foreground">{t(stat.key as 'cats')}</span>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
