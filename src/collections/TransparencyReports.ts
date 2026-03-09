import type { CollectionConfig } from "payload"

export const TransparencyReports: CollectionConfig = {
  slug: "transparency-reports",
  labels: { singular: "Seffaflik Raporu", plural: "Seffaflik Raporlari" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "month", "totalDonation", "totalExpense"],
  },
  fields: [
    { name: "month", type: "date", required: true },
    { name: "title", type: "text", localized: true },
    {
      name: "expenses",
      type: "array",
      fields: [
        { name: "category", type: "text", localized: true },
        { name: "amount", type: "number" },
      ],
    },
    { name: "totalExpense", type: "number", required: true },
    { name: "totalDonation", type: "number", required: true },
    { name: "documents", type: "upload", relationTo: "media", hasMany: true },
    {
      name: "donorList",
      type: "array",
      fields: [{ name: "name", type: "text" }],
    },
  ],
}
