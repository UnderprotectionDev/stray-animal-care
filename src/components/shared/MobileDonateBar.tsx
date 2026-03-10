'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Heart } from 'lucide-react'

export function MobileDonateBar() {
  const t = useTranslations('layout.mobileDonate')

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden">
      <Link
        href="/donate"
        className="flex items-center justify-center gap-2 bg-accent text-accent-foreground py-3 px-4 font-semibold text-sm shadow-lg"
      >
        <Heart className="size-4 fill-current" />
        {t('cta')}
      </Link>
    </div>
  )
}
