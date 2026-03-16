# Technology Decision Matrix

> **Project**: Paws of Hope
> **Date**: 2026-03-10
> **Status**: Historical Reference
> **Scope**: Deferred technology choices from milestone planning, now finalized

> **Important:** TDR-001, 003, 004, 005, and 006 reference milestones (M15-M18) that have been **removed from project scope**. These decisions are retained for historical reference only. If any of these milestones are revisited in the future, the technology choices documented here remain valid starting points.

This document records the technology decisions that were deferred during initial milestone planning and have since been evaluated and confirmed. Each decision follows an Architecture Decision Record (ADR) format with context, rationale, and consequences.

---

## Summary Table

| # | Decision Area | Milestone | Chosen Technology | Alternatives Considered |
|---|---|---|---|---|
| 1 | PWA Library | M15 | **Serwist** | @ducanh2912/next-pwa, manual Workbox |
| 2 | Chart Library | M17 | **shadcn/ui chart** (Recharts) | Chart.js, Visx |
| 3 | Social Queue System | M16 | **Vercel Cron + Neon DB queue** | BullMQ + Redis, Inngest |
| 4 | Forum Approach | M18 | **PayloadCMS collection** (custom) | Embedded Discourse |
| 5 | PDF Generation | M17/M18 | **@react-pdf/renderer** | Puppeteer, jsPDF |
| 6 | SW Caching Strategy | M15 | **Hybrid strategy** | Single-strategy approaches |

### Removed Milestone

| Milestone | Original Scope | Status |
|---|---|---|
| M12 | Email Notifications | **Removed from project** |

---

## TDR-001: PWA Library (M15)

### Context

Milestone 15 introduces Progressive Web App capabilities to the site, including offline support, installability, and push notifications. The PWA implementation requires a service worker management library that integrates cleanly with the Next.js 15 App Router.

### Decision

**Serwist**

### Rationale

- **Native Next.js 15 App Router support.** Serwist was built with the App Router in mind, unlike older libraries that were designed for the Pages Router and later adapted.
- **TypeScript-first.** Full type safety out of the box, consistent with the rest of the project stack.
- **Actively maintained successor to next-pwa.** Serwist picks up where the original next-pwa left off, with a cleaner API and active development.
- **Built on Workbox with better DX.** Retains the battle-tested Workbox runtime under the hood while providing a significantly simpler configuration surface.

### Alternatives Rejected

| Alternative | Reason for Rejection |
|---|---|
| @ducanh2912/next-pwa | Stale maintenance cycle. Compatibility with Next.js 15 App Router is inconsistent, and issues go unresolved for long periods. |
| Manual Workbox | Excessive boilerplate. Requires writing and maintaining service worker lifecycle code, precache manifests, and routing logic by hand. The complexity is not justified for this project's scope. |

### Consequences

- Service worker configuration will live alongside the Next.js config.
- Serwist's plugin system will be used for the caching strategies defined in TDR-006.
- The team must track Serwist releases for breaking changes, though the project's active maintenance reduces this risk.

---

## TDR-002: Chart Library (M17)

### Context

Milestone 17 adds an analytics dashboard to the admin panel, requiring charts for donation trends, visitor statistics, and animal rescue metrics. The chart library must integrate with the existing component system and support server-side rendering.

### Decision

**shadcn/ui chart** (built on Recharts)

### Rationale

- **Consistent design system.** The project already uses shadcn/ui for all UI components. The chart component inherits the same design tokens (colors, radii, spacing), ensuring visual consistency without manual theming.
- **Accessible by default.** shadcn/ui chart components include ARIA labels and keyboard navigation, aligning with the project's WCAG 2.1 AA target.
- **SSR-compatible.** Recharts, the rendering engine under the hood, supports server-side rendering without additional configuration.
- **Mature foundation.** Recharts is one of the most widely used React charting libraries, with a stable API and well-documented behavior.

### Alternatives Rejected

