# M13: Admin Dashboard Enhancements

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
- [ ] Active emergency case count with "View All" link
- [ ] Total animals count (cats/dogs breakdown)
- [ ] Pending (unapproved) supporter comments count
- [ ] Recent donations list (if M11 is complete)
- [ ] Latest published blog post with edit link
- [ ] Widgets update in real-time on dashboard load

---

### T13.2: Add quick action buttons

**What:** Add shortcut buttons on the admin dashboard for common tasks.

**Files:**
- `src/modules/settings/components/dashboard/QuickActions.tsx`

**Acceptance Criteria:**
- [ ] "Add New Animal" button
- [ ] "Create Emergency Case" button
- [ ] "Write Blog Post" button
- [ ] "Update Needs List" button
- [ ] "Review Comments" button (with pending count badge)
- [ ] Buttons navigate to the correct create/edit views

---

### T13.3: Register custom dashboard in PayloadCMS

**What:** Configure PayloadCMS to use the custom dashboard as the admin home screen.

**Files:**
- `src/payload.config.ts` (admin dashboard component config)
- `src/modules/settings/components/dashboard/Dashboard.tsx`

**Acceptance Criteria:**
- [ ] Custom dashboard replaces default PayloadCMS dashboard
- [ ] Dashboard is the first screen admin sees after login
- [ ] All widgets load without errors

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

- [ ] Admin dashboard shows all stat widgets
- [ ] Quick actions navigate to correct views
- [ ] Draft/publish workflow works for blog posts and animals
- [ ] Bulk operations work for comment moderation
- [ ] Dashboard loads without performance issues
- [ ] Getting Started checklist appears for new/incomplete setups
- [ ] Dashboard is usable on mobile devices

## Verification

1. Login to `/admin` — verify custom dashboard with all widgets
2. Click quick action buttons — verify navigation
3. Create a draft blog post — verify it's not shown on frontend
4. Publish the draft — verify it appears on frontend
5. Bulk approve comments — verify they appear in supporter section
