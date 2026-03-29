import React from 'react'
import type { SiteSetting, Media as MediaType } from '@/payload-types'
import { StoryStickyScroll } from './StoryStickyScroll'
import SplitText from '@/components/SplitText'

type StoryBlock = Extract<
  NonNullable<SiteSetting['homepageBlocks']>[number],
  { blockType: 'homeStory' }
>

type Props = {
  block: StoryBlock
}

export function StorySection({ block }: Props) {
  const steps = (block.steps ?? []).map((step) => ({
    ...step,
    image:
      step.image && typeof step.image !== 'number' ? (step.image as MediaType) : null,
  }))

  if (!steps.length) return null

  return (
    <section aria-label={block.sectionTitle ?? 'Hikayemiz'}>
      {block.sectionTitle && (
        <div className="bg-[var(--background)] border-b border-border py-6 px-6 md:px-8">
          <SplitText
            text={block.sectionTitle}
            tag="h2"
            className="t-mega uppercase leading-none"
            splitType="chars"
            delay={30}
            duration={0.8}
            ease="power3.out"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-50px"
            textAlign="left"
          />
          <div className="w-24 h-1 mt-3" style={{ background: 'var(--trust)' }} />
        </div>
      )}

      <StoryStickyScroll steps={steps} />
    </section>
  )
}
