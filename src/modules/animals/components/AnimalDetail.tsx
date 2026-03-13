import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { interpolate } from '@/utilities/interpolate'
import { Link } from '@/i18n/navigation'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { PhotoGallery } from './PhotoGallery'
import RichText from '@/components/RichText'
import type { Animal, Media as MediaType, SiteSetting, UiString } from '@/payload-types'

type AnimalDetailProps = {
  animal: Animal
  siteSettings: SiteSetting | null
  locale: string
}

export async function AnimalDetail({ animal, siteSettings, locale }: AnimalDetailProps) {
  const ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null

  const photos = (animal.photos ?? []).filter(
    (p): p is MediaType => p !== null && typeof p === 'object',
  )

  const genderLabel = {
    erkek: ui?.animals?.detail?.erkek ?? 'Erkek',
    disi: ui?.animals?.detail?.disi ?? 'Dişi',
    bilinmiyor: ui?.animals?.detail?.bilinmiyor ?? 'Bilinmiyor',
  }[animal.gender]

  const typeLabel = {
    kedi: ui?.animals?.filter?.kedi ?? 'Kedi',
    kopek: ui?.animals?.filter?.kopek ?? 'Köpek',
  }[animal.type]

  const status = animal.animalStatus
  const statusLabel = status
    ? ({
        tedavide: ui?.animals?.filter?.tedavide ?? 'Tedavide',
        'kalici-bakim': ui?.animals?.filter?.kaliciBakim ?? 'Kalıcı Bakım',
        acil: ui?.animals?.filter?.acil ?? 'Acil',
      }[status] ?? '')
    : ''

  const badgeClass =
    status === 'acil' ? 'badge-sys critical' : 'badge-sys mint'

  return (
    <div className="sys-wrap">
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <PageBreadcrumb
          items={[
            { label: ui?.layout?.breadcrumb?.home ?? 'Ana Sayfa', href: '/' },
            { label: ui?.animals?.title ?? 'Canlarımız', href: '/canlarimiz' },
            { label: animal.name },
          ]}
        />

        {/* 8-col grid: 5 photo + 3 info */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-0 border border-border mt-6">
          {/* Left: photos — 5 cols */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-border">
            <PhotoGallery
              photos={photos}
              animalName={animal.name}
              labels={{
                close: ui?.animals?.lightbox?.close ?? 'Kapat',
                prev: ui?.animals?.lightbox?.prev ?? 'Önceki',
                next: ui?.animals?.lightbox?.next ?? 'Sonraki',
                imageOf: ui?.animals?.lightbox?.imageOf ?? '{current} / {total}',
                noPhotos: ui?.animals?.detail?.noPhotos ?? 'Fotoğraf yok',
              }}
            />
          </div>

          {/* Right: info panel — 3 cols */}
          <div className="lg:col-span-3 bg-background">
            {/* Name + status */}
            <div className="border-b border-border px-4 py-4">
              {status && (
                <span className={badgeClass}>{statusLabel}</span>
              )}
              <h1 className="t-h1 mt-2">{animal.name}</h1>
            </div>

            {/* Data rows */}
            <div className="sys-table">
              <div className="flex justify-between border-b border-border px-4 py-3">
                <span className="t-meta">{ui?.animals?.detail?.type ?? 'Tür'}</span>
                <span className="text-sm font-bold uppercase text-foreground">{typeLabel}</span>
              </div>
              {animal.age && (
                <div className="flex justify-between border-b border-border px-4 py-3">
                  <span className="t-meta">{ui?.animals?.detail?.age ?? 'Yaş'}</span>
                  <span className="text-sm font-bold uppercase text-foreground">{animal.age}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-border px-4 py-3">
                <span className="t-meta">{ui?.animals?.detail?.gender ?? 'Cinsiyet'}</span>
                <span className="text-sm font-bold uppercase text-foreground">{genderLabel}</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="p-4 space-y-3">
              <Link href="/destek-ol" className="btn-cta block w-full text-center">
                {ui?.animals?.detail?.donate ?? 'Destek Ol'}
              </Link>

              {siteSettings?.whatsapp && (
                <WhatsAppButton
                  phone={siteSettings.whatsapp}
                  message={interpolate(ui?.animals?.detail?.whatsappMessage ?? '{name} hakkında bilgi almak istiyorum', { name: animal.name })}
                  className="block w-full border border-border bg-background px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-foreground hover:bg-muted"
                >
                  WhatsApp
                </WhatsAppButton>
              )}

              <Link
                href="/canlarimiz"
                className="block w-full border border-border bg-background px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-foreground hover:bg-muted"
              >
                {ui?.animals?.detail?.back ?? 'Geri Dön'}
              </Link>
            </div>
          </div>
        </div>

        {/* Story & Needs */}
        <div className="mt-8 grid gap-0 md:grid-cols-2 border border-border">
          {animal.story && (
            <div className="border-b md:border-b-0 md:border-r border-border p-6">
              <h2 className="t-h2 mb-4">{ui?.animals?.detail?.story ?? 'Hikayesi'}</h2>
              <div className="t-body">
                <RichText data={animal.story} enableGutter={false} />
              </div>
            </div>
          )}
          {animal.needs && (
            <div className="p-6">
              <h2 className="t-h2 mb-4">{ui?.animals?.detail?.needs ?? 'İhtiyaçları'}</h2>
              <div className="t-body">
                <RichText data={animal.needs} enableGutter={false} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
