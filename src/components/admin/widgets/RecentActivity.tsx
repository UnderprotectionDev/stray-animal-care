import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import './widget-styles.scss'

const baseClass = 'paws-dashboard'

const RecentActivity = async () => {
  let recentAnimals = { docs: [] as Array<{ id: number; name: unknown; createdAt: string }> }
  let recentEmergencies = { docs: [] as Array<{ id: number; title: unknown; createdAt: string }> }

  try {
    const payload = await getPayload({ config: configPromise })

    ;[recentAnimals, recentEmergencies] = await Promise.all([
      payload.find({
        collection: 'animals',
        limit: 5,
        sort: '-createdAt',
        where: { _status: { equals: 'published' } },
      }),
      payload.find({
        collection: 'emergency-cases',
        limit: 5,
        sort: '-createdAt',
        where: { _status: { equals: 'published' } },
      }),
    ])
  } catch (error) {
    console.error('Failed to fetch recent activity:', error)
  }

  const recentItems = [
    ...recentAnimals.docs.map((doc) => ({
      type: 'animal' as const,
      label: typeof doc.name === 'string' ? doc.name : 'İsimsiz',
      date: doc.createdAt,
      href: `/admin/collections/animals/${doc.id}`,
    })),
    ...recentEmergencies.docs.map((doc) => ({
      type: 'emergency' as const,
      label: typeof doc.title === 'string' ? doc.title : 'Başlıksız',
      date: doc.createdAt,
      href: `/admin/collections/emergency-cases/${doc.id}`,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return '-'
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__recent`}>
        <h3 className={`${baseClass}__section-title`}>Son Eklenenler</h3>
        {recentItems.length === 0 ? (
          <p className={`${baseClass}__empty`}>Henüz içerik eklenmemiş.</p>
        ) : (
          <ul className={`${baseClass}__recent-list`}>
            {recentItems.map((item) => (
              <li key={`${item.type}-${item.href}`} className={`${baseClass}__recent-item`}>
                <a href={item.href} className={`${baseClass}__recent-link`}>
                  <span className={`${baseClass}__recent-badge ${baseClass}__recent-badge--${item.type}`}>
                    {item.type === 'animal' ? 'Hayvan' : 'Acil Vaka'}
                  </span>
                  <span className={`${baseClass}__recent-label`}>{item.label}</span>
                  <span className={`${baseClass}__recent-date`}>{formatDate(item.date)}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default RecentActivity
