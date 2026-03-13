import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { EmergencyCase, Media as MediaType } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { SuccessStorySlider } from './SuccessStorySlider'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type SuccessStoriesProps = {
  stories: EmergencyCase[]
}

const PLACEHOLDER_STORIES = [
  {
    id: 'p1',
    title: 'Boncuk',
    beforeUrl:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&h=400&fit=crop',
    afterUrl:
      'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&h=400&fit=crop',
    collected: 4500,
    target: 5000,
  },
  {
    id: 'p2',
    title: 'Karamel',
    beforeUrl:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop',
    afterUrl:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop',
    collected: 3200,
    target: 3200,
  },
]

function formatCurrency(amount: number): string {
  return `₺${amount.toLocaleString('tr-TR')}`
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

export async function SuccessStories({ stories }: SuccessStoriesProps) {
  const t = await getTranslations('home.successStories')
  const usePlaceholder = stories.length === 0

  if (usePlaceholder) {
    return (
      <section>
        <div className="panel flex items-center justify-between py-4 px-6 border-b border-border">
          <h2 className="t-h2">{t('sectionTitle')}</h2>
          <Link href="/acil-vakalar" className="btn-cta text-xs py-2 px-4">
            {t('viewAll')}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {PLACEHOLDER_STORIES.map((story) => (
            <div
              key={story.id}
              className="p-6 border-b border-r border-border space-y-4"
            >
              <div className="aspect-video w-full overflow-hidden bg-[var(--muted)] border border-border relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.afterUrl}
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="t-h2">{story.title}</h3>
                  <span className="badge-sys bg-[var(--accent)] text-black">
                    {t('completed')}
                  </span>
                </div>
                <p className="t-meta text-foreground/60">
                  {t('placeholderDescription')}
                </p>
                <ProgressBar
                  collected={story.collected}
                  target={story.target}
                />
                <div className="flex justify-between t-meta">
                  <span>
                    {t('collected')}: {formatCurrency(story.collected)}
                  </span>
                  <span>
                    {t('target')}: {formatCurrency(story.target)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className="panel flex items-center justify-between py-4 px-6 border-b border-border">
        <h2 className="t-h2">{t('sectionTitle')}</h2>
        <Link href="/acil-vakalar" className="btn-cta text-xs py-2 px-4">
          {t('viewAll')}
        </Link>
      </div>
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
                  beforeAlt={beforePhoto.alt || t('before')}
                  afterAlt={afterPhoto.alt || t('after')}
                  labels={{ before: t('before'), after: t('after') }}
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
                    {t('completed')}
                  </span>
                </div>
                <ProgressBar collected={collected} target={target} />
                <div className="flex justify-between t-meta">
                  <span>
                    {t('collected')}: {formatCurrency(collected)}
                  </span>
                  <span>
                    {t('target')}: {formatCurrency(target)}
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
