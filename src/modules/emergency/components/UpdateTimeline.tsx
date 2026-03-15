import React from 'react'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { EmergencyCase, Media as MediaType } from '@/payload-types'

type UpdateTimelineProps = {
  updates: NonNullable<EmergencyCase['updates']>
  noUpdatesLabel: string
  locale: string
}

export function UpdateTimeline({ updates, noUpdatesLabel, locale }: UpdateTimelineProps) {
  if (!updates || updates.length === 0) {
    return <p className="text-sm text-muted-foreground font-mono">{noUpdatesLabel}</p>
  }

  return (
    <div className="space-y-0">
      {updates.map((update, index) => {
        const photo = update.photo && typeof update.photo === 'object'
          ? (update.photo as MediaType)
          : null

        const dateStr = update.date
          ? format(new Date(update.date), 'd MMMM yyyy', {
              locale: locale === 'tr' ? tr : undefined,
            })
          : null

        return (
          <div key={update.id ?? index} className="flex gap-4">
            {/* Timeline line + dot */}
            <div className="flex flex-col items-center">
              <div className="size-2 bg-foreground shrink-0 mt-2" />
              {index < updates.length - 1 && (
                <div className="mt-0 flex-1 w-px bg-foreground" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-6 border-b border-border last:border-b-0">
              {dateStr && (
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-2">
                  {dateStr}
                </p>
              )}
              {update.text && (
                <div className="text-sm text-foreground leading-relaxed">
                  <RichText data={update.text} enableGutter={false} enableProse={false} />
                </div>
              )}
              {photo && (
                <div className="mt-3 relative aspect-video max-w-sm overflow-hidden border border-border">
                  <Media
                    resource={photo}
                    fill
                    imgClassName="object-cover transition-all duration-300"
                  />
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
