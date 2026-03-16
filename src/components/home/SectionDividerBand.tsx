import React from 'react'

type Props = {
  texts: string[]
  bgColor?: string
  textColor?: string
  velocity?: number
}

export function SectionDividerBand({
  texts,
  bgColor = 'var(--foreground)',
  textColor = 'var(--background)',
  velocity = 60,
}: Props) {
  if (!texts || texts.length === 0) return null

  const duration = Math.round(1200 / velocity)

  const track = texts.filter(Boolean).map((item, i) => (
    <span
      key={i}
      className="inline-flex items-center gap-3 text-lg font-bold uppercase tracking-widest"
    >
      <span>&#9670;</span>
      {item}
    </span>
  ))

  return (
    <div
      className="ticker-wrap"
      style={{ background: bgColor, color: textColor }}
    >
      <div
        className="ticker-track"
        style={{ animationDuration: `${duration}s` }}
      >
        {track}
        {track}
      </div>
    </div>
  )
}
