import type { CollectionConfig } from 'payload'

type VersionsConfig = NonNullable<CollectionConfig['versions']>

/** Live preview collections (Pages, Posts) — fast autosave for real-time preview */
export const livePreviewVersions: VersionsConfig = {
  drafts: {
    autosave: { interval: 100 },
    schedulePublish: true,
  },
  maxPerDoc: 50,
}

/** Standard admin-edited collections (Events) — moderate autosave */
export const standardVersions: VersionsConfig = {
  drafts: {
    autosave: { interval: 500 },
    schedulePublish: true,
  },
  maxPerDoc: 50,
}

/** Infrequently edited collections (Animals, EmergencyCases) — relaxed autosave */
export const relaxedVersions: VersionsConfig = {
  drafts: {
    autosave: { interval: 3000 },
    schedulePublish: true,
  },
  maxPerDoc: 50,
}
