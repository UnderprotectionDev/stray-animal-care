import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { Media } from '@/components/Media'
import { UpdateTimeline } from './UpdateTimeline'
import { BeforeAfterWrapper } from './BeforeAfterWrapper'
import RichText from '@/components/RichText'
import type { EmergencyCase, Animal, Media as MediaType } from '@/payload-types'

const fmt = (n: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(n)

type EmergencyDetailProps = {
  ec: EmergencyCase
  locale: string
}

export async function EmergencyDetail({ ec, locale }: EmergencyDetailProps) {
  const t = await getTranslations('emergency')
  const tBreadcrumb = await getTranslations('layout.breadcrumb')

  const collected = ec.collectedAmount ?? 0
  const target = ec.targetAmount ?? 0
  const pct = target > 0 ? Math.min(Math.round((collected / target) * 100), 100) : 0

  const firstPhoto =
    ec.photos && ec.photos.length > 0 ? (ec.photos[0] as MediaType) : null

  const beforePhoto =
    ec.beforePhoto && typeof ec.beforePhoto === 'object'
      ? (ec.beforePhoto as MediaType)
      : null
  const afterPhoto =
    ec.afterPhoto && typeof ec.afterPhoto === 'object'
      ? (ec.afterPhoto as MediaType)
      : null

  const relatedAnimal =
    ec.animal && typeof ec.animal === 'object' ? (ec.animal as Animal) : null

  return (
    <div className="container py-8">
      <PageBreadcrumb
        items={[
          { label: tBreadcrumb('home'), href: '/' },
          { label: t('title'), href: '/acil-vakalar' },
          { label: ec.title },
        ]}
      />

      <div className="grid gap-0 lg:grid-cols-8 border border-border mt-6">
        {/* Left: content — 5 cols */}
        <div className="lg:col-span-5 border-r border-border">
          {/* Hero photo */}
          {firstPhoto && (
            <div className="relative aspect-video overflow-hidden bg-muted border-b border-border">
              <Media
                resource={firstPhoto}
                fill
                imgClassName="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                priority
              />
            </div>
          )}

          {/* Before/After */}
          {beforePhoto && afterPhoto && (
            <div className="border-b border-border p-6">
              <h2 className="font-bold text-lg uppercase tracking-wider text-foreground mb-4">
                {t('detail.beforeAfter')}
              </h2>
              <div className="aspect-video border border-border overflow-hidden">
                <BeforeAfterWrapper
                  before={beforePhoto}
                  after={afterPhoto}
                  labels={{
                    before: t('detail.before'),
                    after: t('detail.after'),
                  }}
                />
              </div>
            </div>
          )}

          {/* Description */}
          {ec.description && (
            <div className="border-b border-border p-6">
              <h2 className="font-bold text-lg uppercase tracking-wider text-foreground mb-4">
                {t('detail.description')}
              </h2>
              <div className="text-sm leading-relaxed text-foreground">
                <RichText data={ec.description} enableGutter={false} />
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="p-6">
            <h2 className="font-bold text-lg uppercase tracking-wider text-foreground mb-4">
              {t('detail.updates')}
            </h2>
            <UpdateTimeline
              updates={ec.updates ?? []}
              noUpdatesLabel={t('detail.noUpdates')}
              locale={locale}
            />
          </div>
        </div>

        {/* Right: sidebar — 3 cols */}
        <div className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start">
          {/* Status + Title */}
          <div className="p-6 border-b border-border">
            <span
              className={`inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider border border-border mb-3 ${
                ec.caseStatus === 'aktif'
                  ? 'bg-destructive text-background'
                  : 'bg-accent text-foreground'
              }`}
            >
              {ec.caseStatus === 'aktif' ? 'Aktif' : 'Tamamlandi'}
            </span>
            <h1 className="font-bold text-2xl uppercase tracking-wide text-foreground leading-tight">
              {ec.title}
            </h1>
          </div>

          {/* Progress */}
          {target > 0 && (
            <div className="p-6 border-b border-border space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                {t('progress')}
              </p>
              <div className="w-full h-4 border border-border bg-background">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex justify-between text-sm font-mono">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t('collected')}</p>
                  <p className="font-bold text-foreground">{fmt(collected)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{t('target')}</p>
                  <p className="font-bold text-foreground">{fmt(target)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Related animal */}
          {relatedAnimal && (
            <div className="p-6 border-b border-border">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                {t('detail.relatedAnimal')}
              </p>
              <Link
                href={`/canlarimiz/${relatedAnimal.slug}`}
                className="font-bold text-foreground hover:text-accent transition-colors uppercase tracking-wide text-sm"
              >
                {relatedAnimal.name}
              </Link>
            </div>
          )}

          {/* Donate CTA */}
          <div className="p-6">
            <Link
              href="/destek-ol"
              className="block w-full bg-accent text-foreground text-center font-bold uppercase tracking-widest text-sm py-3 px-6 border border-border hover:bg-foreground hover:text-accent transition-colors"
            >
              {t('title')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
