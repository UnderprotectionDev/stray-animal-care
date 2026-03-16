'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import type { EmergencyCase, Media as MediaType, SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { AnimatedSectionHeader } from './AnimatedSectionHeader'
import { EmergencyScrollBand } from './EmergencyScrollBand'
import type { EmergencyCardData } from './EmergencyStackingCards'

const EmergencyStackingCards = dynamic(() => import('./EmergencyStackingCards'), {
  ssr: false,
  loading: () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-[340px] border-[1.5px] border-[var(--border)] bg-palette-cream animate-pulse" />
      ))}
    </div>
  ),
})

type ActiveEmergenciesBlock = Extract<
  NonNullable<SiteSetting['homepageBlocks']>[number],
  { blockType: 'homeActiveEmergencies' }
>

type Props = {
  block: ActiveEmergenciesBlock
  cases: EmergencyCase[]
}

function getFirstPhoto(c: EmergencyCase): MediaType | null {
  if (c.photos && c.photos.length > 0) {
    const p = c.photos[0]
    if (typeof p !== 'number') return p
  }
  if (c.beforePhoto && typeof c.beforePhoto !== 'number') return c.beforePhoto
  return null
}

function serializeCards(cases: EmergencyCase[]): EmergencyCardData[] {
  return cases.map((c) => {
    const photo = getFirstPhoto(c)
    return {
      id: c.id,
      title: c.title,
      slug: c.slug || '',
      targetAmount: c.targetAmount ?? 0,
      collectedAmount: c.collectedAmount ?? 0,
      imageUrl: photo ? getMediaUrl(photo.url) : '',
      imageAlt: photo?.alt || c.title,
    }
  })
}

export function ActiveEmergencies({ block, cases }: Props) {
  if (cases.length === 0) return null

  const labels = block.labels ?? {}
  const tickerText = block.tickerText || ''
  const serializedCards = serializeCards(cases)

  return (
    <section>
      <AnimatedSectionHeader
        title={block.sectionTitle}
        viewAllLabel={block.viewAllLabel}
        viewAllLink={block.viewAllLink}
      />

      <EmergencyScrollBand
        texts={[tickerText, ...cases.map((c) => c.title).filter(Boolean)] as string[]}
      />

      <EmergencyStackingCards cards={serializedCards} />
    </section>
  )
}
