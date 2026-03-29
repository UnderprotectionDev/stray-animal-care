'use server'

import { getPayload } from 'payload'
import { headers as nextHeaders } from 'next/headers'
import configPromise from '@payload-config'

async function requireAdmin(): Promise<void> {
  const payload = await getPayload({ config: configPromise })
  const requestHeaders = await nextHeaders()
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    throw new Error('Authentication required')
  }
}

export async function bulkUpdateVolunteerStatus(
  ids: number[],
  status: 'onaylandi' | 'reddedildi',
): Promise<{ success: number; failed: number }> {
  await requireAdmin()
  const payload = await getPayload({ config: configPromise })

  const results = await Promise.allSettled(
    ids.map((id) =>
      payload.update({
        collection: 'volunteers',
        id,
        data: { applicationStatus: status },
      }),
    ),
  )

  const success = results.filter((r) => r.status === 'fulfilled').length
  const failed = results.filter((r) => r.status === 'rejected').length

  return { success, failed }
}

export async function bulkUpdateNeedsUrgency(
  ids: number[],
  urgency: 'acil' | 'orta' | 'yeterli',
): Promise<{ success: number; failed: number }> {
  await requireAdmin()
  const payload = await getPayload({ config: configPromise })

  const results = await Promise.allSettled(
    ids.map((id) =>
      payload.update({
        collection: 'needs-list',
        id,
        data: { urgency },
      }),
    ),
  )

  const success = results.filter((r) => r.status === 'fulfilled').length
  const failed = results.filter((r) => r.status === 'rejected').length

  return { success, failed }
}

export async function bulkUpdateAnimalStatus(
  ids: number[],
  animalStatus: 'tedavide' | 'kalici-bakim' | 'acil',
): Promise<{ success: number; failed: number }> {
  await requireAdmin()
  const payload = await getPayload({ config: configPromise })

  const results = await Promise.allSettled(
    ids.map((id) =>
      payload.update({
        collection: 'animals',
        id,
        data: { animalStatus },
      }),
    ),
  )

  const success = results.filter((r) => r.status === 'fulfilled').length
  const failed = results.filter((r) => r.status === 'rejected').length

  return { success, failed }
}
