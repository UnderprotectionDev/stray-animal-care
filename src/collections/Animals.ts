import type { CollectionConfig } from "payload"

export const Animals: CollectionConfig = {
  slug: "animals",
  labels: { singular: "Hayvan", plural: "Hayvanlar" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "status"],
  },
  fields: [
    { name: "name", type: "text", required: true, localized: true },
    { name: "slug", type: "text", unique: true, required: true },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Kedi", value: "kedi" },
        { label: "Kopek", value: "kopek" },
      ],
      required: true,
    },
    { name: "age", type: "text", localized: true },
    {
      name: "gender",
      type: "select",
      options: [
        { label: "Erkek", value: "erkek" },
        { label: "Disi", value: "disi" },
      ],
      required: true,
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Tedavide", value: "tedavide" },
        { label: "Kalici Bakim", value: "kalici-bakim" },
        { label: "Acil", value: "acil" },
      ],
      required: true,
    },
    { name: "photos", type: "upload", relationTo: "media", hasMany: true },
    { name: "story", type: "richText", localized: true },
    { name: "needs", type: "richText", localized: true },
    { name: "featured", type: "checkbox", defaultValue: false },
  ],
}
