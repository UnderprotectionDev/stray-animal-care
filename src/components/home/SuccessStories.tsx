import React from 'react'
import type { EmergencyCase, Media as MediaType, SiteSetting } from '@/payload-types'
import { SuccessStorySlider } from './SuccessStorySlider'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { formatCurrency } from '@/utilities/formatCurrency'
import { SectionHeader } from './SectionHeader'

type SuccessStoriesBlock = Extract<NonNullable<SiteSetting['homepageBlocks']>[number], { blockType: 'homeSuccessStories' }>

type Props = {
  block: SuccessStoriesBlock
  stories: EmergencyCase[]
}

function ProgressBar({ collected, target }: { collected: number; target: number }) {
  const pct = target > 0 ? Math.min((collected / target) * 100, 100) : 0
  return (
    <div className="w-full h-2 bg-[var(--muted)] border border-border">
      <div
        className="h-full bg-[var(--accent)]"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function SuccessStories({ block, stories }: Props) {
  if (stories.length === 0) return null

  const labels = block.labels ?? {}

  return (
    <section>
      <SectionHeader title={block.sectionTitle} viewAllLabel={block.viewAllLabel} viewAllLink={block.viewAllLink} />
      <div className="grid grid-cols-1 md:grid-cols-2">
        {stories.map((story) => {
          const beforePhoto =
            story.beforePhoto && typeof story.beforePhoto !== 'number'
              ? (story.beforePhoto as MediaType)
              : null
          const afterPhoto =
            story.afterPhoto && typeof story.afterPhoto !== 'number'
              ? (story.afterPhoto as MediaType)
              : null
          const collected = story.collectedAmount ?? 0
          const target = story.targetAmount
          const animalName =
            story.animal && typeof story.animal !== 'number'
              ? story.animal.name
              : null

          return (
            <div
              key={story.id}
              className="p-6 border-b border-r border-border space-y-4"
            >
              {beforePhoto?.url && afterPhoto?.url ? (
                <SuccessStorySlider
                  beforeUrl={getMediaUrl(beforePhoto.url, beforePhoto.updatedAt)}
                  afterUrl={getMediaUrl(afterPhoto.url, afterPhoto.updatedAt)}
                  beforeAlt={beforePhoto.alt || labels.before || 'Before'}
                  afterAlt={afterPhoto.alt || labels.after || 'After'}
                  labels={{ before: labels.before || 'Before', after: labels.after || 'After' }}
                />
              ) : (
                <div className="aspect-video w-full bg-[var(--muted)] border border-border" />
              )}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="t-h2">
                    {story.title}
                    {animalName && (
                      <span className="t-meta text-foreground/50 ml-2">
                        — {animalName}
                      </span>
                    )}
                  </h3>
                  <span className="badge-sys bg-[var(--accent)] text-black">
                    {labels.completed || 'COMPLETED'}
                  </span>
                </div>
                <ProgressBar collected={collected} target={target} />
                <div className="flex justify-between t-meta">
                  <span>
                    {labels.collected || 'Collected'}: {formatCurrency(collected)}
                  </span>
                  <span>
                    {labels.target || 'Target'}: {formatCurrency(target)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
