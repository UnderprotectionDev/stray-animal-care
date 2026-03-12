import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export async function VolunteerCTA() {
  const t = await getTranslations('home.volunteerCta')

  return (
    <section>
      <div className="g-1 md:g-2">
        <div className="panel py-12 px-8">
          <h2 className="t-h1 mb-4">{t('title')}</h2>
          <p className="t-body text-muted-foreground max-w-prose">
            {t('description')}
          </p>
        </div>
        <div className="panel py-12 px-8 flex items-center justify-center">
          <Link href="/gonullu-ol" className="btn-cta text-lg py-4 px-8">
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
