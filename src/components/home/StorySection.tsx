import React from 'react'
import type { SiteSetting, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type StoryBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeStory' }>

type Props = {
  block: StoryBlock
}

export function StorySection({ block }: Props) {
  const founderImage = block.founderImage && typeof block.founderImage !== 'number' ? block.founderImage as MediaType : null

  return (
    <section>
      {block.sectionTitle && (
        <div className="bg-[var(--background)] border-b border-border py-6 px-6 md:px-8">
          <h2 className="t-mega" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1 }}>
            {block.sectionTitle}
          </h2>
          <div className="w-24 h-1 mt-3" style={{ background: 'var(--cta)' }} />
        </div>
      )}

      <div
        className="grid grid-cols-1 md:grid-cols-[2fr_3fr]"
        style={{ gap: '1px', background: 'var(--foreground)' }}
      >
        <div className="bg-[var(--background)] relative overflow-hidden min-h-[350px] md:min-h-[500px]">
          {founderImage && (
            <Media
              resource={founderImage}
              fill
              imgClassName="object-cover transition-all duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {block.founderCaption && (
              <span className="t-meta text-white block mt-2">{block.founderCaption}</span>
            )}
          </div>
        </div>

        <div className="bg-[var(--background)] p-6 md:p-10 flex flex-col justify-center gap-6">
          {block.content && (
            <RichText data={block.content} enableGutter={false} enableProse={true} />
          )}
        </div>
      </div>
    </section>
  )
}
