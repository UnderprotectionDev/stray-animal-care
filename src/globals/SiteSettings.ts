import type { GlobalConfig } from "payload"

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Genel Ayarlar",
  fields: [
    {
      name: "bank",
      type: "group",
      label: "IBAN Bilgileri",
      fields: [
        { name: "bankName", type: "text" },
        { name: "accountHolder", type: "text" },
        { name: "iban", type: "text" },
      ],
    },
    {
      name: "contact",
      type: "group",
      label: "Iletisim",
      fields: [
        { name: "phone", type: "text" },
        { name: "email", type: "email" },
        { name: "whatsapp", type: "text" },
        { name: "instagram", type: "text" },
      ],
    },
    {
      name: "international",
      type: "group",
      label: "Yurtdisi Odeme",
      fields: [
        { name: "paypalLink", type: "text" },
        { name: "wiseLink", type: "text" },
      ],
    },
    {
      name: "stats",
      type: "group",
      label: "Istatistikler",
      fields: [
        { name: "catsCount", type: "number" },
        { name: "dogsCount", type: "number" },
        { name: "treatedCount", type: "number" },
        { name: "spayedCount", type: "number" },
        { name: "vaccinatedCount", type: "number" },
      ],
    },
  ],
}
