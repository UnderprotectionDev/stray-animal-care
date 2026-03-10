# Quick Start Guide

> Last updated: 2026-03-10

---

## Prerequisites

| Tool          | Version | Installation                              |
| ------------- | ------- | ----------------------------------------- |
| Node.js       | 20+     | [nodejs.org](https://nodejs.org)          |
| Bun           | Latest  | `curl -fsSL https://bun.sh/install \| bash` |
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
bun install
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
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional — Instagram feed (leave empty for development)
INSTAGRAM_TOKEN=
```

### 4. Set Up the Database

If using a local PostgreSQL:

```bash
createdb paws_of_hope
```

PayloadCMS creates all tables automatically on first run.

### 5. Start the Development Server

```bash
bun run dev
```

The application starts at `http://localhost:3000`. The PayloadCMS admin panel is available at `http://localhost:3000/admin`.

On first visit to `/admin`, you will be prompted to create an admin user.

---

## Key Commands

| Command                        | Description                            |
| ------------------------------ | -------------------------------------- |
| `bun run dev`                  | Start development server               |
| `bun run build`                | Production build                       |
| `bun run start`                | Start production server                |
| `bun run lint`                 | Run Biome linter                       |
| `bun run format`               | Run Biome formatter                    |
| `bun run biome:check`          | Lint + format check (CI mode)          |
| `bun run typecheck`            | TypeScript type checking               |
| `bun run test`                 | Run unit tests (Vitest)                |
| `bun run test:watch`           | Run tests in watch mode                |
| `bun run test:integration`     | Run integration tests                  |
| `bun run test:e2e`             | Run Playwright E2E tests               |
| `bun run test:coverage`        | Run tests with coverage report         |
| `bun run payload:generate-types` | Generate TypeScript types from collections |
| `bun run payload:migrate`      | Run database migrations                |

---

## Project Structure Overview

```
paws-of-hope/
  docs/                          # Project documentation
  public/                        # Static assets (favicon, images)
  src/
    app/
      (frontend)/
        [locale]/                # Internationalized pages (TR/EN)
          page.tsx               # Home page
          hikayem/page.tsx       # My Story
          canlarimiz/page.tsx    # Our Animals
          ...
        not-found.tsx            # Custom 404
      (payload)/
        admin/                   # PayloadCMS admin UI
      api/                       # API routes
      error.tsx                  # Error boundary
      global-error.tsx           # Global error boundary
      layout.tsx                 # Root layout
    components/
      ui/                        # shadcn/ui components
    lib/
      payload.ts                 # PayloadCMS client helper
      utils.ts                   # General utilities
      format.ts                  # Formatting helpers
    modules/                     # Feature modules (18 total)
      home/
      animals/
      donate/
      ...
    types/
      common.ts                  # Shared TypeScript types
      payload-types.ts           # Auto-generated PayloadCMS types
  payload.config.ts              # PayloadCMS configuration
  next.config.ts                 # Next.js configuration
  tailwind.config.ts             # Tailwind CSS configuration
  biome.json                     # Biome linter/formatter config
  tsconfig.json                  # TypeScript configuration
```

For full architecture details, see [Technical PRD](../prd/03-technical.md).

---

## Module Structure

Each module in `src/modules/` follows this pattern:

```
src/modules/animals/
  components/
    animal-card.tsx
    animal-grid.tsx
    animal-detail.tsx
  hooks/
    use-animal-filters.ts
  lib/
    animal-utils.ts
  __tests__/
    animal-utils.test.ts
    animal-card.spec.tsx
  collection.ts                  # PayloadCMS collection (if CMS-backed)
  index.ts                       # Barrel export
```

---

## Module Development Workflow

### Creating a New Module

1. **Create the module directory:**

```bash
mkdir -p src/modules/my-module/{components,hooks,lib,__tests__}
```

2. **Add components:**

```tsx
// src/modules/my-module/components/my-component.tsx
export function MyComponent() {
  return <section>...</section>;
}
```

3. **Add a collection (if CMS-backed):**

```ts
// src/modules/my-module/collection.ts
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
import { MyCollection } from "@/modules/my-module/collection";

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
bun run payload:generate-types
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

1. Go to `/admin` and navigate to **Blog Yazilari (Blog Posts)**
2. Click **Create New**
3. Write content in the rich text editor
4. Add tags, set featured image
5. Choose to publish immediately or save as draft

### Update the Needs List

1. Go to `/admin` and navigate to **Ihtiyac Listesi (Needs List)**
2. Edit existing items or create new entries
3. Set priority levels and current stock status

### Update IBAN / Contact Info

1. Go to `/admin` and navigate to **Site Ayarlari (Site Settings)**
2. Edit the IBAN, phone, email, or social media fields
3. Save — changes appear on the site immediately via ISR

### Add Translations

1. Open the relevant locale file in `src/messages/`:
   - `tr.json` for Turkish
   - `en.json` for English
2. Add the new key-value pair in both files
3. Use in components via `useTranslations`:

```tsx
const t = useTranslations("my-module");
return <p>{t("myNewKey")}</p>;
```

---

## Troubleshooting

For common issues and solutions, see [FAQ & Troubleshooting](./faq-troubleshooting.md).

---

## Related Docs

- [Technical PRD](../prd/03-technical.md) — full architecture details
- [Deployment Playbook](./deployment-playbook.md) — deploying to production
- [Testing Strategy](../reference/testing-strategy.md) — running and writing tests
- [Glossary](../reference/glossary.md) — Turkish/English term reference
