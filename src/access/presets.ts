import { authenticated } from './authenticated'
import { authenticatedOrPublished } from './authenticatedOrPublished'
import { anyone } from './anyone'

export const accessPresets = {
  adminOnly: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  publicReadAdminWrite: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  publicRead: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
} as const
