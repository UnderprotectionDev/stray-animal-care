'use client'
import type { DefaultCellComponentProps } from 'payload'
import React from 'react'

import './cell-styles.scss'

type BadgeVariant = 'danger' | 'warning' | 'success' | 'info' | 'neutral'

const STATUS_CONFIG: Record<string, { variant: BadgeVariant; label: string }> = {
  tedavide: { variant: 'warning', label: 'Tedavide' },
  'kalici-bakim': { variant: 'info', label: 'Kalıcı Bakım' },
  acil: { variant: 'danger', label: 'Acil' },

  aktif: { variant: 'danger', label: 'Aktif' },
  tamamlandi: { variant: 'success', label: 'Tamamlandı' },

  beklemede: { variant: 'warning', label: 'Beklemede' },
  onaylandi: { variant: 'success', label: 'Onaylandı' },
  reddedildi: { variant: 'danger', label: 'Reddedildi' },

  yaklasan: { variant: 'info', label: 'Yaklaşan' },
  'devam-ediyor': { variant: 'warning', label: 'Devam Ediyor' },
  iptal: { variant: 'neutral', label: 'İptal' },

  orta: { variant: 'warning', label: 'Orta' },
  yeterli: { variant: 'success', label: 'Yeterli' },
}

export const StatusBadgeCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  const value = String(cellData ?? '')
  const config = STATUS_CONFIG[value]

  if (!config) {
    return <span>{value}</span>
  }

  return (
    <span className={`paws-cell-badge paws-cell-badge--${config.variant}`}>
      {config.label}
    </span>
  )
}
