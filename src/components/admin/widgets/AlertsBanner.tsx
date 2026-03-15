import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getAlerts } from '../data/dashboard-queries'
import type { AlertItem } from '../data/dashboard-queries'

import './widget-styles.scss'

const baseClass = 'paws-dashboard'

const AlertsBanner = async () => {
  let alerts: AlertItem[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    alerts = await getAlerts(payload)
  } catch (error) {
    console.error('AlertsBanner error:', error)
  }

  if (alerts.length === 0) {
    return (
      <div className={`${baseClass}__alerts`}>
        <div className={`${baseClass}__alert-card ${baseClass}__alert-card--success`}>
          <span className={`${baseClass}__alert-icon`}>&#x2705;</span>
          <span className={`${baseClass}__alert-message`}>Her şey yolunda!</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`${baseClass}__alerts`}>
      {alerts.map((alert, idx) => (
        <a
          key={idx}
          href={alert.href}
          className={`${baseClass}__alert-card ${baseClass}__alert-card--${alert.type}`}
        >
          <span className={`${baseClass}__alert-icon`}>{alert.icon}</span>
          <span className={`${baseClass}__alert-message`}>{alert.message}</span>
          <span className={`${baseClass}__alert-count`}>{alert.count}</span>
        </a>
      ))}
    </div>
  )
}

export default AlertsBanner
