import React from 'react'

import './widget-styles.scss'

const baseClass = 'paws-dashboard'

const quickActions = [
  { label: 'Hayvan Ekle', href: '/admin/collections/animals/create', icon: '\u{1F43E}' },
  { label: 'Acil Vaka Oluştur', href: '/admin/collections/emergency-cases/create', icon: '\u{1F6A8}' },
  { label: 'Yazı Yaz', href: '/admin/collections/posts/create', icon: '\u{270F}\u{FE0F}' },
  { label: 'İhtiyaç Listesi', href: '/admin/collections/needs-list', icon: '\u{1F4CB}' },
  { label: 'Gönüllüler', href: '/admin/collections/volunteers', icon: '\u{1F91D}' },
  { label: 'Etkinlikler', href: '/admin/collections/events', icon: '\u{1F4C5}' },
]

const QuickActions: React.FC = () => {
  return (
    <div className={baseClass}>
      <div className={`${baseClass}__actions`}>
        <h3 className={`${baseClass}__section-title`}>Hızlı İşlemler</h3>
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
  )
}

export default QuickActions
