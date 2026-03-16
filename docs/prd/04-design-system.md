# 04 — Design System

> **Vivid Brutalist** — Warm playful brutalist design language adopted March 2026, replacing the original "Warm & Organic" system and its intermediate "Mint System" iteration.

---

## 4.1 Color Palette

All colors are defined as CSS custom properties in `src/app/(frontend)/globals.css`.

### Core Palette

| Role        | Token              | HEX Value   | Tailwind Class     |
| ----------- | ------------------ | ----------- | ------------------ |
| Background  | `--palette-cream`  | #F4F1EA     | `bg-palette-cream` |
| Foreground  | `--palette-black`  | #111111     | `bg-palette-black` |
| Red         | `--palette-red`    | #EF303B     | `bg-palette-red`   |
| Blue        | `--palette-blue`   | #4A46E4     | `bg-palette-blue`  |
| Yellow      | `--palette-yellow` | #F5B62A     | `bg-palette-yellow`|
| Orange      | `--palette-orange` | #F26E41     | `bg-palette-orange`|
| Lilac       | `--palette-lilac`  | #9E74F9     | `bg-palette-lilac` |
| Teal        | `--palette-teal`   | #2D936C     | `bg-palette-teal`  |
| Coral       | `--palette-coral`  | #FF6B6B     | `bg-palette-coral` |
| Forest      | `--palette-forest` | #0F5257     | `bg-palette-forest`|
| Dark Cream  | `--palette-dark-cream` | #C9C4B8 | `bg-palette-dark-cream` |
| Warm Gray   | `--palette-warm-gray`  | #A39E93 | `bg-palette-warm-gray`  |

### Semantic Tokens

| Token          | Maps To | Purpose                  | Tailwind Class  |
| -------------- | ------- | ------------------------ | --------------- |
| `--cta`        | Red     | Call-to-action, donate   | `bg-cta`        |
| `--stats`      | Blue    | Statistics, numbers      | `bg-stats`      |
| `--emergency`  | Yellow  | Emergency cases          | `bg-emergency`  |
| `--adoption`   | Orange  | Adoption, animal status  | `bg-adoption`   |
| `--trust`      | Lilac   | Trust, transparency      | `bg-trust`      |
| `--health`     | Teal    | Health, veterinary       | `bg-health`     |
| `--warm`       | Coral   | Warm accents             | `bg-warm`       |

