'use client'
import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

import './cell-styles.scss'

const AREA_LABELS: Record<string, string> = {
  besleme: 'Besleme',
  tedavi: 'Tedavi',
  nakliye: 'Nakliye',
  sahiplendirme: 'Sahiplendirme',
  etkinlik: 'Etkinlik',
}

export const TagsCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  const values = Array.isArray(cellData) ? cellData : []

  if (values.length === 0) {
    return <span style={{ color: 'var(--paws-warm-gray)' }}>—</span>
  }

  return (
    <div className="paws-cell-tags">
      {values.map((val: string) => (
        <span key={val} className="paws-cell-tag">
          {AREA_LABELS[val] || val}
        </span>
      ))}
    </div>
  )
}
