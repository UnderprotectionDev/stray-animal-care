'use client'
import React, { useState } from 'react'

import './view-styles.scss'

interface CaseItem {
  id: number
  title: string
  caseStatus: string
  targetAmount: number
  collectedAmount: number
  createdAt: string
}

type BadgeVariant = 'danger' | 'warning' | 'success' | 'info' | 'neutral'

const STATUS_CONFIG: Record<string, { variant: BadgeVariant; label: string }> = {
  aktif: { variant: 'danger', label: 'Aktif' },
  tamamlandi: { variant: 'success', label: 'Tamamlandı' },
}

export const CaseTrackingContent: React.FC<{ cases: CaseItem[] }> = ({ cases }) => {
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all' ? cases : cases.filter((c) => c.caseStatus === filter)

  const activeCases = cases.filter((c) => c.caseStatus === 'aktif')
  const totalTarget = activeCases.reduce((s, c) => s + c.targetAmount, 0)
  const totalCollected = activeCases.reduce((s, c) => s + c.collectedAmount, 0)

  return (
    <div className="paws-view">
      <div className="paws-view__header">
        <h1 className="paws-view__title">Vaka Takip Paneli</h1>
        <p className="paws-view__subtitle">
          {activeCases.length} aktif vaka &middot; Toplam hedef:{' '}
          {totalTarget.toLocaleString('tr-TR')} ₺ &middot; Toplanan:{' '}
          {totalCollected.toLocaleString('tr-TR')} ₺
        </p>
      </div>

      <div className="paws-view__filters">
        <button
          type="button"
          className={`paws-view__filter-btn ${filter === 'all' ? 'paws-view__filter-btn--active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Tümü ({cases.length})
        </button>
        <button
          type="button"
          className={`paws-view__filter-btn ${filter === 'aktif' ? 'paws-view__filter-btn--active' : ''}`}
          onClick={() => setFilter('aktif')}
        >
          Aktif ({activeCases.length})
        </button>
        <button
          type="button"
          className={`paws-view__filter-btn ${filter === 'tamamlandi' ? 'paws-view__filter-btn--active' : ''}`}
          onClick={() => setFilter('tamamlandi')}
        >
          Tamamlandı ({cases.filter((c) => c.caseStatus === 'tamamlandi').length})
        </button>
      </div>

      <div className="paws-view__case-list">
        {filtered.map((c) => {
          const pct = c.targetAmount > 0 ? Math.min(Math.round((c.collectedAmount / c.targetAmount) * 100), 100) : 0
          const status = STATUS_CONFIG[c.caseStatus]

          return (
            <a
              key={c.id}
              href={`/admin/collections/emergency-cases/${c.id}`}
              className="paws-view__case-card"
            >
              <div className="paws-view__case-header">
                <span className="paws-view__case-title">{c.title}</span>
                {status && (
                  <span
                    className={`paws-view__card-badge paws-cell-badge--${status.variant}`}
                  >
                    {status.label}
                  </span>
                )}
              </div>
              <div className="paws-view__case-progress">
                <div className="paws-view__case-bar">
                  <div
                    className="paws-view__case-fill"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: pct >= 100 ? 'var(--paws-teal)' : pct >= 50 ? 'var(--paws-orange)' : 'var(--paws-red)',
                    }}
                  />
                </div>
                <span className="paws-view__case-amounts">
                  {c.collectedAmount.toLocaleString('tr-TR')} /{' '}
                  {c.targetAmount.toLocaleString('tr-TR')} ₺ ({pct}%)
                </span>
              </div>
            </a>
          )
        })}
        {filtered.length === 0 && (
          <p className="paws-view__empty">Bu filtreye uygun vaka bulunamadı.</p>
        )}
      </div>
    </div>
  )
}
