# M18: NGO Compliance & Community

## Description

Prepare the platform for formal NGO (dernek) status with legal compliance features, tax receipt generation, KVKK (Turkish data protection) compliance, and community features like a forum and event calendar.

## Dependencies

- **M11** — Online Payment Integration (donation receipts)
- **M17** — Advanced Analytics (reporting data)

## Technology Choices

| Concern | Technology | Rationale |
|---|---|---|
| Forum data | **PayloadCMS collections** (ForumThreads, ForumReplies) | Consistent with CMS-first architecture, built-in admin moderation |
| Tax receipt PDFs | **@react-pdf/renderer** | Same library as M17 reports, React-based, no headless browser |
| Event calendar data | **PayloadCMS collection** (Events) | Managed via CMS admin like all other content |

## Scope

- Legal compliance for Turkish NGO regulations
- Tax receipt (makbuz) generation for donors (downloadable PDF, no email)
- KVKK (Turkish GDPR) compliance
- Community forum with moderation workflow
- Event calendar
- Donor account portal (optional)

## Tasks

### T18.1: Implement KVKK compliance

**What:** Add cookie consent, privacy policy, data processing agreements, and data deletion capabilities to comply with Turkish data protection law (KVKK / Law No. 6698).

**Files:**
- `src/modules/shared/components/CookieConsent.tsx`
- `src/app/(frontend)/[locale]/gizlilik-politikasi/page.tsx`
- `src/app/(frontend)/[locale]/kvkk/page.tsx`
- `src/app/api/data/delete/route.ts`

**Acceptance Criteria:**
- [ ] Cookie consent banner on first visit
- [ ] Privacy policy page (TR and EN)
- [ ] KVKK disclosure page
- [ ] Data deletion request endpoint
- [ ] Consent preferences stored and respected
- [ ] Analytics only loaded after consent

---

### T18.2: Build tax receipt generation

**What:** Generate official donation receipts (bagis makbuzu) as downloadable PDFs that can be used for tax purposes once NGO status is obtained. Receipts are available from the admin panel and donor portal — no email delivery.

**Files:**
- `src/modules/donate/lib/receipt-generator.ts`
- `src/modules/donate/components/ReceiptDocument.tsx` (@react-pdf/renderer document)
- `src/app/api/receipts/generate/route.ts`
- `src/app/api/receipts/[id]/download/route.ts`

**Receipt PDF contents:**
- NGO details (name, registration number, address)
- Donor information (name, TC kimlik or tax number)
- Donation amount and currency
- Donation date
- Sequential unique receipt number
- Official stamp/signature placeholder

**Acceptance Criteria:**
- [ ] Receipt generated as PDF using @react-pdf/renderer
- [ ] Receipt includes: NGO details, donor info, amount, date, receipt number
- [ ] Receipt numbers are sequential and unique
- [ ] Downloadable from admin panel (per donation record)
- [ ] Downloadable from donor portal (if donor account exists)
- [ ] Archive of all receipts accessible and searchable in admin
- [ ] No email sending dependency — receipt is download-only

---

### T18.3: Build community forum

**What:** Create a simple community/discussion area where supporters can connect, share experiences, and organize. All posts are moderated before appearing publicly.

**Files:**
- `src/modules/community/components/ForumList.tsx`
- `src/modules/community/components/ForumThread.tsx`
- `src/modules/community/components/NewThread.tsx`
- `src/modules/community/components/ReportButton.tsx`
- `src/modules/community/collection.ts` (ForumThreads, ForumReplies)
- `src/app/(frontend)/[locale]/topluluk/page.tsx`
- `src/app/(frontend)/[locale]/topluluk/[slug]/page.tsx`

**Forum moderation workflow:**
1. User submits a new thread or reply
2. Post is created with `status: 'pending'` by default
3. Admin reviews in PayloadCMS admin panel
4. Admin sets status to `approved` or `rejected`
5. Only `approved` posts are visible on the frontend
6. Frontend queries filter by `status = 'approved'`

