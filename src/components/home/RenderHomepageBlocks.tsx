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
import { ScrollAnimationTrigger } from '@/components/ui/scroll-animation-trigger'

export type TransparencyStats = {
  totalIncome: number
  totalExpense: number
  totalDonors: number
  latestMonth: string | null
  reportCount: number
}

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
    transparencyStats?: TransparencyStats
  }
}

export function RenderHomepageBlocks({ blocks, data }: Props) {
  if (!blocks || blocks.length === 0) return null

  const postsBlock = blocks.find(
    (b) => b.blockType === 'homeRecentPosts' && b.enabled,
  )
  const transpBlock = blocks.find(
    (b) => b.blockType === 'homeTransparencyBanner' && b.enabled,
  )
  const shouldCombine = !!(postsBlock && transpBlock)
  let combinedRendered = false

  const rendered: React.ReactElement[] = []
  const bandIndices = new Set<number>()

  for (const block of blocks) {
    if (!block.enabled) continue

    if (
      shouldCombine &&
      (block.blockType === 'homeRecentPosts' || block.blockType === 'homeTransparencyBanner')
    ) {
      if (combinedRendered) continue
      combinedRendered = true
      rendered.push(
        <ScrollAnimationTrigger key={`combined-${postsBlock!.id}-${transpBlock!.id}`} effect="slide" direction="up" duration={0.6} threshold={0.1} once={true}>
          <PostsAndTransparency
            postsBlock={postsBlock as Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeRecentPosts' }>}
            transparencyBlock={transpBlock as Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeTransparencyBanner' }>}
            posts={data.posts}
            report={data.latestReport}
            transparencyStats={data.transparencyStats}
            locale={data.locale}
          />
        </ScrollAnimationTrigger>,
      )
      continue
    }

    switch (block.blockType) {
      case 'homeHero':
        rendered.push(<HomeHero key={block.id} block={block} />)
        break
      case 'homeStats':
        rendered.push(
          <ScrollAnimationTrigger key={block.id} effect="slide" direction="up" duration={0.6} threshold={0.1} once={true}>
            <StatsSection block={block} />
          </ScrollAnimationTrigger>,
        )
        break
      case 'homeStory':
        rendered.push(<StorySection key={block.id} block={block} />)
        rendered.push(
          <SectionDividerBand
            key={`divider-story-${block.id}`}
            texts={['BESLEME', 'TEDAVİ', 'KISIRLAŞTIRMA', 'ACİL MÜDAHALE', 'AŞILAMA', 'BARINMA']}
            bgColor="var(--palette-forest)"
            textColor="var(--palette-cream)"
            velocity={50}
          />,
        )
        bandIndices.add(rendered.length - 1)
        break
      case 'homeOurWork':
        rendered.push(
          <ScrollAnimationTrigger key={block.id} effect="slide" direction="up" duration={0.6} threshold={0.1} once={true} delay={0.05}>
            <OurWorkShowcase block={block} />
          </ScrollAnimationTrigger>,
        )
        break
      case 'homeFeaturedAnimals':
        rendered.push(
          <ScrollAnimationTrigger key={block.id} effect="slide" direction="up" duration={0.6} threshold={0.1} once={true} delay={0.1}>
            <FeaturedAnimals block={block} animals={data.animals} />
          </ScrollAnimationTrigger>,
        )
        break
      case 'homeActiveEmergencies':
        rendered.push(
          <ScrollAnimationTrigger key={block.id} effect="slide" direction="up" duration={0.6} threshold={0.1} once={true}>
            <ActiveEmergencies block={block} cases={data.activeCases} />
          </ScrollAnimationTrigger>,
        )
        break
      case 'homeSupportCards':
        rendered.push(
          <ScrollAnimationTrigger key={block.id} effect="slide" direction="up" duration={0.6} threshold={0.1} once={true} delay={0.05}>
            <SupportCards block={block} siteSettings={data.siteSettings} />
          </ScrollAnimationTrigger>,
        )
        rendered.push(
          <SectionDividerBand
            key={`divider-support-${block.id}`}
            texts={['BİR CAN KURTAR', 'DESTEK OL', 'GÖNÜLLÜ OL', 'SES OL']}
            bgColor="var(--foreground)"
            textColor="var(--background)"
            velocity={40}
          />,
        )
        bandIndices.add(rendered.length - 1)
        break
      case 'homeNeedsList':
        rendered.push(
          <ScrollAnimationTrigger key={block.id} effect="slide" direction="up" duration={0.6} threshold={0.1} once={true}>
            <NeedsList block={block} items={data.needsItems} />
          </ScrollAnimationTrigger>,
        )
        break
      case 'homeRecentPosts':
        rendered.push(
          <ScrollAnimationTrigger key={block.id} effect="slide" direction="up" duration={0.6} threshold={0.1} once={true}>
            <RecentPosts block={block} posts={data.posts} locale={data.locale} />
          </ScrollAnimationTrigger>,
        )
        break
      case 'homeTransparencyBanner':
        rendered.push(
          <ScrollAnimationTrigger key={block.id} effect="slide" direction="up" duration={0.6} threshold={0.1} once={true}>
            <TransparencyBanner block={block} report={data.latestReport} transparencyStats={data.transparencyStats} locale={data.locale} />
          </ScrollAnimationTrigger>,
        )
        break
      default:
        break
    }
  }

  const interleaved: React.ReactNode[] = []
  for (let i = 0; i < rendered.length; i++) {
    interleaved.push(rendered[i])
    if (i < rendered.length - 1) {
      const isBandAdjacent = bandIndices.has(i) || bandIndices.has(i + 1)
      if (!isBandAdjacent) {
        interleaved.push(<ElasticDivider key={`elastic-${i}`} />)
      }
    }
  }

  return <>{interleaved}</>
}
