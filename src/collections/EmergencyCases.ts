import type { CollectionConfig } from "payload"

export const EmergencyCases: CollectionConfig = {
  slug: "emergency-cases",
  labels: { singular: "Acil Vaka", plural: "Acil Vakalar" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "collectedAmount", "targetAmount"],
    group: "Icerik",
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "animal", type: "relationship", relationTo: "animals" },
    { name: "slug", type: "text", unique: true, required: true },
    { name: "description", type: "richText", required: true, localized: true },
    { name: "targetAmount", type: "number", required: true },
    { name: "collectedAmount", type: "number", defaultValue: 0 },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Aktif", value: "aktif" },
        { label: "Tamamlandi", value: "tamamlandi" },
      ],
      required: true,
    },
    {
      name: "updates",
      type: "array",
      fields: [
        { name: "date", type: "date" },
        { name: "text", type: "richText", localized: true },
        { name: "photo", type: "upload", relationTo: "media" },
      ],
    },
    { name: "photos", type: "upload", relationTo: "media", hasMany: true },
    { name: "beforePhoto", type: "upload", relationTo: "media" },
    { name: "afterPhoto", type: "upload", relationTo: "media" },
  ],
}
