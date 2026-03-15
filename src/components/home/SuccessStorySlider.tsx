import Image from 'next/image'

type SuccessStorySliderProps = {
  beforeUrl: string
  afterUrl: string
  beforeAlt: string
  afterAlt: string
  labels: { before: string; after: string }
}

export function SuccessStorySlider({
  beforeUrl,
  afterUrl,
  beforeAlt,
  afterAlt,
  labels,
}: SuccessStorySliderProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-px bg-border">
        <div className="relative aspect-video bg-background">
          <Image
            src={beforeUrl}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
        <div className="relative aspect-video bg-background">
          <Image
            src={afterUrl}
            alt={afterAlt}
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
