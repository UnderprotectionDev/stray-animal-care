'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Link, usePathname } from '@/i18n/navigation'
import React, { useEffect, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { SearchIcon, Menu, Heart } from 'lucide-react'

import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { HeaderNav } from './Nav'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileMenu } from './MobileMenu'

export const HeaderClient: React.FC = () => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const t = useTranslations('layout.header')

  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled
          ? 'border-b bg-background/95 shadow-warm-sm backdrop-blur-sm'
          : 'bg-background',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>

        {/* Desktop Nav (center) */}
        <HeaderNav />

        {/* Desktop Right */}
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/search" className="rounded-md p-2 text-muted-foreground hover:text-foreground">
            <span className="sr-only">{t('search')}</span>
            <SearchIcon className="size-5" />
          </Link>
          <LanguageSwitcher />
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            render={<Link href="/donate" />}
          >
            <Heart className="size-4" />
            {t('donate')}
          </Button>
        </div>

        {/* Mobile Right */}
        <div className="flex items-center gap-1 md:hidden">
          <Link href="/search" className="rounded-md p-2 text-muted-foreground hover:text-foreground">
            <span className="sr-only">{t('search')}</span>
            <SearchIcon className="size-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground"
            aria-label={t('openMenu')}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <MobileMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </header>
  )
}
