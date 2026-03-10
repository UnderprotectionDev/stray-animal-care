# M3: Internationalization (i18n)

## Description

Set up bilingual (Turkish/English) support using next-intl for frontend content and PayloadCMS i18n for CMS-managed content. This milestone ensures every user-facing string is translatable and locale routing works correctly.

## Dependencies

- **M1** — Project Scaffolding & Infrastructure

## Scope

- next-intl installation and configuration
- Locale routing middleware (`/tr/...`, `/en/...`)
- Translation JSON files (TR and EN)
- PayloadCMS collection field localization setup
- Language switcher component (implemented in M5)
- Default locale: Turkish (`tr`)

## Tasks

### T3.1: Install and configure next-intl

**What:** Add next-intl to the project and create the configuration file with supported locales and default locale.

**Files:**
- `src/i18n/config.ts` (locale list, default locale)
- `src/i18n/request.ts` (getRequestConfig for next-intl)

**Acceptance Criteria:**
- [ ] next-intl is installed as a dependency
- [ ] Supported locales: `['tr', 'en']`
- [ ] Default locale: `tr`
- [ ] Configuration exports are type-safe

---

### T3.2: Set up locale routing middleware

**What:** Create Next.js middleware that handles locale detection, redirects, and path prefixing for i18n routing.

**Files:**
- `src/middleware.ts`

**Acceptance Criteria:**
- [ ] `/` redirects to `/tr` (default locale)
- [ ] `/en/...` serves English content
- [ ] `/tr/...` serves Turkish content
- [ ] Unknown locales return 404
- [ ] `/admin` paths are excluded from locale routing
- [ ] `/api` paths are excluded from locale routing

---

### T3.3: Create translation JSON files

**What:** Create initial TR and EN translation files with all static UI strings organized by module/section.

**Files:**
- `src/i18n/tr.json`
- `src/i18n/en.json`

**Acceptance Criteria:**
- [ ] Both files have identical key structures
- [ ] Keys are organized by module: `home.*`, `layout.*`, `animals.*`, `donate.*`, etc.
- [ ] Common strings are under `common.*` namespace
- [ ] All static UI text from the PRD is included
- [ ] Interpolation variables are used where needed (e.g., `{count}`)

---

### T3.4: Configure PayloadCMS localization

**What:** Enable localization in `payload.config.ts` so CMS content fields can have TR and EN versions.

**Files:**
- `src/payload.config.ts` (localization config)

**Acceptance Criteria:**
- [ ] PayloadCMS localization is enabled with `locales: ['tr', 'en']`
- [ ] Default locale is `tr`
- [ ] Fallback locale is `tr`
- [ ] Admin UI shows locale switcher for localized fields

---

### T3.5: Create i18n utility hooks and helpers

**What:** Create helper functions for using translations in both server and client components.

**Files:**
- `src/i18n/navigation.ts` (localized Link, redirect, usePathname)
- `src/modules/shared/hooks/useLocale.ts` (locale access hook)

**Acceptance Criteria:**
- [ ] `Link` component from `@/i18n/navigation` handles locale prefixing
- [ ] Server components can access translations via `getTranslations()`
- [ ] Client components can access translations via `useTranslations()`
- [ ] Locale-aware `redirect()` function works correctly

---

### T3.6: Update App Router for locale support

**What:** Modify the `[locale]` layout to provide translations and locale context to all child pages.

**Files:**
- `src/app/(frontend)/[locale]/layout.tsx`
- `src/app/(frontend)/[locale]/page.tsx`

**Acceptance Criteria:**
- [ ] Layout wraps children with `NextIntlClientProvider`
- [ ] `generateStaticParams()` returns both `tr` and `en`
- [ ] Page renders translated content based on locale
- [ ] HTML `lang` attribute is set correctly

---

## Milestone Acceptance Criteria

- [ ] Navigating to `/tr` renders Turkish content
- [ ] Navigating to `/en` renders English content
- [ ] `/` redirects to `/tr`
- [ ] `/admin` is not affected by locale routing
- [ ] Both TR and EN translation files compile without errors
- [ ] PayloadCMS admin shows locale switcher for localized fields
- [ ] All translation keys are type-safe (no missing key errors)

## Verification

1. Start dev server, navigate to `/` — confirm redirect to `/tr`
2. Navigate to `/en` — confirm English content renders
3. Open PayloadCMS admin — confirm locale switcher appears
4. Check HTML source — confirm `<html lang="tr">` or `<html lang="en">`
5. Test an unknown locale path like `/de` — confirm 404
6. Verify `/admin` and `/api` paths work without locale prefix
