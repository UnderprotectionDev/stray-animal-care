'use client'

import { Link, usePathname } from '@/i18n/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SearchIcon, Menu, X, Heart } from 'lucide-react'
import gsap from 'gsap'

import { LanguageSwitcher } from './LanguageSwitcher'
import { SearchModal } from '@/components/shared/SearchModal'
import FlowingMenu from '@/components/FlowingMenu'
import { StaggeredMenu } from '@/components/StaggeredMenu'
import type { FlowingMenuItem } from '@/components/FlowingMenu'
import type { StaggeredMenuItem, StaggeredMenuSocialItem } from '@/components/StaggeredMenu'
import type { Header as HeaderType, Media, UiString } from '@/payload-types'

type HeaderLabels = NonNullable<UiString['layout']>['header']
type SearchLabels = UiString['search']
type NavItem = NonNullable<HeaderType['navItems']>[number]
type SocialLink = NonNullable<HeaderType['socialLinks']>[number]

function resolveNavHref(item: NavItem): string {
  const link = item.link
  if (!link) return '/'
  if (link.type === 'reference' && link.reference) {
    const ref = link.reference
    if (typeof ref.value === 'object' && ref.value !== null && 'slug' in ref.value) {
      const slug = ref.value.slug
      if (ref.relationTo === 'pages') {
        return slug === 'home' ? '/' : `/${slug}`
      }
      if (ref.relationTo === 'posts') {
        return `/gunluk/${slug}`
      }
    }
    return '/'
  }
  return link.url || '/'
}

function resolveNavImage(item: NavItem): string {
  if (item.image && typeof item.image === 'object') {
    return (item.image as Media).url || '/images/menu/placeholder.jpg'
  }
  return '/images/menu/placeholder.jpg'
}

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

function getLabel(labels: HeaderLabels | null | undefined, key: string): string {
  if (!labels) return key
  return (labels as Record<string, string | null | undefined>)[key] || key
}

type Props = {
  headerLabels?: HeaderLabels | null
  searchLabels?: SearchLabels | null
  navItems?: NavItem[] | null
  socialLinks?: SocialLink[] | null
  brandName?: string | null
  logo?: (number | null) | Media
}

export const HeaderClient: React.FC<Props> = ({ headerLabels, searchLabels, navItems, socialLinks, brandName, logo }) => {
  const pathname = usePathname()

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

  const items = navItems ?? []
  const brand = brandName || 'UMUT PATİLERİ'
  const logoUrl = logo && typeof logo === 'object' ? (logo as Media).url : null

  const flowingItems: FlowingMenuItem[] = items.map((item) => ({
    href: resolveNavHref(item),
    text: item.label || '',
    image: resolveNavImage(item),
    isCta: item.isCta || undefined,
  }))

  const staggeredItems: StaggeredMenuItem[] = items.map((item) => ({
    href: resolveNavHref(item),
    label: item.label || '',
    image: resolveNavImage(item),
    isCta: item.isCta || undefined,
  }))

  const staggeredSocialItems: StaggeredMenuSocialItem[] = (socialLinks ?? []).map((s) => ({
    label: s.label,
    link: s.url,
  }))

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-border bg-background">
        {/* Desktop: grid nav */}
        {(() => {
          const barItems = items.filter((item) => {
            const href = resolveNavHref(item)
            return href !== '/' && !item.isCta
          })
          const ctaItem = items.find((item) => item.isCta)
          const colTemplate = `auto repeat(${barItems.length}, 1fr) auto${ctaItem ? ' auto' : ''} auto`
          return (
            <div className="hidden lg:grid" style={{ gridTemplateColumns: colTemplate, gap: '1px', background: 'var(--foreground)' }}>
              {/* Brand */}
              <div className="panel flex items-center py-3 px-4">
                <Link href="/" className="flex items-center gap-2">
                  {logoUrl ? (
                    <img src={logoUrl} alt={brand} className="h-6 w-auto" />
                  ) : (
                    <span className="t-meta font-bold uppercase tracking-widest whitespace-nowrap">{brand}</span>
                  )}
                </Link>
              </div>

              {/* Nav links (excluding home and CTA) */}
              {barItems.map((item) => {
                const href = resolveNavHref(item)
                const isActive = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
                return (
                  <NavCellLink key={item.id || href} href={href} isActive={isActive}>
                    {item.label || ''}
                  </NavCellLink>
                )
              })}

              {/* Language + Search */}
              <div className="panel flex items-center justify-center py-3 px-2 gap-2">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-1"
                  aria-label={getLabel(headerLabels, 'search')}
                >
                  <SearchIcon className="size-4" />
                </button>
                <LanguageSwitcher className="text-xs" />
              </div>

              {/* CTA */}
              {ctaItem && (
                <Link
                  href={resolveNavHref(ctaItem)}
                  className="btn-cta flex items-center gap-2 whitespace-nowrap"
                >
                  <Heart className="size-4" />
                  {ctaItem.label || ''}
                </Link>
              )}

              {/* Hamburger (desktop fullscreen menu) */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="panel flex items-center justify-center py-3 px-4 transition-colors hover:bg-accent"
                aria-label={menuOpen ? getLabel(headerLabels, 'closeMenu') : getLabel(headerLabels, 'openMenu')}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          )
        })()}

        {/* Mobile: simple bar */}
        <div className="flex items-center justify-between lg:hidden border-b border-border">
          <Link href="/" className="panel py-3 px-4 flex items-center gap-2">
            {logoUrl ? (
              <img src={logoUrl} alt={brand} className="h-6 w-auto" />
            ) : (
              <span className="t-meta font-bold uppercase tracking-widest">{brand}</span>
            )}
          </Link>
          <div className="flex items-center">
            <button
              onClick={() => setSearchOpen(true)}
              className="panel py-3 px-3 border-l border-border"
              aria-label={getLabel(headerLabels, 'search')}
            >
              <SearchIcon className="size-5" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="panel py-3 px-3 border-l border-border"
              aria-label={menuOpen ? getLabel(headerLabels, 'closeMenu') : getLabel(headerLabels, 'openMenu')}
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
          socialItems={staggeredSocialItems}
          isOpen={menuOpen}
          onClose={handleCloseMenu}
          activePathname={pathname}
        />
      </div>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} labels={searchLabels} />
    </>
  )
}
