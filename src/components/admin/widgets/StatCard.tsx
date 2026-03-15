import React from 'react'

const baseClass = 'paws-dashboard'

interface StatCardProps {
  icon: string
  count: number
  label: string
  variant: 'animals' | 'emergencies' | 'posts' | 'volunteers' | 'events'
  href?: string
}

export const StatCard: React.FC<StatCardProps> = ({ icon, count, label, variant, href }) => {
  const content = (
    <>
      <div className={`${baseClass}__stat-icon`}>{icon}</div>
      <div className={`${baseClass}__stat-info`}>
        <span className={`${baseClass}__stat-number`}>{count}</span>
        <span className={`${baseClass}__stat-label`}>{label}</span>
      </div>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClass}__stat-card ${baseClass}__stat-card--${variant} ${baseClass}__stat-card--clickable`}
      >
        {content}
      </a>
    )
  }

  return (
    <div className={`${baseClass}__stat-card ${baseClass}__stat-card--${variant}`}>
      {content}
    </div>
  )
}
