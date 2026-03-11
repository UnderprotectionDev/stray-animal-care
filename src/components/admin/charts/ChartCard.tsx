'use client'

import React from 'react'

const baseClass = 'paws-dashboard'

interface ChartCardProps {
  title: string
  description?: string
  children: React.ReactNode
  isEmpty?: boolean
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, description, children, isEmpty }) => {
  return (
    <div className={`${baseClass}__chart-card`}>
      <div className={`${baseClass}__chart-card-header`}>
        <h4 className={`${baseClass}__chart-card-title`}>{title}</h4>
        {description && (
          <p className={`${baseClass}__chart-card-desc`}>{description}</p>
        )}
      </div>
      <div className={`${baseClass}__chart-card-body`}>
        {isEmpty ? (
          <div className={`${baseClass}__chart-empty`}>No data available</div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
