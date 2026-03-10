# Testing Strategy

> Last updated: 2026-03-10

---

## Testing Pyramid

The project follows a three-tier testing approach, with the majority of tests at the unit level and fewer, more focused tests at higher levels.

```
        /  E2E  \          Playwright — critical user journeys
       /----------\
      / Integration \      Testing Library — component behavior
     /----------------\
    /    Unit Tests     \  Vitest — functions, utils, hooks
   /____________________\
```

| Tier        | Tool                          | Scope                                        |
| ----------- | ----------------------------- | -------------------------------------------- |
| Unit        | Vitest                        | Utility functions, hooks, formatters, helpers |
| Integration | Vitest + React Testing Library | Component rendering, user interactions        |
| E2E         | Playwright                    | Full user flows across pages                  |

---

## Directory Structure

Tests are co-located within each module inside a `__tests__/` directory.

```
src/modules/donate/
  __tests__/
    iban-copy.test.ts          # Unit test
    donation-form.spec.ts      # Integration test
    donation-flow.e2e.ts       # E2E test
  components/
  hooks/
  lib/
  collection.ts
  index.ts
```

Shared test utilities live in a top-level directory:

```
tests/
  setup.ts                     # Vitest global setup
  helpers.ts                   # Shared test helpers
  mocks/                       # MSW handlers, fixture data
  e2e/                         # Playwright global config & helpers
  seed/                        # Database seed scripts for testing
```

---

## Naming Conventions

| Pattern         | Purpose                    | Runner     |
| --------------- | -------------------------- | ---------- |
| `*.test.ts`     | Unit tests                 | Vitest     |
| `*.spec.ts`     | Integration tests          | Vitest     |
| `*.spec.tsx`    | Integration tests (JSX)    | Vitest     |
| `*.e2e.ts`      | End-to-end tests           | Playwright |

---

## Coverage Targets

| Area                            | Target | Rationale                                    |
| ------------------------------- | ------ | -------------------------------------------- |
| `lib/` and utility functions    | 80%    | Pure logic, easy to test, high value          |
| Components                      | 60%    | Focus on behavior, not snapshot coverage      |
| Critical paths                  | 100%   | Donation flow, IBAN copy, emergency form      |
| Hooks                           | 70%    | Custom hooks with business logic              |
| Collections (PayloadCMS)        | 70%    | Validation rules, access control, hooks       |

Critical paths that require 100% coverage:

- Donation flow (form validation, IBAN display, copy-to-clipboard)
- Emergency case submission
- Contact form submission and validation
- Language switching (next-intl)
- Search functionality (query → results)

---

## CI Pipeline

### On Every Pull Request

```
1. Biome check        — lint + format verification
2. Type check          — tsc --noEmit
3. Unit tests          — vitest run
4. Integration tests   — vitest run --config vitest.integration.config.ts
5. Build               — bun run build
```

### Nightly + Pre-Release

```
6. E2E tests           — playwright test (full suite)
7. Lighthouse CI       — performance / accessibility audit
8. Bundle analysis     — check against size budget
```

### Pipeline Configuration (GitHub Actions)

```yaml
# Simplified representation
name: CI
on: [pull_request]
jobs:
  quality:
    steps:
      - bun install --frozen-lockfile
      - bun run biome:check
      - bun run typecheck
      - bun run test
      - bun run test:integration
      - bun run build
```

---

## Accessibility Testing

| Tool          | Stage       | Purpose                                     |
| ------------- | ----------- | ------------------------------------------- |
| axe-core      | Unit/Integ  | Automated a11y checks on rendered components |
| Lighthouse CI | CI nightly  | Performance + accessibility scoring          |
| Manual audit  | Pre-release | Keyboard navigation, screen reader testing   |

Integration with Vitest:

```ts
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

it("donation form has no accessibility violations", async () => {
  const { container } = render(<DonationForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

Lighthouse CI thresholds:

| Metric        | Threshold |
| ------------- | --------- |
| Performance   | >= 90     |
| Accessibility | >= 95     |
| Best Practices| >= 90     |
| SEO           | >= 95     |

---

## PayloadCMS Testing

### Local API Testing

PayloadCMS provides a Local API that can be used without HTTP. Tests run against a dedicated test database.

```ts
import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });

// Test collection CRUD
const animal = await payload.create({
  collection: "animals",
  data: { name: "Test Cat", species: "kedi", status: "tedavide" },
});

expect(animal.name).toBe("Test Cat");
```

### Seed Scripts

Located in `tests/seed/`:

- `seed-animals.ts` — sample animal records
- `seed-blog.ts` — blog posts with tags
- `seed-emergency.ts` — emergency cases
- `seed-settings.ts` — site settings (IBAN, contact info)

Run with: `bun run test:seed`

### What to Test in Collections

- Field validation rules (required fields, min/max, regex)
- Access control (admin-only fields, public read)
- Hooks (beforeChange, afterChange)
- Relationships between collections
- Localized field behavior (TR/EN)

---

## Mock Strategy

### External APIs — MSW (Mock Service Worker)

MSW intercepts network requests at the service worker level, providing realistic mocking.

```ts
// tests/mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  // Instagram API mock
  http.get("https://graph.instagram.com/me/media", () => {
    return HttpResponse.json({
      data: [
        { id: "1", media_url: "https://example.com/photo.jpg", caption: "Rescued kitten" },
      ],
    });
  }),
];
```

Services mocked with MSW:

| Service        | Endpoint                          | Mock Data                  |
| -------------- | --------------------------------- | -------------------------- |
| Instagram API  | `graph.instagram.com/me/media`    | Sample feed posts          |
| Vercel Analytics | `vitals.vercel-insights.com`    | No-op                     |

### Internal Modules — Vitest Mocks

```ts
// Mock PayloadCMS client
vi.mock("@/lib/payload", () => ({
  getPayloadClient: vi.fn(() => mockPayloadClient),
}));

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "tr",
}));

// Mock Nuqs
vi.mock("nuqs", () => ({
  useQueryState: vi.fn(() => ["", vi.fn()]),
}));
```

---

## Running Tests

| Command                      | Description                         |
| ---------------------------- | ----------------------------------- |
| `bun run test`               | Run all unit tests                  |
| `bun run test:watch`         | Run unit tests in watch mode        |
| `bun run test:integration`   | Run integration tests               |
| `bun run test:e2e`           | Run Playwright E2E tests            |
| `bun run test:e2e:ui`        | Run Playwright with UI mode         |
| `bun run test:coverage`      | Run tests with coverage report      |
| `bun run test:seed`          | Seed the test database              |
| `bun run test:a11y`          | Run accessibility audit             |

---

## Related Docs

- [Technical PRD](../prd/03-technical.md) — architecture and stack details
- [Deployment Playbook](../guides/deployment-playbook.md) — CI/CD pipeline details
- [Quick Start](../guides/quick-start.md) — development setup
