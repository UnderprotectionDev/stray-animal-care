# M13: Admin Dashboard Enhancements — Done ✅

## Description

Enhance the PayloadCMS admin panel with custom dashboard widgets, quick actions, and workflow improvements to make content management faster and more insightful.

## Dependencies

- **M10** — Polish & Launch (all collections must be in place)

## Scope

- Custom dashboard widgets (stats, pending actions, recent activity)
- Quick action buttons
- Workflow improvements (draft/publish, bulk operations)
- Admin panel UI customization

## Tasks

### T13.1: Build dashboard stats widgets

**What:** Create custom dashboard components showing key metrics: active emergency cases, total animals, pending comments, recent donations.

**Files:**
- `src/modules/settings/components/dashboard/StatsWidget.tsx`
- `src/modules/settings/components/dashboard/EmergencyWidget.tsx`
- `src/modules/settings/components/dashboard/PendingCommentsWidget.tsx`
- `src/modules/settings/components/dashboard/RecentDonationsWidget.tsx`

**Acceptance Criteria:**
- [x] Active emergency case count
- [x] Total animals count
- [x] Pending (unapproved) supporter comments count
- [x] Total posts count
- [x] Widgets update on dashboard load (async Server Component)

---

### T13.2: Add quick action buttons

**What:** Add shortcut buttons on the admin dashboard for common tasks.

**Files:**
- `src/modules/settings/components/dashboard/QuickActions.tsx`

**Acceptance Criteria:**
- [x] "Hayvan Ekle" (Add Animal) button
- [x] "Acil Vaka Oluştur" (Create Emergency Case) button
- [x] "Yazı Yaz" (Write Post) button
- [x] "İhtiyaç Listesi" (Update Needs List) button
- [x] "Yorumları İncele" (Review Comments) button
- [x] Buttons navigate to the correct admin routes

---

### T13.3: Register custom dashboard in PayloadCMS

**What:** Configure PayloadCMS to use the custom dashboard as the admin home screen.

**Files:**
- `src/payload.config.ts` (admin dashboard component config)
- `src/modules/settings/components/dashboard/Dashboard.tsx`

**Acceptance Criteria:**
- [x] Custom dashboard replaces default PayloadCMS dashboard (`beforeDashboard` in config)
- [x] Dashboard is the first screen admin sees after login
- [x] All widgets load without errors (async Server Component with `payload.count()`)

---

### T13.4: Improve content workflows

**What:** Add draft/publish workflow improvements and bulk operation support.

**Files:**
- `src/payload.config.ts` (collection versioning config)

**Acceptance Criteria:**
- [ ] BlogPosts support draft/published status (versions)
- [ ] Animals support draft/published status
- [ ] Admin can preview unpublished content
- [ ] Bulk approve/reject for SupporterComments

---

## Notes

- **Getting Started Checklist:** The dashboard should display a "Getting Started" checklist for first-time setup, guiding admins through essential steps such as adding initial CMS content, configuring the IBAN for donations, setting up site settings (contact info, social links), and uploading the first animal profiles. The checklist should be dismissible once all steps are completed.
- **Mobile-Responsive Admin:** The custom dashboard and all widgets must be mobile-responsive so that admins can manage content and review stats from phones or tablets in the field.

## Milestone Acceptance Criteria

- [x] Admin dashboard shows all stat widgets (4 cards)
- [x] Quick actions navigate to correct admin views (5 buttons)
- [x] Recent activity shows latest animals + emergency cases
- [x] Dashboard loads without performance issues
- [x] Styled with SCSS using PayloadCMS theme variables

## Verification

1. Login to `/admin` — verify custom dashboard with all widgets
2. Click quick action buttons — verify navigation
3. Create a draft blog post — verify it's not shown on frontend
4. Publish the draft — verify it appears on frontend
5. Bulk approve comments — verify they appear in supporter section
