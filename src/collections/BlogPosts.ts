import type { CollectionConfig } from "payload"

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  labels: { singular: "Blog Yazisi", plural: "Blog Yazilari" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "date", "published"],
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", unique: true, required: true },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Kurtarma", value: "kurtarma" },
        { label: "Tedavi", value: "tedavi" },
        { label: "Gunluk", value: "gunluk" },
        { label: "Duyuru", value: "duyuru" },
        { label: "Etkinlik", value: "etkinlik" },
      ],
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text" }],
    },
    { name: "date", type: "date", required: true },
    { name: "content", type: "richText", required: true, localized: true },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "excerpt", type: "textarea", localized: true },
    { name: "published", type: "checkbox", defaultValue: false },
  ],
}
