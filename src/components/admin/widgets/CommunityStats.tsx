import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getCommunityData } from '../data/dashboard-queries'
import { CommunityCharts } from '../charts/CommunityCharts'

import './widget-styles.scss'

const baseClass = 'paws-dashboard'

const CommunityStats = async () => {
  const payload = await getPayload({ config: configPromise })
  const { volunteerStatuses, eventTypes, vetRecordTypes, needsUrgency } = await getCommunityData(payload)

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__chart-section`}>
        <h3 className={`${baseClass}__section-title`}>Topluluk & Operasyon</h3>
        <div className={`${baseClass}__chart-grid ${baseClass}__chart-grid--quad`}>
          <CommunityCharts
            volunteerStatuses={volunteerStatuses}
            eventTypes={eventTypes}
            vetRecordTypes={vetRecordTypes}
            needsUrgency={needsUrgency}
          />
        </div>
      </div>
    </div>
  )
}

export default CommunityStats
