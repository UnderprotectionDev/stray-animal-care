'use client'

import { Link, usePathname } from '@/i18n/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { SearchIcon, Menu, X, Heart } from 'lucide-react'
import gsap from 'gsap'

import { LanguageSwitcher } from './LanguageSwitcher'
import { SearchModal } from '@/components/shared/SearchModal'
import FlowingMenu from '@/components/FlowingMenu'
import { StaggeredMenu } from '@/components/StaggeredMenu'
import type { FlowingMenuItem } from '@/components/FlowingMenu'
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from '@/components/StaggeredMenu'

const NAV_ITEMS = [
  { href: '/', labelKey: 'home', image: '/images/menu/home.jpg' },
  { href: '/canlarimiz', labelKey: 'animals', image: '/images/menu/animals.jpg' },
  { href: '/acil-vakalar', labelKey: 'emergency', image: '/images/menu/emergency.jpg' },
  { href: '/gonullu-ol', labelKey: 'volunteer', image: '/images/menu/volunteer.jpg' },
  { href: '/gunluk', labelKey: 'blog', image: '/images/menu/blog.jpg' },
  { href: '/destek-ol', labelKey: 'donate', image: '/images/menu/donate.jpg', isCta: true },
] as const

const SOCIAL_ITEMS: StaggeredMenuSocialItem[] = [
  { label: 'Instagram', link: 'https://instagram.com/umutpatileri' },
  { label: 'Twitter', link: 'https://twitter.com/umutpatileri' },
]

function findClosestEdge4(e: React.MouseEvent, el: HTMLElement): 'top' | 'bottom' | 'left' | 'right' {
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const w = rect.width
  const h = rect.height
  const nx = (x / w - 0.5) * 2
  const ny = (y / h - 0.5) * 2
  if (Math.abs(nx) > Math.abs(ny)) {
    return nx > 0 ? 'right' : 'left'
  }
  return ny > 0 ? 'bottom' : 'top'
}

function getEdgeTransform(edge: 'top' | 'bottom' | 'left' | 'right') {
  switch (edge) {
    case 'left': return { xPercent: -100, yPercent: 0 }
    case 'right': return { xPercent: 100, yPercent: 0 }
    case 'top': return { xPercent: 0, yPercent: -100 }
    case 'bottom': return { xPercent: 0, yPercent: 100 }
  }
}

const NavCellLink: React.FC<{
  href: string
  isActive: boolean
  children: React.ReactNode
}> = ({ href, isActive, children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Set initial overlay position via GSAP (not CSS) to avoid conflicts
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (isActive) {
      gsap.set(overlay, { xPercent: 0, yPercent: 0 })
    } else {
      gsap.set(overlay, { xPercent: -100, yPercent: 0 })
    }
  }, [isActive])

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    if (isActive) return
    const el = containerRef.current
    const overlay = overlayRef.current
    if (!el || !overlay) return
    const edge = findClosestEdge4(e, el)
    const from = getEdgeTransform(edge)
    gsap.killTweensOf(overlay)
    gsap.fromTo(overlay, from, { xPercent: 0, yPercent: 0, duration: 0.3, ease: 'power2.out' })
  }, [isActive])

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    if (isActive) return
    const el = containerRef.current
    const overlay = overlayRef.current
    if (!el || !overlay) return
    const edge = findClosestEdge4(e, el)
    const to = getEdgeTransform(edge)
    gsap.killTweensOf(overlay)
    gsap.to(overlay, { ...to, duration: 0.25, ease: 'power2.in' })
  }, [isActive])

  return (
    <div
      ref={containerRef}
      className="panel relative overflow-hidden !p-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-accent pointer-events-none"
      />
      <Link
        href={href}
        className="relative z-10 flex items-center justify-center py-3 px-2 t-meta font-bold uppercase tracking-wider w-full h-full"
      >
        {children}
      </Link>
    </div>
  )
}

export const HeaderClient: React.FC = () => {
  const pathname = usePathname()
  const t = useTranslations('layout.header')

  const headerRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const update = () => {
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const handleCloseMenu = useCallback(() => setMenuOpen(false), [])

  const flowingItems: FlowingMenuItem[] = NAV_ITEMS.map(({ href, labelKey, image, ...rest }) => ({
    href,
    text: t(labelKey),
    image,
    isCta: 'isCta' in rest ? rest.isCta : undefined,
  }))

  const staggeredItems: StaggeredMenuItem[] = NAV_ITEMS.map(({ href, labelKey, image, ...rest }) => ({
    href,
    label: t(labelKey),
    image,
    isCta: 'isCta' in rest ? rest.isCta : undefined,
  }))

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-border bg-background">
        {/* Desktop: 8-column grid nav */}
        <div className="hidden lg:grid" style={{ gridTemplateColumns: 'auto repeat(5, 1fr) auto auto auto', gap: '1px', background: 'var(--foreground)' }}>
          {/* Brand */}
          <div className="panel flex items-center py-3 px-4">
            <Link href="/" className="t-meta font-bold uppercase tracking-widest whitespace-nowrap">
              UMUT PATİLERİ
            </Link>
          </div>

          {/* Nav links (excluding home and donate CTA) */}
          {NAV_ITEMS.filter(item => item.href !== '/' && !('isCta' in item && item.isCta)).map(({ href, labelKey }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
            return (
              <NavCellLink key={href} href={href} isActive={isActive}>
                {t(labelKey)}
              </NavCellLink>
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

          {/* Hamburger (desktop fullscreen menu) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="panel flex items-center justify-center py-3 px-4 transition-colors hover:bg-accent"
            aria-label={menuOpen ? 'Close menu' : t('openMenu')}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile: simple bar */}
        <div className="flex items-center justify-between lg:hidden border-b border-border">
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
              onClick={() => setMenuOpen(!menuOpen)}
              className="panel py-3 px-3 border-l border-border"
              aria-label={menuOpen ? 'Close menu' : t('openMenu')}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Desktop FlowingMenu */}
      <div className="hidden lg:block">
        <FlowingMenu
          items={flowingItems}
          isOpen={menuOpen}
          onClose={handleCloseMenu}
          activePathname={pathname}
        />
      </div>

      {/* Mobile StaggeredMenu */}
      <div className="lg:hidden">
        <StaggeredMenu
          items={staggeredItems}
          socialItems={SOCIAL_ITEMS}
          isOpen={menuOpen}
          onClose={handleCloseMenu}
          activePathname={pathname}
        />
      </div>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
