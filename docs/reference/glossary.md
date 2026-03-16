# Glossary — Turkish / English Term Reference

> Last updated: 2026-03-16

This document maps Turkish terms used throughout the codebase, URL slugs, CMS fields, and UI to their English equivalents. It serves as a reference for developers who may not be familiar with Turkish.

---

## URL Slugs

These are the Turkish URL paths used in the `[locale]` route structure.

| Turkish Slug          | English Translation      | Route                                  | Module     |
| --------------------- | ------------------------ | -------------------------------------- | ---------- |
| `hikayem`             | My Story                 | `/[locale]/hikayem`                    | story      |
| `calismalarimiz`      | Our Work                 | `/[locale]/calismalarimiz`             | our-work   |
| `canlarimiz`          | Our Animals              | `/[locale]/canlarimiz`                 | animals    |
| `destek-ol`           | Support / Donate         | `/[locale]/destek-ol`                  | donate     |
| `mama-malzeme`        | Food & Supplies          | `/[locale]/mama-malzeme`               | supplies   |
| `acil-vakalar`        | Emergency Cases          | `/[locale]/acil-vakalar`               | emergency  |
| `seffaflik`           | Transparency             | `/[locale]/seffaflik`                  | transparency |
| `gunluk`              | Blog / Journal           | `/[locale]/gunluk`                     | blog       |
| `gonullu-ol`          | Volunteer                | `/[locale]/gonullu-ol`                 | volunteer  |
| `gelecek-vizyonu`     | Future Vision            | `/[locale]/gelecek-vizyonu`            | vision     |
| `iletisim`            | Contact                  | `/[locale]/iletisim`                   | contact    |
| `topluluk`            | Community                | `/[locale]/topluluk`                   | (future)   |
| `etkinlikler`         | Events                   | `/[locale]/etkinlikler`                | (future)   |
| `gizlilik-politikasi` | Privacy Policy           | `/[locale]/gizlilik-politikasi`        | (legal)    |
| `kvkk`                | KVKK (Turkish Data Protection) | `/[locale]/kvkk`                 | (legal)    |

**Note:** KVKK stands for "Kisisel Verilerin Korunmasi Kanunu" (Personal Data Protection Law), the Turkish equivalent of GDPR.

---

## CMS Field Values — Species & Gender

| Turkish   | English        | Used In           |
| --------- | -------------- | ----------------- |
| `kedi`    | Cat            | Animals: species  |
| `kopek`   | Dog            | Animals: species  |
| `erkek`   | Male           | Animals: gender   |
| `disi`    | Female         | Animals: gender   |

---

## CMS Field Values — Status

| Turkish          | English              | Used In                           |
| ---------------- | -------------------- | --------------------------------- |
| `tedavide`       | In treatment         | Animals: `animalStatus`           |
| `kalici-bakim`   | Permanent care       | Animals: `animalStatus`           |
| `acil`           | Emergency / Urgent   | NeedsList: `priority`             |
| `aktif`          | Active               | EmergencyCases: `caseStatus`      |
| `tamamlandi`     | Completed            | EmergencyCases: `caseStatus`      |
| `beklemede`      | Pending              | Volunteers: `applicationStatus`   |
| `onaylandi`      | Approved             | Volunteers: `applicationStatus`   |
| `reddedildi`     | Rejected             | Volunteers: `applicationStatus`   |

> **Note:** Animals uses `animalStatus` (not `status`) and EmergencyCases uses `caseStatus` (not `status`) to avoid conflict with Payload's internal `_status` enum in Drizzle.

---

## CMS Field Values — Categories & Types

| Turkish          | English              | Used In                    |
| ---------------- | -------------------- | -------------------------- |
| `kurtarma`       | Rescue               | Emergency: type            |
| `tedavi`         | Treatment            | Emergency: type            |
| `gunluk`         | Daily                | Blog: category             |
| `duyuru`         | Announcement         | Blog: category             |
| `etkinlik`       | Event                | Blog: category             |
| `orta`           | Medium               | Supplies: priority         |
| `yeterli`        | Sufficient           | Supplies: stock status     |

---

## CMS Collection Labels

These appear in the PayloadCMS admin sidebar and throughout the admin UI.

