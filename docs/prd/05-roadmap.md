# 05 — Roadmap & Risks

---

## 5.1 Risks

| Risk                                                       | Impact | Likelihood | Mitigation Strategy                                            |
| ---------------------------------------------------------- | ------ | ---------- | -------------------------------------------------------------- |
| Instagram API token expiration                             | Medium | High       | Automatic token renewal mechanism + fallback images            |
| Instagram Basic Display API deprecation                    | High   | Medium     | Migration plan to Instagram Graph API kept ready               |
| CMS content management difficulty (requires technical knowledge) | Medium | Medium | Simple and clear admin panel design, usage guide               |
| Performance degradation from high image traffic            | Medium | Low        | Image optimization, CDN, lazy loading, size limits             |
| Translation inconsistency (TR/EN)                          | Low    | High       | Required field validation via next-intl + PayloadCMS i18n      |
| Exceeding Vercel free plan limits                          | Medium | Medium     | Usage monitoring, upgrade to Pro plan if needed                |
| PostgreSQL external service outage                         | High   | Low        | Neon serverless — auto-scaling + backups                       |
| WhatsApp message spam                                      | Low    | Low        | Rate limiting warning, add CAPTCHA (if needed)                 |
| SEO indexing delay                                         | Low    | Medium     | Sitemap submission, active Google Search Console usage         |
| Low donation conversion rate                               | High   | Medium     | CTA optimization via A/B testing, user feedback                |

---

## 5.2 Technical Debt & Future Improvements

| Feature                                                    | Priority | Timeframe |
| ---------------------------------------------------------- | -------- | --------- |
| ~~Admin dashboard (analytics, summary statistics)~~        | ~~Medium~~ | Done ✅ |
| Animal adoption module                                     | Low      | Phase 3+  |
| Post-association legal compliance transition               | High     | Phase 3   |

---

## 5.3 Roadmap

### Phase 1: Launch (MVP) — Target: 6-8 Weeks

**Weeks 1-2: Core Infrastructure**

- [x] Next.js + PayloadCMS 3.x project setup (pnpm)
- [x] PostgreSQL connection (Neon)
- [x] Tailwind CSS + shadcn/ui configuration
- [x] ESLint configuration
- [x] PayloadCMS collection and global definitions
- [x] next-intl configuration (TR/EN)
- [x] Modular directory structure creation

**Weeks 3-4: Layout & Core Pages**

- [x] Header (navigation, language switcher, search modal, Donate CTA)
- [x] Footer (IBAN, social media, quick links)
- [x] Home Page (hero, statistics, sections, scroll animations)
- [x] Hikayem (My Story) page
- [x] Destek Ol (Donate) page (IBAN copy, donation cards)
- [x] Iletisim (Contact) page
- [x] Custom 404 & error pages

**Weeks 5-6: Content Pages**

- [x] Canlarimiz (Our Animals) — animal cards, filter, detail, breadcrumb
- [x] Acil Vakalar (Emergency Cases) — case cards, progress bar, update history
- [x] Calismalarimiz (Our Work)
- [x] Mama & Malzeme Yardimi (Food & Supplies Aid)
- [x] Seffaflik Kosesi (Transparency Corner)
- [x] Gunluk / Blog (Journal) — list + detail, tag filter
- [x] Site-wide search (SearchModal with Cmd+K)

**Weeks 7-8: Final Pages & Polish**

- [x] Gonullu Ol (Volunteer)
- [x] Gelecek Vizyonu (Future Vision)
- [x] Instagram placeholder (no API token)
- [x] Custom cursor (paw print, desktop only)
- [x] Scroll animations (Motion / Framer Motion)
- [x] SEO (dynamic sitemap, robots.ts, JSON-LD helpers)
- [x] Breadcrumb navigation (animal, case, blog detail pages)
- [x] Accessibility improvements (skip nav, focus, ARIA)
- [x] Performance optimization (font preloading, CSS purge)

### Phase 2: Growth — 1-3 Months After Launch

- [x] Admin dashboard enhancements (custom widgets, quick actions, recent activity)
- [ ] Uploading real images to CMS
- [ ] UI improvements based on user feedback

### Phase 3: Maturity — 3-6 Months After Launch

- [ ] Post-association (dernek) legal compliance

---

## 5.4 Page Details Reference

### Page 1 — Home Page

**Sections:** Hero (large image, heading, 2 CTAs), Introduction text, Statistics counters, Current work summary, Emergency cases (from CMS), Latest rescue story (before/after), Support redirect cards, Instagram feed (live API), Photo gallery/slider, Introduction video

### Page 2 — Hikayem (My Story)

**Sections:** Personal introduction, Earthquake story, Daily routine timeline, Why I created this site, Introduction video area, My goals

### Page 3 — Calismalarimiz (Our Work)

**Sections:** Daily feeding (~100 cats/dogs) + gallery, Treatment/rehabilitation, Spaying/neutering, Emergency intervention, Vaccination, Shelter/kennel building (photo gallery in each section)

### Page 4 — Canlarimiz (Our Animals)

**Sections:** Cat/dog filter, Animal card grid (from CMS), Each card: photo, name, species, age, gender, status badge, Detail: photo gallery, profile, story, needs, Breadcrumb navigation

### Page 5 — Destek Ol (Donate)

**Sections:** Support & transparency text, IBAN + copy, International options (PayPal/Wise), Veterinary clinic information, Donation amount cards (50TL = 1 week of pet food, 100TL = 1 vaccination, 300TL = 1 spay/neuter), Recurring donation program, Transparency note + link, FAQ accordion

### Page 6 — Mama & Malzeme Yardimi (Food & Supplies Aid)

**Sections:** Introduction text, Needs list table (from CMS), Shipping methods, Not accepted items list, Most needed items highlight, Pet food sponsorship program

### Page 7 — Acil Vakalar (Emergency Cases)

**Sections:** Active cases (from CMS), Case cards (photo, status, target, collected, progress bar), Update history (chronological), Completed archive (before/after), WhatsApp emergency case report, Breadcrumb navigation

### Page 8 — Seffaflik Kosesi (Transparency Corner)

**Sections:** Monthly expense report (from CMS), Veterinary receipts/invoices, Pet food receipts, Donation vs. expenditure comparison, Monthly report archive, Donor list (with permission), Photo activity posts

### Page 9 — Gunluk (Blog/Journal)

**Sections:** Blog list, Category + date + tag filter, Blog cards (cover, title, date, category, summary), Blog detail (cover, date, category, tags, rich text, social sharing), Breadcrumb navigation

### Page 10 — Gonullu Ol (Volunteer)

**Sections:** Volunteer area cards (foster, health, feeding), Requirements, FAQ accordion, Volunteer statistics, WhatsApp application redirect

### Page 11 — Gelecek Vizyonu (Future Vision)

**Sections:** Association (dernek) founding goal, Short-term goals (1 year), Long-term goals (3-5 years), Growing the volunteer network, Call for support

### Page 12 — Iletisim (Contact)

**Sections:** WhatsApp (wa.me link), Phone, Email, Social media links
