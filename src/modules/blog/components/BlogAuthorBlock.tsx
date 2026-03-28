import React from 'react'
import { PawPrint } from 'lucide-react'

type BlogAuthorBlockProps = {
  authorName: string
  label: string
  semanticToken?: string
}

export function BlogAuthorBlock({ authorName, label, semanticToken = 'palette-black' }: BlogAuthorBlockProps) {
  const accentColor = semanticToken === 'palette-black' ? 'var(--palette-black)' : `var(--${semanticToken})`

  return (
    <div className="px-4 md:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-3xl border-t border-border/20 pt-6">
        <div className="flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
            style={{ background: accentColor, color: 'var(--background)' }}
          >
            <PawPrint className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
            <p className="font-heading text-sm font-bold uppercase tracking-wide">{authorName}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
