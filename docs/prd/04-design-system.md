# 04 — Design System

---

## 4.1 Color Palette

| Role       | Color           | HEX     |
| ---------- | --------------- | ------- |
| Primary    | Warm Amber      | #F59E0B |
| Secondary  | Soft Sage Green | #86EFAC |
| Accent/CTA | Terracotta      | #C2410C |
| Background | Warm Off-White  | #FFFBEB |
| Text       | Charcoal        | #1C1917 |
| Muted      | Warm Gray       | #A8A29E |
| Danger     | Red             | #DC2626 |
| Success    | Green           | #16A34A |

---

## 4.2 Typography

| Usage         | Font              | Weight                      |
| ------------- | ----------------- | --------------------------- |
| Headings      | Plus Jakarta Sans | Bold (700)                  |
| Body          | Inter             | Regular (400), Medium (500) |
| Accent/Quote  | Caveat            | Regular (400)               |

All fonts are self-hosted via `next/font` (no external requests).

---

## 4.3 UI Principles

- **Border radius:** 16px-24px (rounded corners)
- **Shadows:** Soft shadows in warm tones
- **Section dividers:** Organic blob shapes (SVG)
- **Decorative element:** Paw print motif
- **Micro-interactions:** Hover scale-up, shadow increase
- **Custom cursor:** Paw print (desktop only, using `pointer-events` and `cursor: none`)
- **Cards:** Warm-toned border, elevated shadow effect on hover
- **CTA Buttons:** Terracotta background, white text, darken on hover

---

## 4.4 Animation Strategy

| Library | Usage Area                                                             |
| ------- | ---------------------------------------------------------------------- |
| Motion  | General UI animations (hover, enter/exit, layout transitions)          |
| GSAP    | Scroll-triggered animations, timeline, parallax effects                |

### Principles

- Animations respect the `prefers-reduced-motion` media query
- Only hero and above-the-fold animations play on initial load
- Scroll animations are triggered via `IntersectionObserver` (GSAP ScrollTrigger)
- Animation durations range between 200-500ms (for a snappy feel)

---

## 4.5 Spacing Scale

Base unit: **4px**

| Token  | Value | Usage                                      |
| ------ | ----- | ------------------------------------------ |
| `xs`   | 4px   | Tight gaps (icon padding, badge padding)   |
| `sm`   | 8px   | Inline spacing, small gaps                 |
| `md`   | 12px  | Form field padding, card inner spacing     |
| `base` | 16px  | Default component padding, paragraph gap   |
| `lg`   | 24px  | Card padding, section inner spacing        |
| `xl`   | 32px  | Section gaps, card grid gap                |
| `2xl`  | 48px  | Major section separation                   |
| `3xl`  | 64px  | Page section padding (vertical)            |
| `4xl`  | 96px  | Hero section padding, page top/bottom      |

---

## 4.6 Icon System

**Library:** Lucide Icons (via shadcn/ui)

| Category   | Icons                                                                 |
| ---------- | --------------------------------------------------------------------- |
| Navigation | `Menu`, `X`, `ChevronRight`, `ChevronLeft`, `Search`, `ArrowUp`      |
| Social     | `Instagram`, `Phone`, `Mail`, `ExternalLink`                          |
| Status     | `Heart`, `AlertTriangle`, `CheckCircle`, `Clock`, `Shield`            |
| Action     | `Copy`, `Share2`, `Download`, `Filter`, `SlidersHorizontal`           |
| Content    | `PawPrint`, `Calendar`, `Tag`, `FileText`, `Image`                    |
| Donation   | `Banknote`, `CreditCard`, `HandHeart`, `TrendingUp`                   |

### Principles

- Icon size: 16px (inline), 20px (buttons), 24px (navigation)
- Icons always paired with `aria-label` or adjacent text for accessibility
- Consistent stroke width (2px default from Lucide)

---

## 4.7 Component Variants

### Button Variants

| Variant     | Background   | Text    | Border          | Usage                                   |
| ----------- | ------------ | ------- | --------------- | --------------------------------------- |
| `primary`   | Terracotta   | White   | None            | Main CTAs: "Bagis Yap" (Donate), Apply  |
| `secondary` | Transparent  | Amber   | 1px Amber       | Secondary actions: Learn More, Filter   |
| `ghost`     | Transparent  | Charcoal| None            | Tertiary actions: navigation, links     |
| `danger`    | Red          | White   | None            | Destructive actions, emergency alerts   |

