import type { Block } from 'payload'

export const VideoEmbed: Block = {
  slug: 'videoEmbed',
  interfaceName: 'VideoEmbedBlock',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      validate: (value: string | null | undefined) => {
        if (!value) return 'URL gereklidir'
        const youtubePattern =
          /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/
        const vimeoPattern = /^https?:\/\/(www\.)?vimeo\.com\//
        if (!youtubePattern.test(value) && !vimeoPattern.test(value)) {
          return 'Geçerli bir YouTube veya Vimeo URL\'si giriniz'
        }
        return true
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
}
