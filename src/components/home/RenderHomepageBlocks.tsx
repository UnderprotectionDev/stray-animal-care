import React from 'react'
import type { SiteSetting, Animal, EmergencyCase, Post, NeedsList as NeedsListType, TransparencyReport } from '@/payload-types'

import { HomeHero } from './HomeHero'
import { StatsSection } from './StatsSection'
import { StorySection } from './StorySection'
import { OurWorkShowcase } from './OurWorkShowcase'
import { FeaturedAnimals } from './FeaturedAnimals'
import { SuccessStories } from './SuccessStories'
import { ActiveEmergencies } from './ActiveEmergencies'
import { SupportCards } from './SupportCards'
import { NeedsList } from './NeedsList'
import { RecentPosts } from './RecentPosts'
import { TransparencyBanner } from './TransparencyBanner'
import { PostsAndTransparency } from './PostsAndTransparency'

type Props = {
  blocks: SiteSetting['homepageBlocks']
  data: {
    animals: Animal[]
    activeCases: EmergencyCase[]
    completedCases: EmergencyCase[]
    posts: Post[]
    needsItems: NeedsListType[]
    siteSettings: SiteSetting | null
    locale: string
    latestReport: TransparencyReport | null
  }
}

export function RenderHomepageBlocks({ blocks, data }: Props) {
  if (!blocks || blocks.length === 0) return null

  // Pre-scan: can we combine posts + transparency into one section?
  const postsBlock = blocks.find(
    (b) => b.blockType === 'homeRecentPosts' && b.enabled !== false,
  )
  const transpBlock = blocks.find(
    (b) => b.blockType === 'homeTransparencyBanner' && b.enabled !== false,
  )
  const shouldCombine = !!(postsBlock && transpBlock)
  let combinedRendered = false

  return (
    <>
      {blocks.map((block) => {
        if (block.enabled === false) return null

        // Combined layout: render once, skip the second block
        if (
          shouldCombine &&
          (block.blockType === 'homeRecentPosts' || block.blockType === 'homeTransparencyBanner')
        ) {
          if (combinedRendered) return null
          combinedRendered = true
          return (
            <PostsAndTransparency
              key={`combined-${postsBlock!.id}-${transpBlock!.id}`}
              postsBlock={postsBlock as Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeRecentPosts' }>}
              transparencyBlock={transpBlock as Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeTransparencyBanner' }>}
              posts={data.posts}
              report={data.latestReport}
              locale={data.locale}
            />
          )
        }

        switch (block.blockType) {
          case 'homeHero':
            return <HomeHero key={block.id} block={block} />
          case 'homeStats':
            return <StatsSection key={block.id} block={block} />
          case 'homeStory':
            return <StorySection key={block.id} block={block} />
          case 'homeOurWork':
            return <OurWorkShowcase key={block.id} block={block} />
          case 'homeFeaturedAnimals':
            return <FeaturedAnimals key={block.id} block={block} animals={data.animals} />
          case 'homeSuccessStories':
            return <SuccessStories key={block.id} block={block} stories={data.completedCases} />
          case 'homeActiveEmergencies':
            return <ActiveEmergencies key={block.id} block={block} cases={data.activeCases} />
          case 'homeSupportCards':
            return <SupportCards key={block.id} block={block} siteSettings={data.siteSettings} />
          case 'homeNeedsList':
            return <NeedsList key={block.id} block={block} items={data.needsItems} />
          case 'homeRecentPosts':
            return <RecentPosts key={block.id} block={block} posts={data.posts} locale={data.locale} />
          case 'homeTransparencyBanner':
            return <TransparencyBanner key={block.id} block={block} report={data.latestReport} locale={data.locale} />
          default:
            return null
        }
      })}
    </>
  )
}
