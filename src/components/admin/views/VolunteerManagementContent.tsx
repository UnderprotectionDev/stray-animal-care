'use client'
import React, { useState, useTransition } from 'react'
import { bulkUpdateVolunteerStatus } from '../actions/bulk-actions'

import './view-styles.scss'

interface VolunteerItem {
  id: number
  name: string
  email: string
  phone: string
  areas: string[]
  applicationStatus: string
  appliedAt: string
}

type BadgeVariant = 'danger' | 'warning' | 'success' | 'info' | 'neutral'

const STATUS_CONFIG: Record<string, { variant: BadgeVariant; label: string }> = {
  beklemede: { variant: 'warning', label: 'Beklemede' },
  onaylandi: { variant: 'success', label: 'Onaylandı' },
  reddedildi: { variant: 'danger', label: 'Reddedildi' },
}

const AREA_LABELS: Record<string, string> = {
  besleme: 'Besleme',
  tedavi: 'Tedavi',
  nakliye: 'Nakliye',
  sahiplendirme: 'Sahiplendirme',
  etkinlik: 'Etkinlik',
}

export const VolunteerManagementContent: React.FC<{ volunteers: VolunteerItem[] }> = ({
  volunteers: initialVolunteers,
}) => {
  const [volunteers, setVolunteers] = useState(initialVolunteers)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [filter, setFilter] = useState('beklemede')
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<string | null>(null)

  const filtered = volunteers.filter((v) => v.applicationStatus === filter)

  const counts = {
    beklemede: volunteers.filter((v) => v.applicationStatus === 'beklemede').length,
    onaylandi: volunteers.filter((v) => v.applicationStatus === 'onaylandi').length,
    reddedildi: volunteers.filter((v) => v.applicationStatus === 'reddedildi').length,
  }

  const toggleSelect = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map((v) => v.id)))
    }
  }

  const handleBulkAction = (status: 'onaylandi' | 'reddedildi') => {
    if (selected.size === 0) return
    const ids = Array.from(selected)

    startTransition(async () => {
      const result = await bulkUpdateVolunteerStatus(ids, status)
      setMessage(`${result.success} başvuru güncellendi${result.failed > 0 ? `, ${result.failed} hata` : ''}`)
      setVolunteers((prev) =>
        prev.map((v) =>
          ids.includes(v.id) ? { ...v, applicationStatus: status } : v,
        ),
      )
      setSelected(new Set())
      setTimeout(() => setMessage(null), 3000)
    })
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return '-'
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="paws-view">
      <div className="paws-view__header">
        <h1 className="paws-view__title">Gönüllü Yönetim Paneli</h1>
        <p className="paws-view__subtitle">
          {counts.beklemede} beklemede &middot; {counts.onaylandi} onaylı &middot;{' '}
          {counts.reddedildi} reddedildi
        </p>
      </div>

      {message && (
        <div className="paws-view__toast">{message}</div>
      )}

      <div className="paws-view__filters">
        {(['beklemede', 'onaylandi', 'reddedildi'] as const).map((s) => (
          <button
            key={s}
            type="button"
            className={`paws-view__filter-btn ${filter === s ? 'paws-view__filter-btn--active' : ''}`}
            onClick={() => {
              setFilter(s)
              setSelected(new Set())
            }}
          >
            {STATUS_CONFIG[s].label} ({counts[s]})
          </button>
        ))}
      </div>

      {filter === 'beklemede' && filtered.length > 0 && (
        <div className="paws-view__bulk-actions">
          <button
            type="button"
            className="paws-view__bulk-btn paws-view__bulk-btn--select"
            onClick={selectAll}
          >
            {selected.size === filtered.length ? 'Seçimi Kaldır' : 'Tümünü Seç'}
          </button>
          <button
            type="button"
            className="paws-view__bulk-btn paws-view__bulk-btn--approve"
            onClick={() => handleBulkAction('onaylandi')}
            disabled={selected.size === 0 || isPending}
          >
            Seçilenleri Onayla ({selected.size})
          </button>
          <button
            type="button"
            className="paws-view__bulk-btn paws-view__bulk-btn--reject"
            onClick={() => handleBulkAction('reddedildi')}
            disabled={selected.size === 0 || isPending}
          >
            Seçilenleri Reddet ({selected.size})
          </button>
        </div>
      )}

      <div className="paws-view__vol-list">
        {filtered.map((vol) => {
          const status = STATUS_CONFIG[vol.applicationStatus]
          return (
            <div
              key={vol.id}
              className={`paws-view__vol-card ${selected.has(vol.id) ? 'paws-view__vol-card--selected' : ''}`}
            >
              {filter === 'beklemede' && (
                <input
                  type="checkbox"
                  checked={selected.has(vol.id)}
                  onChange={() => toggleSelect(vol.id)}
                  className="paws-view__vol-checkbox"
                />
              )}
              <div className="paws-view__vol-info">
                <div className="paws-view__vol-name">
                  <a href={`/admin/collections/volunteers/${vol.id}`}>{vol.name}</a>
                  {status && (
                    <span
                      className={`paws-view__card-badge paws-cell-badge--${status.variant}`}
                    >
                      {status.label}
                    </span>
                  )}
                </div>
                <div className="paws-view__vol-meta">
                  {vol.email} {vol.phone && `\u00B7 ${vol.phone}`} \u00B7 {formatDate(vol.appliedAt)}
                </div>
                {vol.areas.length > 0 && (
                  <div className="paws-view__vol-areas">
                    {vol.areas.map((a) => (
                      <span key={a} className="paws-view__vol-area-tag">
                        {AREA_LABELS[a] || a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <p className="paws-view__empty">Bu durumda gönüllü bulunamadı.</p>
        )}
      </div>
    </div>
  )
}