**Key constraints:**
- `--radius: 0px` — zero border radius everywhere
- No dark mode
- No shadows, no gradients
- **1.5px** black borders for grid lines and panels
- Cream background (#F4F1EA) as primary surface

---

## 4.2 Typography

| Usage    | Font           | Weight              | CSS Variable      |
| -------- | -------------- | ------------------- | ------------------ |
| Headings | Archivo Black  | 400                 | `--font-heading`   |
| Body/Mono| Space Mono     | 400 (Regular), 700 (Bold) | `--font-mono` |

All fonts are self-hosted via `next/font` (no external requests). All headings are uppercase.

### Typography Utility Classes

| Class       | Size                             | Weight | Line Height | Notes                       |
| ----------- | -------------------------------- | ------ | ----------- | --------------------------- |
| `.t-mega`   | `clamp(3rem, 8vw, 7rem)`        | 400    | 0.9         | Hero headlines, uppercase   |
| `.t-h1`     | `clamp(1.75rem, 4vw, 3rem)`     | 400    | 1.0         | Page titles, uppercase      |
| `.t-h2`     | `clamp(1.25rem, 2.5vw, 1.75rem)`| 400    | 1.1         | Section titles, uppercase   |
| `.t-body`   | `1rem`                           | 400    | 1.6         | Body text (Space Mono)      |
| `.t-meta`   | `0.8125rem`                      | 400    | 1.4         | Mono font, labels, captions |
| `.t-outline`| Variable                         | 400    | —           | Outlined/stroke text effect |
| `.t-comment`| `0.75rem`                        | 400    | 1.4         | Small annotations           |

---

## 4.3 UI Principles

- **Border radius:** 0px everywhere (no rounding)
- **Shadows:** None — flat surfaces only
- **Gradients:** None
- **Grid lines:** **1.5px** black lines between cells (achieved via `gap: 1.5px; background: var(--palette-black)`)
- **Panels:** `.panel` class — cream background, 1.5rem padding, no borders
- **System wrapper:** `.sys-wrap` — vertical stack with 1.5px gap, black border, black background (shows through gaps as grid lines)
- **Photo treatment:** `.photo-sys` — **full color always** (no grayscale filter)
- **Pill cards:** `.pill-card` — rounded pill-shaped cards for compact content display
- **Tables:** `.sys-table` — monospace font, 1.5px borders, uppercase headers
- **Micro-interactions:** Background color transitions (0.15s), GSAP-driven animations for scroll and hover effects

---

## 4.4 Animation Strategy

| Library          | Usage Area                                                             |
| ---------------- | ---------------------------------------------------------------------- |
| GSAP (primary)   | Header edge-detection hover, menus, text animations, count-up, scroll  |
| motion (secondary) | General UI animations (hover, enter/exit) where GSAP is overkill     |
| OGL              | WebGL-based circular gallery                                           |

### GSAP Animation Components

| Component            | File                                    | Description                                         |
| -------------------- | --------------------------------------- | --------------------------------------------------- |
| FlowingMenu          | `src/components/fancy/FlowingMenu.tsx`  | Desktop fullscreen menu with image reveals           |
| StaggeredMenu        | `src/components/fancy/StaggeredMenu.tsx` | Mobile fullscreen menu with colored pre-layers      |
| BlurText             | `src/components/fancy/BlurText.tsx`     | Text fade-in with blur effect                       |
| CountUp              | `src/components/fancy/CountUp.tsx`      | Animated number counter (scroll-triggered)           |
| RotatingText         | `src/components/fancy/RotatingText.tsx` | Text rotation animation                             |
| SplitText            | `src/components/fancy/SplitText.tsx`    | Character/word split animation                      |
| ScrollVelocity       | `src/components/fancy/ScrollVelocity.tsx`| Velocity-based scroll text animation               |
| CircularGallery      | `src/components/fancy/CircularGallery.tsx`| 3D gallery using OGL/WebGL                        |

### Homepage Animation Components

| Component            | File                                           | Description                               |
| -------------------- | ---------------------------------------------- | ----------------------------------------- |
| AnimatedMegaHeading  | `src/components/home/AnimatedMegaHeading.tsx`  | GSAP-animated hero heading                |
| AnimatedSectionHeader| `src/components/home/AnimatedSectionHeader.tsx`| Scroll-triggered section headers          |
| SectionDividerBand   | `src/components/home/SectionDividerBand.tsx`   | Infinite scroll text divider              |
| BlogCardsBento       | `src/components/home/BlogCardsBento.tsx`       | Bento grid blog layout with GSAP ScrollTrigger |
| FeaturedAnimals      | `src/components/home/FeaturedAnimals.tsx`      | Featured animal cards with animations     |

### Removed Components
- **ScrollReveal** — removed in redesign (no scroll-triggered fade-ins)
- **PawCursor** — removed in redesign (no custom cursor)

### Principles

- Animations respect the `prefers-reduced-motion` media query
- Header nav cells use GSAP edge-detection (`findClosestEdge4`) for directional hover fills
- Animation durations: 200-500ms for UI, up to 1s for menu transitions
- Parallax effects used in featured blog card and hero sections

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
| Background  | `var(--cta)` (red #EF303B)               |
| Text        | white                                    |
| Border      | `1.5px solid var(--palette-black)`       |
| Font        | Mono, 700, 0.875rem, uppercase           |
| Padding     | `0.75rem 1.5rem`                         |
| Hover       | Darkened red                             |
| Radius      | 0px                                      |

Additional button variants:
- `.btn-donate-cta` — full-width, 2px black border, inverts on hover
- `.btn-health` — teal background, health-related actions

### Card: `.panel`

| Property    | Value                    |
| ----------- | ------------------------ |
| Background  | `var(--palette-cream)`   |
| Padding     | 1.5rem                   |
| Border      | None (grid lines via parent `gap: 1.5px`) |
| Shadow      | None                     |
| Radius      | 0px                      |

### Card: `.pill-card`

| Property    | Value                    |
| ----------- | ------------------------ |
| Background  | Variable (semantic color)|
| Padding     | 1rem 1.5rem              |
| Border      | 1.5px solid black        |
| Radius      | 0px                      |

### Badge: `.badge-sys`

| Property    | Value                                    |
| ----------- | ---------------------------------------- |
| Border      | `1.5px solid var(--palette-black)`       |
| Font        | Mono, 700, 0.75rem, uppercase            |
| Padding     | `0.25rem 0.75rem`                        |
| Background  | `var(--palette-cream)`                   |

**Badge variants:**
- `.badge-sys.cta` — red background (CTA/urgent)
- `.badge-sys.mint` — teal background
- `.badge-sys.critical` — red background, white text, red border
- `.badge-sys-dark` — for dark backgrounds, white text, semi-transparent border

### Grid Utilities

| Class   | Columns | Notes                              |
| ------- | ------- | ---------------------------------- |
| `.g-1`  | 1       | Responsive-variant-ready (`md:g-4`) |
| `.g-2`  | 2       | 1.5px gap with black background    |
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

### Blog Grid (Bento Layout)

| Breakpoint  | Layout                                                                |
| ----------- | --------------------------------------------------------------------- |
| Mobile      | Single column, stacked cards                                          |
| Tablet      | 2-column grid                                                         |
| Desktop     | Bento grid: featured card spans 2col×2row + smaller cards fill remaining space |

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

The original "Warm & Organic" design system (Amber/Sage Green/Terracotta palette, Plus Jakarta Sans/Inter/Caveat fonts, rounded corners, shadows, PawCursor, ScrollReveal) was replaced by an intermediate **Mint System** (Black/White/Mint palette, Inter + Space Grotesk fonts), which was then evolved into the current **Vivid Brutalist** system in March 2026.

Key changes from Mint System to Vivid Brutalist:
- Colors: Black/White/Mint → Cream background with 11-color semantic palette
- Typography: Inter + Space Grotesk → Archivo Black + Space Mono
- Grid lines: 1px → 1.5px
- Photos: Grayscale by default → Full color always
- Animations: Added ScrollVelocity, CircularGallery (OGL), SectionDividerBand, BlogCardsBento
- Components: Added `.pill-card`, `.btn-health`, semantic color classes
