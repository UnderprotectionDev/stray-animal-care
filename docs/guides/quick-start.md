# Quick Start Guide

> Last updated: 2026-03-16

---

## Prerequisites

| Tool          | Version | Installation                              |
| ------------- | ------- | ----------------------------------------- |
| Node.js       | 20+     | [nodejs.org](https://nodejs.org)          |
| pnpm          | Latest  | `npm i -g pnpm`                             |
| PostgreSQL    | 15+     | Local install or [Neon](https://neon.tech) account |
| Git           | 2.40+   | [git-scm.com](https://git-scm.com)       |

---

## Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/paws-of-hope.git
cd paws-of-hope
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Database — use Neon connection string or local PostgreSQL
DATABASE_URL=postgresql://user:password@host:5432/paws_of_hope

# PayloadCMS — generate with: openssl rand -base64 32
PAYLOAD_SECRET=your-secret-key-min-32-characters

# Site URL — use localhost for development
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Optional — Vercel Blob for media uploads (leave empty for local dev)
BLOB_READ_WRITE_TOKEN=
```

### 4. Set Up the Database

If using a local PostgreSQL:

```bash
createdb paws_of_hope
```

PayloadCMS creates all tables automatically on first run (uses `push: true` — no migration files needed).

### 5. Start the Development Server

```bash
pnpm dev
```

The application starts at `http://localhost:3000`. The PayloadCMS admin panel is available at `http://localhost:3000/admin`.

On first visit to `/admin`, you will be prompted to create an admin user.

---

## Key Commands

| Command                          | Description                              |
| -------------------------------- | ---------------------------------------- |
| `pnpm dev`                        | Start development server                 |
| `pnpm build`                      | Production build                         |
| `pnpm start`                      | Start production server                  |
| `pnpm lint`                       | Run ESLint                               |
| `pnpm lint:fix`                   | Run ESLint with auto-fix                 |
| `tsc --noEmit`                    | TypeScript type checking                 |
| `pnpm run generate:types`         | Generate PayloadCMS TypeScript types     |
| `pnpm run generate:importmap`     | Regenerate Payload admin import map      |
| `pnpm run test:int`               | Run integration tests (Vitest)           |
| `pnpm run test:e2e`               | Run Playwright E2E tests                 |
| `pnpm test`                       | Run both int + e2e                       |
| `pnpm run seed`                   | Seed database (destructive)              |
| `pnpm run seed:cms`               | Seed CMS content only                    |

### Running a Single Test

```bash
# Integration (Vitest) — single file
pnpm vitest run --config ./vitest.config.mts tests/int/path/to/file.int.spec.ts

# E2E (Playwright) — single file
pnpm playwright test tests/e2e/path/to/file.spec.ts
```

---

## Project Structure Overview

```
stray-animal-care/
  docs/                          # Project documentation
  public/                        # Static assets (favicon, images)
  tests/
    int/                         # Integration tests (*.int.spec.ts)
    e2e/                         # E2E tests (Playwright)
    helpers/                     # Shared test helpers
  src/
    app/
      (frontend)/
        [locale]/                # Internationalized pages (TR/EN)
          page.tsx               # Home page (block-driven)
          canlarimiz/page.tsx    # Our Animals
          posts/[slug]/page.tsx  # Blog detail
          ...
        globals.css              # Global styles + design tokens
      (payload)/
        admin/                   # PayloadCMS admin UI
    collections/                 # PayloadCMS collection definitions
      Animals/
      Posts/
      EmergencyCases/
      ...
    modules/                     # Feature modules (7 total)
      animals/                   # components/ + lib/ + index.ts
      blog/
      donate/
      emergency/
      our-work/
      supplies/
      transparency/
    components/
      home/                      # Homepage section components
      shared/                    # Reusable (Section, Container, Heading, etc.)
      fancy/                     # Animation components (FlowingMenu, etc.)
      ui/                        # shadcn/ui components
    blocks/
      homepage/                  # 10 homepage block types
    globals/
      UIStrings/                 # UIStrings global (~235 localized fields)
    Header/                      # Header global + components
    Footer/                      # Footer component
    SiteSettings/                # SiteSettings global
    fields/                      # Reusable field configs
    hooks/                       # Payload lifecycle hooks
    access/                      # Access control functions
    search/                      # Search field overrides
    i18n/                        # next-intl config (routing only)
    utilities/                   # Utility functions
    providers/                   # React context providers
  payload.config.ts              # PayloadCMS configuration
  next.config.ts                 # Next.js configuration
  tailwind.config.mjs            # Tailwind CSS configuration
  .eslintrc.json                 # ESLint config
  tsconfig.json                  # TypeScript configuration
```

For full architecture details, see [Technical PRD](../prd/03-technical.md).

---

## Module Structure

Each module in `src/modules/` follows this pattern:

```
src/modules/animals/
  components/
    AnimalCard.tsx
    AnimalGrid.tsx
    AnimalDetail.tsx
  lib/
    queries.ts
  index.ts                       # Barrel export
```

> **Note:** Collection definitions live in `src/collections/`, NOT inside modules. Modules contain only frontend components and query logic.

---

## Module Development Workflow

### Creating a New Module

1. **Create the module directory:**

```bash
mkdir -p src/modules/my-module/{components,lib}
```

2. **Add components:**

```tsx
// src/modules/my-module/components/my-component.tsx
export function MyComponent() {
  return <section>...</section>;
}
```

3. **Add a collection (if CMS-backed) — in `src/collections/`:**

```ts
// src/collections/MyCollection/index.ts
import type { CollectionConfig } from "payload";

export const MyCollection: CollectionConfig = {
  slug: "my-collection",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    // ...
  ],
};
```

4. **Register the collection in PayloadCMS config:**

```ts
// payload.config.ts
import { MyCollection } from "@/collections/MyCollection";

export default buildConfig({
  collections: [
    // ... existing collections
    MyCollection,
  ],
});
```

5. **Create the page:**

```tsx
// src/app/(frontend)/[locale]/my-page/page.tsx
import { MyComponent } from "@/modules/my-module";

export default async function MyPage() {
  // Fetch data here
  return <MyComponent />;
}
```

6. **Create the barrel export:**

```ts
// src/modules/my-module/index.ts
export { MyComponent } from "./components/my-component";
```

7. **Generate types (if collection was added):**

```bash
pnpm run generate:types
pnpm run generate:importmap
```

---

## Common Tasks

### Add a New Animal (via CMS)

1. Go to `http://localhost:3000/admin`
2. Navigate to **Hayvanlar (Animals)** in the sidebar
3. Click **Create New**
4. Fill in name, species, status, photos, and story
5. Publish

### Create a Blog Post

1. Go to `/admin` and navigate to **Yazilar (Posts)**
2. Click **Create New**
3. Write content in the rich text editor (Lexical)
4. Add categories, set hero image
5. Choose to publish immediately or save as draft

### Update the Needs List

1. Go to `/admin` and navigate to **Ihtiyac Listesi (Needs List)**
2. Edit existing items or create new entries
3. Set priority levels and current/target stock

### Update IBAN / Contact Info

1. Go to `/admin` and navigate to **Site Ayarlari (Site Settings)**
2. Edit the IBAN, phone, email, or social media fields
3. Save — changes appear on the site immediately via ISR

### Update UI Text / Translations

All user-facing text is managed through the **UIStrings** global in the CMS:

1. Go to `/admin` and navigate to **UI Strings**
2. Find the relevant tab (e.g., Ana Sayfa, Hayvanlar, Destek)
3. Edit the text for both TR and EN locales using the locale switcher
4. Save — changes propagate to the frontend via ISR

> **Note:** There are no JSON translation files. All UI text lives in the CMS UIStrings global (~235 localized fields across 12 tabs). next-intl is used only for routing (locale prefix handling).

---

## Troubleshooting

For common issues and solutions, see [FAQ & Troubleshooting](./faq-troubleshooting.md).

---

## Related Docs

- [Technical PRD](../prd/03-technical.md) — full architecture details
- [Deployment Playbook](./deployment-playbook.md) — deploying to production
- [Testing Strategy](../reference/testing-strategy.md) — running and writing tests
- [Glossary](../reference/glossary.md) — Turkish/English term reference
