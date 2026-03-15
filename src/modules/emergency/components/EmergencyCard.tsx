import React from 'react'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'
import type { EmergencyCase, Media as MediaType } from '@/payload-types'

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
  const pct = target > 0 ? Math.min(Math.round((collected / target) * 100), 100) : 0

  return (
    <Link href={`/acil-vakalar/${ec.slug}`} className="group block">
      <div className="border border-border bg-background">
        <div className="relative aspect-video bg-muted overflow-hidden">
          {firstPhoto && typeof firstPhoto === 'object' ? (
            <Media
              resource={firstPhoto}
              fill
              imgClassName="object-cover transition-all duration-300"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-foreground">
              <span className="text-4xl">🚨</span>
            </div>
          )}
          <div className="absolute top-0 left-0">
            <span
              className={`inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider border border-border ${
                ec.caseStatus === 'aktif'
                  ? 'bg-destructive text-background'
                  : 'bg-health text-health-foreground'
              }`}
            >
              {ec.caseStatus === 'aktif' ? 'Aktif' : 'Tamamlandi'}
            </span>
          </div>
        </div>
        <div className="p-4 space-y-3 border-t border-border">
          <h3 className="font-bold text-foreground text-base uppercase tracking-wide leading-tight line-clamp-2 group-hover:text-cta transition-colors">
            {ec.title}
          </h3>
          {target > 0 && (
            <div className="space-y-1">
              <div className="w-full h-3 border border-border bg-background">
                <div
                  className="h-full bg-emergency"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-[11px] font-mono text-foreground tracking-wide">
                {fmt(collected)} / {fmt(target)}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
