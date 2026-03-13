# 04 — Design System

> **Mint System** — Brutalist/typographic design language adopted March 2026, replacing the original "Warm & Organic" system.

---

## 4.1 Color Palette

All colors are defined as oklch tokens in `src/app/(frontend)/globals.css`.

| Role        | Token              | oklch Value           | Approx. HEX |
| ----------- | ------------------ | --------------------- | ------------ |
| Background  | `--background`     | `oklch(1 0 0)`       | #FFFFFF      |
| Foreground  | `--foreground`     | `oklch(0 0 0)`       | #000000      |
| Accent      | `--accent`         | `oklch(0.82 0.08 155)` | #A8D5BA (mint) |
| Destructive | `--destructive`    | `oklch(0.63 0.29 29)` | #FF0000      |
| Muted       | `--muted`          | `oklch(0.97 0 0)`    | #F5F5F5      |
| Border      | `--border`         | `oklch(0 0 0)`       | #000000      |
| Primary     | `--primary`        | `oklch(0 0 0)`       | #000000      |
| Secondary   | `--secondary`      | `oklch(0.82 0.08 155)` | #A8D5BA      |

Additional semantic tokens: `--success` (mint), `--warning` (oklch yellow), `--error` (destructive).

**Key constraints:**
- `--radius: 0px` — zero border radius everywhere
- No dark mode
- No shadows, no gradients
- 1px black borders for grid lines and panels

---

## 4.2 Typography

| Usage    | Font          | Weight                       | CSS Variable      |
| -------- | ------------- | ---------------------------- | ------------------ |
| Headings | Inter         | 400, 500, 900 (Black)       | `--font-heading`   |
| Body     | Inter         | 400 (Regular), 500 (Medium) | `--font-body`      |
| Mono/UI  | Space Grotesk | 400 (Regular), 700 (Bold)   | `--font-mono`      |

All fonts are self-hosted via `next/font` (no external requests). All headings are uppercase.

### Typography Utility Classes

| Class     | Size                       | Weight | Line Height | Notes                      |
| --------- | -------------------------- | ------ | ----------- | -------------------------- |
| `.t-mega` | `clamp(3rem, 8vw, 7rem)`  | 900    | 0.9         | Hero headlines, uppercase  |
| `.t-h1`   | `clamp(1.75rem, 4vw, 3rem)` | 900  | 1.0         | Page titles, uppercase     |
| `.t-h2`   | `clamp(1.25rem, 2.5vw, 1.75rem)` | 900 | 1.1     | Section titles, uppercase  |
| `.t-body` | `1rem`                     | 400    | 1.6         | Body text                  |
| `.t-meta` | `0.8125rem`                | 400    | 1.4         | Mono font, labels, captions |

---

## 4.3 UI Principles

- **Border radius:** 0px everywhere (no rounding)
- **Shadows:** None — flat surfaces only
- **Gradients:** None
- **Grid lines:** 1px black lines between cells (achieved via `gap: 1px; background: var(--foreground)`)
- **Panels:** `.panel` class — white background, 1.5rem padding, no borders
- **System wrapper:** `.sys-wrap` — vertical stack with 1px gap, black border, black background (shows through gaps as grid lines)
- **Photo treatment:** `.photo-sys` — grayscale by default, full color on hover (transition 0.3s)
- **Tables:** `.sys-table` — monospace font, 1px borders, uppercase headers, mint hover
- **Micro-interactions:** Minimal — background color transitions (0.15s), no scale/shadow animations

---

## 4.4 Animation Strategy

| Library          | Usage Area                                                        |
| ---------------- | ----------------------------------------------------------------- |
| GSAP (primary)   | Header edge-detection hover, menus, text animations, count-up     |
| motion (secondary) | General UI animations (hover, enter/exit) where GSAP is overkill |

### GSAP Animation Components

| Component       | File                              | Description                                |
| --------------- | --------------------------------- | ------------------------------------------ |
| FlowingMenu     | `src/components/FlowingMenu.tsx`  | Desktop fullscreen menu with image reveals  |
| StaggeredMenu   | `src/components/StaggeredMenu.tsx`| Mobile fullscreen menu with colored pre-layers, staggered item animation |
| BlurText        | `src/components/BlurText.tsx`     | Text fade-in with blur effect              |
| CountUp         | `src/components/CountUp.tsx`      | Animated number counter (scroll-triggered) |
| RotatingText    | `src/components/RotatingText.tsx` | Text rotation animation                    |
| SplitText       | `src/components/SplitText.tsx`    | Character/word split animation             |

### Removed Components
- **ScrollReveal** — removed in Mint System redesign (no scroll-triggered fade-ins)
- **PawCursor** — removed in Mint System redesign (no custom cursor)

### Principles

- Animations respect the `prefers-reduced-motion` media query
- Header nav cells use GSAP edge-detection (`findClosestEdge4`) for directional hover fills
- Animation durations: 200-500ms for UI, up to 1s for menu transitions
- No parallax effects

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

