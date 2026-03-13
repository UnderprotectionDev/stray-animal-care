'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from '@/Header/LanguageSwitcher'
import { cn } from '@/utilities/ui'

export interface StaggeredMenuItem {
  href: string
  label: string
  image: string
  isCta?: boolean
}

export interface StaggeredMenuSocialItem {
  label: string
  link: string
}

export interface StaggeredMenuProps {
  items: StaggeredMenuItem[]
  socialItems?: StaggeredMenuSocialItem[]
  isOpen: boolean
  onClose: () => void
  activePathname: string
}

const PRE_LAYER_COLORS = ['#4AA87A', '#7BC4A0']

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  items,
  socialItems = [],
  isOpen,
  onClose,
  activePathname,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const preLayersRef = useRef<HTMLDivElement | null>(null)
  const preLayerElsRef = useRef<HTMLElement[]>([])
  const openTlRef = useRef<gsap.core.Timeline | null>(null)
  const closeTweenRef = useRef<gsap.core.Tween | null>(null)
  const busyRef = useRef(false)
  const wasOpenRef = useRef(false)

  // Initialize off-screen positions
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current
      const preContainer = preLayersRef.current
      if (!panel) return

      let preLayers: HTMLElement[] = []
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[]
      }
      preLayerElsRef.current = preLayers

      gsap.set([panel, ...preLayers], { xPercent: 100 })
    })
    return () => ctx.revert()
  }, [])

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current
    const layers = preLayerElsRef.current
    if (!panel) return null

    openTlRef.current?.kill()
    closeTweenRef.current?.kill()
    closeTweenRef.current = null

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[]
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'),
    ) as HTMLElement[]
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[]

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 })
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as string]: 0 })
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 })
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 })

    const tl = gsap.timeline({ paused: true })

    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.12)
    })

    const lastTime = layers.length ? (layers.length - 1) * 0.12 : 0
    const panelInsertTime = lastTime + (layers.length ? 0.25 : 0)
    const panelDuration = 0.65

    tl.fromTo(
      panel,
      { xPercent: 100 },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime,
    )

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' },
        },
        itemsStart,
      )

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            ['--sm-num-opacity' as string]: 1,
            stagger: { each: 0.08, from: 'start' },
          },
          itemsStart + 0.1,
        )
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart)
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
          },
          socialsStart + 0.04,
        )
      }
    }

    openTlRef.current = tl
    return tl
  }, [])

  const playOpen = useCallback(() => {
    if (busyRef.current) return
    busyRef.current = true
    const tl = buildOpenTimeline()
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false
      })
      tl.play(0)
    } else {
      busyRef.current = false
    }
  }, [buildOpenTimeline])

  const playClose = useCallback(() => {
    openTlRef.current?.kill()
    openTlRef.current = null

    const panel = panelRef.current
    const layers = preLayerElsRef.current
    if (!panel) return

    closeTweenRef.current?.kill()

    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: 100,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[]
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 })

        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'),
        ) as HTMLElement[]
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as string]: 0 })

        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[]
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 })
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 })

        busyRef.current = false
      },
    })
  }, [])

  // React to isOpen changes
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      wasOpenRef.current = true
      playOpen()
    } else if (!isOpen && wasOpenRef.current) {
      wasOpenRef.current = false
      playClose()
    }
  }, [isOpen, playOpen, playClose])

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  // Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <div
      className={cn(
        'fixed inset-0 z-40 pointer-events-none',
        isOpen && 'pointer-events-auto',
      )}
      data-open={isOpen || undefined}
      style={{ top: 'var(--header-h, 49px)' }}
    >
      {/* Click-outside backdrop */}
      {isOpen && (
        <div className="absolute inset-0 z-[1]" onClick={onClose} aria-hidden="true" />
      )}

      {/* Pre-layers */}
      <div
        ref={preLayersRef}
        className="absolute top-0 right-0 bottom-0 w-full pointer-events-none z-[5]"
        aria-hidden="true"
      >
        {PRE_LAYER_COLORS.map((c, i) => (
          <div
            key={i}
            className="sm-prelayer absolute top-0 right-0 h-full"
            style={{ background: c, width: i === 0 ? '85%' : '92%' }}
          />
        ))}
      </div>

      {/* Main panel */}
      <aside
        ref={panelRef}
        className="absolute top-0 right-0 w-full h-full bg-black flex flex-col p-0 overflow-y-auto z-10 pointer-events-auto"
        aria-hidden={!isOpen}
      >
        <div className="flex-1 flex flex-col">
          <ul
            className="sm-panel-list list-none m-0 p-0 flex flex-col flex-1"
            role="list"
            data-numbering=""
            style={{ counterReset: 'smItem' }}
          >
            {items.map((item) => {
              const isActive =
                activePathname === item.href ||
                (item.href !== '/' && activePathname.startsWith(`${item.href}/`))
              return (
                <li
                  key={item.href}
                  className="sm-panel-item group/item flex flex-1 relative overflow-hidden leading-none border-t border-white/15 first:border-t-0"
                  style={{
                    counterIncrement: 'smItem',
                    ['--sm-num-opacity' as string]: 0,
                  }}
                >
                  {/* Background image */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-cover bg-center grayscale transition-opacity duration-300 z-0',
                      item.isCta ? 'opacity-[0.2] group-active/item:opacity-[0.5]' : 'opacity-[0.15] group-active/item:opacity-[0.4]',
                    )}
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'relative font-[var(--font-heading)] font-[900] text-[clamp(1.75rem,5vw,3rem)] uppercase tracking-[-0.02em]',
                      'flex items-center justify-center w-full h-full z-[2] no-underline',
                      'focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[-2px]',
                      isActive ? 'text-[var(--accent)]' : 'text-white',
                      item.isCta && 'text-[var(--accent)]',
                    )}
                  >
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                      {item.label}
                    </span>
                  </Link>
                  {/* Numbering */}
                  <span
                    className="absolute top-3 right-4 font-[var(--font-mono)] text-xs text-white/40 pointer-events-none select-none z-[3]"
                    style={{ opacity: 'var(--sm-num-opacity, 0)' }}
                    aria-hidden="true"
                  >
                    {String(items.indexOf(item) + 1).padStart(2, '0')}
                  </span>
                </li>
              )
            })}
          </ul>

          {/* Social links */}
          {socialItems.length > 0 && (
            <div className="mt-auto p-4 border-t border-white/15" aria-label="Social links">
              <h3 className="sm-socials-title m-0 text-sm font-medium text-[var(--accent)] mb-2">
                Socials
              </h3>
              <ul className="list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i}>
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link text-sm font-medium text-white no-underline hover:text-[var(--accent)] transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Language switcher */}
          <div className="p-4 border-t border-white/15">
            <LanguageSwitcher className="text-white [&_button]:text-white/60 [&_button[aria-current]]:text-white [&_span]:text-white/40" />
          </div>
        </div>
      </aside>
    </div>
  )
}

export default StaggeredMenu
