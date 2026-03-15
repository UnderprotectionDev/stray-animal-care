import type { AdminViewServerProps } from 'payload'

import { Gutter } from '@payloadcms/ui'
import React from 'react'

import StatsOverview from './widgets/StatsOverview'
import AlertsBanner from './widgets/AlertsBanner'
import AnimalStats from './widgets/AnimalStats'
import FinancialOverview from './widgets/FinancialOverview'
import TimeTrends from './widgets/TimeTrends'
import CommunityStats from './widgets/CommunityStats'
import RecentActivity from './widgets/RecentActivity'
import QuickActions from './widgets/QuickActions'
import DashboardHelp from './widgets/DashboardHelp'

import './widgets/widget-styles.scss'

const baseClass = 'paws-dashboard'

export function DashboardView({ initPageResult }: AdminViewServerProps) {
  const userName = initPageResult.req.user?.email?.split('@')[0] || 'Admin'

  return (
    <Gutter>
      <DashboardHelp />
      <StatsOverview userName={userName} />
      <AlertsBanner />
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
    </Gutter>
  )
}
