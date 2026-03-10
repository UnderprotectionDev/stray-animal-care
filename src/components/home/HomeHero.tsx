import React from 'react'
import { getTranslations } from 'next-intl/server'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { Heart, AlertTriangle } from 'lucide-react'

export async function HomeHero() {
  const t = await getTranslations('home.hero')

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl">
            {t('headline')}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            {t('subtitle')}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" render={<Link href="/destek-ol" />}>
              <Heart className="size-4" data-icon="inline-start" />
              {t('ctaDonate')}
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/acil-vakalar" />}>
              <AlertTriangle className="size-4" data-icon="inline-start" />
              {t('ctaEmergency')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
