import React from 'react'
import type { SiteSetting, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

type HomeHeroBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeHero' }>

type Props = {
  block: HomeHeroBlock
}

export function HomeHero({ block }: Props) {
  const leftImage = block.leftImage && typeof block.leftImage !== 'number' ? block.leftImage as MediaType : null
  const rightImage = block.rightImage && typeof block.rightImage !== 'number' ? block.rightImage as MediaType : null

  return (
    <section>
      <div
        className="grid grid-cols-1 md:grid-cols-2 border-b border-border"
        style={{ height: '60vh' }}
      >
        {/* Left panel */}
        <div className="relative flex flex-col justify-between p-4 md:p-5 border-r border-border bg-[var(--background)]">
          {block.urgentBadge && (
            <div>
              <span className="inline-flex items-center gap-2 t-meta text-red-600 font-bold tracking-wider">
                <span className="text-red-600">&#9679;</span> {block.urgentBadge}
              </span>
            </div>
          )}
          {block.headline && (
            <div className="my-4 md:my-0">
              <h1
                className="t-mega whitespace-pre-line"
                style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)', lineHeight: 0.85 }}
              >
                {block.headline}
              </h1>
            </div>
          )}
          {block.description && (
            <div>
              <p className="t-body text-muted-foreground max-w-md text-sm">
                {block.description}
              </p>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="min-h-[200px] md:min-h-0 grid grid-rows-[1fr_auto_1fr]">
          <div className="overflow-hidden relative bg-[var(--muted)]">
            {leftImage && (
              <Media
                resource={leftImage}
                fill
                imgClassName="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            )}
          </div>
          {(block.quoteText || block.quoteAuthor) && (
            <div className="flex justify-between items-center py-2 px-4 border-y border-border bg-white text-[11px] tracking-wide">
              {block.quoteText && <span>&ldquo;{block.quoteText}&rdquo;</span>}
              {block.quoteAuthor && <span className="font-bold">— {block.quoteAuthor}</span>}
            </div>
          )}
          <div className="overflow-hidden relative bg-[var(--muted)]">
            {rightImage && (
              <Media
                resource={rightImage}
                fill
                imgClassName="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
