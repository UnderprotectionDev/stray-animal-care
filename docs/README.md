# Paws of Hope — Project Documentation

> Last updated: 2026-03-13 — All milestones complete (M1-M10, M13). Design system: Mint System (March 2026).

---

## Project Summary

Paws of Hope is a donation-focused website for an individual animal lover who personally cares for stray cats and dogs in Turkey (Hatay & Malatya). It is being built to collect donations, raise awareness, and ensure transparency for the daily feeding, treatment, and rehabilitation of ~100 cats and dogs.

---

## Tech Stack

| Layer               | Technology                                                 |
| ------------------- | ---------------------------------------------------------- |
| Framework           | Next.js 15 (App Router)                                    |
| Language            | TypeScript                                                 |
| Styling             | Tailwind CSS 4 + shadcn/ui                                 |
| CMS                 | PayloadCMS 3.x (embedded)                                  |
| Database            | PostgreSQL (Neon)                                          |
| Hosting             | Vercel                                                     |
| Animation           | GSAP + @gsap/react (primary) + motion (secondary)          |
| i18n                | next-intl (frontend) + PayloadCMS i18n (CMS)               |
| SEO                 | Next.js Metadata API + PayloadCMS SEO Plugin               |
| Form Validation     | Zod + TanStack Form                                        |
| Package Manager     | pnpm                                                       |
| Linting/Formatting  | ESLint (next/core-web-vitals + next/typescript)             |
| Search/State        | PayloadCMS fullText search + Nuqs                          |

---

## PRD (Product Requirements Document)

| #  | File                                 | Contents                                                             |
| -- | ------------------------------------ | -------------------------------------------------------------------- |
| 01 | [Overview](prd/01-overview.md)       | Executive Summary, Mission, Vision, Values, Success Criteria          |
| 02 | [Features](prd/02-features.md)       | Personas, User Stories, Acceptance Criteria, Non-Goals, User Flows    |
| 03 | [Technical](prd/03-technical.md)     | Tech Stack, Architecture, Collection Schemas, Integrations, Caching, Error Handling, Security, Performance, Testing, Deployment, API Specs, UI States, SEO, Responsive |
| 04 | [Design System](prd/04-design-system.md) | Color Palette, Typography, UI Principles, Spacing, Icons, Component Variants, Animation, Responsive, Accessibility |
| 05 | [Roadmap](prd/05-roadmap.md)         | Risks, Technical Debt, Phase 1-3 Roadmap, Page Details               |

---

## Milestones

| Document | Contents |
| -------- | -------- |
| [Milestone Overview](milestones/README.md) | All milestones across 2 phases with dependency graph |

### Phase 1: MVP (M1-M10)

| # | Milestone | File |
|---|-----------|------|
| 1 | Project Scaffolding & Infrastructure | [01-project-scaffolding.md](milestones/phase-1-mvp/01-project-scaffolding.md) |
| 2 | Design System & shadcn/ui | [02-design-system.md](milestones/phase-1-mvp/02-design-system.md) |
| 3 | Internationalization (i18n) | [03-internationalization.md](milestones/phase-1-mvp/03-internationalization.md) |
| 4 | CMS Collections & Global | [04-cms-collections.md](milestones/phase-1-mvp/04-cms-collections.md) |
| 5 | Layout Module | [05-layout-module.md](milestones/phase-1-mvp/05-layout-module.md) |
| 6 | Core Pages (Home, Story, Contact) | [06-core-pages.md](milestones/phase-1-mvp/06-core-pages.md) |
| 7 | Animal Profiles | [07-animal-profiles.md](milestones/phase-1-mvp/07-animal-profiles.md) |
| 8 | Emergency & Donate | [08-emergency-donate.md](milestones/phase-1-mvp/08-emergency-donate.md) |
| 9 | Content Pages | [09-content-pages.md](milestones/phase-1-mvp/09-content-pages.md) |
| 10 | Polish, Search, Instagram & Launch | [10-polish-launch.md](milestones/phase-1-mvp/10-polish-launch.md) |

### Phase 2: Growth (M13)

| # | Milestone | File |
|---|-----------|------|
| 13 | Admin Dashboard Enhancements | [13-admin-dashboard.md](milestones/phase-2-growth/13-admin-dashboard.md) |

---

## Reference

| Document | Contents |
| -------- | -------- |
| [Tech Decisions](reference/tech-decisions.md) | Technology Decision Matrix — rationale for all deferred tech choices (PWA, charts, social queue, forum, PDF, caching) |
| [Testing Strategy](reference/testing-strategy.md) | Testing pyramid, directory structure, coverage targets, CI pipeline, accessibility testing |
| [Glossary](reference/glossary.md) | Turkish/English term mapping — URL slugs, CMS labels, field values, domain terms |

---

## Guides

| Document | Contents |
| -------- | -------- |
| [Quick Start](guides/quick-start.md) | Prerequisites, setup steps, key commands, module development workflow |
| [Deployment Playbook](guides/deployment-playbook.md) | First deployment guide, env checklist, migrations, monitoring, rollback, incident response |
| [FAQ & Troubleshooting](guides/faq-troubleshooting.md) | Dev/deployment/CMS FAQs, architecture rationale, common issues and solutions |

---

## Strategy

| Document | Contents |
| -------- | -------- |
| [User Flows](strategy/user-flows.md) | Detailed journey maps for 5 personas, conversion funnels, micro-interaction inventory, drop-off analysis |
| [Content & SEO Strategy](strategy/content-seo-strategy.md) | Target keywords (TR/EN), per-page SEO templates, structured data plan, content calendar, image SEO |

---

_This document serves as the master index for all Paws of Hope project documentation._
