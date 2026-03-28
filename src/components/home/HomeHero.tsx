import React from 'react'
import type { SiteSetting } from '@/payload-types'
import { HomeHeroSilkBg } from './HomeHeroSilkBg'
import { HomeHeroClient } from './HomeHeroClient'

type HomeHeroBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeHero' }>

type Props = {
  block: HomeHeroBlock
}

export function HomeHero({ block }: Props) {
  const rotatingWords = block.rotatingWords
    ?.map((w) => w.word)
    .filter(Boolean) as string[] | undefined

  return (
    <section aria-label="Hero" className="relative overflow-hidden border-b border-border">
      <HomeHeroSilkBg />

      <HomeHeroClient
        sectionTitle={block.sectionTitle}
        tagline={block.tagline}
        rotatingWords={rotatingWords}
      />
    </section>
  )
}
