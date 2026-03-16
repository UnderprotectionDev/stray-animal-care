import React from 'react'
import type { SiteSetting, Animal, EmergencyCase, Post, NeedsList as NeedsListType, TransparencyReport } from '@/payload-types'

import { HomeHero } from './HomeHero'
import { StatsSection } from './StatsSection'
import { StorySection } from './StorySection'
import { OurWorkShowcase } from './OurWorkShowcase'
import { FeaturedAnimals } from './FeaturedAnimals'
import { ActiveEmergencies } from './ActiveEmergencies'
import { SupportCards } from './SupportCards'
import { NeedsList } from './NeedsList'
import { RecentPosts } from './RecentPosts'
import { TransparencyBanner } from './TransparencyBanner'
import { PostsAndTransparency } from './PostsAndTransparency'
import { SectionDividerBand } from './SectionDividerBand'
import { ElasticDivider } from './ElasticDivider'

type Props = {
  blocks: SiteSetting['homepageBlocks']
  data: {
    animals: Animal[]
    activeCases: EmergencyCase[]
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

  // Pass 1: Collect rendered elements
  const rendered: React.ReactElement[] = []

  for (const block of blocks) {
    if (block.enabled === false) continue

    // Combined layout: render once, skip the second block
    if (
      shouldCombine &&
      (block.blockType === 'homeRecentPosts' || block.blockType === 'homeTransparencyBanner')
    ) {
      if (combinedRendered) continue
      combinedRendered = true
      rendered.push(
        <PostsAndTransparency
          key={`combined-${postsBlock!.id}-${transpBlock!.id}`}
          postsBlock={postsBlock as Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeRecentPosts' }>}
          transparencyBlock={transpBlock as Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeTransparencyBanner' }>}
          posts={data.posts}
          report={data.latestReport}
          locale={data.locale}
        />,
      )
      continue
    }

    switch (block.blockType) {
      case 'homeHero':
        rendered.push(<HomeHero key={block.id} block={block} />)
        break
      case 'homeStats':
        rendered.push(<StatsSection key={block.id} block={block} />)
        break
      case 'homeStory':
        rendered.push(<StorySection key={block.id} block={block} />)
        rendered.push(
          <SectionDividerBand
            key={`divider-story-${block.id}`}
            texts={['BESLEME', 'TEDAVİ', 'KISIRLAŞTIRMA', 'ACİL MÜDAHALE', 'AŞILAMA', 'BARINMA']}
            bgColor="var(--cta)"
            textColor="var(--cta-foreground)"
            velocity={50}
          />,
        )
        break
      case 'homeOurWork':
        rendered.push(<OurWorkShowcase key={block.id} block={block} />)
        break
      case 'homeFeaturedAnimals':
        rendered.push(<FeaturedAnimals key={block.id} block={block} animals={data.animals} />)
        break
      case 'homeActiveEmergencies':
        rendered.push(<ActiveEmergencies key={block.id} block={block} cases={data.activeCases} />)
        break
      case 'homeSupportCards':
        rendered.push(<SupportCards key={block.id} block={block} siteSettings={data.siteSettings} />)
        rendered.push(
          <SectionDividerBand
            key={`divider-support-${block.id}`}
            texts={['BİR CAN KURTAR', 'DESTEK OL', 'GÖNÜLLÜ OL', 'SES OL']}
            bgColor="var(--foreground)"
            textColor="var(--background)"
            velocity={40}
          />,
        )
        break
      case 'homeNeedsList':
        rendered.push(<NeedsList key={block.id} block={block} items={data.needsItems} />)
        break
      case 'homeRecentPosts':
        rendered.push(<RecentPosts key={block.id} block={block} posts={data.posts} locale={data.locale} />)
        break
      case 'homeTransparencyBanner':
        rendered.push(<TransparencyBanner key={block.id} block={block} report={data.latestReport} locale={data.locale} />)
        break
      default:
        break
    }
  }

  // Pass 2: Interleave ElasticDividers between every pair of elements
  const interleaved: React.ReactNode[] = []
  for (let i = 0; i < rendered.length; i++) {
    interleaved.push(rendered[i])
    if (i < rendered.length - 1) {
      interleaved.push(<ElasticDivider key={`elastic-${i}`} />)
    }
  }

  return <>{interleaved}</>
}
