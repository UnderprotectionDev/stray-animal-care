'use client'
import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

const TYPE_CONFIG: Record<string, { icon: string; label: string }> = {
  kedi: { icon: '\u{1F431}', label: 'Kedi' },
  kopek: { icon: '\u{1F436}', label: 'Köpek' },
}

export const TypeIconCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  const value = String(cellData ?? '')
  const config = TYPE_CONFIG[value]

  if (!config) {
    return <span>{value}</span>
  }

  return (
    <span>
      {config.icon} {config.label}
    </span>
  )
}
