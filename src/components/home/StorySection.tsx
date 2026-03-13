import React from 'react'
import type { SiteSetting, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

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
          <div className="w-24 h-1 mt-3" style={{ background: 'var(--accent)' }} />
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
              imgClassName="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {block.originTitle && (
              <h2
                className="t-mega text-white"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 0.9 }}
              >
                {block.originTitle}
              </h2>
            )}
            {block.founderCaption && (
              <span className="t-meta text-white block mt-2">{block.founderCaption}</span>
            )}
          </div>
        </div>

        <div className="bg-[var(--background)] p-6 md:p-10 flex flex-col justify-center gap-6">
          {block.originQuote && (
            <blockquote className="border-l-4 border-[#A8D5BA] pl-6 py-2">
              <p className="t-h2 font-bold leading-snug">
                &ldquo;{block.originQuote}&rdquo;
              </p>
              {block.founderName && (
                <footer className="mt-3 t-meta text-muted-foreground italic">
                  — {block.founderName}
                </footer>
              )}
            </blockquote>
          )}

          {block.originParagraph1 && (
            <p className="t-body leading-relaxed">{block.originParagraph1}</p>
          )}
          {block.originParagraph2 && (
            <p className="t-body leading-relaxed">{block.originParagraph2}</p>
          )}

          {block.missionText && (
            <div className="border-t border-border pt-6 mt-2">
              <p className="t-body leading-relaxed text-muted-foreground">{block.missionText}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
