import React from 'react'

type TagListProps = {
  tags: { tag?: string | null; id?: string | null }[]
  label: string
  semanticToken?: string
}

export function TagList({ tags, label, semanticToken = 'palette-black' }: TagListProps) {
  const accentColor = semanticToken === 'palette-black' ? 'var(--palette-black)' : `var(--${semanticToken})`
  const validTags = tags.filter((t) => t.tag)
  if (validTags.length === 0) return null

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
      <div className="flex flex-wrap gap-2">
        {validTags.map((tag, index) => (
          <span
            key={tag.id ?? index}
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-muted/40 text-xs font-mono tracking-wide text-foreground/80 transition-colors hover:bg-muted"
            style={{ borderLeft: `3px solid ${accentColor}` }}
          >
            {tag.tag}
          </span>
        ))}
      </div>
    </div>
  )
}
