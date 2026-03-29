import type { VideoEmbedBlock as VideoEmbedBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

type Props = {
  className?: string
} & VideoEmbedBlockProps

function getEmbedUrl(url: string): string | null {
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
  )
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  return null
}

export const VideoEmbedBlock: React.FC<Props> = ({ className, url, caption }) => {
  const embedUrl = getEmbedUrl(url)
  if (!embedUrl) return null

  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div className="border border-black">
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title={caption || 'Video'}
            sandbox="allow-scripts allow-same-origin allow-presentation"
          />
        </div>
      </div>
      {caption && <p className="t-meta mt-2">{caption}</p>}
    </div>
  )
}
