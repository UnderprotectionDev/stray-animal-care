'use client'

import React, { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import SplitText from '@/components/SplitText'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'

type StoryStep = {
  title: string
  description?: Record<string, unknown> | null
  image?: MediaType | null
  id?: string | null
}

type Props = {
  steps: StoryStep[]
}

function padNumber(n: number): string {
  return String(n).padStart(2, '0')
}

function RevealOnScroll({ children }: { children: ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: 'blur(4px)' }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function StoryStickyScroll({ steps }: Props) {
  if (!steps.length) return null

  const content = steps.map((step, i) => ({
    title: step.title,
    description: (
      <div>
        <span className="t-comment block mb-2" aria-hidden="true">
          {'// ADIM ' + padNumber(i + 1)}
        </span>
        {step.description && (
          <RevealOnScroll>
            <RichText
              data={step.description as Parameters<typeof RichText>[0]['data']}
              enableGutter={false}
              enableProse
            />
          </RevealOnScroll>
        )}
        <div className="w-16 h-[3px] mt-4" style={{ background: 'var(--trust)' }} />
      </div>
    ),
    content: (
      <div className="relative w-full h-full">
        {step.image ? (
          <>
            <Media
              resource={step.image}
              fill
              imgClassName="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[var(--palette-dark-cream)] flex items-center justify-center">
            <span className="t-comment text-[var(--palette-warm-gray)]">
              {'// GÖRSEL ' + padNumber(i + 1)}
            </span>
          </div>
        )}
      </div>
    ),
  }))

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <StickyScroll content={content} />
      </div>

      {/* Mobile: stacked layout */}
      <div className="md:hidden">
        {steps.map((step, i) => (
          <div
            key={step.id ?? `mobile-${i}`}
            style={{
              borderBottom: i < steps.length - 1 ? '1.5px solid var(--foreground)' : undefined,
            }}
          >
            {step.image ? (
              <div className="relative aspect-[4/3] overflow-hidden">
                <Media resource={step.image} fill imgClassName="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            ) : (
              <div className="aspect-[4/3] bg-[var(--palette-dark-cream)] flex items-center justify-center">
                <span className="t-comment text-[var(--palette-warm-gray)]">
                  {'// GÖRSEL ' + padNumber(i + 1)}
                </span>
              </div>
            )}
            <div className="p-6 bg-[var(--background)]">
              <span className="t-comment block mb-2" aria-hidden="true">
                {'// ADIM ' + padNumber(i + 1)}
              </span>
              <SplitText
                text={step.title}
                tag="h3"
                className="t-h2 uppercase mb-3"
                splitType="words"
                delay={40}
                duration={0.7}
                ease="power3.out"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-50px"
                textAlign="left"
              />
              {step.description && (
                <RevealOnScroll>
                  <RichText
                    data={step.description as Parameters<typeof RichText>[0]['data']}
                    enableGutter={false}
                    enableProse
                  />
                </RevealOnScroll>
              )}
              <div className="w-16 h-[3px] mt-4" style={{ background: 'var(--trust)' }} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
