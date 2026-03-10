# M17: Advanced Analytics & Reporting

## Description

Build a custom analytics dashboard for tracking donation trends, visitor behavior, content performance, and generating periodic reports for transparency and decision-making.

## Dependencies

- **M11** — Online Payment Integration (donation data)
- **M13** — Admin Dashboard (dashboard infrastructure)
- **M14** — A/B Testing (experiment data)

## Technology Choices

| Concern | Technology | Rationale |
|---|---|---|
| Charts | **shadcn/ui chart** (built on Recharts) | Consistent with design system, accessible, composable |
| PDF generation | **@react-pdf/renderer** | React-based PDF, no headless browser needed |
| Data source | PayloadCMS Local API | Direct DB queries with date filters |

## Scope

- Custom analytics dashboard in admin
- Donation trend charts (daily, weekly, monthly)
- Content performance metrics
- Visitor behavior insights
- Automated report generation
- Export functionality (CSV, PDF)

## Chart Types

| Metric | Chart Type | Component |
|---|---|---|
| Donation trends over time | **Line chart** | `DonationTrendChart.tsx` |
| Recurring vs one-time donations | **Pie chart** | `DonationBreakdownChart.tsx` |
| Monthly donation comparisons | **Bar chart** | `MonthlyComparisonChart.tsx` |
| Cumulative donations over time | **Area chart** | `CumulativeDonationChart.tsx` |

All charts use `shadcn/ui chart` components (`ChartContainer`, `ChartTooltip`, `ChartLegend`) with Recharts primitives underneath.

## Data Aggregation Strategy

- All analytics queries use **PayloadCMS Local API** with `where` clauses for date filtering
- Aggregated data (totals, averages, breakdowns) computed server-side in analytics query functions
- Aggregated results cached for **5 minutes** using Next.js `unstable_cache` (or equivalent)
- Cache key includes date range to avoid stale cross-range data
- Raw data never sent to the client — only pre-aggregated summaries and chart-ready arrays

## Tasks

### T17.1: Build donation analytics dashboard

**What:** Create charts and metrics for donation tracking — total raised, average donation, trends over time, recurring vs one-time breakdown.

**Files:**
- `src/modules/settings/components/analytics/DonationTrendChart.tsx` (line chart)
- `src/modules/settings/components/analytics/DonationBreakdownChart.tsx` (pie chart)
- `src/modules/settings/components/analytics/MonthlyComparisonChart.tsx` (bar chart)
- `src/modules/settings/components/analytics/CumulativeDonationChart.tsx` (area chart)
- `src/modules/settings/components/analytics/DonationMetrics.tsx` (summary cards)
- `src/modules/settings/lib/analytics-queries.ts`

**Acceptance Criteria:**
- [ ] Total donations raised (all-time, this month, this week)
- [ ] Donation trend line chart (configurable timeframe)
- [ ] Average donation amount
- [ ] Recurring vs one-time donation pie chart
- [ ] Monthly comparison bar chart (current year vs previous year)
- [ ] Cumulative donation area chart
- [ ] Top donors list (anonymized option)
- [ ] All charts built with shadcn/ui chart components
- [ ] Data sourced from Donations collection via PayloadCMS Local API
- [ ] Aggregated data cached for 5 minutes

---

### T17.2: Build content performance metrics

**What:** Track which content drives the most engagement — most viewed animals, popular blog posts, most donated emergency cases.

**Files:**
- `src/modules/settings/components/analytics/ContentPerformance.tsx`

**Acceptance Criteria:**
- [ ] Most viewed animal profiles
- [ ] Most read blog posts
- [ ] Emergency cases with highest donation conversion
- [ ] Engagement metrics from Vercel Analytics integration

---

### T17.3: Build automated report generation

**What:** Generate periodic (monthly) reports combining donation data, content metrics, and expense data for transparency. Reports are generated as PDFs using @react-pdf/renderer.

**Files:**
- `src/modules/settings/lib/report-generator.ts`
- `src/modules/settings/components/reports/ReportDocument.tsx` (@react-pdf/renderer document)
- `src/app/api/reports/generate/route.ts`

**PDF Report Layout:**

1. **Cover page** — Organization logo, report title, reporting period (e.g., "March 2026"), generation date
2. **Donation summary table** — Total raised, number of donations, average amount, recurring vs one-time breakdown, comparison to previous period
3. **Expense breakdown** — Categorized expenses (veterinary, food, shelter, operations), percentage of total, with simple bar visualization
4. **Top content** — Top 5 blog posts by views, top 5 animal profiles by engagement, top 3 emergency cases by donations received
5. **Chart snapshots** — Static rendered versions of donation trend (line) and monthly comparison (bar) charts, generated as SVG and embedded in PDF

**Acceptance Criteria:**
- [ ] Monthly report auto-generated with donation summary
- [ ] PDF generated using @react-pdf/renderer (no headless browser)
- [ ] Report follows the 5-section layout above
- [ ] Chart snapshots embedded as SVG in PDF
- [ ] Exportable as PDF or CSV (CSV for raw data only)
- [ ] Can be triggered manually from admin dashboard
- [ ] Report data uses same cached aggregation queries as dashboard

---

### T17.4: Build analytics admin page

**What:** Create a dedicated analytics page in the admin panel with all dashboards.

**Files:**
- `src/modules/settings/components/analytics/AnalyticsDashboard.tsx`

**Acceptance Criteria:**
- [ ] Date range selector
- [ ] All analytics widgets on one page
- [ ] Real-time data refresh
- [ ] Accessible from admin sidebar

---

## Milestone Acceptance Criteria

- [ ] Donation trends are visualized with line, pie, bar, and area charts
- [ ] All charts use shadcn/ui chart components (Recharts-based)
- [ ] Content performance metrics are accurate
- [ ] Reports can be generated as PDF via @react-pdf/renderer
- [ ] PDF reports include cover, donation summary, expenses, top content, and chart snapshots
- [ ] CSV export available for raw data
- [ ] Analytics page loads within 2 seconds
- [ ] Data is consistent with actual CMS records
- [ ] Aggregated data cached for 5 minutes

## Verification

1. Open admin analytics page — verify donation charts render with real data
2. Verify line chart shows donation trends, pie chart shows recurring vs one-time
3. Check content performance — verify most viewed animals match actual traffic
4. Generate a monthly report — verify PDF contains all 5 sections
5. Verify chart snapshots appear correctly in PDF
6. Export CSV — verify raw data matches dashboard numbers
7. Change date range — verify charts update correctly
8. Compare dashboard totals with raw CMS data — verify consistency
9. Check cache — verify repeated loads within 5 minutes don't re-query
