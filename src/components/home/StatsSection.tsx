import React from 'react'
import { getTranslations } from 'next-intl/server'
import type { SiteSetting } from '@/payload-types'

type StatsSectionProps = {
  siteSettings: SiteSetting
}

export async function StatsSection({ siteSettings: _siteSettings }: StatsSectionProps) {
  const t = await getTranslations('home.stats')

  const metrics = [
    { label: t('metric1Label'), value: t('metric1Value'), name: t('metric1Name') },
    { label: t('metric2Label'), value: t('metric2Value'), name: t('metric2Name') },
    { label: t('metric3Label'), value: t('metric3Value'), name: t('metric3Name') },
    { label: t('metric4Label'), value: t('metric4Value'), name: t('metric4Name') },
  ]

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '1px', background: 'var(--foreground)' }}>
        {metrics.map((metric, i) => (
          <div key={i} className="bg-[var(--background)] px-6 py-6 md:py-8">
            <span className="t-meta text-muted-foreground block mb-3">{metric.label}</span>
            <span className="t-mega block" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
              {metric.value}
            </span>
            <span className="t-meta font-bold uppercase block mt-1">{metric.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
