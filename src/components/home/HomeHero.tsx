import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export async function HomeHero() {
  const t = await getTranslations('home.hero')

  return (
    <section>
      {/* Split hero: text left, image right */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-border" style={{ minHeight: '70vh' }}>
        {/* Left panel */}
        <div className="relative flex flex-col justify-between p-6 md:p-10 border-r border-border bg-[var(--background)]">
          {/* Top row: record label + badge */}
          <div className="flex items-start justify-between gap-4">
            <span className="t-meta text-muted-foreground">{t('record')}</span>
            <span className="t-meta border border-border px-3 py-1 shrink-0">{t('badge')}</span>
          </div>

          {/* Giant headline */}
          <div className="my-8 md:my-0">
            <h1
              className="t-mega whitespace-pre-line"
              style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', lineHeight: 0.85 }}
            >
              {t('headline')}
            </h1>
          </div>

          {/* Bottom: description + fund link */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-end">
            <p className="t-body text-muted-foreground max-w-sm">
              {t('description')}
            </p>
            <div className="shrink-0">
              <span className="t-meta text-muted-foreground block mb-1">{t('updateLabel')}</span>
              <Link href="/destek-ol" className="t-h2 hover:text-[var(--accent)] transition-colors">
                {t('fundLink')}
              </Link>
            </div>
          </div>
        </div>

        {/* Right panel: placeholder image */}
        <div className="relative overflow-hidden bg-stone-200 min-h-[300px] md:min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=1000&fit=crop&crop=face"
            alt="Rescued dog"
            className="absolute inset-0 w-full h-full object-cover grayscale"
          />
        </div>
      </div>
    </section>
  )
}
