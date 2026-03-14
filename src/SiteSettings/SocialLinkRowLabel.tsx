'use client'
import type { SiteSetting } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

const TYPE_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  'x-twitter': 'X (Twitter)',
  facebook: 'Facebook',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  whatsapp: 'WhatsApp',
  phone: 'Telefon',
  email: 'E-posta',
  website: 'Web Sitesi',
  other: 'Diğer',
}

export const SocialLinkRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<NonNullable<SiteSetting['socialLinks']>[number]>()
  const typeLabel = data?.type === 'other'
    ? data.customType || 'Diğer'
    : data?.type ? TYPE_LABELS[data.type] || data.type : ''
  const urlSuffix = data?.url ? ` — ${data.url}` : ''
  const label = typeLabel ? `${typeLabel}${urlSuffix}` : `Link ${(rowNumber ?? 0) + 1}`
  return <div>{label}</div>
}
