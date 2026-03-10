'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/utilities/ui'

const NAV_ITEMS = [
  { href: '/canlarimiz', labelKey: 'animals' },
  { href: '/acil-vakalar', labelKey: 'emergency' },
  { href: '/gonullu-ol', labelKey: 'volunteer' },
  { href: '/gunluk', labelKey: 'blog' },
] as const

export function HeaderNav() {
  const t = useTranslations('layout.header')
  const pathname = usePathname()

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {NAV_ITEMS.map(({ href, labelKey }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`)

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {t(labelKey)}
          </Link>
        )
      })}
    </nav>
  )
}
