import React from 'react'
import { getTranslations } from 'next-intl/server'

export async function StorySection() {
  const t = await getTranslations('home.story')

  return (
    <section>
      {/* ── HİKAYEMİZ & MİSYON ── */}
      <div className="bg-[var(--background)] border-b border-border py-6 px-6 md:px-8">
        <h2 className="t-mega" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1 }}>
          {t('sectionTitle')}
        </h2>
        <div className="w-24 h-1 mt-3" style={{ background: 'var(--accent)' }} />
      </div>

      {/* ── BAŞLANGIÇ — 2-column layout ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-[2fr_3fr]"
        style={{ gap: '1px', background: 'var(--foreground)' }}
      >
        {/* Photo panel */}
        <div className="bg-[var(--background)] relative overflow-hidden min-h-[350px] md:min-h-[500px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1581888227599-779811939961?w=800&h=600&fit=crop"
            alt="Woman caring for a stray cat"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2
              className="t-mega text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 0.9 }}
            >
              {t('originTitle')}
            </h2>
            <span className="t-meta text-white block mt-2">{t('founderCaption')}</span>
          </div>
        </div>

        {/* Editorial text panel */}
        <div className="bg-[var(--background)] p-6 md:p-10 flex flex-col justify-center gap-6">
          {/* Blockquote with mint left border */}
          <blockquote className="border-l-4 border-[#A8D5BA] pl-6 py-2">
            <p className="t-h2 font-bold leading-snug">
              &ldquo;{t('originQuote')}&rdquo;
            </p>
            <footer className="mt-3 t-meta text-muted-foreground italic">
              — {t('founderName')}
            </footer>
          </blockquote>

          <p className="t-body leading-relaxed">{t('originParagraph1')}</p>
          <p className="t-body leading-relaxed">{t('originParagraph2')}</p>

          {/* Mission */}
          <div className="border-t border-border pt-6 mt-2">
            <h3 className="t-meta font-bold tracking-wider mb-3">{t('sectionTitle')}</h3>
            <p className="t-body leading-relaxed text-muted-foreground">{t('missionText')}</p>
          </div>
        </div>
      </div>

    </section>
  )
}
