'use client'

import React, { useCallback, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Plus } from 'lucide-react'
import type { SiteSetting, NeedsList as NeedsListType } from '@/payload-types'
import { AnimatedCardTitle } from './AnimatedCardTitle'
import { CountUpNumber } from './CountUpNumber'
import { NeedsExpandedContent } from './NeedsExpandedContent'
import { useContentHeight } from '@/hooks/use-content-height'

type NeedsListBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeNeedsList' }>

type Props = {
  items: NeedsListType[]
  block: NeedsListBlock
}

type Priority = 'acil' | 'yuksek' | 'orta' | 'dusuk'

const LIGHT_BG_CARDS = new Set(['mid1', 'mid2'])
const DARK_BG_CARDS = new Set(['hero', 'high', 'low'])

const CARD_CLASS: Record<string, string> = {
  hero: 'needs-card needs-card-hero',
  high: 'needs-card needs-card-high',
  mid1: 'needs-card needs-card-mid-1',
  mid2: 'needs-card needs-card-mid-2',
  low: 'needs-card needs-card-low',
}

const CARD_KEYS = ['hero', 'high', 'mid1', 'mid2', 'low'] as const

const EXPAND_SPRING = { type: 'spring' as const, stiffness: 200, damping: 24, mass: 0.8 }

function normalizePriority(item: NeedsListType): Priority {
  if (item.priority) return item.priority as Priority
  if (item.urgency === 'yeterli') return 'dusuk'
  return (item.urgency || 'orta') as Priority
}

function safeTargetStock(val: number | null | undefined): number {
  return val && val > 0 ? val : 1
}

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
  const pct = target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0
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

function ExpandableCard({
  item,
  cardKey,
  labels,
  isExpanded,
  onToggle,
}: {
  item: NeedsListType
  cardKey: string
  labels: NeedsListBlock['labels']
  isExpanded: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const contentHeight = useContentHeight(contentRef)
  const prefersReducedMotion = useReducedMotion()

  const priority = normalizePriority(item)
  const currentStock = item.currentStock ?? 0
  const targetStock = safeTargetStock(item.targetStock)
  const unit = item.unit || 'adet'
  const isHero = cardKey === 'hero'
  const expandedId = `needs-expanded-${item.id}`

  const priorityLabel = (p: string) => {
    const map: Record<string, string | null | undefined> = {
      acil: labels?.priorityAcil,
      yuksek: labels?.priorityYuksek,
      orta: labels?.priorityOrta,
      dusuk: labels?.priorityDusuk,
    }
    return map[p] || p.toUpperCase()
  }

  const unitLabel = (u: string) => {
    const map: Record<string, string | null | undefined> = {
      kutu: labels?.unitKutu,
      kg: labels?.unitKg,
      adet: labels?.unitAdet,
    }
    return map[u] || u
  }

  const badgeClass = LIGHT_BG_CARDS.has(cardKey)
    ? 'badge-sys-contrast'
    : DARK_BG_CARDS.has(cardKey)
      ? 'badge-sys-dark'
      : 'badge-sys'

  return (
    <div
      className={`${CARD_CLASS[cardKey] || CARD_CLASS.low} needs-card-expandable`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      aria-expanded={isExpanded}
      aria-controls={expandedId}
    >
      {/* Toggle button — positioned absolutely */}
      <motion.div
        className={`needs-expand-toggle ${badgeClass}`}
        animate={{ rotate: isExpanded ? 45 : 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 20 }}
        aria-hidden="true"
      >
        <Plus className="w-3.5 h-3.5" />
      </motion.div>

      {/* Top section: badge, title, brand — same as original */}
      <div>
        <div className="mb-2">
          <span className={badgeClass}>
            {priorityLabel(priority)}
          </span>
        </div>
        {isHero ? (
          <AnimatedCardTitle
            text={item.productName}
            tag="h3"
            className="text-2xl md:text-3xl font-black uppercase tracking-tight"
          />
        ) : (
          <h3
            className="text-lg font-black uppercase tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {item.productName}
          </h3>
        )}
        {item.brandDetail && (
          <p className={`${isHero ? 'text-sm mt-1' : 't-meta mt-0.5'}`} style={isHero ? { color: 'rgba(255,255,255,0.7)' } : undefined}>
            {item.brandDetail}
          </p>
        )}
      </div>

      {/* Bottom section: quantity, unit, meter — same as original */}
      <div>
        <div className={isHero ? 'needs-qty-hero' : 'needs-qty-card'}>
          <CountUpNumber target={targetStock} />
        </div>
        <p className={`text-xs font-bold uppercase tracking-widest ${isHero ? 'mt-1' : ''}`} style={{ fontFamily: 'var(--font-mono)' }}>
          {unitLabel(unit)} {labels?.needed || 'needed'}
        </p>
        <MeterBar
          current={currentStock}
          target={targetStock}
          priority={priority}
          label={`${item.productName} ${labels?.stockLevel || 'Stock'}`}
        />
        {isHero && (
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)' }}>
            {currentStock}/{targetStock} {labels?.inStock || 'in stock'}
          </p>
        )}
      </div>

      {/* Expanded content — animated height */}
      <motion.div
        id={expandedId}
        className="needs-expand-wrapper"
        initial={false}
        animate={{ height: isExpanded ? contentHeight : 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : EXPAND_SPRING}
        aria-hidden={!isExpanded}
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={contentRef}>
          <NeedsExpandedContent
            item={item}
            labels={labels}
            cardKey={cardKey}
            isExpanded={isExpanded}
          />
        </div>
      </motion.div>
    </div>
  )
}

export function NeedsListClient({ items, block }: Props) {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())

  const toggleCard = useCallback((id: number) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  return (
    <div className="needs-grid" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
      {items.map((item, i) => {
        const cardKey = CARD_KEYS[i] || 'low'
        return (
          <ExpandableCard
            key={item.id}
            item={item}
            cardKey={cardKey}
            labels={block.labels}
            isExpanded={expandedIds.has(item.id)}
            onToggle={() => toggleCard(item.id)}
          />
        )
      })}
    </div>
  )
}
