import React from 'react'
import type { SiteSetting, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { AnimatedMegaHeading } from './AnimatedMegaHeading'
import { HeroRotatingSubtitle } from './HeroRotatingSubtitle'

type HomeHeroBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeHero' }>

type Props = {
  block: HomeHeroBlock
}

export function HomeHero({ block }: Props) {
  const leftImage = block.leftImage && typeof block.leftImage !== 'number' ? block.leftImage as MediaType : null
  const rightImage = block.rightImage && typeof block.rightImage !== 'number' ? block.rightImage as MediaType : null

  return (
    <section>
      {block.sectionTitle && (
        <div className="bg-[var(--background)] border-b border-border py-6 px-6 md:px-8">
          <AnimatedMegaHeading
            text={block.sectionTitle}
            tag="h2"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1 }}
          />
          <div className="w-24 h-1 mt-3" style={{ background: 'var(--health)' }} />
          {block.rotatingWords && block.rotatingWords.length > 0 && (
            <HeroRotatingSubtitle
              texts={block.rotatingWords.map((w) => w.word).filter(Boolean) as string[]}
              className="mt-3"
            />
          )}
        </div>
      )}

      <div
        className="grid grid-cols-1 md:grid-cols-2 border-b border-border"
        style={{ minHeight: '50vh' }}
      >
        {/* Left panel */}
        <div className="relative flex flex-col justify-between p-4 md:p-5 border-r-[1.5px] border-border bg-[var(--palette-cream)]" style={{ borderBottomRightRadius: '40%' }}>
          {block.content && (
            <div className="my-4 md:my-0">
              <RichText data={block.content} enableGutter={false} enableProse={true} />
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="min-h-[200px] md:min-h-0 grid grid-rows-[1fr_1fr] bg-health">
          <div className="overflow-hidden relative">
            {leftImage && (
              <Media
                resource={leftImage}
                fill
                imgClassName="object-cover transition-all duration-500"
              />
            )}
          </div>
          <div className="overflow-hidden relative border-t-[1.5px] border-border">
            {rightImage && (
              <Media
                resource={rightImage}
                fill
                imgClassName="object-cover transition-all duration-500"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
