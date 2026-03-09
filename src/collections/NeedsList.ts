import type { CollectionConfig } from "payload"

export const NeedsList: CollectionConfig = {
  slug: "needs-list",
  labels: { singular: "Ihtiyac", plural: "Ihtiyac Listesi" },
  admin: {
    useAsTitle: "productName",
    defaultColumns: ["productName", "urgency", "stockStatus"],
  },
  fields: [
    { name: "productName", type: "text", required: true, localized: true },
    { name: "brandDetail", type: "text", localized: true },
    {
      name: "urgency",
      type: "select",
      options: [
        { label: "Acil", value: "acil" },
        { label: "Orta", value: "orta" },
        { label: "Yeterli", value: "yeterli" },
      ],
      required: true,
    },
    { name: "stockStatus", type: "text", localized: true },
    { name: "order", type: "number" },
  ],
}
