# 02 — Features & User Experience

---

## 2.1 Personas

### Persona 1: Domestic Donor — "Ayse" (28, Istanbul)

- **Profile:** Active on social media, animal lover, has a regular income
- **Motivation:** Wants to help animals in the earthquake zone
- **Behavior:** Arrives at the site from Instagram, reads the story, donates via IBAN
- **Barrier:** Wants to see how the money is being used (transparency)
- **Success:** Feels trust upon seeing the Transparency Corner and becomes a recurring donor

### Persona 2: International Donor — "Sarah" (35, Berlin)

- **Profile:** Has visited Turkey, sensitive to animal rights, English-speaking
- **Motivation:** Wants to support through international platforms (PayPal/Wise)
- **Behavior:** Discovers the site via English content, donates via PayPal/Wise
- **Barrier:** Cannot process IBAN transfers, may face a language barrier
- **Success:** Easily donates through English content + PayPal/Wise

### Persona 3: Food & Supplies Donor — "Mehmet" (45, Hatay)

- **Profile:** Local, cannot send money but can send supplies
- **Motivation:** Wants to help physically
- **Behavior:** Checks the needs list, places an online order
- **Barrier:** Wants to know exactly what is needed
- **Success:** Purchases the right item from the up-to-date needs list

### Persona 4: Volunteer Candidate — "Zeynep" (22, University Student)

- **Profile:** Veterinary student, wants to gain field experience
- **Motivation:** Internship/experience + love for animals
- **Behavior:** Reads the Volunteer page, applies via WhatsApp
- **Barrier:** Wants to clearly know what she will be doing
- **Success:** Sees the volunteer areas, applies easily

### Persona 5: Social Media Explorer — "Can" (20, Student)

- **Profile:** Follows animal content on Instagram, low budget
- **Motivation:** Wants to support by sharing
- **Behavior:** Browses the site, shares content, maybe makes a small donation
- **Barrier:** Cannot make large donations
- **Success:** Content sharing + small donation + volunteer application

---

## 2.2 User Stories

### Epic 1: Donation Experience

| ID     | Story                                                                                                                                    | Priority |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| US-1.1 | As a visitor, I want to easily copy the IBAN details so I can quickly make a donation                                                    | P0       |
| US-1.2 | As an international donor, I want to see PayPal/Wise details so I can make an international transfer                                     | P0       |
| US-1.3 | As a donor, I want to see the tangible impact of donation amounts (50TL = 1 week of pet food), so my motivation increases                | P0       |
| US-1.4 | As a visitor, I want to see IBAN details in the footer of every page so I can donate from any page                                       | P0       |
| US-1.5 | As a donor, I want to learn how I can pay the veterinary clinic directly                                                                 | P1       |
| US-1.6 | As a potential recurring donor, I want to get information about the monthly donation program                                              | P1       |

### Epic 2: Animal Profiles & Discovery

| ID     | Story                                                                                                       | Priority |
| ------ | ----------------------------------------------------------------------------------------------------------- | -------- |
| US-2.1 | As a visitor, I want to filter and view the animals in care by cat/dog                                      | P0       |
| US-2.2 | As a visitor, I want to see a photo gallery, story, and needs on an animal's detail page                    | P0       |
| US-2.3 | As a visitor, I want to see status badges (in treatment / emergency / permanent care) on animals             | P1       |

### Epic 3: Emergency Cases

| ID     | Story                                                                                                       | Priority |
| ------ | ----------------------------------------------------------------------------------------------------------- | -------- |
| US-3.1 | As a visitor, I want to see active emergency cases and a progress bar for each                               | P0       |
| US-3.2 | As a visitor, I want to follow an emergency case's treatment process chronologically                         | P0       |
| US-3.3 | As a visitor, I want to see before/after photos of completed cases                                          | P1       |
| US-3.4 | As a visitor, I want to be redirected to WhatsApp to report an emergency case                                | P1       |

### Epic 4: Transparency & Trust

| ID     | Story                                                                                                                  | Priority |
| ------ | ---------------------------------------------------------------------------------------------------------------------- | -------- |
| US-4.1 | As a donor, I want to see monthly expense reports so I know how my money is being used                                 | P0       |
| US-4.2 | As a donor, I want to see veterinary receipts and pet food invoices                                                    | P0       |
| US-4.3 | As a visitor, I want to see a comparison of total donations vs. total expenditures                                     | P1       |
| US-4.4 | As a donor, I want my name to appear on the donor list if I give permission                                            | P2       |

### Epic 5: Content & Blog

| ID     | Story                                                                                              | Priority |
| ------ | -------------------------------------------------------------------------------------------------- | -------- |
| US-5.1 | As a visitor, I want to filter blog posts by category and date                                     | P1       |
| US-5.2 | As a visitor, I want to share blog posts on social media                                           | P1       |
| US-5.3 | As a visitor, I want to see the live Instagram feed on the site                                    | P1       |

