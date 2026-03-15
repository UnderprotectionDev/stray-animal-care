import type { AdminViewServerProps } from 'payload'

import { Gutter } from '@payloadcms/ui'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { VolunteerManagementContent } from './VolunteerManagementContent'

import './view-styles.scss'

export async function VolunteerManagementView(_props: AdminViewServerProps) {
  const payload = await getPayload({ config: configPromise })

  const volunteers = await payload.find({
    collection: 'volunteers',
    limit: 200,
    sort: '-createdAt',
    select: {
      name: true,
      email: true,
      phone: true,
      areas: true,
      applicationStatus: true,
      appliedAt: true,
      createdAt: true,
    },
  })

  const serialized = volunteers.docs.map((doc) => ({
    id: doc.id,
    name: (doc.name as string) || 'İsimsiz',
    email: (doc.email as string) || '',
    phone: (doc.phone as string) || '',
    areas: Array.isArray(doc.areas) ? (doc.areas as string[]) : [],
    applicationStatus: (doc.applicationStatus as string) || 'beklemede',
    appliedAt: (doc.appliedAt as string) || doc.createdAt,
  }))

  return (
    <Gutter>
      <VolunteerManagementContent volunteers={serialized} />
    </Gutter>
  )
}
