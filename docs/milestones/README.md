# Paws of Hope — Milestone Overview

> This document provides a high-level overview of all milestones across three phases. Each milestone has a dedicated file with detailed tasks, file paths, and acceptance criteria.

---

## Phase Summary

| Phase | Name | Milestones | Goal |
|-------|------|------------|------|
| Phase 1 | MVP | M1–M10 | Launch a fully functional, bilingual website with CMS-managed content |
| Phase 2 | Growth | M11, M13–M14 | Add online payments, admin dashboard, and A/B testing |
| Phase 3 | Maturity | M15–M18 | PWA, social automation, advanced analytics, NGO compliance |

---

## All Milestones

### Phase 1: MVP

| # | Milestone | Dependencies | Status |
|---|-----------|-------------|--------|
| 1 | [Project Scaffolding & Infrastructure](phase-1-mvp/01-project-scaffolding.md) | — | Done ✅ |
| 2 | [Design System & shadcn/ui](phase-1-mvp/02-design-system.md) | M1 | Done ✅ |
| 3 | [Internationalization (i18n)](phase-1-mvp/03-internationalization.md) | M1 | Done ✅ |
| 4 | [CMS Collections & Global](phase-1-mvp/04-cms-collections.md) | M1, M3 | Done ✅ |
| 5 | [Layout Module](phase-1-mvp/05-layout-module.md) | M2, M3, M4 | Done ✅ |
| 6 | [Core Pages (Home, Story, Contact)](phase-1-mvp/06-core-pages.md) | M5 | Done ✅ |
| 7 | [Animal Profiles](phase-1-mvp/07-animal-profiles.md) | M4, M5 | Done ✅ |
| 8 | [Emergency & Donate](phase-1-mvp/08-emergency-donate.md) | M4, M5 | Done ✅ |
| 9 | [Content Pages](phase-1-mvp/09-content-pages.md) | M4, M5 | Not Started |
| 10 | [Polish, Search, Instagram & Launch](phase-1-mvp/10-polish-launch.md) | M6–M9 | Not Started |

### Phase 2: Growth

| # | Milestone | Dependencies | Status |
|---|-----------|-------------|--------|
| 11 | [Online Payment Integration](phase-2-growth/11-online-payments.md) | M10 | Not Started |
| 13 | [Admin Dashboard Enhancements](phase-2-growth/13-admin-dashboard.md) | M10 | Not Started |
| 14 | [A/B Testing & Optimization](phase-2-growth/14-ab-testing.md) | M10, M11 | Not Started |

### Phase 3: Maturity

| # | Milestone | Dependencies | Status |
|---|-----------|-------------|--------|
| 15 | [Progressive Web App (PWA)](phase-3-maturity/15-pwa.md) | M10 | Not Started |
| 16 | [Social Media Automation](phase-3-maturity/16-social-automation.md) | M10, M13 | Not Started |
| 17 | [Advanced Analytics & Reporting](phase-3-maturity/17-advanced-analytics.md) | M11, M13, M14 | Not Started |
| 18 | [NGO Compliance & Community](phase-3-maturity/18-ngo-community.md) | M11, M17 | Not Started |

---

## Dependency Graph

```
M1 ──┬── M2 ──┐
     ├── M3 ──┤
     │        └── M4 ──┐
     │                 └── M5 ──┬── M6 ──┐
                                ├── M7 ──┤
                                ├── M8 ──┤
                                └── M9 ──┘
                                         └── M10 ──┬── M11 ──┬── M14 → M17 ──┐
                                                   │         └───────────────┼── M18
                                                   ├── M13 → M16             │
                                                   └── M15
```

### Parallelizable Milestones

- **M2 + M3**: Design System and i18n are independent of each other
- **M7 + M8 + M9**: Animal Profiles, Emergency/Donate, and Content Pages are independent
- **M11 + M13**: Online Payments and Admin Dashboard are independent
- **M15**: PWA has no dependency on any Phase 2 milestone

---

## Conventions

- All milestone files are written in **English**
- Each task includes: description, relevant file paths, and acceptance criteria
- File paths follow the project architecture defined in `docs/prd/03-technical.md`
- Collections are co-located in modules as `collection.ts`
- Globals are co-located in the settings module as `global.ts`
- Module structure: `src/modules/<name>/components/`, `hooks/`, `lib/`, `collection.ts`, `index.ts`

---

## Related Documents

- [PRD Index](../README.md)
- [PRD: Overview](../prd/01-overview.md)
- [PRD: Features](../prd/02-features.md)
- [PRD: Technical](../prd/03-technical.md)
- [PRD: Design System](../prd/04-design-system.md)
- [PRD: Roadmap & Risks](../prd/05-roadmap.md)
