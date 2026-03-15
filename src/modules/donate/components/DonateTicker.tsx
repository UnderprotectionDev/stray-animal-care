import React from 'react'

type DonateTickerProps = {
  stats: {
    catsCount?: number | null
    dogsCount?: number | null
    treatedCount?: number | null
  }
  labels: {
    slogan1: string
    slogan2: string
    slogan3: string
    cats: string
    dogs: string
    treated: string
  }
}

export function DonateTicker({ stats, labels }: DonateTickerProps) {
  const items = [
    labels.slogan1,
    stats.catsCount ? `${stats.catsCount}+ ${labels.cats}` : null,
    labels.slogan2,
    stats.dogsCount ? `${stats.dogsCount}+ ${labels.dogs}` : null,
    labels.slogan3,
    stats.treatedCount ? `${stats.treatedCount}+ ${labels.treated}` : null,
  ].filter(Boolean) as string[]

  const track = items.map((item, i) => (
    <span key={i} className="inline-flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-widest">
      <span className="text-[var(--cta)]">&#9670;</span>
      {item}
    </span>
  ))

  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {track}
        {track}
      </div>
    </div>
  )
}
