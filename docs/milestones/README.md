# Paws of Hope — Milestone Overview

> This document provides a high-level overview of all milestones across three phases. Each milestone has a dedicated file with detailed tasks, file paths, and acceptance criteria.

---

## Phase Summary

| Phase | Name | Milestones | Goal |
|-------|------|------------|------|
| Phase 1 | MVP | M1–M10 | Launch a fully functional, bilingual website with CMS-managed content |
| Phase 2 | Growth | M13 | Admin dashboard |

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
| 9 | [Content Pages](phase-1-mvp/09-content-pages.md) | M4, M5 | Done ✅ |
| 10 | [Polish, Search, Instagram & Launch](phase-1-mvp/10-polish-launch.md) | M6–M9 | Done ✅ |

### Phase 2: Growth

| # | Milestone | Dependencies | Status |
|---|-----------|-------------|--------|
| 13 | [Admin Dashboard Enhancements](phase-2-growth/13-admin-dashboard.md) | M10 | Done ✅ |

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
                                         └── M10 ── M13
```

### Parallelizable Milestones

- **M2 + M3**: Design System and i18n are independent of each other
- **M7 + M8 + M9**: Animal Profiles, Emergency/Donate, and Content Pages are independent

---

## Conventions

- All milestone files are written in **English**
- Each task includes: description, relevant file paths, and acceptance criteria
- File paths follow the project architecture defined in `docs/prd/03-technical.md`
- Collections are defined in `src/collections/` (centralized, not inside modules)
- Globals: Header (`src/Header/`), SiteSettings (`src/SiteSettings/`), UIStrings (`src/globals/UIStrings/`)
- Module structure: `src/modules/<name>/components/`, `lib/`, `index.ts` (7 feature modules)

---

## Related Documents

- [PRD Index](../README.md)
- [PRD: Overview](../prd/01-overview.md)
- [PRD: Features](../prd/02-features.md)
- [PRD: Technical](../prd/03-technical.md)
- [PRD: Design System](../prd/04-design-system.md)
- [PRD: Roadmap & Risks](../prd/05-roadmap.md)
