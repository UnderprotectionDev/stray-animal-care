'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import type { EmergencyCase, Media as MediaType, SiteSetting } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Link } from '@/i18n/navigation'
import GlitchText from '@/components/GlitchText'
import ElectricBorder from '@/components/ElectricBorder'
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

function extractPlainText(richText: unknown): string {
  if (!richText || typeof richText !== 'object') return ''
  const rt = richText as { root?: { children?: Array<{ text?: string; children?: unknown[] }> } }
  if (!rt.root?.children) return ''
  const texts: string[] = []
  function walk(nodes: Array<{ text?: string; children?: unknown[] }>) {
    for (const node of nodes) {
      if (node.text) texts.push(node.text)
      if (node.children) walk(node.children as Array<{ text?: string; children?: unknown[] }>)
    }
  }
  walk(rt.root.children)
  return texts.join(' ')
}

function serializeCards(cases: EmergencyCase[]): EmergencyCardData[] {
  return cases.map((c) => {
    const photo = getFirstPhoto(c)
    const plainDesc = extractPlainText(c.description)
    return {
      id: c.id,
      title: c.title,
      slug: c.slug || '',
      targetAmount: c.targetAmount ?? 0,
      collectedAmount: c.collectedAmount ?? 0,
      imageUrl: photo ? getMediaUrl(photo.url) : '',
      imageAlt: photo?.alt || c.title,
      description: plainDesc.length > 120 ? plainDesc.slice(0, 120) + '…' : plainDesc,
      caseStatus: c.caseStatus || 'aktif',
    }
  })
}

export function ActiveEmergencies({ block, cases }: Props) {
  if (cases.length === 0) return null

  const tickerText = block.tickerText || ''
  const serializedCards = serializeCards(cases)

  return (
    <section className="bg-white" style={{ '--glitch-bg': '#ffffff' } as React.CSSProperties}>
      {/* Header */}
      <div className="panel flex items-center justify-between px-6 py-6">
        <GlitchText
          speed={0.7}
          enableShadows
          className="t-h1 !text-[clamp(1.5rem,5vw,3.5rem)]"
        >
          {block.sectionTitle || 'ACİL VAKALAR'}
        </GlitchText>

        <ElectricBorder
          color="#F5B62A"
          borderRadius={0}
          chaos={0.06}
          speed={0.8}
        >
          <Link
            href={block.viewAllLink || '/acil-vakalar'}
            className="btn-emergency inline-block"
          >
            {block.viewAllLabel || 'Tümünü Gör'}
          </Link>
        </ElectricBorder>
      </div>

      {/* Ticker */}
      <EmergencyScrollBand
        texts={[tickerText, ...cases.map((c) => c.title).filter(Boolean)] as string[]}
      />

      {/* Stacking Cards */}
      <EmergencyStackingCards cards={serializedCards} />
    </section>
  )
}
