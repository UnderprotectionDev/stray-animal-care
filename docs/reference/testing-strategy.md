# Testing Strategy

> Last updated: 2026-03-16

---

## Testing Pyramid

The project follows a two-tier testing approach: integration tests for component/module behavior and E2E tests for critical user journeys.

```
        /  E2E  \          Playwright — critical user journeys
       /----------\
      / Integration \      Vitest — module-level flows, components
     /________________\
```

| Tier        | Tool                          | Scope                                        |
| ----------- | ----------------------------- | -------------------------------------------- |
| Integration | Vitest + jsdom                | Component rendering, user interactions, utils |
| E2E         | Playwright (Chromium)         | Full user flows across pages                  |

---

## Directory Structure

Tests live in a top-level `tests/` directory, organized by type.

```
tests/
  int/                           # Integration tests
    *.int.spec.ts                # Integration test files
  e2e/                           # Playwright E2E tests
    *.spec.ts                    # E2E test files
  helpers/                       # Shared test helpers
```

---

## Naming Conventions

| Pattern           | Purpose                    | Runner     |
| ----------------- | -------------------------- | ---------- |
| `*.int.spec.ts`   | Integration tests          | Vitest     |
| `*.spec.ts`       | E2E tests                  | Playwright |

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
1. ESLint             — pnpm lint
2. Type check         — tsc --noEmit
3. Integration tests  — pnpm run test:int
4. Build              — pnpm build
```

### Nightly + Pre-Release

```
5. E2E tests           — pnpm run test:e2e (full suite)
6. Lighthouse CI       — performance / accessibility audit
7. Bundle analysis     — check against size budget
```

### Pipeline Configuration (GitHub Actions)

```yaml
# Simplified representation
name: CI
on: [pull_request]
jobs:
  quality:
    steps:
      - pnpm install --frozen-lockfile
      - pnpm lint
      - tsc --noEmit
      - pnpm run test:int
      - pnpm build
```

---

## Accessibility Testing

| Tool          | Stage       | Purpose                                     |
| ------------- | ----------- | ------------------------------------------- |
| axe-core      | Integration | Automated a11y checks on rendered components |
| Lighthouse CI | CI nightly  | Performance + accessibility scoring          |
| Manual audit  | Pre-release | Keyboard navigation, screen reader testing   |

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
  data: { name: "Test Cat", type: "kedi", animalStatus: "tedavide" },
});

expect(animal.name).toBe("Test Cat");
```

### What to Test in Collections

- Field validation rules (required fields, min/max, regex)
- Access control (admin-only fields, public read)
- Hooks (beforeChange, afterChange)
- Relationships between collections
- Localized field behavior (TR/EN)

---

## Running Tests

| Command                        | Description                         |
| ------------------------------ | ----------------------------------- |
| `pnpm test`                     | Run both int + e2e                  |
| `pnpm run test:int`             | Run integration tests (Vitest)      |
| `pnpm run test:e2e`             | Run Playwright E2E tests            |

### Running a Single Test

```bash
# Integration — single file
pnpm vitest run --config ./vitest.config.mts tests/int/path/to/file.int.spec.ts

# E2E — single file
pnpm playwright test tests/e2e/path/to/file.spec.ts
```

---

## Related Docs

- [Technical PRD](../prd/03-technical.md) — architecture and stack details
- [Deployment Playbook](../guides/deployment-playbook.md) — CI/CD pipeline details
- [Quick Start](../guides/quick-start.md) — development setup
