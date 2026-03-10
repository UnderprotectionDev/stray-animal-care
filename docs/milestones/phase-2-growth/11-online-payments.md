# M11: Online Payment Integration

## Description

Integrate an online payment gateway (iyzico for domestic, Stripe for international) to enable direct donations through the website. This replaces the manual IBAN transfer flow with an instant payment experience and supports recurring donations.

## Dependencies

- **M10** — Polish & Launch (MVP must be live first)

## Scope

- Payment gateway integration (iyzico and/or Stripe)
- One-time donation form with amount selection
- Recurring (monthly) donation option
- Payment success/failure pages
- Webhook handling for payment confirmations
- Donation tracking in CMS
- PCI compliance considerations

## Tasks

### T11.1: Set up payment gateway SDK

**What:** Install and configure iyzico SDK for domestic payments and/or Stripe SDK for international payments. Set up API keys and environment variables.

**Files:**
- `src/lib/payment.ts` (payment client initialization)
- `.env.local` (payment API keys)
- `package.json` (SDK dependencies)

**Acceptance Criteria:**
- [ ] iyzico and/or Stripe SDK installed
- [ ] API keys stored in environment variables
- [ ] Payment client factory/utility created
- [ ] Test mode enabled for development

---

### T11.2: Build donation form

**What:** Create a multi-step donation form: amount selection → personal info → payment details. Use TanStack Form + Zod for validation.

**Files:**
- `src/modules/donate/components/DonationForm.tsx`
- `src/modules/donate/components/AmountStep.tsx`
- `src/modules/donate/components/PaymentStep.tsx`
- `src/modules/donate/lib/schemas.ts` (Zod schemas)

**Acceptance Criteria:**
- [ ] Preset amount buttons (50, 100, 200, 500 TL) + custom amount
- [ ] Toggle for one-time vs recurring (monthly)
- [ ] Name and email fields
- [ ] Credit card input (via payment gateway's secure form)
- [ ] Form validation with inline error messages
- [ ] Responsive layout
- [ ] Translated in TR/EN

---

### T11.3: Implement payment API routes

**What:** Create server-side API routes for initiating payments, handling callbacks, and processing webhooks.

**Files:**
- `src/app/api/payment/create/route.ts`
- `src/app/api/payment/webhook/route.ts`
- `src/app/api/payment/callback/route.ts`

**Acceptance Criteria:**
- [ ] POST `/api/payment/create` initiates a payment session
- [ ] Webhook endpoint verifies payment gateway signatures
- [ ] Webhook handles successful and failed payments
- [ ] Payment data is stored/logged securely
- [ ] Rate limiting on payment endpoints

---

### T11.4: Build payment result pages

**What:** Create success and failure pages shown after payment completion.

**Files:**
- `src/modules/donate/components/PaymentSuccess.tsx`
- `src/modules/donate/components/PaymentFailure.tsx`
- `src/app/(frontend)/[locale]/destek-ol/basarili/page.tsx`
- `src/app/(frontend)/[locale]/destek-ol/basarisiz/page.tsx`

**Acceptance Criteria:**
- [ ] Success page shows thank you message and donation summary
- [ ] Failure page shows error message and retry option
- [ ] Both pages translated in TR/EN
- [ ] Success page suggests sharing on social media

---

### T11.5: Create Donations collection in CMS

**What:** Add Donations collection definition alongside the existing SupporterComments collection in the donate module. Both collections are defined in the same module directory — SupporterComments in `collection.ts` and Donations in a separate `donations-collection.ts` for clarity, still co-located in the module root.

**Files:**
- `src/modules/donate/donations-collection.ts`
- `src/payload.config.ts` (register collection)

**Acceptance Criteria:**
- [ ] Fields: amount, currency, donor name, email, payment ID, status, recurring flag, date
- [ ] Collection is read-only in admin (populated by webhooks)
- [ ] Filterable by date, status, and recurring flag

---

### T11.6: Implement recurring donation management

**What:** Set up subscription-based recurring donations with the payment gateway.

**Files:**
- `src/modules/donate/lib/recurring.ts`

**Acceptance Criteria:**
- [ ] Monthly recurring donations can be created
- [ ] Subscription status is tracked in CMS
- [ ] Failed recurring payments trigger retry/notification logic
- [ ] Donors can cancel via a secure link (future: email)

---

## Milestone Acceptance Criteria

- [ ] One-time donations work end-to-end (form → payment → success page)
- [ ] Recurring donations can be set up
- [ ] Payment webhooks update CMS records
- [ ] Both TR and EN donation flows work
- [ ] Test payments succeed in sandbox/test mode
- [ ] Payment data is secure (no card details stored locally)
- [ ] IBAN flow still works as a fallback

## Verification

1. Complete a test payment with a test card — verify success page
2. Submit an invalid card — verify failure page with retry
3. Set up a recurring test donation — verify subscription creation
4. Check CMS — verify donation record was created via webhook
5. Verify payment page is fully translated in EN
6. Confirm IBAN donation section still works alongside online payments
