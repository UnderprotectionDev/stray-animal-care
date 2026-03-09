# Paws of Hope — Product Requirements Document (PRD)

> Son guncelleme: 2026-03-10

---

## Proje Ozeti

Paws of Hope, Turkiye'de (Hatay & Malatya) sokak kedilerine ve kopeklerine bireysel olarak bakan bir hayvanseverin bagis odakli web sitesidir. ~100 kedi ve kopegin gunluk beslenmesi, tedavisi ve rehabilitasyonu icin bagis toplamak, farkindalik olusturmak ve seffaflik saglamak amaciyla insa edilmektedir.

---

## Tech Stack

| Katman              | Teknoloji                                                  |
| ------------------- | ---------------------------------------------------------- |
| Framework           | Next.js 15 (App Router)                                    |
| Dil                 | TypeScript                                                 |
| Styling             | Tailwind CSS 4 + shadcn/ui                                 |
| CMS                 | PayloadCMS 3.x (gomulu)                                    |
| Veritabani          | PostgreSQL (Neon)                                          |
| Hosting             | Vercel                                                     |
| Animasyon           | Motion + GSAP                                              |
| i18n                | next-intl (frontend) + PayloadCMS i18n (CMS)               |
| SEO                 | Next.js Metadata API + PayloadCMS SEO Plugin               |
| Form Validation     | Zod + TanStack Form                                        |
| Package Manager     | Bun                                                        |
| Linting/Formatting  | Biome                                                      |
| Search/State        | PayloadCMS fullText search + Nuqs                          |

---

## PRD Bolumleri

| #  | Dosya                                | Icerik                                                       |
| -- | ------------------------------------ | ------------------------------------------------------------ |
| 01 | [Overview](prd/01-overview.md)       | Executive Summary, Misyon, Vizyon, Degerler, Basari Kriterleri |
| 02 | [Features](prd/02-features.md)       | Personalar, User Stories, Acceptance Criteria, Non-Goals       |
| 03 | [Technical](prd/03-technical.md)     | Tech Stack, Mimari, Collection Semalari, Entegrasyonlar, Caching, Error Handling, Guvenlik, Performans |
| 04 | [Design System](prd/04-design-system.md) | Renk Paleti, Tipografi, UI Prensipleri, Animasyon, Responsive, Accessibility |
| 05 | [Roadmap](prd/05-roadmap.md)         | Riskler, Teknik Borc, Phase 1-3 Roadmap, Sayfa Detaylari      |

---

_Bu dokuman Paws of Hope projesinin temel referans kaynagi olarak kullanilacaktir. Detaylar icin ilgili bolum dosyalarina bakiniz._
