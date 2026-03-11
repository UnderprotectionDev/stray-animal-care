import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { StatCard } from './StatCard'

import './widget-styles.scss'

const baseClass = 'paws-dashboard'

const StatsOverview = async () => {
  let animals = { totalDocs: 0 }
  let emergencies = { totalDocs: 0 }
  let posts = { totalDocs: 0 }
  let volunteers = { totalDocs: 0 }
  let events = { totalDocs: 0 }
  let hasError = false

  try {
    const payload = await getPayload({ config: configPromise })

    ;[animals, emergencies, posts, volunteers, events] = await Promise.all([
      payload.count({
        collection: 'animals',
        where: { _status: { equals: 'published' } },
      }),
      payload.count({
        collection: 'emergency-cases',
        where: { caseStatus: { equals: 'aktif' }, _status: { equals: 'published' } },
      }),
      payload.count({
        collection: 'posts',
        where: { _status: { equals: 'published' } },
      }),
      payload.count({
        collection: 'volunteers',
      }),
      payload.count({
        collection: 'events',
        where: { _status: { equals: 'published' } },
      }),
    ])
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
    hasError = true
  }

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__header`}>
        <h2 className={`${baseClass}__title`}>Paws of Hope Dashboard</h2>
        <p className={`${baseClass}__subtitle`}>Site durumunuz bir bakışta</p>
      </div>

      {hasError && (
        <div className={`${baseClass}__empty`} style={{ marginBottom: '1rem', color: '#dc2626' }}>
          İstatistikler yüklenemedi. Lütfen sayfayı yenileyin.
        </div>
      )}
      <div className={`${baseClass}__stats`}>
        <StatCard icon="&#x1F43E;" count={animals.totalDocs} label="Toplam Hayvan" variant="animals" />
        <StatCard icon="&#x1F6A8;" count={emergencies.totalDocs} label="Aktif Acil Vakalar" variant="emergencies" />
        <StatCard icon="&#x1F4DD;" count={posts.totalDocs} label="Toplam Yazılar" variant="posts" />
        <StatCard icon="&#x1F91D;" count={volunteers.totalDocs} label="Gönüllüler" variant="volunteers" />
        <StatCard icon="&#x1F4C5;" count={events.totalDocs} label="Etkinlikler" variant="events" />
      </div>
    </div>
  )
}

export default StatsOverview
