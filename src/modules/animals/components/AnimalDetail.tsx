import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { Button } from '@/components/ui/button'
import { PhotoGallery } from './PhotoGallery'
import RichText from '@/components/RichText'
import { Heart, ArrowLeft } from 'lucide-react'
import type { Animal, Media as MediaType, SiteSetting } from '@/payload-types'

type StatusVariant = 'pending' | 'active' | 'urgent'
const statusVariantMap: Record<NonNullable<Animal['animalStatus']>, StatusVariant> = {
  tedavide: 'pending',
  'kalici-bakim': 'active',
  acil: 'urgent',
}

type AnimalDetailProps = {
  animal: Animal
  siteSettings: SiteSetting
}

export async function AnimalDetail({ animal, siteSettings }: AnimalDetailProps) {
  const t = await getTranslations('animals')
  const tBreadcrumb = await getTranslations('layout.breadcrumb')

  const photos = (animal.photos ?? []).filter(
    (p): p is MediaType => p !== null && typeof p === 'object',
  )

  const genderLabel = {
    erkek: t('detail.erkek'),
    disi: t('detail.disi'),
    bilinmiyor: t('detail.bilinmiyor'),
  }[animal.gender]

  const typeLabel = {
    kedi: t('filter.kedi'),
    kopek: t('filter.kopek'),
  }[animal.type]

  const status = animal.animalStatus
  const statusLabel = status
    ? ({
        tedavide: t('filter.tedavide'),
        'kalici-bakim': t('filter.kalici-bakim'),
        acil: t('filter.acil'),
      }[status] ?? '')
    : ''

  return (
    <div className="container py-8">
      <PageBreadcrumb
        items={[
          { label: tBreadcrumb('home'), href: '/' },
          { label: t('title'), href: '/canlarimiz' },
          { label: animal.name },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: photos */}
        <div className="lg:col-span-2">
          <PhotoGallery
            photos={photos}
            animalName={animal.name}
            labels={{
              close: t('lightbox.close'),
              prev: t('lightbox.prev'),
              next: t('lightbox.next'),
              imageOf: t('lightbox.imageOf'),
              noPhotos: t('detail.noPhotos'),
            }}
          />
        </div>

        {/* Right: sidebar */}
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-2">
            {status && (
              <div className="flex items-center gap-2">
                <StatusBadge status={statusVariantMap[status] ?? 'pending'}>
                  {statusLabel}
                </StatusBadge>
              </div>
            )}
            <h1 className="font-heading text-3xl font-bold text-foreground">
              {animal.name}
            </h1>
          </div>

          {/* Details */}
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b pb-2">
              <dt className="text-muted-foreground">{t('detail.type')}</dt>
              <dd className="font-medium">{typeLabel}</dd>
            </div>
            {animal.age && (
              <div className="flex justify-between border-b pb-2">
                <dt className="text-muted-foreground">{t('detail.age')}</dt>
                <dd className="font-medium">{animal.age}</dd>
              </div>
            )}
            <div className="flex justify-between border-b pb-2">
              <dt className="text-muted-foreground">{t('detail.gender')}</dt>
              <dd className="font-medium">{genderLabel}</dd>
            </div>
          </dl>

          {/* CTA */}
          <Button
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            render={<Link href="/destek-ol" />}
          >
            <Heart className="size-4" />
            {t('detail.donate')}
          </Button>

          {siteSettings.whatsapp && (
            <WhatsAppButton
              phone={siteSettings.whatsapp}
              message={t('detail.whatsappMessage', { name: animal.name })}
              className="w-full justify-center"
            >
              WhatsApp
            </WhatsAppButton>
          )}

          <Button variant="outline" className="w-full" render={<Link href="/canlarimiz" />}>
            <ArrowLeft className="size-4" />
            {t('detail.back')}
          </Button>
        </div>
      </div>

      {/* Story & Needs */}
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {animal.story && (
          <div>
            <h2 className="font-heading text-xl font-semibold mb-4">{t('detail.story')}</h2>
            <RichText data={animal.story} enableGutter={false} />
          </div>
        )}
        {animal.needs && (
          <div>
            <h2 className="font-heading text-xl font-semibold mb-4">{t('detail.needs')}</h2>
            <RichText data={animal.needs} enableGutter={false} />
          </div>
        )}
      </div>
    </div>
  )
}
