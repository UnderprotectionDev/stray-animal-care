'use client'

import React, { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
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

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Share2 className="size-4" />
        {labels.title}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          render={<a href={twitterUrl} target="_blank" rel="noopener noreferrer" />}
        >
          {labels.twitter}
        </Button>
        <Button
          variant="outline"
          size="sm"
          render={<a href={facebookUrl} target="_blank" rel="noopener noreferrer" />}
        >
          {labels.facebook}
        </Button>
        <Button
          variant="outline"
          size="sm"
          render={<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" />}
        >
          {labels.whatsapp}
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5" onClick={handleCopy}>
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? labels.copied : labels.copy}
        </Button>
      </div>
    </div>
  )
}
