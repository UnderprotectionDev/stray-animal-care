'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { cn } from '@/utilities/ui'
import type { Locale } from '@/i18n/config'

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (targetLocale: Locale) => {
    router.replace(pathname, { locale: targetLocale })
  }

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={cn('flex items-center gap-1', className)}
    >
      <button
        onClick={() => switchLocale('tr')}
        className={cn(
          'rounded px-2 py-1 text-sm transition-colors',
          locale === 'tr'
            ? 'font-bold text-foreground'
            : 'text-muted-foreground hover:text-foreground',
        )}
        aria-current={locale === 'tr' ? 'true' : undefined}
      >
        TR
      </button>
      <span className="text-muted-foreground">/</span>
      <button
        onClick={() => switchLocale('en')}
        className={cn(
          'rounded px-2 py-1 text-sm transition-colors',
          locale === 'en'
            ? 'font-bold text-foreground'
            : 'text-muted-foreground hover:text-foreground',
        )}
        aria-current={locale === 'en' ? 'true' : undefined}
      >
        EN
      </button>
    </div>
  )
}
