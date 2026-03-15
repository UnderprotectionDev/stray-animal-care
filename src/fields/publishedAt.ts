import type { Field } from 'payload'

export function publishedAtField(): Field {
  return {
    name: 'publishedAt',
    label: 'Yayınlanma Tarihi',
    type: 'date',
    admin: {
      date: {
        pickerAppearance: 'dayAndTime',
      },
      position: 'sidebar',
    },
    hooks: {
      beforeChange: [
        ({ siblingData, value }) => {
          if (siblingData._status === 'published' && !value) {
            return new Date()
          }
          return value
        },
      ],
    },
  }
}
