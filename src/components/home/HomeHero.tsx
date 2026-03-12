import React from 'react'
import { getTranslations } from 'next-intl/server'

export async function HomeHero() {
  const t = await getTranslations('home.hero')

  return (
    <section>
      <div
        className="grid grid-cols-1 md:grid-cols-2 border-b border-border"
        style={{ height: '60vh' }}
      >
        {/* Left panel */}
        <div className="relative flex flex-col justify-between p-4 md:p-5 border-r border-border bg-[var(--background)]">
          {/* Urgent badge */}
          <div>
            <span className="inline-flex items-center gap-2 t-meta text-red-600 font-bold tracking-wider">
              <span className="text-red-600">&#9679;</span> {t('urgentBadge')}
            </span>
          </div>

          {/* Giant staggered headline */}
          <div className="my-4 md:my-0">
            <h1
              className="t-mega whitespace-pre-line"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4.5rem)', lineHeight: 0.85 }}
            >
              {t('headline')}
            </h1>
          </div>

          {/* Description */}
          <div>
            <p className="t-body text-muted-foreground max-w-md text-sm">
              {t('description')}
            </p>
          </div>
        </div>

        {/* Right panel: cat photo / quote strip / dog photo */}
        <div className="min-h-[200px] md:min-h-0 grid grid-rows-[1fr_auto_1fr]">
          {/* Cat photo */}
          <div className="overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600&h=400&fit=crop&crop=face"
              alt="Rescued cat"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Quote strip */}
          <div className="flex justify-between items-center py-2 px-4 border-y border-border bg-white text-[11px] tracking-wide">
            <span>&ldquo;{t('quoteText')}&rdquo;</span>
            <span className="font-bold">— {t('quoteAuthor')}</span>
          </div>

          {/* Dog photo */}
          <div className="overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop&crop=face"
              alt="Rescued dog"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
