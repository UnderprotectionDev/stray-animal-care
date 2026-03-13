'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<NonNullable<Footer['navItems']>[number]>()

  const label = data?.link?.label || `Nav Item ${(rowNumber ?? 0) + 1}`

  return <div>{label}</div>
}