### Container Breakpoints

| Breakpoint | Width    |
| ---------- | -------- |
| `sm`       | 40rem    |
| `md`       | 48rem    |
| `lg`       | 64rem    |
| `xl`       | 80rem    |
| `2xl`      | 86rem    |

Container uses `width: 100%; margin-inline: auto; padding-inline: 1rem` (2rem from `md`).

---

## 4.6 Icon System

**Library:** Lucide Icons (via shadcn/ui)

| Category   | Icons                                                                 |
| ---------- | --------------------------------------------------------------------- |
| Navigation | `Menu`, `X`, `ChevronRight`, `ChevronLeft`, `Search`, `ArrowUp`      |
| Social     | `Instagram`, `Phone`, `Mail`, `ExternalLink`, `MessageCircle`         |
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

### Button: `.btn-cta`

| Property    | Value                                    |
| ----------- | ---------------------------------------- |
| Background  | `var(--accent)` (mint)                   |
| Text        | `var(--foreground)` (black)              |
| Border      | `1px solid var(--border)` (black)        |
| Font        | Mono, 700, 0.875rem, uppercase           |
| Padding     | `0.75rem 1.5rem`                         |
| Hover       | `color-mix(in oklch, accent 80%, foreground)` |
| Radius      | 0px                                      |

Additional button variant: `.btn-donate-cta` — full-width, 2px black border, black-on-white, inverts on hover.

### Card: `.panel`

| Property    | Value                    |
| ----------- | ------------------------ |
| Background  | `var(--background)` (white) |
| Padding     | 1.5rem                   |
| Border      | None (grid lines via parent `gap: 1px`) |
| Shadow      | None                     |
| Radius      | 0px                      |

### Badge: `.badge-sys`

| Property    | Value                                    |
| ----------- | ---------------------------------------- |
| Border      | `1px solid var(--border)`                |
| Font        | Mono, 700, 0.75rem, uppercase            |
| Padding     | `0.25rem 0.75rem`                        |
| Background  | `var(--background)` (white)              |

**Badge variants:**
- `.badge-sys.mint` — mint background
- `.badge-sys.critical` — red background, white text, red border
- `.badge-sys-dark` — for dark backgrounds, white text, semi-transparent border

### Grid Utilities

| Class   | Columns | Notes                              |
| ------- | ------- | ---------------------------------- |
| `.g-1`  | 1       | Responsive-variant-ready (`md:g-4`) |
| `.g-2`  | 2       | 1px gap with black background      |
| `.g-3`  | 3       |                                    |
| `.g-4`  | 4       |                                    |
| `.g-5`  | 5       |                                    |
| `.g-6`  | 6       |                                    |
| `.g-8`  | 8       | Used by desktop header nav         |

### Ticker

- `.ticker-wrap` — black background, white text, top/bottom borders
- `.ticker-track` — flex, gap 3rem, infinite horizontal scroll (30s linear)

---

## 4.8 Responsive Strategy

| Breakpoint | Width      | Behavior                                           |
| ---------- | ---------- | -------------------------------------------------- |
| Mobile     | < 640px    | Single column, hamburger menu, sticky donate CTA   |
| Tablet     | 640-1024px | 2-column grid, condensed navigation                |
| Desktop    | > 1024px   | Multi-column grid, full 8-col header nav           |

### Navigation (Desktop)

8-column CSS grid with GSAP edge-detection hover fills:
- Brand cell + 4 nav link cells + lang/search cell + `.btn-cta` donate + hamburger
- Hamburger opens `FlowingMenu` (fullscreen with image reveals)

### Navigation (Mobile)

Simple bar: brand left, search + hamburger right.
- Hamburger opens `StaggeredMenu` (GSAP fullscreen overlay with colored pre-layers, staggered item animations)

### Hero Section

| Breakpoint  | Layout                                                                |
| ----------- | --------------------------------------------------------------------- |
| Mobile      | Stacked: headline + urgent badge above, photos below                  |
| Desktop     | Editorial split-panel: text left, photos right, `.t-mega` headline    |

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

---

## 4.10 Transition Note

The original "Warm & Organic" design system (Amber/Sage Green/Terracotta palette, Plus Jakarta Sans/Inter/Caveat fonts, rounded corners, shadows, PawCursor, ScrollReveal) was fully replaced by the **Mint System** in March 2026.

Key changes:
- Colors: Warm Amber/Terracotta → Black/White/Mint
- Typography: Plus Jakarta Sans/Caveat → Inter (all weights) + Space Grotesk
- UI: Rounded corners/shadows/blobs → 0px radius, 1px grid lines, flat panels
- Animations: Motion (Framer Motion) primary → GSAP primary (header, menus, text)
- Removed: Custom paw cursor, scroll reveal animations, organic blob shapes, dark mode consideration
