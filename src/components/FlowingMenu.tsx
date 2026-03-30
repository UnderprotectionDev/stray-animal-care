'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link } from '@/i18n/navigation'
import { cn } from '@/utilities/ui'

export interface FlowingMenuItem {
  href: string
  text: string
  image: string
  isCta?: boolean
}

interface FlowingMenuProps {
  items: FlowingMenuItem[]
  isOpen: boolean
  onClose: () => void
  activePathname: string
}

interface FlowingMenuItemProps {
  item: FlowingMenuItem
  isActive: boolean
  onClose: () => void
}

function findClosestEdge(
  e: React.MouseEvent<HTMLDivElement>,
  el: HTMLElement,
): 'top' | 'bottom' {
  const rect = el.getBoundingClientRect()
  const mouseY = e.clientY
  const topDist = Math.abs(rect.top - mouseY)
  const bottomDist = Math.abs(rect.bottom - mouseY)
  return topDist < bottomDist ? 'top' : 'bottom'
}

const PRE_LAYER_COLORS = ['#4A46E4', '#EF303B']

const FlowingMenuItemComponent: React.FC<FlowingMenuItemProps> = ({ item, isActive, onClose }) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeInnerRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const [reps, setReps] = useState(4)

  useEffect(() => {
    const calculateReps = () => {
      const vw = window.innerWidth
      const partWidth = 300
      const needed = Math.ceil((vw * 2) / partWidth) + 1
      setReps(Math.max(4, needed))
    }

    calculateReps()
    window.addEventListener('resize', calculateReps)
    return () => window.removeEventListener('resize', calculateReps)
  }, [])

  useEffect(() => {
    return () => {
      animationRef.current?.kill()
    }
  }, [])

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return

      const edge = findClosestEdge(e, itemRef.current)
      const startY = edge === 'top' ? '-101%' : '101%'

      gsap.set(marqueeRef.current, { y: startY })

      gsap.to(marqueeRef.current, {
        y: '0%',
        duration: 0.4,
        ease: 'power3.out',
        overwrite: true,
      })

      if (linkRef.current) {
        gsap.to(linkRef.current, { opacity: 0, duration: 0.2, overwrite: true })
      }

      if (animationRef.current) {
        animationRef.current.resume()
      } else {
        animationRef.current = gsap.to(marqueeInnerRef.current, {
          xPercent: -50,
          duration: 20,
          ease: 'none',
          repeat: -1,
        })
      }
    },
    [],
  )

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!itemRef.current || !marqueeRef.current) return

      const edge = findClosestEdge(e, itemRef.current)
      const endY = edge === 'top' ? '-101%' : '101%'

      gsap.to(marqueeRef.current, {
        y: endY,
        duration: 0.35,
        ease: 'power3.in',
        overwrite: true,
      })

      if (linkRef.current) {
        gsap.to(linkRef.current, { opacity: 1, duration: 0.2, overwrite: true })
      }

      if (animationRef.current) {
        animationRef.current.pause()
      }
    },
    [],
  )

  const marqueeParts = Array.from({ length: reps * 2 }, (_, i) => (
    <div key={i} className="flex items-center gap-4 shrink-0 px-4">
      <span className="uppercase font-[var(--font-heading)] font-normal text-[clamp(2rem,5vh,4rem)] tracking-[-0.02em] text-black whitespace-nowrap">
        {item.text}
      </span>
      <div
        className="shrink-0 w-[200px] h-[7vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${item.image})`,
          borderRadius: '50px',
        }}
      />
    </div>
  ))

  return (
    <div
      ref={itemRef}
      className={cn(
        'fm-item flex-1 relative overflow-hidden flex items-center justify-center border-b border-white/30 first:border-t first:border-white/30',
        item.isCta && 'border-b-[var(--cta)]',
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Marquee overlay */}
      <div
        ref={marqueeRef}
        className="absolute inset-0 z-[1] flex items-center"
        style={{
          backgroundColor: '#F5B62A',
          transform: 'translateY(101%)',
        }}
      >
        <div
          ref={marqueeInnerRef}
          className="flex items-center will-change-transform"
          style={{ whiteSpace: 'nowrap' }}
        >
          {marqueeParts}
        </div>
      </div>

      {/* Link — always on top */}
      <Link
        ref={linkRef}
        href={item.href}
        onClick={onClose}
        className={cn(
          'fm-itemLabel relative z-[2] flex items-center justify-center w-full h-full uppercase no-underline font-[var(--font-heading)] font-[900] text-[clamp(2rem,5vh,4rem)] tracking-[-0.02em] text-white',
          'focus-visible:outline-2 focus-visible:outline-[var(--cta)] focus-visible:outline-offset-[-2px]',
          isActive && '!text-[var(--cta)]',
          item.isCta && 'text-[var(--cta)]',
        )}
      >
        {item.text}
      </Link>
    </div>
  )
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items, isOpen, onClose, activePathname }) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const preLayersRef = useRef<HTMLDivElement>(null)
  const preLayerElsRef = useRef<HTMLElement[]>([])
  const openTlRef = useRef<gsap.core.Timeline | null>(null)
  const closeTweenRef = useRef<gsap.core.Tween | null>(null)
  const busyRef = useRef(false)
  const wasOpenRef = useRef(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current
      const preContainer = preLayersRef.current
      if (!panel) return

      let preLayers: HTMLElement[] = []
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.fm-prelayer')) as HTMLElement[]
      }
      preLayerElsRef.current = preLayers

      gsap.set(panel, { xPercent: 100 })
      gsap.set(preLayers, { yPercent: -100 })
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

    const itemEls = Array.from(panel.querySelectorAll('.fm-itemLabel')) as HTMLElement[]

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 })

    const tl = gsap.timeline({ paused: true })

    layers.forEach((el, i) => {
      tl.fromTo(
        el,
        { yPercent: -100 },
        { yPercent: 0, duration: 0.5, ease: 'power4.out' },
        i * 0.12,
      )
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

    const tl = gsap.timeline({
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.fm-itemLabel')) as HTMLElement[]
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 })
        busyRef.current = false
      },
    })

    tl.to(panel, {
      xPercent: 100,
      duration: 0.32,
      ease: 'power3.in',
    })

    tl.to(
      layers,
      {
        yPercent: -100,
        duration: 0.3,
        ease: 'power3.in',
      },
      0.05,
    )

    closeTweenRef.current = tl as unknown as gsap.core.Tween
  }, [])

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      wasOpenRef.current = true
      playOpen()
    } else if (!isOpen && wasOpenRef.current) {
      wasOpenRef.current = false
      playClose()
    }
  }, [isOpen, playOpen, playClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

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
        'fixed inset-0 z-40 overflow-hidden pointer-events-none',
        isOpen && 'pointer-events-auto',
      )}
      style={{ top: 'var(--header-h, 49px)' }}
    >
      {/* Click-outside backdrop */}
      {isOpen && (
        <div className="absolute inset-0 z-[1]" onClick={onClose} aria-hidden="true" />
      )}

      {/* Pre-layers — slide from top */}
      <div
        ref={preLayersRef}
        className="absolute inset-0 pointer-events-none z-[5]"
        aria-hidden="true"
      >
        {PRE_LAYER_COLORS.map((c, i) => (
          <div
            key={i}
            className="fm-prelayer absolute inset-0"
            style={{ background: c }}
          />
        ))}
      </div>

      {/* Main panel */}
      <div
        ref={panelRef}
        className="absolute inset-0 z-10 overflow-hidden bg-black"
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col h-full">
          {items.map((item) => {
            const isActive =
              activePathname === item.href ||
              (item.href !== '/' && activePathname.startsWith(`${item.href}/`))
            return (
              <FlowingMenuItemComponent
                key={item.href}
                item={item}
                isActive={isActive}
                onClose={onClose}
              />
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default FlowingMenu
