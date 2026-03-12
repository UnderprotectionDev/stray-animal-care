import React from 'react'
import { getTranslations } from 'next-intl/server'

export async function StorySection() {
  const t = await getTranslations('home.story')

  return (
    <section>
      <div className="g-1 md:g-2">
        <div className="panel py-12 px-8">
          <h2 className="t-h1 mb-6">{t('title')}</h2>
          <p className="t-body text-muted-foreground max-w-prose">
            {t('description')}
          </p>
        </div>
        <div className="panel py-12 px-8 bg-accent">
          <h3 className="t-h2 mb-4">{t('missionTitle')}</h3>
          <p className="t-body">
            {t('missionDescription')}
          </p>
        </div>
      </div>
    </section>
  )
}
