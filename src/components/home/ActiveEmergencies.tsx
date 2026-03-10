import React from 'react'
import { getTranslations, getFormatter } from 'next-intl/server'
import type { EmergencyCase } from '@/payload-types'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

type ActiveEmergenciesProps = {
  cases: EmergencyCase[]
}

export async function ActiveEmergencies({ cases }: ActiveEmergenciesProps) {
  const t = await getTranslations('home.featured')
  const format = await getFormatter()

  if (!cases.length) return null

  return (
    <Section className="bg-destructive/5">
      <Container>
        <div className="mb-10 flex items-center justify-between">
          <Heading as="h2">{t('emergenciesTitle')}</Heading>
          <Button variant="outline" render={<Link href="/acil-durumlar" />}>
            {t('emergenciesViewAll')}
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((emergencyCase) => (
            <Card key={emergencyCase.id}>
              <CardHeader>
                <CardTitle>{emergencyCase.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ProgressBar
                  current={emergencyCase.collectedAmount ?? 0}
                  target={emergencyCase.targetAmount}
                  label={`${format.number(emergencyCase.collectedAmount ?? 0)} / ${format.number(emergencyCase.targetAmount)} TL`}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