### Epic 6: Volunteering & Contact

| ID     | Story                                                                                                    | Priority |
| ------ | -------------------------------------------------------------------------------------------------------- | -------- |
| US-6.1 | As a volunteer candidate, I want to see the volunteer areas and requirements                              | P0       |
| US-6.2 | As a volunteer candidate, I want to apply via WhatsApp                                                   | P0       |
| US-6.3 | As a visitor, I want to easily access contact information (WhatsApp, phone, email)                        | P0       |

### Epic 7: Food & Supplies Aid

| ID     | Story                                                                                                 | Priority |
| ------ | ----------------------------------------------------------------------------------------------------- | -------- |
| US-7.1 | As a donor, I want to see the current needs list sorted by urgency level                              | P0       |
| US-7.2 | As a donor, I want to learn about the shipping methods                                                | P0       |
| US-7.3 | As a donor, I want to get information about the pet food sponsorship program                          | P1       |

### Epic 8: CMS Management

| ID     | Story                                                                                                          | Priority |
| ------ | -------------------------------------------------------------------------------------------------------------- | -------- |
| US-8.1 | As a site admin, I want to add and update animal profiles through the CMS                                      | P0       |
| US-8.2 | As a site admin, I want to update emergency case information and progress status                                | P0       |
| US-8.3 | As a site admin, I want to upload monthly transparency reports                                                  | P0       |
| US-8.4 | As a site admin, I want to update the needs list                                                                | P0       |
| US-8.5 | As a site admin, I want to write and publish blog posts                                                         | P0       |
| US-8.6 | As a site admin, I want to change general site settings (IBAN, contact info, statistics)                        | P0       |

### Epic 9: Multilingual Support

| ID     | Story                                                                                                              | Priority |
| ------ | ------------------------------------------------------------------------------------------------------------------ | -------- |
| US-9.1 | As an international visitor, I want to view the site in English                                                    | P0       |
| US-9.2 | As a Turkish visitor, I want to view the site in Turkish                                                           | P0       |
| US-9.3 | As a site admin, I want to manage the Turkish and English versions of each content piece from the CMS              | P0       |

### Epic 10: Search & Navigation

| ID      | Story                                                                                                     | Priority |
| ------- | --------------------------------------------------------------------------------------------------------- | -------- |
| US-10.1 | As a visitor, I want to search across the site for animals, blog posts, and emergency cases               | P1       |
| US-10.2 | As a visitor, I want to see my location via breadcrumb navigation on detail pages                          | P1       |
| US-10.3 | As a visitor, I want to be redirected to the home page or popular pages on the 404 page                   | P1       |

---

## 2.3 Acceptance Criteria

### AC-1: IBAN Copy

- [x] IBAN number is copied to clipboard with a single click
- [x] A "Copied!" toast notification is shown after copying
- [x] Footer IBAN is visible on all pages
- [x] Copy functionality works on mobile as well

### AC-2: Animal Cards

- [x] Cat/dog filter works (toggle or tab)
- [x] Each card displays: photo, name, species, age, gender, status badge
- [x] Clicking a card opens the detail page
- [x] Detail page lists photo gallery, story, and needs
- [x] Animals added via CMS automatically appear on the page

### AC-3: Emergency Case Progress

- [x] Progress bar shows collected/target amount
- [x] Percentage calculation works correctly
- [x] Update history appears in chronological order
- [x] Completed cases are moved to the archive section

### AC-4: Transparency Report

- [x] Monthly reports are listed in chronological order
- [x] Each report displays expense items, total donations, and total expenditures
- [x] Document photos (receipts, invoices) enlarge via lightbox
- [x] Donation vs. expenditure comparison is presented visually

### AC-5: Multilingual Support

- [x] Language switcher is visible in the header (TR/EN)
- [x] Page content renders in the selected language
- [x] URL structure includes the language code (/tr/..., /en/...)
- [x] Language versions can be managed for each collection in the CMS
- [x] Default language: Turkish

### AC-6: Responsive Design

- [x] All pages display properly between 320px-1920px
- [x] Hamburger menu works on mobile
- [x] Sticky "Bagis Yap" (Donate) CTA is visible on mobile
- [x] 2-column grid on tablet, 3-4 column grid on desktop
- [x] Custom cursor is active only on desktop, disabled on mobile

### AC-7: Instagram Integration

- [x] Recent posts are fetched via Instagram Basic Display API
- [x] At least 6-9 posts are displayed as a grid
- [x] Each post redirects to Instagram when clicked
- [x] Graceful fallback on API error (static images or hide)

### AC-8: WhatsApp Redirect

- [x] Volunteer application "Apply" button redirects to wa.me link
- [x] Emergency case report redirects to wa.me link
- [x] WhatsApp link includes a pre-filled message
- [x] Opens WhatsApp app on mobile, WhatsApp Web on desktop

### AC-9: SEO & Social Media

