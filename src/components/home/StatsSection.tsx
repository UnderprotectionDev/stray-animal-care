import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { SiteSetting } from '@/payload-types'

type StatsSectionProps = {
  siteSettings: SiteSetting
}

export async function StatsSection({ siteSettings: _siteSettings }: StatsSectionProps) {
  const t = await getTranslations('home.stats')

  const metrics = [
    { value: t('metric1Value'), name: t('metric1Name') },
    { value: t('metric2Value'), name: t('metric2Name') },
    { value: t('metric3Value'), name: t('metric3Name') },
    { value: t('metric4Value'), name: t('metric4Name') },
  ]

  return (
    <section className="bg-black">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className={`px-6 py-8 md:py-12 text-center ${
              i < metrics.length - 1 ? 'md:border-r md:border-white/20' : ''
            } ${i < 2 ? 'border-b md:border-b-0 border-white/20' : ''}`}
          >
            <span
              className="t-mega block text-[var(--accent)]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
            >
              {metric.value}
            </span>
            <span className="t-meta font-bold uppercase block mt-3 text-white">{metric.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