| Alternative | Reason for Rejection |
|---|---|
| Chart.js | Canvas-based; requires a React wrapper (react-chartjs-2) that adds an abstraction layer. Does not share design tokens with shadcn/ui, requiring manual theme synchronization. |
| Visx | Too low-level for admin dashboard charts. Visx provides primitives (scales, axes, shapes) rather than ready-made chart types, which would require significant assembly work for standard bar/line/pie charts. |

### Consequences

- Chart components will be added via `npx shadcn@latest add chart` and customized in `src/components/ui/`.
- Recharts is pulled in as a transitive dependency; the team interacts with the shadcn/ui wrapper, not Recharts directly.
- Complex or unconventional visualizations (if ever needed) may require dropping down to Recharts APIs.

---

## TDR-003: Social Queue System (M16)

### Context

Milestone 16 introduces automated social media posting for rescue stories, adoption updates, and fundraising campaigns. Posts are drafted in the CMS, scheduled by staff, and published to social platforms at optimal times. This requires a reliable queue and scheduling mechanism.

### Decision

**Vercel Cron + Neon DB queue**

### Rationale

- **No additional infrastructure.** The project already runs on Vercel (compute) and Neon (PostgreSQL). The queue is a simple database table; the scheduler is a Vercel Cron Job hitting an API route. No new services to provision, monitor, or pay for.
- **Simple DB-backed queue table.** A `social_queue` table with columns for payload, status, scheduled time, and retry count covers all requirements. PostgreSQL row-level locking prevents double-processing.
- **Vercel Cron for periodic processing.** Cron jobs run every 5 minutes, pick up pending items, and dispatch them. This granularity is acceptable for social media posting.
- **Low cost.** Stays within existing Vercel and Neon plan limits for the expected volume of posts.

### Alternatives Rejected

| Alternative | Reason for Rejection |
|---|---|
| BullMQ + Redis | Requires provisioning and maintaining a Redis instance, adding infrastructure cost and operational overhead. Overkill for a queue processing a handful of social posts per day. |
| Inngest | Adds a third-party vendor dependency for a non-core feature. The free tier may suffice initially, but scaling introduces pricing concerns and lock-in. |

### Consequences

- A `social_queue` collection (or raw table) will be created in the Neon database.
- A Vercel Cron Job (`vercel.json` cron config) will trigger an API route for queue processing.
- Retry logic and failure handling must be implemented manually in the queue processor.
- If queue volume ever grows significantly, migration to a dedicated queue service would be straightforward since the processing logic is decoupled from the storage mechanism.

---

## TDR-004: Forum Approach (M18)

### Context

Milestone 18 introduces community features, including a space for adopters, volunteers, and supporters to share experiences and ask questions. The feature requires basic discussion threads, not a full-featured forum with categories, badges, and moderation tiers.

### Decision

**PayloadCMS collection** (custom forum built on existing CMS)

### Rationale

- **Full control.** Thread and reply data lives in the same database, managed by the same admin panel, styled by the same design system. No integration seams.
- **Consistent CMS workflow.** Content moderators already use PayloadCMS for blog posts, emergency cases, and animal profiles. Forum moderation fits naturally into the same interface.
- **No external service.** Eliminates the need for a separate subdomain, authentication bridge, or embed iframe.
- **Simple needs.** The community feature requires threads and replies with basic moderation (approve, hide, delete). This does not warrant a dedicated forum platform.

### Alternatives Rejected

| Alternative | Reason for Rejection |
|---|---|
| Embedded Discourse | Heavyweight solution that requires separate hosting (Docker or managed service), its own database, and a single-sign-on integration. The operational overhead and cost are disproportionate to the project's community needs. |

### Consequences

- Forum functionality will be built as a PayloadCMS collection (e.g., `ForumThreads`, `ForumReplies`) within the existing database.
- User authentication for community members must be handled through PayloadCMS's auth capabilities or a lightweight extension.
- Scaling to thousands of active threads may require pagination optimization and database indexing beyond the defaults.
- If community needs outgrow the custom solution, migration to a dedicated platform remains possible since the data is in PostgreSQL.

---

## TDR-005: PDF Generation (M17/M18)

### Context

