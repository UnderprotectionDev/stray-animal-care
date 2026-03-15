'use client'
import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

import './cell-styles.scss'

export const EmergencyProgressCell: React.FC<DefaultCellComponentProps> = ({
  cellData,
  rowData,
}) => {
  const collected = Number(cellData) || 0
  const target = Number(rowData?.targetAmount) || 1
  const pct = Math.min(Math.round((collected / target) * 100), 100)

  return (
    <div className="paws-cell-progress">
      <div className="paws-cell-progress__bar">
        <div
          className="paws-cell-progress__fill"
          style={{
            width: `${pct}%`,
            backgroundColor: pct >= 100 ? 'var(--paws-teal)' : pct >= 50 ? 'var(--paws-orange)' : 'var(--paws-red)',
          }}
        />
      </div>
      <span className="paws-cell-progress__text">
        {collected.toLocaleString('tr-TR')} / {target.toLocaleString('tr-TR')} ({pct}%)
      </span>
    </div>
  )
}

export const NeedsProgressCell: React.FC<DefaultCellComponentProps> = ({
  cellData,
  rowData,
}) => {
  const current = Number(cellData) || 0
  const target = Number(rowData?.targetStock) || 1
  const pct = Math.min(Math.round((current / target) * 100), 100)

  return (
    <div className="paws-cell-progress">
      <div className="paws-cell-progress__bar">
        <div
          className="paws-cell-progress__fill"
          style={{
            width: `${pct}%`,
            backgroundColor: pct >= 80 ? 'var(--paws-teal)' : pct >= 40 ? 'var(--paws-orange)' : 'var(--paws-red)',
          }}
        />
      </div>
      <span className="paws-cell-progress__text">
        {current} / {target} ({pct}%)
      </span>
    </div>
  )
}
