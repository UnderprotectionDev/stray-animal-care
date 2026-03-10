# User Flows & Journey Maps

> Paws of Hope -- Stray Animal Care Platform
> Last updated: 2026-03-10

---

## Table of Contents

1. [Personas Overview](#1-personas-overview)
2. [Site Map & Page Reference](#2-site-map--page-reference)
3. [Core Design Principle](#3-core-design-principle)
4. [Conversion Funnels](#4-conversion-funnels)
5. [Persona Journey Maps](#5-persona-journey-maps)
6. [Micro-Interaction Inventory](#6-micro-interaction-inventory)
7. [Drop-Off Analysis & Mitigation](#7-drop-off-analysis--mitigation)
8. [Retention Loops](#8-retention-loops)

---

## 1. Personas Overview

| Persona | Age | Location | Language | Budget | Primary Goal | Device |
|---------|-----|----------|----------|--------|--------------|--------|
| **Ayse** | 28 | Istanbul | Turkish | Mid | Donate via IBAN | Mobile (iPhone) |
| **Sarah** | 35 | Berlin | English | Mid-High | Donate via PayPal/Wise | Desktop + Mobile |
| **Mehmet** | 45 | Hatay | Turkish | Low (no cash) | Order supplies from needs list | Mobile (Android) |
| **Zeynep** | 22 | University | Turkish | Very Low | Volunteer for field experience | Mobile |
| **Can** | 20 | University | Turkish | Very Low | Explore, share content | Mobile |

### Persona Profiles

**Ayse (28, Istanbul) -- Domestic Donor**
- Works in marketing, active on Instagram
- Follows animal rescue accounts, emotionally driven
- Comfortable with mobile banking and IBAN transfers
- Wants to see where her money goes

**Sarah (35, Berlin) -- International Donor**
- Expat or German citizen with ties to Turkey
- Prefers English interface, international payment methods
- Values transparency and professional presentation
- May have donated to similar causes before

**Mehmet (45, Hatay) -- Supply Donor**
- Local resident, knows the earthquake aftermath firsthand
- Cannot spare cash but can order supplies online
- Uses Trendyol/Hepsiburada for shopping
- Trusts local references and word-of-mouth

**Zeynep (22, University Student) -- Volunteer Candidate**
- Veterinary student seeking hands-on experience
- Active on social media, shares causes she believes in
- Limited budget but rich in time and skills
- Wants structured volunteer opportunities

**Can (20, Student) -- Social Media Explorer**
- Discovers content through Instagram Reels or Twitter
- Short attention span, visually driven
- May not donate but amplifies reach through shares
- Could convert to micro-donor over time

---

## 2. Site Map & Page Reference

| Page | Turkish Name | Route | Primary Purpose |
|------|-------------|-------|-----------------|
| Home | Ana Sayfa | `/` | First impression, funnel entry |
| My Story | Hikayem | `/hikayem` | Emotional connection, founder story |
| Our Work | Calismalarimiz | `/calismalarimiz` | Credibility, scope of impact |
| Our Animals | Canlarimiz | `/canlarimiz` | Emotional engagement, animal profiles |
| Support/Donate | Destek Ol | `/destek-ol` | Primary conversion (monetary) |
| Food & Supplies | Mama & Malzeme | `/mama-malzeme` | Supply donation conversion |
| Emergency Cases | Acil Vakalar | `/acil-vakalar` | Urgency-driven conversion |
| Transparency Corner | Seffaflik Kosesi | `/seffaflik` | Trust building, accountability |
| Blog | Gunluk | `/gunluk` | Content engagement, SEO |
| Volunteer | Gonullu Ol | `/gonullu-ol` | Volunteer recruitment |
| Future Vision | Gelecek Vizyonu | `/gelecek-vizyonu` | Long-term vision, recurring support |
| Contact | Iletisim | `/iletisim` | Direct communication |

---

## 3. Core Design Principle

### 2 Clicks to Donation

Every user on every page is at most 2 clicks away from completing a donation action.

**Implementation:**

1. **Persistent footer IBAN** -- IBAN information is visible in the site footer on every page. One click copies it to clipboard.
2. **Sticky mobile CTA** -- A "Destek Ol" button is always accessible on mobile, floating at the bottom of the viewport.
3. **Header donate button** -- The primary navigation includes a prominent CTA button linking to the donate page.

```
Any Page (click 1) → Donate Page (click 2) → IBAN Copied / Payment Initiated
Any Page (click 1) → Footer IBAN Copy (done)
```

This principle means:
- No page should require scrolling to find a donation path
- IBAN is always one tap away via footer
- The donate CTA is never more than one navigation action away

---

## 4. Conversion Funnels

### 4.1 Primary Conversion Funnel (Monetary Donation)

```
Social Media Post/Story
        |
        v
   Home Page ──────────────────────────┐
        |                              |
        v                              v
  Story / Animals              Transparency Corner
        |                              |
        v                              |
  Emotional Connection ◄───────────────┘
        |
        v
   Donate Page
        |
        ├──► IBAN Copy → Bank App Transfer
        ├──► PayPal Redirect → Payment
        └──► Wise Redirect → Payment
```

| Stage | Page | Goal | Success Metric |
|-------|------|------|----------------|
| Awareness | Instagram/Twitter | Click through to site | CTR on bio link |
| Landing | Home | Stay, explore further | Bounce rate < 40% |
| Discovery | Story / Animals | Emotional investment | Time on page > 90s |
| Trust | Transparency | Confirm credibility | Page visit before donate |
| Conversion | Donate | Complete donation action | IBAN copy or redirect click |
| Retention | Blog / Instagram | Return visit | Repeat visit within 30 days |

### 4.2 Emergency Conversion Funnel (Fast Path)

```
Social Media (Urgent Post)
        |
        v
  Emergency Case Detail
        |
        ├──► Donate Now (IBAN Copy) ── fast exit to bank app
        |
        └──► Share Emergency ── amplify reach
```

This funnel bypasses the standard discovery flow. Emergency posts on social media link directly to a specific case page. The page itself is designed for immediate action: prominent progress bar showing funding gap, large IBAN copy button, and a single clear ask.

| Stage | Estimated Time | User Action |
|-------|---------------|-------------|
| See post | 0s | Scroll Instagram |
| Click link | 3s | Tap link in bio or story |
| Read case | 15-30s | Scan headline, photo, progress bar |
| Copy IBAN | 35s | Tap copy button |
| Open bank app | 45s | Switch to banking app |
| Send transfer | 90s | Paste IBAN, enter amount, confirm |

**Total time from awareness to conversion: under 2 minutes.**

### 4.3 Supply Donation Funnel

```
Home / Social Media
        |
        v
  Food & Supplies Page
        |
        v
  Browse Needs List (filtered by urgency/category)
        |
        v
  Select Item → External Link (Trendyol/Hepsiburada/Amazon)
        |
        v
  Purchase with shelter address pre-filled in description
```

| Stage | Page | Key Element |
|-------|------|-------------|
| Entry | Home or direct link | "Mama & Malzeme" nav item |
| Browse | Supplies page | Filterable grid: food, medicine, equipment |
| Select | Item card | Urgency badge, external store links |
| Purchase | External store | Shipping address in item description |

### 4.4 Volunteer Funnel

```
Home / Social Media
        |
        v
  Volunteer Page
        |
        v
  Read Requirements & Roles
        |
        v
  WhatsApp Application Link
        |
        v
  Direct Conversation → Onboarding
```

| Stage | User Action | Conversion Element |
|-------|------------|-------------------|
| Interest | Reads volunteer roles and stories | Role cards with skill tags |
| Qualification | Self-assesses fit | Requirements checklist |
| Application | Clicks WhatsApp link | Pre-filled message template |
| Follow-up | Conversation with coordinator | Human touch, personal response |

### 4.5 Content Engagement Funnel

```
Home / Social Media
        |
        v
  Blog Post (Gunluk)
        |
        v
  Read → Emotional Response
        |
        ├──► Share (WhatsApp/Twitter/Copy Link)
        |
        ├──► Browse More Posts
        |
        └──► Donate (if moved by content)
```

This funnel focuses on creating shareable content that expands organic reach. Each blog post includes share buttons and a subtle donate CTA, but the primary goal is engagement and amplification.

---

## 5. Persona Journey Maps

### 5.1 Ayse's Journey -- Domestic Donor

**Scenario:** Ayse sees an Instagram Story about a rescued kitten in Hatay. She taps through and eventually donates via IBAN.

#### Flow

```
Instagram Story (swipe up)
    |
    v
Home Page (TR)
    |
    v
"Hikayem" (My Story)
    |
    v
"Canlarimiz" (Our Animals) → browses animal cards
    |
    v
"Seffaflik" (Transparency) → reviews spending reports
    |
    v
"Destek Ol" (Donate) → copies IBAN
    |
    v
Opens bank app → sends transfer
    |
    v
Returns to site → reads Blog → follows on Instagram
```

#### Detailed Stage Map

| Stage | Action | Page | Emotion | Micro-Interaction | Drop-Off Risk |
|-------|--------|------|---------|-------------------|---------------|
| **Entry** | Sees rescue story on Instagram | Instagram | Curious, touched | -- | Doesn't swipe up (60% drop) |
| **Landing** | Arrives at home page | Home | Interested | Hero animation, stats counter | Slow load on mobile (mitigate: optimize LCP) |
| **Discovery** | Reads founder story | Hikayem | Empathetic, connected | Scroll-triggered photo reveals | Story too long (mitigate: progressive disclosure) |
| **Engagement** | Browses animal profiles | Canlarimiz | Emotionally invested | Card hover lift, status badge pulse | Filter confusion (mitigate: clear filter tabs) |
| **Trust** | Reviews transparency reports | Seffaflik | Reassured | Animated expense charts | Overwhelmed by data (mitigate: summary first) |
| **Conversion** | Copies IBAN, opens bank app | Destek Ol | Determined, generous | IBAN copy toast, amount cards | IBAN copy fails (mitigate: fallback display) |
| **Completion** | Sends bank transfer | Bank App | Satisfied, proud | -- | Forgets amount/IBAN (mitigate: clipboard persist) |
| **Retention** | Returns to read blog | Gunluk | Ongoing connection | -- | No reason to return (mitigate: email updates) |

#### Alternative Paths

- **Path A (Fast):** Home → Footer IBAN copy → Bank transfer (2 steps)
- **Path B (Emergency):** Instagram → Emergency Case → IBAN copy (2 steps)
- **Path C (Delayed):** Home → Story → Leaves → Returns next day → Donates
- **Path D (Referred):** WhatsApp link from friend → Donate page directly

---

### 5.2 Sarah's Journey -- International Donor

**Scenario:** Sarah, a German expat, finds the site through a Twitter thread about earthquake relief. She switches to English and donates via PayPal.

#### Flow

```
Twitter Thread (link click)
    |
    v
Home Page (TR) → Language Switcher → Home Page (EN)
    |
    v
"Our Work" → sees impact numbers
    |
    v
"Our Animals" → connects with specific animals
    |
    v
"Transparency" → reviews English reports
    |
    v
"Support Us" (Donate EN) → PayPal/Wise option
    |
    v
PayPal checkout → completes payment
    |
    v
Returns → subscribes to updates
```

#### Detailed Stage Map

| Stage | Action | Page | Emotion | Micro-Interaction | Drop-Off Risk |
|-------|--------|------|---------|-------------------|---------------|
| **Entry** | Clicks link in Twitter thread | Twitter | Sympathetic | -- | Link seems untrustworthy (mitigate: OG meta cards) |
| **Landing** | Sees Turkish content | Home (TR) | Confused | -- | Cannot read Turkish (CRITICAL: mitigate below) |
| **Language** | Finds and clicks language switcher | Header | Relieved | Flag dropdown animation | Switcher not visible (mitigate: detect browser locale) |
| **Discovery** | Reads about the mission in English | Our Work (EN) | Impressed | Stats counter animation | Poor translation (mitigate: native EN copy) |
| **Engagement** | Browses animal profiles | Animals (EN) | Emotionally moved | Card interactions, gallery lightbox | Wonders if site is legitimate (mitigate: social proof) |
| **Trust** | Checks transparency page | Transparency (EN) | Confident | Downloadable PDF reports | Reports only in Turkish (mitigate: EN summaries) |
| **Conversion** | Clicks PayPal/Wise button | Donate (EN) | Ready to act | Amount card selection, payment redirect | No international payment option (CRITICAL) |
| **Completion** | Completes PayPal payment | PayPal | Fulfilled | Confirmation redirect back to site | PayPal flow breaks (mitigate: Wise fallback) |
| **Retention** | Bookmarks site, follows social | -- | Connected | -- | No EN content updates (mitigate: EN blog posts) |

#### Critical Mitigations for International Users

1. **Auto-detect browser language** -- If `Accept-Language` header includes `en`, show a banner: "View this page in English?"
2. **International payment section** -- Dedicated section on donate page with PayPal, Wise, and international IBAN (with SWIFT/BIC)
3. **Currency display** -- Show suggested amounts in EUR/USD alongside TRY
4. **English transparency summaries** -- At minimum, provide translated summary paragraphs for each report

#### Alternative Paths

- **Path A (Direct donate):** Twitter → Donate page (EN) → PayPal (2 steps)
- **Path B (Wise transfer):** Twitter → Home (EN) → Donate → Wise redirect
- **Path C (IBAN international):** Donate (EN) → Copy IBAN + SWIFT/BIC → International bank transfer
- **Path D (Delayed):** Bookmarks site → Returns from desktop → Donates

---

### 5.3 Mehmet's Journey -- Supply Donor

**Scenario:** Mehmet, a local Hatay resident, sees a WhatsApp message about needed supplies. He orders dog food from Trendyol to be shipped to the shelter.

#### Flow

```
WhatsApp Group Message (link)
    |
    v
Food & Supplies Page (TR)
    |
    v
Filters by "Acil" (Urgent)
    |
    v
Selects "Kopek Mamasi 15kg" (Dog Food)
    |
    v
Clicks Trendyol link → item page with shelter address
    |
    v
Completes purchase on Trendyol
    |
    v
Shares the needs list link in WhatsApp group
```

#### Detailed Stage Map

| Stage | Action | Page | Emotion | Micro-Interaction | Drop-Off Risk |
|-------|--------|------|---------|-------------------|---------------|
| **Entry** | Opens WhatsApp link | WhatsApp | Willing to help | -- | Link looks suspicious (mitigate: branded short URL) |
| **Landing** | Sees supplies page | Mama & Malzeme | Oriented | Filter tabs smooth transition | Page loads slowly (mitigate: skeleton loading) |
| **Browse** | Filters by urgency | Mama & Malzeme | Focused | Toggle animation, urgent badge pulse | Too many items (mitigate: urgency sort default) |
| **Select** | Taps item card | Item detail | Decided | Card expand animation | External link distrust (mitigate: store logos) |
| **Redirect** | Goes to Trendyol | Trendyol | Familiar, comfortable | -- | Address not clear (mitigate: address in description) |
| **Purchase** | Completes order | Trendyol | Satisfied | -- | Price too high (mitigate: show range of options) |
| **Amplify** | Shares needs list in WhatsApp | WhatsApp | Proud, helpful | Share button with pre-filled text | No easy share (mitigate: WhatsApp share button) |

#### Key UX Requirements

- **Urgency badges**: Red "ACIL" (urgent), orange "Yakin Zamanda" (soon needed), green "Stok Var" (in stock)
- **Multiple store links per item**: Trendyol, Hepsiburada, Amazon TR -- user picks preferred store
- **Shelter address prominent**: Displayed at top of page and included in each item's description text for easy copy
- **Price range indicators**: Show approximate price so users can pick items within their budget

#### Alternative Paths

- **Path A (Direct):** WhatsApp → Supplies → Trendyol purchase (3 steps)
- **Path B (Browse first):** Home → Supplies → Browse all → Select → Purchase
- **Path C (Multiple items):** Supplies → Select several items → Purchase from same store
- **Path D (Cash donation instead):** Supplies → Realizes cash is easier → Donate page → IBAN

---

### 5.4 Zeynep's Journey -- Volunteer Candidate

**Scenario:** Zeynep, a vet student, discovers the volunteer page through a university WhatsApp group. She applies to help with animal care during semester break.

#### Flow

```
University WhatsApp Group (link)
    |
    v
Volunteer Page (TR)
    |
    v
Reads role descriptions → "Veteriner Asistan" (Vet Assistant)
    |
    v
Reviews requirements checklist
    |
    v
Clicks WhatsApp application link
    |
    v
Sends pre-filled application message
    |
    v
Follows Instagram for updates
    |
    v
Shares volunteer page with classmates
```

#### Detailed Stage Map

| Stage | Action | Page | Emotion | Micro-Interaction | Drop-Off Risk |
|-------|--------|------|---------|-------------------|---------------|
| **Entry** | Opens link from classmate | WhatsApp | Curious, hopeful | -- | Not sure what to expect |
| **Landing** | Reads volunteer intro | Gonullu Ol | Interested | Scroll-triggered role cards | Wall of text (mitigate: visual role cards) |
| **Explore** | Reviews available roles | Gonullu Ol | Excited | Card flip to show details | Role doesn't match skills (mitigate: varied roles) |
| **Qualify** | Checks requirements | Gonullu Ol | Evaluating | Checklist with icons | Requirements too strict (mitigate: "no experience needed" option) |
| **Apply** | Taps WhatsApp link | WhatsApp | Hopeful, nervous | Pre-filled message template | Reluctant to message stranger (mitigate: warm welcome copy) |
| **Follow-up** | Gets response from coordinator | WhatsApp | Relieved, eager | -- | Slow response (mitigate: auto-reply bot) |
| **Amplify** | Shares page with classmates | Social | Proud, social | Share button with custom message | No share prompt (mitigate: "Share with friends" CTA) |

#### Volunteer Role Cards

| Role | Turkish | Skills | Time Commitment |
|------|---------|--------|-----------------|
| Vet Assistant | Veteriner Asistan | Vet students, animal handling | 2-4 weeks |
| Feeding Helper | Besleme Yardimcisi | None required | Weekends |
| Transport Driver | Nakliye Soforusu | Driver's license | Flexible |
| Social Media | Sosyal Medya | Photography, writing | Remote, ongoing |
| Foster Home | Gecici Yuva | Home with space | 1-3 months |

#### Alternative Paths

- **Path A (Direct):** WhatsApp link → Volunteer → Apply (2 steps)
- **Path B (Organic):** Home → Nav → Volunteer → Apply
- **Path C (Social first):** Instagram → Home → Volunteer → Apply
- **Path D (Content-led):** Blog post about volunteer experience → Volunteer page → Apply

---

### 5.5 Can's Journey -- Social Media Explorer

**Scenario:** Can sees an Instagram Reel of a rescued dog's recovery. He shares it, explores the site, and eventually makes a small donation weeks later.

#### Flow (Multi-Session)

```
SESSION 1:
Instagram Reel (tap profile → link in bio)
    |
    v
Home Page (TR) → browses briefly
    |
    v
"Canlarimiz" (Our Animals) → watches recovery gallery
    |
    v
Shares animal profile on Instagram Stories
    |
    v
Exits

SESSION 2 (3 days later):
Instagram Story (from site account)
    |
    v
"Acil Vakalar" (Emergency Cases)
    |
    v
Reads emergency case → emotionally moved
    |
    v
Shares emergency case on Twitter

SESSION 3 (1 week later):
Direct URL (saved bookmark)
    |
    v
"Gunluk" (Blog) → reads update on animal he shared
    |
    v
"Destek Ol" (Donate) → small amount (50 TL)
    |
    v
Copies IBAN → sends via mobile banking
```

#### Detailed Stage Map (Multi-Session)

| Session | Stage | Action | Emotion | Micro-Interaction | Drop-Off Risk |
|---------|-------|--------|---------|-------------------|---------------|
| **1** | Entry | Watches Reel, clicks bio link | Entertained | -- | Bio link not prominent |
| **1** | Browse | Quick scroll through home | Mildly interested | Hero animation, parallax | Leaves immediately (mitigate: engaging hero) |
| **1** | Engage | Browses animal gallery | Delighted | Gallery swipe, card hover effects | Gets bored (mitigate: video content) |
| **1** | Share | Shares animal on IG Story | Social, proud | Share button → pre-formatted story | No share option (CRITICAL for this persona) |
| **2** | Return | Clicks through from IG Story | Concerned | -- | Doesn't follow account |
| **2** | Engage | Reads emergency case | Worried, empathetic | Progress bar animation, urgency badges | Feels helpless (mitigate: "sharing helps too") |
| **2** | Share | Shares on Twitter | Activist | Twitter share with OG image | Share flow is clunky |
| **3** | Return | Types URL or opens bookmark | Curious, invested | -- | Forgot the URL (mitigate: memorable domain) |
| **3** | Engage | Reads blog update | Connected, happy | -- | No updates (mitigate: regular blog posts) |
| **3** | Convert | Makes small donation | Generous, proud | Amount card (50 TL highlighted), IBAN copy toast | Thinks amount is too small (mitigate: "every lira helps" copy) |

#### Key Design Considerations for This Persona

- **Share-first design**: Every content piece must have prominent, one-tap share buttons
- **Low-commitment CTAs**: "Share this" before "Donate now"
- **Micro-donation framing**: Normalize small amounts ("50 TL = 1 week of food for a kitten")
- **Visual content priority**: Gallery-heavy pages, video embeds, before/after photos
- **Return-visit hooks**: Blog updates tied to specific animals, "What happened to [animal name]?" posts

#### Alternative Paths

- **Path A (Share only):** Instagram → Home → Animals → Share → Never returns
- **Path B (Content loop):** Instagram → Blog → Share → Blog → Share (ongoing engagement, no donation)
- **Path C (Emergency convert):** Instagram → Emergency → Immediate small donation
- **Path D (Volunteer pivot):** Animals → Volunteer page → WhatsApp application

---

## 6. Micro-Interaction Inventory

### 6.1 Donation Interactions

| Interaction | Trigger | Animation | Feedback | Technical Notes |
|-------------|---------|-----------|----------|-----------------|
| **IBAN Copy** | Click/tap copy button | Button fills with color (200ms ease) | Toast notification: "Kopyalandi!" / "Copied!" (2s auto-dismiss) | Uses `navigator.clipboard.writeText()`, fallback to `document.execCommand('copy')` |
| **Donation Amount Cards** | Hover (desktop) / Tap (mobile) | Scale to 1.05 with subtle shadow lift (150ms ease-out) | Selected card: border color change to Terracotta, info section expands below with impact description | Cards: 50 TL, 100 TL, 250 TL, 500 TL, Custom |
| **Mobile Sticky Donate CTA** | Scroll direction detection | Slides up from bottom on scroll-down (300ms spring), hides on scroll-up (200ms ease-in) | Amber background, white text "Destek Ol", subtle pulse every 10s | `position: sticky`, `IntersectionObserver` for scroll direction, respects `prefers-reduced-motion` |

### 6.2 Animal Interactions

| Interaction | Trigger | Animation | Feedback | Technical Notes |
|-------------|---------|-----------|----------|-----------------|
| **Animal Card Hover** | Mouse enter (desktop) | Card lifts with shadow expansion (transform: translateY(-4px), box-shadow increase, 200ms ease) | Status badge pulses once (scale 1.0 → 1.15 → 1.0, 400ms) | Status badges: "Tedavi Altinda" (In Treatment), "Yuva Araniyor" (Seeking Home), "Sahiplendirildi" (Adopted) |
| **Image Gallery** | Swipe (mobile) / Click arrow (desktop) | Slide transition (300ms ease-in-out) with momentum on swipe | Lightbox on tap/click: zoom with pinch support, swipe to navigate, tap backdrop to close | Uses CSS scroll-snap for mobile, lightbox portal for zoom |
| **Filter Toggle** | Click filter tab | Active tab: underline slides from previous to current (250ms spring), content area: crossfade (200ms) | Filter count badge updates with number animation | Filters: Hepsi (All), Kediler (Cats), Kopekler (Dogs), Tedavi Altinda (In Treatment) |

### 6.3 Emergency Interactions

| Interaction | Trigger | Animation | Feedback | Technical Notes |
|-------------|---------|-----------|----------|-----------------|
| **Emergency Progress Bar** | Scroll into viewport | Bar fills from 0% to current amount (800ms ease-out, 200ms delay after entering viewport) | Percentage label counts up in sync with bar fill | `IntersectionObserver` with threshold 0.5, respects `prefers-reduced-motion` (shows static bar) |
| **Urgency Badge Pulse** | Page load (continuous) | Subtle scale pulse (1.0 → 1.08 → 1.0) every 3 seconds | Red glow effect on "ACIL" badges | CSS animation, `animation-play-state: paused` when off-screen |

### 6.4 Navigation & Global Interactions

| Interaction | Trigger | Animation | Feedback | Technical Notes |
|-------------|---------|-----------|----------|-----------------|
| **Language Switcher** | Click/tap toggle | Dropdown slides down (200ms ease), flag icons fade in (staggered 50ms each) | Current language highlighted, flag + language name displayed | Languages: TR (Turkish flag), EN (UK flag). Saves preference to cookie |
| **Share Buttons** | Click share icon | Fan-out animation: buttons spread from center (staggered 50ms, 200ms spring each) | Per-platform actions below | Share targets: Copy Link (clipboard + toast), WhatsApp (pre-filled text + URL), Twitter/X (pre-filled tweet + URL) |
| **Copy Link (Share)** | Click copy icon | Icon morphs from link to checkmark (200ms) | Toast: "Link kopyalandi!" / "Link copied!" | `navigator.clipboard.writeText(window.location.href)` |
| **WhatsApp Share** | Click WhatsApp icon | Standard link open | Opens WhatsApp with pre-filled message: "{Page Title} - {URL}" | `https://wa.me/?text={encoded}` |
| **Twitter Share** | Click Twitter icon | Standard link open | Opens Twitter compose with pre-filled text | `https://twitter.com/intent/tweet?text={encoded}&url={url}` |

### 6.5 Cursor & Ambient Interactions

| Interaction | Trigger | Animation | Feedback | Technical Notes |
|-------------|---------|-----------|----------|-----------------|
| **Custom Paw Cursor** | Mouse move (desktop only) | Custom paw print SVG follows cursor position | Changes to pointer hand on interactive elements (links, buttons, cards) | CSS `cursor: url('paw.svg'), auto`, swap to `pointer` on `[role="button"], a, button`. Desktop-only via `@media (hover: hover)` |
| **Stats Counter** | Scroll into viewport on Home | Numbers count up from 0 to target (1200ms ease-out) | Staggered start for each stat (100ms delay between each) | Counts: animals helped, meals served, emergency cases resolved. Uses `IntersectionObserver` |

### 6.6 Interaction Accessibility Notes

All micro-interactions must respect the following:

- **`prefers-reduced-motion: reduce`** -- Disable all non-essential animations. Progress bars show static fill. Counters show final number immediately. Card hovers apply style change without transform.
- **Focus indicators** -- All interactive elements have visible focus rings (3px Terracotta outline with 2px offset).
- **Screen reader announcements** -- Toast notifications use `role="status"` and `aria-live="polite"`. IBAN copy announces "IBAN copied to clipboard". Share buttons have descriptive `aria-label` values.
- **Touch targets** -- Minimum 44x44px for all tappable elements per WCAG 2.1 AA.

---

## 7. Drop-Off Analysis & Mitigation

### 7.1 Critical Drop-Off Points

| Funnel Stage | Drop-Off Cause | Severity | Mitigation |
|-------------|---------------|----------|------------|
| Social → Landing | Slow page load on mobile | High | Target LCP < 2.5s, optimize hero image (WebP/AVIF, responsive sizes), skeleton loading |
| Landing → Discovery | Home page doesn't communicate purpose | High | Clear hero headline, stats counter, prominent "Hikayem" CTA within viewport |
| Landing → Discovery (EN) | Page loads in Turkish for international visitors | Critical | Browser locale detection, language banner, `hreflang` meta tags |
| Discovery → Trust | Story feels generic or unverifiable | Medium | Real photos, specific dates/locations, embedded social proof |
| Trust → Conversion | No suitable payment method | Critical | Offer IBAN (domestic), PayPal + Wise (international), supply donation (non-monetary) |
| Trust → Conversion | Transparency data not convincing | Medium | Regular updates, receipts/photos, third-party verification links |
| Conversion → Completion | IBAN copy fails on some browsers | Medium | Fallback: display IBAN in selectable text, "Tap and hold to copy" instruction |
| Conversion → Completion | User leaves site to bank app, forgets details | Medium | Persist IBAN in clipboard, show amount suggestion before redirect |
| Completion → Retention | No follow-up after donation | High | Thank-you page with social links, email opt-in, "Follow the impact" blog link |

### 7.2 Mobile-Specific Drop-Off Risks

| Risk | Context | Mitigation |
|------|---------|------------|
| Fat-finger on small buttons | Supply item links, filter tabs | Minimum 44px touch targets, adequate spacing between interactive elements |
| Accidental back navigation | Gallery swipe interpreted as back gesture | Edge swipe detection, confirm-on-back for donate page |
| Keyboard covers form fields | Contact page, custom donation amount | Scroll input into view on focus, use `visualViewport` API |
| Slow connection in rural Hatay | Mehmet's usage context | Service worker caching, compressed images, critical CSS inline |

---

## 8. Retention Loops

### 8.1 Short-Term Retention (1-7 days)

```
Donation Completion
    |
    v
Thank-You Page
    ├──► "Follow us on Instagram" (social follow)
    ├──► "Read our latest update" (blog link)
    └──► "Share your support" (social share with badge)
```

### 8.2 Medium-Term Retention (1-4 weeks)

```
Blog Post Published
    |
    v
Instagram Story/Post linking to blog
    |
    v
Return Visit → Browse updates
    |
    v
See new emergency case or needs list update
    |
    v
Repeat donation or supply order
```

### 8.3 Long-Term Retention (1-6 months)

```
Seasonal Campaign (winter feeding, holiday giving)
    |
    v
Instagram Campaign → Special landing page
    |
    v
Return Visit → Sees impact of previous donation
    |
    v
Increased donation or volunteer sign-up
```

### 8.4 Retention Metrics by Persona

| Persona | Primary Retention Hook | Target Frequency | Success Indicator |
|---------|----------------------|------------------|-------------------|
| **Ayse** | Blog updates on animals she connected with | Monthly | Repeat donation within 90 days |
| **Sarah** | English content updates, annual impact report | Quarterly | Recurring PayPal donation |
| **Mehmet** | Updated needs list shared in WhatsApp groups | Bi-weekly | 3+ supply orders per quarter |
| **Zeynep** | Volunteer experience blog features, certificate | One-time + shares | Refers 2+ classmates |
| **Can** | Shareable content (reels, before/after, milestones) | Weekly engagement | 10+ shares before first donation |

---

## Appendix: Flow Notation Key

| Symbol | Meaning |
|--------|---------|
| `→` | Direct navigation (user clicks/taps) |
| `──►` | Action branch (user chooses one path) |
| `|` | Sequential flow (automatic or expected next step) |
| `v` | Flow continues downward |
| `◄──` | Feedback loop or return path |
