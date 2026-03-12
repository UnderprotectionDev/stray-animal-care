'use client'

import React, { useCallback, useState } from 'react'
import { Copy, Check, Share2 } from 'lucide-react'

type SocialShareProps = {
  url: string
  title: string
  labels: {
    title: string
    twitter: string
    facebook: string
    whatsapp: string
    copy: string
    copied: string
  }
  className?: string
}

export function SocialShare({ url, title, labels, className }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const whatsappUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // silently fail
    }
  }, [url])

  const linkClass = 'inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-wide hover:bg-foreground hover:text-background transition-colors'

  return (
    <div className={className}>
      <div className="flex items-center gap-2 t-meta font-medium mb-3">
        <Share2 className="size-4" />
        {labels.title}
      </div>
      <div className="flex flex-wrap gap-[1px] bg-foreground">
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {labels.twitter}
        </a>
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {labels.facebook}
        </a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {labels.whatsapp}
        </a>
        <button type="button" className={linkClass} onClick={handleCopy}>
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? labels.copied : labels.copy}
        </button>
      </div>
    </div>
  )
}
