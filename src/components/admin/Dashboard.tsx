import React from 'react'
import StatsOverview from './widgets/StatsOverview'
import AnimalStats from './widgets/AnimalStats'
import FinancialOverview from './widgets/FinancialOverview'
import TimeTrends from './widgets/TimeTrends'
import CommunityStats from './widgets/CommunityStats'
import RecentActivity from './widgets/RecentActivity'
import QuickActions from './widgets/QuickActions'

import './widgets/widget-styles.scss'

const baseClass = 'paws-dashboard'

const Dashboard: React.FC = () => {
  return (
    <div>
      <StatsOverview />
      <AnimalStats />
      <FinancialOverview />
      <TimeTrends />
      <CommunityStats />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
        }}
        className={`${baseClass}__bottom-row`}
      >
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  )
}

export default Dashboard
