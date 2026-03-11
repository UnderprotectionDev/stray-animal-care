import React from 'react'

const baseClass = 'paws-dashboard'

interface StatCardProps {
  icon: string
  count: number
  label: string
  variant: 'animals' | 'emergencies' | 'posts' | 'volunteers' | 'events'
}

export const StatCard: React.FC<StatCardProps> = ({ icon, count, label, variant }) => {
  return (
    <div className={`${baseClass}__stat-card ${baseClass}__stat-card--${variant}`}>
      <div className={`${baseClass}__stat-icon`}>{icon}</div>
      <div className={`${baseClass}__stat-info`}>
        <span className={`${baseClass}__stat-number`}>{count}</span>
        <span className={`${baseClass}__stat-label`}>{label}</span>
      </div>
    </div>
  )
}
