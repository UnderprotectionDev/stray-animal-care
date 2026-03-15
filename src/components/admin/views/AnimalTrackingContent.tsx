'use client'
import React, { useState } from 'react'

import './view-styles.scss'

interface AnimalItem {
  id: number
  name: string
  type: string
  animalStatus: string
  photo: string | null
}

type BadgeVariant = 'danger' | 'warning' | 'success' | 'info' | 'neutral'

const STATUS_CONFIG: Record<string, { variant: BadgeVariant; label: string }> = {
  tedavide: { variant: 'warning', label: 'Tedavide' },
  'kalici-bakim': { variant: 'info', label: 'Kalıcı Bakım' },
  acil: { variant: 'danger', label: 'Acil' },
}

const TYPE_ICON: Record<string, string> = {
  kedi: '\u{1F431}',
  kopek: '\u{1F436}',
}

const FILTERS = [
  { value: 'all', label: 'Tümü' },
  { value: 'tedavide', label: 'Tedavide' },
  { value: 'kalici-bakim', label: 'Kalıcı Bakım' },
  { value: 'acil', label: 'Acil' },
]

export const AnimalTrackingContent: React.FC<{ animals: AnimalItem[] }> = ({ animals }) => {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? animals : animals.filter((a) => a.animalStatus === filter)

  const counts = {
    all: animals.length,
    tedavide: animals.filter((a) => a.animalStatus === 'tedavide').length,
    'kalici-bakim': animals.filter((a) => a.animalStatus === 'kalici-bakim').length,
    acil: animals.filter((a) => a.animalStatus === 'acil').length,
  }

  return (
    <div className="paws-view">
      <div className="paws-view__header">
        <h1 className="paws-view__title">Hayvan Takip Paneli</h1>
        <p className="paws-view__subtitle">
          Toplam {animals.length} hayvan kayıtlı
        </p>
      </div>

      <div className="paws-view__filters">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            className={`paws-view__filter-btn ${filter === f.value ? 'paws-view__filter-btn--active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label} ({counts[f.value as keyof typeof counts] ?? 0})
          </button>
        ))}
      </div>

      <div className="paws-view__grid">
        {filtered.map((animal) => {
          const status = STATUS_CONFIG[animal.animalStatus]
          return (
            <a
              key={animal.id}
              href={`/admin/collections/animals/${animal.id}`}
              className="paws-view__card"
            >
              <div className="paws-view__card-photo">
                {animal.photo ? (
                  <img src={animal.photo} alt={animal.name} />
                ) : (
                  <span className="paws-view__card-placeholder">
                    {TYPE_ICON[animal.type] || '\u{1F43E}'}
                  </span>
                )}
              </div>
              <div className="paws-view__card-info">
                <span className="paws-view__card-name">
                  {TYPE_ICON[animal.type] || ''} {animal.name}
                </span>
                {status && (
                  <span
                    className={`paws-view__card-badge paws-cell-badge--${status.variant}`}
                  >
                    {status.label}
                  </span>
                )}
              </div>
            </a>
          )
        })}
        {filtered.length === 0 && (
          <p className="paws-view__empty">Bu filtreye uygun hayvan bulunamadı.</p>
        )}
      </div>
    </div>
  )
}