**Spam prevention:**
- Honeypot field (hidden input that bots fill, humans don't)
- Rate limit: max 3 posts per hour per IP address
- Rate limit tracked via short-lived entries in a `forum_rate_limits` table or in-memory store

**Report system:**
- Report button on each thread and reply
- Clicking report sets a `reported: true` flag on the post
- Reported posts surface in a CMS admin view for review
- Admin can dismiss report or remove the post

**Acceptance Criteria:**
- [ ] Forum categories: General, Volunteer Stories, Suggestions, Events
- [ ] Thread listing with latest reply info
- [ ] Thread detail with replies
- [ ] Simple post creation (no account required, name + email + content)
- [ ] All new posts default to `pending` status
- [ ] Only `approved` posts visible on frontend
- [ ] Admin can approve/reject posts in CMS
- [ ] Honeypot field on all submission forms
- [ ] Rate limit: max 3 posts per hour per IP
- [ ] Report button on each post flags it for admin review
- [ ] Translated in TR/EN

---

### T18.4: Build event calendar

**What:** Create an events section for volunteer meetups, fundraising events, and community activities.

**Files:**
- `src/modules/community/components/EventCalendar.tsx`
- `src/modules/community/components/EventCard.tsx`
- `src/modules/community/collections/Events.ts`
- `src/app/(frontend)/[locale]/etkinlikler/page.tsx`

**Events collection schema:**

| Field | Type | Description |
|---|---|---|
| title | `text`, required | Event name |
| slug | `text`, unique, auto-generated | URL slug |
| description | `richText` | Event details and information |
| date | `date`, required | Event start date/time |
| endDate | `date` | Event end date/time (optional) |
| location | `text` | Venue name or address |
| locationUrl | `text` | Google Maps link |
| type | `select`: `meetup`, `fundraiser`, `adoption-day`, `other` | Event category |
| coverImage | `upload` (Media) | Event cover image |
| whatsappRsvpLink | `text` | WhatsApp group/RSVP link |
| maxAttendees | `number` | Maximum number of attendees (optional) |
| featured | `checkbox`, default `false` | Show on homepage or highlighted |

**Acceptance Criteria:**
- [ ] Calendar view of upcoming events
- [ ] Event card: title, date, location, type badge, description
- [ ] Events managed via CMS with the schema above
- [ ] WhatsApp RSVP link per event
- [ ] Past events archived (visible but marked as past)
- [ ] Featured events can be highlighted
- [ ] Google Maps link for event location
- [ ] Event types filterable on frontend

---

### T18.5: Add legal pages

**What:** Create legal disclosure pages required for NGO status.

**Files:**
- `src/app/(frontend)/[locale]/yasal/page.tsx`

**Acceptance Criteria:**
- [ ] Terms of use page
- [ ] NGO registration information
- [ ] Financial disclosure links
- [ ] Contact for legal inquiries
- [ ] All pages translated

---

## Milestone Acceptance Criteria

- [ ] KVKK cookie consent is functional
- [ ] Privacy policy and KVKK pages exist
- [ ] Tax receipts can be generated and downloaded as PDF
- [ ] Community forum allows posting with moderation workflow
- [ ] Forum spam prevention active (honeypot + rate limiting)
- [ ] Report button flags posts for admin review
- [ ] Event calendar shows upcoming events with all schema fields
- [ ] Legal pages are complete
- [ ] All features work in both TR and EN

## Verification

1. First visit — verify cookie consent banner appears
2. Accept/reject cookies — verify analytics behavior matches consent
3. Submit a data deletion request — verify endpoint works
4. Generate a tax receipt for a test donation — verify PDF output and download
5. Verify receipt is accessible from admin panel (no email required)
6. Create a forum thread — verify it gets `pending` status
7. Approve thread in CMS — verify it appears on frontend
8. Reject a thread — verify it does not appear on frontend
9. Submit 4 posts within an hour from same IP — verify 4th is rate-limited
10. Click report button on a post — verify it's flagged in CMS
11. Add an event in CMS with all fields — verify it appears on calendar
12. Verify featured event is highlighted
13. Navigate to legal pages — verify content is present
14. Switch to English — verify all new features are translated
