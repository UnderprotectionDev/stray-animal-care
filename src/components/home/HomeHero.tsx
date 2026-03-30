import React from 'react'
import type { SiteSetting } from '@/payload-types'
import { HomeHeroCrowd } from './HomeHeroCrowd'
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
    <section aria-label="Hero" className="relative flex flex-col overflow-hidden border-b border-border bg-white">
      {/* Text area — top, clean */}
      <HomeHeroClient
        sectionTitle={block.sectionTitle}
        tagline={block.tagline}
        rotatingWords={rotatingWords}
      />

      {/* Crowd area — bottom */}
      <div className="relative h-[200px] md:h-[260px] lg:h-[320px]">
        <HomeHeroCrowd />
        <div className="hero-noise pointer-events-none absolute inset-0 z-[5] opacity-[0.04]" />
      </div>
    </section>
  )
}
