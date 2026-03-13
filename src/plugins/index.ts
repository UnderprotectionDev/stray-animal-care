import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { CollectionQuickFilterPlugin } from '@shefing/quickfilter'
import { translator, copyResolver } from '@payload-enchants/translator'
import { auditLogPlugin } from '@rumess/payload-audit-log'

import { Animal, EmergencyCase, Event, Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page | Animal | EmergencyCase | Event> = ({ doc }) => {
  const title = doc && 'title' in doc ? doc.title : doc && 'name' in doc ? doc.name : null
  return title ? `${title} | Paws of Hope` : 'Paws of Hope'
}

const generateURL: GenerateURL<Post | Page | Animal | EmergencyCase | Event> = ({ doc }) => {
  const url = getServerSideURL()

  if (!doc?.slug) return url

  // Detect collection by unique fields — use locale-prefixed Turkish routes
  if (doc && 'type' in doc && 'gender' in doc) {
    return `${url}/tr/canlarimiz/${doc.slug}`
  }
  if (doc && 'targetAmount' in doc) {
    return `${url}/tr/acil-vakalar/${doc.slug}`
  }
  if (doc && 'eventDate' in doc) {
    return `${url}/tr/events/${doc.slug}`
  }

  return `${url}/tr/${doc.slug}`
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts', 'animals', 'emergency-cases', 'events'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'Bu alanı değiştirdiğinizde web sitesini yeniden derlemeniz gerekecektir.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  searchPlugin({
    collections: ['posts', 'animals', 'emergency-cases'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  CollectionQuickFilterPlugin({
    includedCollections: ['animals', 'emergency-cases', 'volunteers', 'events'],
  }),
  translator({
    resolvers: [copyResolver()],
    collections: ['animals', 'emergency-cases', 'events', 'posts', 'pages', 'needs-list'],
    globals: ['ui-strings'],
  }),
  auditLogPlugin({
    collections: ['animals', 'emergency-cases', 'vet-records', 'events', 'volunteers'],
  }),
  importExportPlugin({
    collections: [
      { slug: 'animals' },
      { slug: 'emergency-cases' },
      { slug: 'volunteers' },
      { slug: 'vet-records' },
      { slug: 'needs-list' },
    ],
  }),
]
