# M15: Progressive Web App (PWA)

## Description

Convert the website into a Progressive Web App with offline support, installability, push notifications, and app-like experience on mobile devices.

## Dependencies

- **M10** — Polish & Launch (complete site must be deployed)

## Technology Choices

| Concern | Technology | Rationale |
|---|---|---|
| PWA library | **Serwist** | Modern, actively maintained, built for Next.js App Router |
| Service worker | Serwist-generated | No manual `sw.js` — Serwist generates optimized SW at build time |
| Push notifications | Web Push API | Native browser API, no third-party push service needed |

## Scope

- Serwist-powered service worker for caching and offline support
- Web app manifest
- Offline fallback page
- App-like experience (standalone display)
- Install prompt handling
- Push notifications for key events

## Tasks

### T15.1: Create web app manifest

**What:** Define the PWA manifest with app name, icons, colors, and display mode.

**Files:**
- `public/manifest.json`
- `public/icons/` (icon-192.png, icon-512.png, apple-touch-icon.png)
- `src/app/layout.tsx` (manifest link)

**Acceptance Criteria:**
- [ ] Manifest includes name, short_name, icons, theme_color, background_color
- [ ] Display mode: `standalone`
- [ ] Start URL: `/tr` (default locale)
- [ ] Icons in required sizes (192x192, 512x512)
- [ ] Apple touch icon for iOS

---

### T15.2: Implement service worker with Serwist

**What:** Configure Serwist to generate an optimized service worker at build time with per-content-type caching strategies.

**Files:**
- `src/app/sw.ts` (Serwist service worker entry point)
- `src/lib/register-sw.ts` (SW registration helper)
- `next.config.ts` (Serwist plugin integration via `@serwist/next`)

**Caching Strategy:**

| Content Type | Strategy | Rationale |
|---|---|---|
| Static assets (CSS, JS, fonts) | Cache-first | Rarely change, fast loads |
| Navigation requests | Network-first + offline fallback | Need fresh content |
| CMS content pages | Stale-while-revalidate | Fast load + background refresh |
| API responses | Network-only | Must be fresh |
| Images | Cache-first with expiry (7 days) | Large files, slow to download |

**Acceptance Criteria:**
- [ ] Serwist generates service worker at build time (no manual `public/sw.js`)
- [ ] `@serwist/next` plugin configured in `next.config.ts`
- [ ] Static assets cached with cache-first strategy
- [ ] Navigation requests use network-first with offline fallback
- [ ] CMS content pages use stale-while-revalidate
- [ ] API responses are network-only (never served from cache)
- [ ] Images cached with 7-day expiry
- [ ] Service worker updates automatically when new version deployed
- [ ] Cache cleanup for old versions via Serwist precache manifest

---

### T15.3: Build offline fallback page

**What:** Create an offline page shown when the user has no internet connection and the requested page isn't cached.

**Files:**
- `public/offline.html`

**Acceptance Criteria:**
- [ ] Friendly offline message with paw theme
- [ ] "Try again" button
- [ ] Works without any JS/CSS that isn't cached
- [ ] Bilingual message (or at minimum Turkish)

---

### T15.4: Handle install prompt

**What:** Implement custom install prompt UI for "Add to Home Screen" on supported browsers.

**Files:**
- `src/modules/shared/components/InstallPrompt.tsx`
- `src/modules/shared/hooks/useInstallPrompt.ts`

**Acceptance Criteria:**
- [ ] Custom install banner appears after 2nd visit (or configurable)
- [ ] Dismiss option with "Don't show again" cookie
- [ ] Only shows on mobile devices
- [ ] Intercepts `beforeinstallprompt` event

---

### T15.5: Implement push notifications

**What:** Integrate the Web Push API to notify users about key events such as new emergency cases and donation milestones.

**Files:**
- `src/lib/push/subscribe.ts` (client-side subscription helper)
- `src/lib/push/send.ts` (server-side push sender using Web Push Protocol)
- `src/app/api/push/subscribe/route.ts` (save subscription endpoint)
- `src/app/api/push/send/route.ts` (trigger push endpoint, admin-only)
- `src/modules/shared/components/NotificationOptIn.tsx`

**Notification types:**
- New emergency case published
- Donation milestone reached (e.g., campaign goal hit)

**User opt-in flow:**
- Prompt via `InstallPrompt` component or user settings page
- Explicit opt-in required (never auto-subscribe)
- Subscription stored in a `PushSubscriptions` collection in PayloadCMS

**Push service:**
- Web Push Protocol (VAPID keys) — no third-party push service (no Firebase, no OneSignal)
- VAPID keys generated once, stored in environment variables

**Acceptance Criteria:**
- [ ] Users can opt in to push notifications from InstallPrompt or settings
- [ ] Subscription is saved server-side in PushSubscriptions collection
- [ ] New emergency case triggers push to all subscribed users
- [ ] Donation milestone triggers push to all subscribed users
- [ ] Push works on Android Chrome, Edge, Firefox; graceful fallback on iOS Safari
- [ ] Users can unsubscribe at any time
- [ ] VAPID authentication — no third-party push service dependency

---

## Milestone Acceptance Criteria

- [ ] Site passes PWA installability checks in Chrome DevTools
- [ ] App is installable on Android and iOS
- [ ] Offline fallback page shows when network is unavailable
- [ ] Cached pages load without network
- [ ] Service worker updates when new deployment is made
- [ ] Lighthouse PWA score is passing
- [ ] Push notifications delivered for emergency cases and donation milestones

## Verification

1. Open Chrome DevTools → Application → Manifest — verify valid manifest
2. Run Lighthouse PWA audit — verify passing
3. Install the app on Android — verify standalone mode
4. Add to home screen on iOS — verify icon and launch
5. Enable airplane mode — verify cached pages load, uncached shows offline page
6. Deploy an update — verify service worker updates on next visit
7. Subscribe to push notifications — verify subscription saved
8. Publish a new emergency case — verify push notification received

### PWA Testing Checklist

- [ ] **Manifest**: Chrome DevTools → Application → Manifest shows no errors
- [ ] **Service Worker**: Chrome DevTools → Application → Service Workers shows active SW
- [ ] **Caching**: Network tab shows cached responses for static assets, images, and CMS pages
- [ ] **Offline**: Airplane mode → cached pages load, uncached pages show offline fallback
- [ ] **Install**: "Add to Home Screen" prompt appears and installs correctly
- [ ] **Standalone**: Installed app launches without browser chrome
- [ ] **Update**: After deploy, SW updates on next visit (check "waiting" state in DevTools)
- [ ] **Push**: Notification opt-in works, test push received on Android Chrome
- [ ] **iOS**: App added to home screen with correct icon and splash
- [ ] **Lighthouse**: PWA audit passes with no critical failures
- [ ] **Cross-browser**: Test on Chrome, Firefox, Edge, Safari (iOS)
