'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<NonNullable<Header['navItems']>[number]>()
  const label = data?.label || `Nav Item ${(rowNumber ?? 0) + 1}`
  return <div>{label}</div>
}