Milestones 17 and 18 require generating PDF reports: transparency reports (donation summaries, expense breakdowns) and community/NGO documentation. PDFs must be generated on-demand in a serverless environment (Vercel Functions).

### Decision

**@react-pdf/renderer**

### Rationale

- **React component model.** PDF templates are written as JSX components using a familiar `<Document>`, `<Page>`, `<View>`, `<Text>` API. This keeps the code consistent with the rest of the React codebase and makes templates easy to maintain.
- **Structured reports.** The library excels at tabular and document-style layouts (tables, headers, footers, page numbers), which is exactly what transparency reports require.
- **Works in serverless.** Runs in Node.js without external binaries or headless browsers, making it compatible with Vercel Functions' execution environment and size limits.
- **TypeScript support.** Full type definitions for all components and style properties.

### Alternatives Rejected

| Alternative | Reason for Rejection |
|---|---|
| Puppeteer | Requires a headless Chrome binary (~130 MB), which exceeds Vercel Functions' size limits and cold start budget. Workarounds (@sparticuz/chromium) exist but add fragility and maintenance burden. |
| jsPDF | Imperative API with poor support for complex layouts. Building a multi-page report with tables, headers, and footers requires manual coordinate math. No component model. |

### Consequences

- PDF templates will be co-located with their respective modules (e.g., `transparency/lib/report-template.tsx`).
- The `@react-pdf/renderer` package adds approximately 2 MB to the server bundle for routes that generate PDFs.
- Font registration (Plus Jakarta Sans, Inter) must be done explicitly in the PDF renderer since it does not inherit from CSS.
- Very large reports (hundreds of pages) may hit Vercel Functions' execution time limits; pagination or background generation would be needed in that case.

---

## TDR-006: Service Worker Caching Strategy (M15)

### Context

The PWA implementation (TDR-001) requires a caching strategy for the service worker. Different types of content on the site have fundamentally different freshness requirements: static assets are versioned and rarely change, while CMS content is updated by staff and should reflect recent changes without sacrificing load performance.

### Decision

**Hybrid strategy** with content-type-specific caching policies:

| Content Type | Strategy | Rationale |
|---|---|---|
| Static assets (CSS, JS, fonts) | **Cache-first** | Versioned via content hashes in filenames. Once cached, serve instantly. New deployments produce new URLs, so stale cache is not a concern. |
| Navigation requests | **Network-first** with offline fallback | Users should see the latest page content. If the network is unavailable, serve a cached version or a dedicated offline page. |
| CMS content pages | **Stale-while-revalidate** | Serve the cached version immediately for fast perceived load, then fetch the updated version in the background. Next visit reflects the latest content. |
| API responses | **Network-only** | Data endpoints (donation totals, emergency case status) must always return fresh data. Caching could display dangerously outdated information. |

### Rationale

A single caching strategy cannot serve all content types well. Cache-first for everything would serve stale CMS content. Network-first for everything would eliminate the performance benefits of caching static assets. The hybrid approach assigns the optimal strategy to each content type based on its update frequency and freshness sensitivity.

### Consequences

- Serwist's routing configuration will define four route matchers, each with its own caching handler.
- The offline fallback page must be precached during service worker installation.
- Cache storage names should be versioned to allow clean purges on major updates.
- The stale-while-revalidate window for CMS content means users may briefly see content that is one visit behind; this is acceptable for the site's content update frequency.

---

## Removed: M12 — Email Notifications

### Decision

Milestone 12 (Email Notifications) has been **removed from the project scope**. No email notification system will be implemented.

This means:

- No transactional email service (e.g., Resend, SendGrid) will be integrated.
- No email templates or sending infrastructure will be built.
- Features that originally depended on email notifications (donation receipts, volunteer confirmations, emergency alerts) will rely on in-app mechanisms or manual processes instead.

This decision reduces infrastructure costs, removes a vendor dependency, and simplifies the operational surface of the project. If email capabilities are needed in the future, this can be revisited as a standalone initiative.

---

## Revision History

| Date | Author | Change |
|---|---|---|
| 2026-03-10 | Team | Initial technology decisions confirmed; M12 removed |
