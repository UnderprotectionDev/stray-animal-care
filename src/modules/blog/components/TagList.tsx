import React from 'react'
import { Badge } from '@/components/ui/badge'

type TagListProps = {
  tags: { tag?: string | null; id?: string | null }[]
  label: string
}

export function TagList({ tags, label }: TagListProps) {
  const validTags = tags.filter((t) => t.tag)
  if (validTags.length === 0) return null

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        {validTags.map((tag, index) => (
          <Badge key={tag.id ?? index} variant="outline">
            {tag.tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
