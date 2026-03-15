'use client'
import type { SiteSetting } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import { TYPE_LABELS } from '@/utilities/socialLinks'

export const SocialLinkRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<NonNullable<SiteSetting['socialLinks']>[number]>()
  const typeLabel = data?.type === 'other'
    ? data.customType || 'Diğer'
    : data?.type ? TYPE_LABELS[data.type] || data.type : ''
  const urlSuffix = data?.url ? ` — ${data.url}` : ''
  const label = typeLabel ? `${typeLabel}${urlSuffix}` : `Link ${(rowNumber ?? 0) + 1}`
  return <div>{label}</div>
}
