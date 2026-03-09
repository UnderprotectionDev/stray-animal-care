import type { CollectionConfig } from "payload"

export const SupporterComments: CollectionConfig = {
  slug: "supporter-comments",
  labels: { singular: "Destekci Yorumu", plural: "Destekci Yorumlari" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "date", "approved"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "comment", type: "textarea", required: true, localized: true },
    { name: "date", type: "date", required: true },
    { name: "approved", type: "checkbox", defaultValue: false },
  ],
}
