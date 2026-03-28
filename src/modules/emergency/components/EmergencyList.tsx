'use client'

import React from 'react'
import { EmergencyCard } from './EmergencyCard'
import { AnimatedSectionHeader } from '@/components/home/AnimatedSectionHeader'
import type { EmergencyCase } from '@/payload-types'

type EmergencyListProps = {
  cases: EmergencyCase[]
  labels: {
    activeCases: string
    noActive: string
    completedCases: string
    donateButton: string
  }
}

export function EmergencyList({ cases, labels }: EmergencyListProps) {
  const active = cases.filter((c) => c.caseStatus === 'aktif')
  const completed = cases.filter((c) => c.caseStatus === 'tamamlandi')

  return (
    <div>
      {/* Active cases section */}
      <AnimatedSectionHeader
        title={labels.activeCases}
        accentColor="emergency"
      />

      {active.length === 0 ? (
        <div className="panel py-12 text-center">
          <p className="t-body text-muted-foreground font-mono">{labels.noActive}</p>
        </div>
      ) : (
        <div className="panel px-4 py-6 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {active.map((ec, index) => (
              <EmergencyCard
                key={ec.id}
                ec={ec}
                index={index}
                donateLabel={labels.donateButton}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed cases section */}
      {completed.length > 0 && (
        <>
          <AnimatedSectionHeader
            title={labels.completedCases}
            accentColor="health"
          />
          <div className="panel px-4 py-6 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              {completed.map((ec, index) => (
                <EmergencyCard
                  key={ec.id}
                  ec={ec}
                  index={index}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
