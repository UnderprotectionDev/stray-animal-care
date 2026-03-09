import { buildConfig } from "payload"
import { Animals } from "./collections/Animals"
import { BlogPosts } from "./collections/BlogPosts"
import { EmergencyCases } from "./collections/EmergencyCases"
import { NeedsList } from "./collections/NeedsList"
import { TransparencyReports } from "./collections/TransparencyReports"
import { SupporterComments } from "./collections/SupporterComments"
import { Media } from "./collections/Media"
import { SiteSettings } from "./globals/SiteSettings"

export default buildConfig({
  collections: [
    Animals,
    BlogPosts,
    EmergencyCases,
    NeedsList,
    TransparencyReports,
    SupporterComments,
    Media,
  ],
  globals: [SiteSettings],
})
