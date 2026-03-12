'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Heart } from 'lucide-react'

export function MobileDonateBar() {
  const t = useTranslations('layout.mobileDonate')

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden">
      <Link
        href="/destek-ol"
        className="flex items-center justify-center gap-2 bg-foreground text-accent py-3 px-4 font-bold text-sm uppercase tracking-wider font-mono border-t border-border"
      >
        <Heart className="size-4 fill-current" />
        {t('cta')}
      </Link>
    </div>
  )
}
