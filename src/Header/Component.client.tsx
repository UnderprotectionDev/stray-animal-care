'use client'

import { Link, usePathname } from '@/i18n/navigation'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { SearchIcon, Menu, X, Heart } from 'lucide-react'

import { cn } from '@/utilities/ui'
import { LanguageSwitcher } from './LanguageSwitcher'
import { SearchModal } from '@/components/shared/SearchModal'

const NAV_ITEMS = [
  { href: '/', labelKey: 'home' },
  { href: '/canlarimiz', labelKey: 'animals' },
  { href: '/acil-vakalar', labelKey: 'emergency' },
  { href: '/gonullu-ol', labelKey: 'volunteer' },
  { href: '/gunluk', labelKey: 'blog' },
] as const

export const HeaderClient: React.FC = () => {
  const pathname = usePathname()
  const t = useTranslations('layout.header')

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
        {/* Desktop: 8-column grid nav */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: 'auto repeat(5, 1fr) auto auto', gap: '1px', background: 'var(--foreground)' }}>
          {/* Brand */}
          <div className="panel flex items-center py-3 px-4">
            <Link href="/" className="t-meta font-bold uppercase tracking-widest whitespace-nowrap">
              UMUT PATİLERİ
            </Link>
          </div>

          {/* Nav links */}
          {NAV_ITEMS.map(({ href, labelKey }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'panel flex items-center justify-center py-3 px-2 t-meta font-bold uppercase tracking-wider transition-colors',
                  isActive ? 'bg-accent' : 'hover:bg-accent',
                )}
              >
                {t(labelKey)}
              </Link>
            )
          })}

          {/* Language + Search */}
          <div className="panel flex items-center justify-center py-3 px-2 gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1"
              aria-label={t('search')}
            >
              <SearchIcon className="size-4" />
            </button>
            <LanguageSwitcher className="text-xs" />
          </div>

          {/* CTA */}
          <Link
            href="/destek-ol"
            className="btn-cta flex items-center gap-2 whitespace-nowrap"
          >
            <Heart className="size-4" />
            {t('donate')}
          </Link>
        </div>

        {/* Mobile: simple bar */}
        <div className="flex items-center justify-between md:hidden border-b border-border">
          <Link href="/" className="panel py-3 px-4 t-meta font-bold uppercase tracking-widest">
            UMUT PATİLERİ
          </Link>
          <div className="flex items-center">
            <button
              onClick={() => setSearchOpen(true)}
              className="panel py-3 px-3 border-l border-border"
              aria-label={t('search')}
            >
              <SearchIcon className="size-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="panel py-3 px-3 border-l border-border"
              aria-label={mobileMenuOpen ? 'Close menu' : t('openMenu')}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile: full-screen grid overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[49px] z-40 bg-background md:hidden">
            <div className="sys-wrap h-full">
              {NAV_ITEMS.map(({ href, labelKey }) => {
                const isActive = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'panel py-5 px-6 t-h2',
                      isActive && 'bg-accent',
                    )}
                  >
                    {t(labelKey)}
                  </Link>
                )
              })}
              <div className="panel py-4 px-6 flex items-center justify-between">
                <LanguageSwitcher />
              </div>
              <Link
                href="/destek-ol"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-cta py-5 px-6 text-center justify-center text-lg"
              >
                <Heart className="size-5" />
                {t('donate')}
              </Link>
            </div>
          </div>
        )}
      </header>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
