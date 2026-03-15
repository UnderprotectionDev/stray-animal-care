'use client'
import React, { useState, useEffect } from 'react'

import './widget-styles.scss'

const STORAGE_KEY = 'paws-dashboard-help-dismissed'
const baseClass = 'paws-dashboard'

const DashboardHelp: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setVisible(false)
  }

  return (
    <div className={`${baseClass}__help-banner`}>
      <div className={`${baseClass}__help-content`}>
        <strong>Umut Patileri Yönetim Paneli</strong>
        <p>
          Dashboard&apos;unuzda hayvan, vaka ve gönüllü istatistiklerini takip edebilirsiniz.
          Sol menüden koleksiyonlara ulaşabilir, hızlı işlemler ile yeni kayıtlar
          oluşturabilirsiniz.
        </p>
      </div>
      <button
        className={`${baseClass}__help-dismiss`}
        onClick={handleDismiss}
        type="button"
        aria-label="Kapat"
      >
        &#x2715;
      </button>
    </div>
  )
}

export default DashboardHelp
