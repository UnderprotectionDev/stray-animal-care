import React from 'react'

type TagListProps = {
  tags: { tag?: string | null; id?: string | null }[]
  label: string
}

export function TagList({ tags, label }: TagListProps) {
  const validTags = tags.filter((t) => t.tag)
  if (validTags.length === 0) return null

  return (
    <div className="space-y-2">
      <p className="t-meta font-medium">{label}</p>
      <div className="flex flex-wrap gap-2">
        {validTags.map((tag, index) => (
          <span key={tag.id ?? index} className="badge-sys">
            {tag.tag}
          </span>
        ))}
      </div>
    </div>
  )
}
