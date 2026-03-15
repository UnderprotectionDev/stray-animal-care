'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const UpdateRowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<{ date?: string }>()

  let label = `Güncelleme ${(rowNumber ?? 0) + 1}`
  if (data?.date) {
    try {
      label = new Intl.DateTimeFormat('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(data.date))
    } catch {
      label = data.date
    }
  }

  return <div>{label}</div>
}
