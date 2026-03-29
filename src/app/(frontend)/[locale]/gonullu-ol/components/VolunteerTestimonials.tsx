'use client'

import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const BlurText = dynamic(() => import('@/components/BlurText'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

type Testimonial = {
  quote: string
  name: string
  role: string
  roleColor: string
}

type Props = {
  testimonials: Testimonial[]
}

const ACCENT_COLORS = ['var(--warm)', 'var(--trust)', 'var(--health)']

export function VolunteerTestimonials({ testimonials }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return

    const cards = containerRef.current.querySelectorAll<HTMLElement>('[data-testimonial]')
    const tween = gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion])

  return (
    <div ref={containerRef} className="panel px-6 py-8 lg:px-8">
      <div className="grid gap-[1.5px] bg-border md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => {
          const borderColor = ACCENT_COLORS[i % ACCENT_COLORS.length]
          return (
            <div
              key={i}
              data-testimonial
              className="bg-background p-6 lg:p-8 relative overflow-hidden"
              style={{ borderLeft: `3px solid ${borderColor}` }}
            >
              {/* Large decorative quote mark */}
              <span
                className="absolute -top-2 right-4 text-[8rem] leading-none font-heading select-none pointer-events-none opacity-[0.05]"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Quote */}
              <div className="relative z-10 mb-6">
                <BlurText
                  text={t.quote}
                  tag="p"
                  className="t-body text-sm leading-relaxed italic"
                  animateBy="words"
                  delay={30}
                  stepDuration={0.25}
                  direction="bottom"
                  threshold={0.3}
                />
              </div>

              {/* Author */}
              <div className="relative z-10 flex items-center gap-3">
                <div
                  className="w-10 h-10 border-[1.5px] border-border flex items-center justify-center font-heading font-bold text-sm uppercase"
                  style={{ backgroundColor: borderColor, color: 'var(--background)' }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <span className="t-meta font-bold block">{t.name}</span>
                  <span
                    className="badge-sys text-xs mt-1"
                    style={{ borderColor, color: borderColor }}
                  >
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
