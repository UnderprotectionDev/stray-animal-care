import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { Animal } from '@/payload-types'
import { Section } from '@/components/shared/Section'
import { Container } from '@/components/shared/Container'
import { Heading } from '@/components/shared/Heading'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'

type FeaturedAnimalsProps = {
  animals: Animal[]
}

const statusMap: Record<string, 'active' | 'urgent' | 'completed' | 'pending'> = {
  tedavide: 'pending',
  'kalici-bakim': 'active',
  acil: 'urgent',
}

const typeEmojiMap: Record<string, string> = {
  kedi: '🐱',
  kopek: '🐶',
}

export async function FeaturedAnimals({ animals }: FeaturedAnimalsProps) {
  const t = await getTranslations('home.featured')

  if (!animals.length) return null

  return (
    <Section>
      <Container>
        <div className="mb-10 flex items-center justify-between">
          <Heading as="h2">{t('animalsTitle')}</Heading>
          <Button variant="outline" render={<Link href="/canlarimiz" />}>
            {t('animalsViewAll')}
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {animals.map((animal) => {
            const firstPhoto =
              animal.photos && animal.photos.length > 0 ? animal.photos[0] : null

            const animalStatus = animal.animalStatus ?? 'tedavide'
            return (
              <Card key={animal.id}>
                {firstPhoto && typeof firstPhoto !== 'number' && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <Media resource={firstPhoto} className="h-full w-full object-cover" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{animal.name}</span>
                    <StatusBadge status={statusMap[animalStatus] ?? 'active'}>
                      {t(`animalStatus.${animalStatus}` as Parameters<typeof t>[0])}
                    </StatusBadge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    {animal.type && <span>{typeEmojiMap[animal.type] ?? '🐾'} {t(`animalType.${animal.type}` as Parameters<typeof t>[0])}</span>}
                    {animal.age && <span>{animal.age}</span>}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
