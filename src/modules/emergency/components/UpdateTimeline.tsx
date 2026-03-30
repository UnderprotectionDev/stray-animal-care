'use client'

import React, { useRef } from 'react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { motion, useInView } from 'motion/react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { EmergencyCase, Media as MediaType } from '@/payload-types'

type UpdateTimelineProps = {
  updates: NonNullable<EmergencyCase['updates']>
  noUpdatesLabel: string
  locale: string
}

export function UpdateTimeline({ updates, noUpdatesLabel, locale }: UpdateTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-40px' })

  if (!updates || updates.length === 0) {
    return <p className="t-meta text-muted-foreground">{noUpdatesLabel}</p>
  }

  return (
    <div ref={containerRef} className="space-y-0">
      {updates.map((update, index) => {
        const photo =
          update.photo && typeof update.photo === 'object'
            ? (update.photo as MediaType)
            : null

        const dateStr = update.date
          ? format(new Date(update.date), 'd MMMM yyyy', {
              locale: locale === 'tr' ? tr : undefined,
            })
          : null

        return (
          <motion.div
            key={update.id ?? index}
            className="flex gap-4"
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.35,
              delay: Math.min(0.08 * index, 0.6),
              ease: 'easeOut',
            }}
          >
            {/* Timeline line + dot */}
            <div className="flex flex-col items-center">
              <div className="size-2.5 bg-emergency shrink-0 mt-2" />
              {index < updates.length - 1 && (
                <div className="mt-0 flex-1 w-px bg-border" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              {dateStr && (
                <p className="t-comment mb-2">{dateStr}</p>
              )}
              {update.text && (
                <div className="t-body text-foreground">
                  <RichText data={update.text} enableGutter={false} enableProse={false} />
                </div>
              )}
              {photo && (
                <div className="mt-3 relative aspect-video max-w-sm overflow-hidden">
                  <Media
                    resource={photo}
                    fill
                    imgClassName="object-cover"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