| Turkish Singular | Turkish Plural   | English Singular    | English Plural       | Collection Slug         |
| ---------------- | ---------------- | ------------------- | -------------------- | ----------------------- |
| Hayvan           | Hayvanlar        | Animal              | Animals              | `animals`               |
| Yazi             | Yazilar          | Post                | Posts                | `posts`                 |
| Acil Vaka        | Acil Vakalar     | Emergency Case      | Emergency Cases      | `emergency-cases`       |
| Ihtiyac          | Ihtiyac Listesi  | Need                | Needs List           | `needs-list`            |
| Seffaflik Raporu | Seffaflik Raporlari | Transparency Report | Transparency Reports | `transparency-reports` |
| Medya            | Medyalar         | Media               | Media                | `media`                 |
| Sayfa            | Sayfalar         | Page                | Pages                | `pages`                 |
| Kategori         | Kategoriler      | Category            | Categories           | `categories`            |
| Veteriner Kaydi  | Veteriner Kayitlari | Vet Record       | Vet Records          | `vet-records`           |
| Etkinlik         | Etkinlikler      | Event               | Events               | `events`                |
| Gonullu          | Gonulluler       | Volunteer           | Volunteers           | `volunteers`            |
| Kullanici        | Kullanicilar     | User                | Users                | `users`                 |

### Global Labels

| Turkish          | English          | Global Slug      |
| ---------------- | ---------------- | ---------------- |
| Site Ayarlari    | Site Settings    | `site-settings`  |
| Header           | Header           | `header`         |
| UI Strings       | UI Strings       | `ui-strings`     |

---

## Domain Terms

General terms that appear in the project context, UI copy, or documentation.

| Turkish              | English                    | Context                              |
| -------------------- | -------------------------- | ------------------------------------ |
| dernek               | Association / NGO          | Organization type                    |
| makbuz               | Receipt                    | Donation receipts                    |
| bagis                | Donation                   | Core concept                         |
| seffaflik            | Transparency               | Financial transparency section       |
| gonullu              | Volunteer                  | Volunteer program                    |
| mama                 | Pet food / Kibble          | Primary supply need                  |
| kisirlastarma        | Spay / Neuter              | Animal care procedure                |
| asilama              | Vaccination                | Animal care procedure                |
| sokak hayvani        | Stray animal               | General term                         |
| sokak kedisi         | Stray cat                  | Common usage                         |
| sokak kopegi         | Stray dog                  | Common usage                         |
| baranak              | Shelter                    | Animal shelter                       |
| sahiplendirme        | Adoption                   | Rehoming animals                     |
| tedavi               | Treatment / Medical care   | Veterinary treatment                 |
| besleme              | Feeding                    | Daily feeding routine                |
| kurtarma             | Rescue                     | Emergency rescue operations          |
| deprem               | Earthquake                 | Disaster context (Hatay/Malatya)     |
| IBAN                 | IBAN                       | Turkish bank transfer number         |
| havale               | Bank transfer              | Payment method                       |
| EFT                  | Electronic funds transfer  | Payment method                       |

---

## UI Strings (Common Bilingual Elements)

These strings commonly appear in the user interface in both languages.

| Turkish                      | English                       | Location              |
| ---------------------------- | ----------------------------- | --------------------- |
| Bagis Yap                    | Make a Donation               | CTA buttons           |
| IBAN Kopyala                 | Copy IBAN                     | Donation section      |
| Kopyalandi!                  | Copied!                       | IBAN copy feedback    |
| Acil Yardim                  | Emergency Help                | Emergency banner      |
| Detaylari Gor                | View Details                  | Card links            |
| Tum Hayvanlar                | All Animals                   | Filter label          |
| Kediler                      | Cats                          | Filter option         |
| Kopekler                     | Dogs                          | Dogs filter           |
| Devamini Oku                 | Read More                     | Blog cards            |
| Iletisime Gec                | Get in Touch                  | Contact section       |
| Gonullu Ol                   | Become a Volunteer            | Volunteer CTA         |
| Arama                        | Search                        | Search input          |
| Sonuc Bulunamadi             | No Results Found              | Empty state           |
| Yukleniyor...                | Loading...                    | Loading state         |
| Turkce                       | Turkish                       | Language switcher     |
| Ingilizce / English          | English                       | Language switcher     |

---

## Related Docs

- [Technical PRD](../prd/03-technical.md) — collection schemas and field definitions
- [Features PRD](../prd/02-features.md) — user stories with Turkish context
- [Design System](../prd/04-design-system.md) — UI component specifications
