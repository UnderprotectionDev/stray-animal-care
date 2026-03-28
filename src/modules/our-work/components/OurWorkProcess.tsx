'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BlurText from '@/components/BlurText'

gsap.registerPlugin(ScrollTrigger)

type ProcessStep = {
  number: string
  title: string
  description: string
}

type Props = {
  steps: ProcessStep[]
}

export function OurWorkProcess({ steps }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reducedMotion || !lineRef.current || !containerRef.current) return

    const tweens: gsap.core.Tween[] = []

    tweens.push(
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            once: true,
          },
        },
      ),
    )

    const cards = containerRef.current.querySelectorAll<HTMLElement>('[data-step-card]')
    tweens.push(
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            once: true,
          },
        },
      ),
    )

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
  }, [reducedMotion])

  return (
    <div ref={containerRef} className="panel px-6 py-8 lg:px-8 lg:py-10">
      {/* Desktop: horizontal layout with connecting line */}
      <div className="relative">
        {/* Connecting line (desktop only) */}
        <div
          ref={lineRef}
          className="hidden md:block absolute top-[3.5rem] left-[8%] right-[8%] h-[1.5px] bg-stats origin-left"
          style={{ transformOrigin: 'left center' }}
          aria-hidden="true"
        />

        <div className="grid gap-6 md:grid-cols-4 md:gap-[1.5px] md:bg-border">
          {steps.map((step, i) => (
            <div
              key={i}
              data-step-card
              className="bg-background p-6 lg:p-8 flex flex-col gap-4 relative"
            >
              {/* Step number */}
              <div className="flex items-center gap-4">
                <span
                  className="t-outline text-5xl lg:text-6xl font-heading uppercase leading-none select-none"
                  style={{
                    WebkitTextStroke: '1.5px var(--stats)',
                    color: 'transparent',
                  }}
                >
                  {step.number}
                </span>
                {/* Step dot (desktop) */}
                <div
                  className="hidden md:block w-4 h-4 border-[1.5px] border-stats bg-stats"
                  aria-hidden="true"
                />
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight">
                {step.title}
              </h3>

              {/* Description */}
              <BlurText
                text={step.description}
                tag="p"
                className="t-body text-sm opacity-70"
                animateBy="words"
                delay={40}
                stepDuration={0.3}
                direction="bottom"
                threshold={0.3}
              />

              {/* Mobile connector arrow */}
              {i < steps.length - 1 && (
                <div className="md:hidden flex justify-center py-2" aria-hidden="true">
                  <div className="w-[1.5px] h-8 bg-stats" />
                </div>
              )}

              {/* Accent bottom bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 bg-stats"
                style={{ opacity: 0.2 + i * 0.2 }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
