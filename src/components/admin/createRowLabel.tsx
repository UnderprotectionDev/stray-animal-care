'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export function createRowLabel(
  fieldName: string,
  fallbackPrefix: string,
): React.FC<RowLabelProps> {
  const Component: React.FC<RowLabelProps> = () => {
    const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
    const value = data?.[fieldName]
    const label = (typeof value === 'string' && value) || `${fallbackPrefix} ${(rowNumber ?? 0) + 1}`
    return <div>{label}</div>
  }
  Component.displayName = `${fallbackPrefix}RowLabel`
  return Component
}
