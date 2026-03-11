import { cookies, headers as nextHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { User } from '../payload-types'

export const getMeUser = async (args?: {
  nullUserRedirect?: string
  validUserRedirect?: string
}): Promise<{
  token: string
  user: User
}> => {
  const { nullUserRedirect, validUserRedirect } = args || {}
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  const payload = await getPayload({ config: configPromise })

  const headers = new Headers(await nextHeaders())
  if (token) {
    headers.set('Authorization', `JWT ${token}`)
  }

  const { user } = await payload.auth({ headers })

  if (validUserRedirect && user) {
    redirect(validUserRedirect)
  }

  if (nullUserRedirect && !user) {
    redirect(nullUserRedirect)
  }

  if (!user || !token) {
    throw new Error('User is not authenticated and no redirect was configured')
  }

  return {
    token,
    user,
  }
}