All buttons: `border-radius: 16px`, padding `12px 24px`, hover state with slight darken + scale(1.02).

### Card Variants

| Variant       | Border         | Shadow        | Hover Effect                  | Usage                            |
| ------------- | -------------- | ------------- | ----------------------------- | -------------------------------- |
| `default`     | 1px warm gray  | sm            | Shadow increase               | Blog cards, report cards         |
| `interactive` | 1px warm gray  | sm            | Shadow lg + translateY(-2px)  | Animal cards, emergency cases    |
| `featured`    | 2px amber      | md            | Amber glow + scale(1.01)      | Featured animals, active cases   |

### Badge Variants

| Variant    | Style                          | Usage                                       |
| ---------- | ------------------------------ | ------------------------------------------- |
| `status`   | Rounded pill, colored bg       | Animal status: "Tedavide" (In Treatment), "Acil" (Emergency), "Kalici Bakim" (Permanent Care) |
| `category` | Rounded pill, muted bg         | Blog categories, volunteer areas             |
| `priority` | Rounded pill, urgency-colored  | Needs list urgency: high (red), medium (amber), low (green) |

---

## 4.8 Responsive Strategy

| Breakpoint | Width      | Behavior                                        |
| ---------- | ---------- | ----------------------------------------------- |
| Mobile     | < 640px    | Single column, hamburger menu, sticky CTA       |
| Tablet     | 640-1024px | 2-column grid, condensed navigation             |
| Desktop    | > 1024px   | 3-4 column grid, full navigation, custom cursor |

- All pages display properly between 320px-1920px
- Hamburger menu works on mobile
- Sticky "Bagis Yap" (Donate) CTA is visible on mobile
- Custom cursor is active only on desktop, disabled on mobile

### Responsive Breakpoint Details for Key Components

**Animal Card Grid**

| Breakpoint          | Columns | Card Size    | Gap   |
| ------------------- | ------- | ------------ | ----- |
| Mobile (< 640px)    | 1       | Full width   | 16px  |
| Tablet (640-1024px) | 2       | 1/2 width    | 24px  |
| Desktop (1024-1280px)| 3      | 1/3 width    | 24px  |
| Wide (> 1280px)     | 4       | 1/4 width    | 32px  |

**Navigation**

| Breakpoint          | Behavior                                                              |
| ------------------- | --------------------------------------------------------------------- |
| Mobile (< 640px)    | Hamburger icon → full-screen overlay menu, logo centered              |
| Tablet (640-1024px) | Hamburger icon → slide-in drawer menu, logo left-aligned              |
| Desktop (> 1024px)  | Fully expanded horizontal nav, logo left, "Bagis Yap" CTA right      |

**Hero Section**

| Breakpoint          | Layout                                                                |
| ------------------- | --------------------------------------------------------------------- |
| Mobile (< 640px)    | Stacked: image on top, text below, single CTA button full-width      |
| Tablet (640-1024px) | Stacked: image on top, text below, two CTA buttons side by side      |
| Desktop (> 1024px)  | Side-by-side: text left (60%), image right (40%), two CTA buttons    |

---

## 4.9 Accessibility (WCAG 2.1 AA)

### Target

Full compliance with WCAG 2.1 AA standards.

### Requirements

| Area                 | Requirement                                                     |
| -------------------- | --------------------------------------------------------------- |
| Keyboard Navigation  | All interactive elements are reachable via tab                  |
| Screen Reader        | All visual elements have `aria-label` and semantic HTML         |
| Color Contrast       | Minimum 4.5:1 (normal text), 3:1 (large text / UI)             |
| Focus Visible        | Visible focus ring on all focusable elements                    |
| Skip to Content      | "Skip to content" link at the top of each page                  |
| Alt Text             | Required alt text for all images (Media collection)             |
| Form Labels          | Associated labels for all form fields                           |
| Error Announcements  | Form errors announced to screen readers via `aria-live`         |
| Language             | Dynamic `<html lang="tr">` or `<html lang="en">`               |
| Motion               | Respects `prefers-reduced-motion` media query                   |

### Testing Tools

- Lighthouse Accessibility score: 90+ target
- Manual testing with axe DevTools
