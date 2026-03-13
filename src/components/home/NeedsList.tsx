import React from 'react'
import type { SiteSetting, NeedsList as NeedsListType } from '@/payload-types'
import { Link } from '@/i18n/navigation'

type NeedsListBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeNeedsList' }>

type Props = {
  block: NeedsListBlock
  items: NeedsListType[]
}

type Priority = 'acil' | 'yuksek' | 'orta' | 'dusuk'

const PRIORITY_BADGE_CLASS: Record<Priority, string> = {
  acil: 'badge-sys-dark',
  yuksek: 'badge-sys',
  orta: 'badge-sys',
  dusuk: 'badge-sys-dark',
}

const CARD_CLASS: Record<string, string> = {
  hero: 'needs-card needs-card-hero',
  high: 'needs-card needs-card-high',
  mid1: 'needs-card needs-card-mid-1',
  mid2: 'needs-card needs-card-mid-2',
  low: 'needs-card needs-card-low',
}

const CARD_KEYS = ['hero', 'high', 'mid1', 'mid2', 'low'] as const

function MeterBar({
  current,
  target,
  priority,
  label,
}: {
  current: number
  target: number
  priority: Priority
  label: string
}) {
  const pct = Math.min(Math.round((current / target) * 100), 100)
  return (
    <div
      className="needs-meter"
      role="meter"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={target}
      aria-label={label}
    >
      <div
        className="needs-meter-fill"
        data-priority={priority}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function NeedsList({ block, items }: Props) {
  if (items.length === 0) return null

  const labels = block.labels ?? {}
  const limit = block.limit ?? 5

  const priorityLabel = (p: string) => {
    const map: Record<string, string | null | undefined> = {
      acil: labels.priorityAcil,
      yuksek: labels.priorityYuksek,
      orta: labels.priorityOrta,
      dusuk: labels.priorityDusuk,
    }
    return map[p] || p.toUpperCase()
  }

  const unitLabel = (u: string) => {
    const map: Record<string, string | null | undefined> = {
      kutu: labels.unitKutu,
      kg: labels.unitKg,
      adet: labels.unitAdet,
    }
    return map[u] || u
  }

  const visibleItems = items.slice(0, limit)

  return (
    <section>
      <div className="panel py-4 px-6 flex items-center justify-between border-b border-border">
        <h2 className="t-h2">{block.sectionTitle}</h2>
        {block.viewAllLabel && block.viewAllLink && (
          <Link href={block.viewAllLink} className="btn-cta text-xs py-2 px-4">
            {block.viewAllLabel}
          </Link>
        )}
      </div>

      <div className="needs-grid">
        {visibleItems.map((item, i) => {
          const cardKey = CARD_KEYS[i] || 'low'
          const priority = (item.priority || item.urgency || 'orta') as Priority
          const currentStock = item.currentStock ?? 0
          const targetStock = item.targetStock ?? 1
          const unit = item.unit || 'adet'
          const isHero = i === 0

          return (
            <div key={item.id} className={CARD_CLASS[cardKey] || CARD_CLASS.low}>
              <div>
                <span className={PRIORITY_BADGE_CLASS[priority] || 'badge-sys'}>
                  {priorityLabel(priority)}
                </span>
                <h3
                  className={`${isHero ? 'text-2xl md:text-3xl mt-3' : 'text-lg mt-2'} font-black uppercase tracking-tight`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.productName}
                </h3>
                {item.brandDetail && (
                  <p className={`${isHero ? 'text-sm mt-1' : 't-meta mt-0.5'}`} style={isHero ? { color: 'rgba(255,255,255,0.7)' } : undefined}>
                    {item.brandDetail}
                  </p>
                )}
              </div>
              <div>
                <div className={isHero ? 'needs-qty-hero' : 'needs-qty-card'}>
                  {targetStock}
                </div>
                <p className={`text-xs font-bold uppercase tracking-widest ${isHero ? 'mt-1' : ''}`} style={{ fontFamily: 'var(--font-mono)' }}>
                  {unitLabel(unit)} {labels.needed || 'needed'}
                </p>
                <MeterBar
                  current={currentStock}
                  target={targetStock}
                  priority={priority}
                  label={`${item.productName} ${labels.stockLevel || 'Stock'}`}
                />
                {isHero && (
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)' }}>
                    {currentStock}/{targetStock} {labels.inStock || 'in stock'}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