- [x] Meta title and description are defined for each page
- [x] Open Graph and Twitter Card meta tags are present
- [x] Sitemap.xml is automatically generated
- [x] Structured data (JSON-LD) is implemented (Organization, Article)
- [x] Alt text is required for all images

### AC-10: Site-Wide Search

- [ ] Search bar is accessible in the header or as a modal
- [ ] Animals, blog posts, and emergency cases are searchable
- [ ] Search results are synchronized with URL state (Nuqs)
- [ ] A user-friendly message is shown when no results are found

---

## 2.4 Non-Goals (Out of Scope)

- Adoption page or functionality
- Online payment integration (iyzico/Stripe) — to be added later
- User accounts / login system (for donors)
- Mobile application (native iOS/Android)
- E-commerce / online store
- Forum or community area
- Live chat (chatbot)
- Automatic donation tracking system (bank integration)
- Direct online payment integration with veterinary clinics
- Animal adoption / rehoming process
- Push notification system

---

## 2.5 User Flows

### Core Design Principle

**"2 clicks to donation"** — A visitor can reach the donation point in at most 2 clicks from any page. IBAN details are always visible in the footer of every page, enabling zero-click donation access from anywhere on the site.

### Journey 1: Emotional Donor Path (Persona 1 — Ayse, Domestic Donor)

**Entry point:** Instagram post or story link

1. **Landing → Home Page** — Sees the emotional hero section with rescue photos and impact statistics
2. **Home → Hikayem (My Story)** — Reads the personal story, builds an emotional connection with the founder
3. **Hikayem → Calismalarimiz (Our Work)** — Sees the daily feeding routines, treatments, and rehabilitation efforts
4. **Calismalarimiz → Seffaflik Kosesi (Transparency Corner)** — Reviews monthly expense reports, veterinary receipts, and donation vs. expenditure comparisons to build trust
5. **Seffaflik Kosesi → Destek Ol (Donate)** — Copies IBAN, makes a bank transfer
6. **Conversion:** Becomes a recurring monthly donor

**Shortcut:** From any page → Footer IBAN → Copy → Donate immediately

### Journey 2: International Donor Path (Persona 2 — Sarah, International Donor)

**Entry point:** Google search or shared link (English content)

1. **Landing → Home Page (EN)** — Switches to English via language toggle, sees the mission overview
2. **Home → Destek Ol (Donate)** — Finds PayPal/Wise details alongside IBAN, sees donation impact cards (50TL = 1 week of pet food)
3. **Conversion:** Sends donation via PayPal or Wise

**Shortcut:** Home → Donate page directly (2 clicks to conversion)

### Journey 3: Supplies Donor Path (Persona 3 — Mehmet, Local Supporter)

**Entry point:** Direct link or word of mouth

1. **Landing → Home Page** — Sees the "urgent needs" highlight section
2. **Home → Mama & Malzeme (Food & Supplies)** — Views the current needs list sorted by urgency, sees accepted items and shipping methods
3. **Conversion:** Places an online order for needed items from the listed links

### Journey 4: Volunteer Path (Persona 4 — Zeynep, Volunteer Candidate)

**Entry point:** University bulletin board or social media

1. **Landing → Home Page** — Reads about the mission and ongoing work
2. **Home → Gonullu Ol (Volunteer)** — Sees volunteer areas (foster care, health support, feeding), requirements, and FAQ
3. **Gonullu Ol → WhatsApp** — Clicks "Apply" button, which opens WhatsApp with a pre-filled application message
4. **Conversion:** Submits volunteer application via WhatsApp

### Journey 5: Social Media Explorer Path (Persona 5 — Can, Student)

**Entry point:** Instagram explore page

1. **Landing → Home Page** — Browses rescue stories and animal cards
2. **Home → Canlarimiz (Our Animals)** — Filters by cat/dog, reads individual animal stories
3. **Canlarimiz → Acil Vakalar (Emergency Cases)** — Sees active emergency cases with progress bars
4. **Conversion (low-barrier):** Shares content on social media, makes a small donation via footer IBAN, or submits a volunteer application

### Journey 6: Emergency Case Awareness Path

**Entry point:** Shared emergency case link on social media

1. **Landing → Acil Vakalar (Emergency Cases)** — Sees the specific emergency case with photos, treatment timeline, and funding progress bar
2. **Acil Vakalar → Destek Ol (Donate)** — Motivated by urgency, navigates to donation page
3. **Conversion:** Copies IBAN and donates immediately

**Shortcut:** Emergency case page → Footer IBAN → Donate (1 click)

### Journey 7: Search-Driven Discovery Path

**Entry point:** Any page on the site

1. **Any page → Search (header)** — Opens search modal, types animal name or keyword
2. **Search results → Detail page** — Clicks on an animal, blog post, or emergency case result
3. **Detail page → Destek Ol (Donate)** — CTA on detail page or footer IBAN leads to donation
4. **Conversion:** Donates after finding specific content of interest
