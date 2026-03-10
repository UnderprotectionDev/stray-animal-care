import type { Access } from 'payload'

export const approvedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    approved: {
      equals: true,
    },
  }
}
