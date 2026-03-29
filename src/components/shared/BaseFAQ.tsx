'use client'

import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type FAQItem = { q: string; a: string }

type BaseFAQProps = {
  items: FAQItem[]
  title?: string
  /** Accent color class for the decorative line (e.g. 'bg-cta', 'bg-health') */
  accentColor?: string
  /** Additional className for the outermost wrapper */
  className?: string
}

export function BaseFAQ({
  items,
  title,
  accentColor = 'bg-cta',
  className = '',
}: BaseFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])
  const reducedMotion = useReducedMotion()

  // Scroll-triggered stagger entrance
  useEffect(() => {
    if (reducedMotion || !containerRef.current) return
    const faqItems = containerRef.current.querySelectorAll<HTMLElement>('[data-faq-item]')
    const tween = gsap.fromTo(
      faqItems,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reducedMotion])

  // Animated expand/collapse
  useEffect(() => {
    answerRefs.current.forEach((el, i) => {
      if (!el) return
      if (i === openIndex) {
        el.style.display = 'block'
        if (!reducedMotion) {
          gsap.fromTo(
            el,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' },
          )
        } else {
          el.style.height = 'auto'
          el.style.opacity = '1'
        }
      } else {
        if (!reducedMotion) {
          gsap.to(el, {
            height: 0,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
              el.style.display = 'none'
            },
          })
        } else {
          el.style.display = 'none'
        }
      }
    })
  }, [openIndex, reducedMotion])

  return (
    <div ref={containerRef} className={className}>
      {title && <h2 className="t-h2 uppercase">{title}</h2>}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:flex lg:w-1/3 flex-col justify-center items-center relative">
          <span
            className="text-[12rem] leading-none font-heading select-none pointer-events-none opacity-[0.06]"
            aria-hidden="true"
          >
            ?
          </span>
          <div className="absolute bottom-8 left-8 right-8">
            <div className={`w-full h-[1.5px] ${accentColor} mb-2`} />
          </div>
        </div>
        <div className="lg:w-2/3 border border-border">
          {items.map((item, index) => (
            <div
              key={index}
              data-faq-item
              className={index > 0 ? 'border-t border-border' : ''}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                className="flex w-full items-center justify-between p-4 lg:p-5 text-left t-body font-medium hover:bg-muted transition-colors"
              >
                <span className="pr-4">{item.q}</span>
                <span className="ml-4 shrink-0 text-lg font-heading" aria-hidden="true">
                  {openIndex === index ? '\u2212' : '+'}
                </span>
              </button>
              <div
                ref={(el) => {
                  answerRefs.current[index] = el
                }}
                className="border-t border-border px-4 py-4 lg:px-5 t-meta leading-relaxed overflow-hidden"
                style={{ display: 'none', height: 0 }}
              >
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
