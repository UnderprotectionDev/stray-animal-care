import type { CollectionConfig } from "payload"

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Medya", plural: "Medya" },
  upload: {
    staticDir: "media",
    mimeTypes: [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/svg+xml",
      "application/pdf",
    ],
    imageSizes: [
      { name: "thumbnail", width: 300, height: 300, position: "centre" },
      { name: "card", width: 600, height: 400, position: "centre" },
      { name: "hero", width: 1920, height: 1080, position: "centre" },
    ],
  },
  fields: [
    { name: "alt", type: "text", required: true, localized: true },
  ],
}
