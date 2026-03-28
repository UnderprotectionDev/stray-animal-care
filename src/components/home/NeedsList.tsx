import React from 'react'
import type { SiteSetting, NeedsList as NeedsListType } from '@/payload-types'
import { AnimatedSectionHeader } from './AnimatedSectionHeader'
import { NeedsListClient } from './NeedsListClient'

type NeedsListBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeNeedsList' }>

type Props = {
  block: NeedsListBlock
  items: NeedsListType[]
}

export function NeedsList({ block, items }: Props) {
  if (items.length === 0) return null

  const limit = block.limit ?? 5
  const visibleItems = items.slice(0, limit)

  return (
    <section>
      <AnimatedSectionHeader title={block.sectionTitle} viewAllLabel={block.viewAllLabel} viewAllLink={block.viewAllLink} />
      <NeedsListClient items={visibleItems} block={block} />
    </section>
  )
}
