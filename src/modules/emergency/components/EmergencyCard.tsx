import React from 'react'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { Card } from '@/components/ui/card'
import type { EmergencyCase, Media as MediaType } from '@/payload-types'

const caseStatusVariantMap = {
  aktif: 'urgent' as const,
  tamamlandi: 'completed' as const,
}

const fmt = (n: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(n)

type EmergencyCardProps = {
  ec: EmergencyCase
}

export function EmergencyCard({ ec }: EmergencyCardProps) {
  const firstPhoto =
    ec.photos && ec.photos.length > 0 ? (ec.photos[0] as MediaType) : null

  const collected = ec.collectedAmount ?? 0
  const target = ec.targetAmount ?? 0

  return (
    <Link href={`/acil-vakalar/${ec.slug}`} className="group block">
      <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-warm-md">
        <div className="relative aspect-video bg-muted">
          {firstPhoto && typeof firstPhoto === 'object' ? (
            <Media
              resource={firstPhoto}
              fill
              imgClassName="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <span className="text-4xl">🚨</span>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <StatusBadge status={caseStatusVariantMap[ec.caseStatus] ?? 'urgent'}>
              {ec.caseStatus === 'aktif' ? 'Aktif' : 'Tamamlandı'}
            </StatusBadge>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {ec.title}
          </h3>
          {target > 0 && (
            <ProgressBar
              current={collected}
              target={target}
              label={`${fmt(collected)} / ${fmt(target)}`}
            />
          )}
        </div>
      </Card>
    </Link>
  )
}
