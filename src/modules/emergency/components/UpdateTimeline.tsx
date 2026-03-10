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
    return <p className="text-muted-foreground text-sm">{noUpdatesLabel}</p>
  }

  return (
    <div className="space-y-6">
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
            {/* Timeline dot + line */}
            <div className="flex flex-col items-center">
              <div className="size-3 rounded-full bg-primary ring-2 ring-primary/30 mt-1 shrink-0" />
              {index < updates.length - 1 && (
                <div className="mt-1 flex-1 w-px bg-border" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-4">
              {dateStr && (
                <p className="text-xs text-muted-foreground mb-2">{dateStr}</p>
              )}
              {update.text && (
                <RichText data={update.text} enableGutter={false} enableProse={false} />
              )}
              {photo && (
                <div className="mt-3 relative aspect-video max-w-sm overflow-hidden rounded-lg">
                  <Media resource={photo} fill imgClassName="object-cover" />
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
