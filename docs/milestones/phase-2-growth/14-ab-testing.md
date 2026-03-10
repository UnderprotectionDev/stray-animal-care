# M14: A/B Testing & Optimization

## Description

Implement A/B testing infrastructure using Vercel Edge Config to optimize donation conversion rates, CTA placement, and page layouts based on data-driven decisions.

## Dependencies

- **M10** — Polish & Launch (site must be live with traffic)
- **M11** — Online Payment Integration (conversion tracking)

## Scope

- A/B testing framework with Vercel Edge Config
- Experiment configuration and variant assignment
- Conversion event tracking
- Integration with Vercel Analytics
- Initial experiments for CTA optimization

## Tasks

### T14.1: Set up A/B testing infrastructure

**What:** Create the core A/B testing utility using Vercel Edge Config for experiment configuration and cookie-based variant assignment.

**Files:**
- `src/lib/experiments.ts` (experiment framework)
- `src/lib/edge-config.ts` (Vercel Edge Config client)
- `.env.local` (EDGE_CONFIG connection string)

**Acceptance Criteria:**
- [ ] Experiments defined in Edge Config (name, variants, traffic split)
- [ ] Visitor assigned to a variant via cookie (stable across sessions)
- [ ] Variant assignment works in middleware (edge runtime)
- [ ] Framework supports multiple concurrent experiments

---

### T14.2: Build experiment components

**What:** Create React components for rendering different variants in A/B tests.

**Files:**
- `src/modules/shared/components/Experiment.tsx`
- `src/modules/shared/hooks/useExperiment.ts`

**Acceptance Criteria:**
- [ ] `<Experiment name="hero-cta">` renders the assigned variant
- [ ] `useExperiment('hero-cta')` returns current variant name
- [ ] Works in both server and client components
- [ ] Fallback to control variant if experiment not found

---

### T14.3: Implement conversion tracking

**What:** Track conversion events (donation clicks, payment completions, WhatsApp clicks) and associate them with experiment variants.

**Files:**
- `src/lib/tracking.ts`
- `src/modules/shared/hooks/useTrackConversion.ts`

**Acceptance Criteria:**
- [ ] Conversion events are logged with variant information
- [ ] Events sent to Vercel Analytics (or custom endpoint)
- [ ] Tracked events: donate_click, payment_complete, whatsapp_click, volunteer_apply
- [ ] No PII is tracked

---

### T14.4: Create initial experiments

**What:** Set up the first A/B experiments based on PRD priorities.

**Acceptance Criteria:**
- [ ] Experiment 1: Hero CTA text variants ("Donate Now" vs "Save a Life Today")
- [ ] Experiment 2: Donate page layout variants (IBAN-first vs amount-cards-first)
- [ ] Experiments configured in Edge Config
- [ ] Baseline metrics recorded before experiment start

---

### T14.5: Build experiment results dashboard

**What:** Create an internal page or admin widget for viewing experiment results.

**Files:**
- `src/modules/settings/components/dashboard/ExperimentsWidget.tsx`

**Acceptance Criteria:**
- [ ] Shows active experiments with variant split
- [ ] Displays conversion rates per variant
- [ ] Statistical significance indicator
- [ ] Accessible from admin dashboard

---

## Statistical Significance Guidance

- **Minimum sample size:** ~1,000 visitors per variant for reliable results.
- **Minimum experiment duration:** 2 weeks, to account for weekly traffic patterns (weekday vs weekend behavior differences).
- **Statistical significance threshold:** 95% confidence (p < 0.05).
- **Recommended approach:** Use a simple Bayesian approach or chi-squared test for evaluating results.
- **Experiment lifecycle:** Plan → Configure → Run (minimum 2 weeks) → Analyze → Decide → Clean up losing variant code.
- **Peeking bias warning:** Do not check results before the minimum duration and sample size are reached. Early peeking inflates false-positive rates and leads to unreliable conclusions. Lock experiment results from the dashboard until minimum criteria are met, or display a clear warning that results are not yet statistically meaningful.

---

## Milestone Acceptance Criteria

- [ ] A/B testing framework assigns variants consistently
- [ ] Conversion events are tracked per variant
- [ ] Initial experiments are running
- [ ] Results are viewable in admin dashboard
- [ ] No performance impact from experiment code (edge runtime)

## Verification

1. Visit site in incognito — verify variant assignment via cookie
2. Visit again — verify same variant (sticky assignment)
3. Click donate CTA — verify conversion event tracked
4. Complete a test payment — verify payment_complete event
5. Check admin dashboard — verify experiment widget shows data
6. Clear cookies, revisit — verify may get different variant
