import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export async function TransparencyBanner() {
  const t = await getTranslations('home.transparency')

  return (
    <section>
      <div className="panel py-6 px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-muted">
        <div>
          <h2 className="t-h2">{t('title')}</h2>
          <p className="t-meta text-muted-foreground mt-1">{t('description')}</p>
        </div>
        <Link href="/seffaflik" className="btn-cta text-xs py-2 px-4 shrink-0">
          {t('cta')}
        </Link>
      </div>
    </section>
  )
}
