import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageBreadcrumb } from '@/components/shared/Breadcrumb'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import { UpdateTimeline } from './UpdateTimeline'
import { BeforeAfterWrapper } from './BeforeAfterWrapper'
import RichText from '@/components/RichText'
import { Heart } from 'lucide-react'
import type { EmergencyCase, Animal, Media as MediaType } from '@/payload-types'

const caseStatusVariantMap = {
  aktif: 'urgent' as const,
  tamamlandi: 'completed' as const,
}

type CaseStatusKey = keyof typeof caseStatusVariantMap
const getStatusVariant = (status: string) =>
  caseStatusVariantMap[status as CaseStatusKey] ?? 'urgent'

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

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Hero photo */}
          {firstPhoto && (
            <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
              <Media resource={firstPhoto} fill imgClassName="object-cover" priority />
            </div>
          )}

          {/* Before/After */}
          {beforePhoto && afterPhoto && (
            <div>
              <h2 className="font-heading text-xl font-semibold mb-4">
                {t('detail.beforeAfter')}
              </h2>
              <div className="aspect-video">
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
            <div>
              <h2 className="font-heading text-xl font-semibold mb-4">
                {t('detail.description')}
              </h2>
              <RichText data={ec.description} enableGutter={false} />
            </div>
          )}

          {/* Timeline */}
          <div>
            <h2 className="font-heading text-xl font-semibold mb-4">
              {t('detail.updates')}
            </h2>
            <UpdateTimeline
              updates={ec.updates ?? []}
              noUpdatesLabel={t('detail.noUpdates')}
              locale={locale}
            />
          </div>
        </div>

        {/* Right: sidebar */}
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-2">
            <StatusBadge status={getStatusVariant(ec.caseStatus)}>
              {ec.caseStatus === 'aktif' ? 'Aktif' : 'Tamamlandı'}
            </StatusBadge>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              {ec.title}
            </h1>
          </div>

          {/* Progress */}
          {target > 0 && (
            <div className="rounded-xl border p-4 space-y-3">
              <ProgressBar
                current={collected}
                target={target}
                label={t('progress')}
              />
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">{t('collected')}</p>
                  <p className="font-semibold">{fmt(collected)}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-xs">{t('target')}</p>
                  <p className="font-semibold">{fmt(target)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Related animal */}
          {relatedAnimal && (
            <div className="rounded-lg border p-3 text-sm">
              <p className="text-muted-foreground text-xs mb-1">{t('detail.relatedAnimal')}</p>
              <Link
                href={`/canlarimiz/${relatedAnimal.slug}`}
                className="font-medium text-primary hover:underline"
              >
                {relatedAnimal.name}
              </Link>
            </div>
          )}

          {/* Donate CTA */}
          <Button
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            render={<Link href="/destek-ol" />}
          >
            <Heart className="size-4" />
            {t('title')}
          </Button>
        </div>
      </div>
    </div>
  )
}
