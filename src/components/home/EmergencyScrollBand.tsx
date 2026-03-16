import React from 'react'

type Props = {
  texts: string[]
}

export function EmergencyScrollBand({ texts }: Props) {
  if (!texts || texts.length === 0) return null

  const formatted = texts.filter(Boolean).map((t) => `/// ${t}`)

  const track = formatted.map((item, i) => (
    <span
      key={i}
      className="inline-flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-wider"
    >
      <span>&#9670;</span>
      {item}
    </span>
  ))

  return (
    <div className="ticker-wrap bg-foreground text-background">
      <div className="ticker-track" style={{ animationDuration: '15s' }}>
        {track}
        {track}
      </div>
    </div>
  )
}
