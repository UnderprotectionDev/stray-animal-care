'use client'

import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'
import { Package, HandHeart, ShoppingCart, ArrowRight } from 'lucide-react'
import type { SiteSetting, NeedsList as NeedsListType } from '@/payload-types'
import { formatDistanceToNow } from 'date-fns'
import { tr as trLocale } from 'date-fns/locale'

type NeedsListBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeNeedsList' }>

type Props = {
  item: NeedsListType
  labels: NeedsListBlock['labels']
  cardKey: string
  isExpanded: boolean
}

type Priority = 'acil' | 'yuksek' | 'orta' | 'dusuk'

const LIGHT_BG_CARDS = new Set(['mid1', 'mid2'])

const SHIPPING_METHODS = [
  { key: 'shippingCargo' as const, Icon: Package },
  { key: 'shippingInPerson' as const, Icon: HandHeart },
  { key: 'shippingOnline' as const, Icon: ShoppingCart },
]

function normalizePriority(item: NeedsListType): Priority {
  if (item.priority) return item.priority as Priority
  if (item.urgency === 'yeterli') return 'dusuk'
  return (item.urgency || 'orta') as Priority
}

export function NeedsExpandedContent({ item, labels, cardKey, isExpanded }: Props) {
  const prefersReducedMotion = useReducedMotion()
  const params = useParams()
  const locale = (params?.locale as string) || 'tr'

  const priority = normalizePriority(item)
  const currentStock = item.currentStock ?? 0
  const targetStock = item.targetStock && item.targetStock > 0 ? item.targetStock : 1
  const unit = item.unit || 'adet'
  const pct = Math.min(Math.round((currentStock / targetStock) * 100), 100)
  const isLightBg = LIGHT_BG_CARDS.has(cardKey)

  const unitLabel = (u: string) => {
    const map: Record<string, string | null | undefined> = {
      kutu: labels?.unitKutu,
      kg: labels?.unitKg,
      adet: labels?.unitAdet,
    }
    return map[u] || u
  }

  const priorityLabel = (p: string) => {
    const map: Record<string, string | null | undefined> = {
      acil: labels?.priorityAcil,
      yuksek: labels?.priorityYuksek,
      orta: labels?.priorityOrta,
      dusuk: labels?.priorityDusuk,
    }
    return map[p] || p.toUpperCase()
  }

  const priorityDesc = (p: string) => {
    const map: Record<string, string | null | undefined> = {
      acil: labels?.priorityDescAcil,
      yuksek: labels?.priorityDescYuksek,
      orta: labels?.priorityDescOrta,
      dusuk: labels?.priorityDescDusuk,
    }
    return map[p] || ''
  }

  const ctaLink = labels?.ctaLink || '/destek-ol'
  const ctaText = labels?.ctaButton || 'Bu İhtiyacı Karşıla'
  const dateLocale = locale === 'tr' ? trLocale : undefined

  return (
    <motion.div
      className="needs-expanded"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExpanded ? 1 : 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { delay: isExpanded ? 0.15 : 0, duration: 0.2 }}
    >
      {/* Stock progress */}
      <div className="needs-expanded-stock">
        <div className="needs-expanded-progress-bar">
          <div
            className="needs-expanded-progress-fill"
            data-priority={priority}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="needs-expanded-stock-info">
          <span className="needs-expanded-pct">{pct}%</span>
          <span className="needs-expanded-stock-text">
            {currentStock} / {targetStock} {unitLabel(unit)} {labels?.inStock || 'mevcut'}
          </span>
        </div>
      </div>

      {/* Details row */}
      <div className="needs-expanded-details">
        {item.brandDetail && (
          <span>{item.brandDetail}</span>
        )}
        <span className="needs-expanded-priority-tag">
          {priorityLabel(priority)}
        </span>
      </div>
      {priorityDesc(priority) && (
        <p className="needs-expanded-priority-desc">
          {priorityDesc(priority)}
        </p>
      )}

      {/* Shipping methods */}
      <div className="needs-shipping-row">
        {SHIPPING_METHODS.map(({ key, Icon }) => {
          const text = labels?.[key]
          if (!text) return null
          return (
            <div key={key} className="needs-shipping-method">
              <Icon className="w-3.5 h-3.5" />
              <span>{text}</span>
            </div>
          )
        })}
      </div>

      {/* CTA button */}
      <Link
        href={ctaLink}
        className={`needs-expanded-cta ${isLightBg ? 'needs-expanded-cta-dark' : 'needs-expanded-cta-light'}`}
      >
        {ctaText}
        <ArrowRight className="w-4 h-4" />
      </Link>

      {/* Last updated */}
      {item.updatedAt && (
        <p className="needs-expanded-updated" suppressHydrationWarning>
          {labels?.lastUpdated || 'Son güncelleme'}:{' '}
          {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true, locale: dateLocale })}
        </p>
      )}
    </motion.div>
  )
}
