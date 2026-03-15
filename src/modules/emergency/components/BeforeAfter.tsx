import Image from 'next/image'
import type { Media as MediaType } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type BeforeAfterProps = {
  before: MediaType
  after: MediaType
  labels: {
    before: string
    after: string
  }
}

export function BeforeAfter({ before, after, labels }: BeforeAfterProps) {
  if (!before.url || !after.url) return null

  const beforeUrl = getMediaUrl(before.url, before.updatedAt)
  const afterUrl = getMediaUrl(after.url, after.updatedAt)

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-px bg-border border border-border">
        <div className="relative aspect-video bg-background">
          <Image
            src={beforeUrl}
            alt={before.alt || labels.before}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
        <div className="relative aspect-video bg-background">
          <Image
            src={afterUrl}
            alt={after.alt || labels.after}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      </div>
      <div className="flex justify-between text-[10px] uppercase tracking-widest font-mono text-foreground px-0">
        <span>&larr; {labels.before}</span>
        <span>{labels.after} &rarr;</span>
      </div>
    </div>
  )
}
