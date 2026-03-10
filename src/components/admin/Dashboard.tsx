import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import './Dashboard.scss'

const baseClass = 'paws-dashboard'

const Dashboard: React.FC = async () => {
  const payload = await getPayload({ config: configPromise })

  const [animals, emergencies, posts, recentAnimals, recentEmergencies] =
    await Promise.all([
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

  const quickActions = [
    { label: 'Hayvan Ekle', href: '/admin/collections/animals/create', icon: '🐾' },
    { label: 'Acil Vaka Oluştur', href: '/admin/collections/emergency-cases/create', icon: '🚨' },
    { label: 'Yazı Yaz', href: '/admin/collections/posts/create', icon: '✏️' },
    { label: 'İhtiyaç Listesi', href: '/admin/collections/needs-list', icon: '📋' },
  ]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__header`}>
        <h2 className={`${baseClass}__title`}>Paws of Hope Dashboard</h2>
        <p className={`${baseClass}__subtitle`}>Site durumunuz bir bakista</p>
      </div>

      <div className={`${baseClass}__stats`}>
        <div className={`${baseClass}__stat-card ${baseClass}__stat-card--animals`}>
          <div className={`${baseClass}__stat-icon`}>🐾</div>
          <div className={`${baseClass}__stat-info`}>
            <span className={`${baseClass}__stat-number`}>{animals.totalDocs}</span>
            <span className={`${baseClass}__stat-label`}>Toplam Hayvan</span>
          </div>
        </div>

        <div className={`${baseClass}__stat-card ${baseClass}__stat-card--emergencies`}>
          <div className={`${baseClass}__stat-icon`}>🚨</div>
          <div className={`${baseClass}__stat-info`}>
            <span className={`${baseClass}__stat-number`}>{emergencies.totalDocs}</span>
            <span className={`${baseClass}__stat-label`}>Aktif Acil Vakalar</span>
          </div>
        </div>

        <div className={`${baseClass}__stat-card ${baseClass}__stat-card--posts`}>
          <div className={`${baseClass}__stat-icon`}>📝</div>
          <div className={`${baseClass}__stat-info`}>
            <span className={`${baseClass}__stat-number`}>{posts.totalDocs}</span>
            <span className={`${baseClass}__stat-label`}>Toplam Yazilar</span>
          </div>
        </div>
      </div>

      <div className={`${baseClass}__sections`}>
        <div className={`${baseClass}__recent`}>
          <h3 className={`${baseClass}__section-title`}>Son Eklenenler</h3>
          {recentItems.length === 0 ? (
            <p className={`${baseClass}__empty`}>Henuz icerik eklenmemis.</p>
          ) : (
            <ul className={`${baseClass}__recent-list`}>
              {recentItems.map((item, idx) => (
                <li key={idx} className={`${baseClass}__recent-item`}>
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

        <div className={`${baseClass}__actions`}>
          <h3 className={`${baseClass}__section-title`}>Hizli Islemler</h3>
          <div className={`${baseClass}__actions-grid`}>
            {quickActions.map((action) => (
              <a key={action.href} href={action.href} className={`${baseClass}__action-btn`}>
                <span className={`${baseClass}__action-icon`}>{action.icon}</span>
                <span className={`${baseClass}__action-label`}>{action.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
