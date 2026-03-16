# FAQ & Troubleshooting

> Last updated: 2026-03-16

---

## Development FAQs

### How do I add a new module?

1. Create the module directory with the standard structure:

```bash
mkdir -p src/modules/my-module/{components,lib}
```

2. Create a barrel export file:

```ts
// src/modules/my-module/index.ts
export { MyComponent } from "./components/my-component";
```

3. If the module needs CMS data, add a collection in `src/collections/` and register it in `payload.config.ts`.

4. Create the page at `src/app/(frontend)/[locale]/my-slug/page.tsx` that imports from the module.

See [Quick Start — Module Development Workflow](./quick-start.md#module-development-workflow) for a full walkthrough.

---

### How do I create a new collection?

1. Define the collection in `src/collections/`:

```ts
// src/collections/MyCollection/index.ts
import type { CollectionConfig } from "payload";

export const MyCollection: CollectionConfig = {
  slug: "my-collection",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "status", type: "select", options: ["aktif", "tamamlandi"] },
  ],
};
```

2. Register it in `payload.config.ts`:

```ts
import { MyCollection } from "@/collections/MyCollection";

export default buildConfig({
  collections: [
    // ... existing collections
    MyCollection,
  ],
});
```

3. Regenerate types and import map:

```bash
pnpm run generate:types
pnpm run generate:importmap
```

4. Restart the dev server. PayloadCMS will auto-create the database table (`push: true`).

---

### How do I add a new page?

Pages follow the thin page pattern. The page file only handles data fetching and imports the module component.

```tsx
// src/app/(frontend)/[locale]/my-page/page.tsx
import { getPayload } from "payload";
import config from "@payload-config";
import { MyPageContent } from "@/modules/my-module";

export default async function MyPage() {
  const payload = await getPayload({ config });
  const data = await payload.find({ collection: "my-collection" });

  return <MyPageContent data={data.docs} />;
}
```

Add metadata for SEO:

```tsx
export async function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    title: "My Page — Paws of Hope",
    description: "...",
  };
}
```

---

### How do I add or update translations?

All user-facing text is managed through the **UIStrings** global in the CMS admin panel:

1. Go to `/admin` and navigate to **UI Strings**
2. Find the relevant tab (there are 12 tabs covering all frontend sections)
3. Use the locale switcher in the admin panel to edit TR and EN versions
4. Save — changes propagate to the frontend via ISR

> **Note:** There are no JSON translation files. next-intl is used only for locale routing. All ~235 localized text fields live in the UIStrings CMS global.

To add a **new** UI string field:

1. Add the field to `src/globals/UIStrings/config.ts` under the appropriate tab
2. Run `pnpm run generate:types` to update TypeScript types
3. Fetch the value in your component via the PayloadCMS local API
4. Set both TR and EN values in the CMS admin panel

---

## Deployment FAQs

### How do I deploy?

Push to the `main` branch. Vercel automatically builds and deploys.

```bash
git push origin main
```

For preview deployments, push to any other branch or open a pull request.

See [Deployment Playbook](./deployment-playbook.md) for full details.

---

### How do I rollback a deployment?

1. Open the [Vercel dashboard](https://vercel.com)
2. Go to your project and click **Deployments**
3. Find the last working deployment
4. Click the three-dot menu and select **Promote to Production**

This is instant and does not require a rebuild. Note that database schema changes are not reversed automatically (the project uses `push: true`, so schema is auto-synced on startup).

---

### How do I check logs?

- **Build logs:** Vercel dashboard, click on a deployment, then **Building** tab
- **Runtime logs:** Vercel dashboard, click **Logs** in the project sidebar
- **Function logs:** Vercel dashboard, click **Functions** tab, then select a function
- **Database:** Neon dashboard, **Monitoring** tab for query logs

---

## CMS FAQs

### How do I add an animal?

1. Go to `/admin` in your browser
2. Click **Hayvanlar** (Animals) in the sidebar
3. Click **Create New**
4. Fill in required fields: name, species (`kedi`/`kopek`), gender, status
5. Upload photos (WebP format, under 500KB each)
6. Write the animal's story in both TR and EN tabs
7. Click **Publish**

The animal appears on the `/canlarimiz` page after ISR revalidation (typically within seconds).

---

### How do I create a blog post?

1. Go to `/admin` and click **Yazilar** (Posts)
2. Click **Create New**
3. Write the title and content using the Lexical rich text editor
4. Add categories and set the hero image
5. Fill in SEO fields (meta title, description)
6. Set publish status: **Draft** (saves but not public) or **Published**
7. Click **Save**

---

### How do I update the IBAN?

1. Go to `/admin` and click **Site Ayarlari** (Site Settings)
2. Go to the **Banka Bilgileri** tab
3. Update bank accounts (name, holder, IBAN, currency)
4. Click **Save**

Changes are reflected on the site after ISR revalidation.

---

## Architecture Decision Rationale

### Why PayloadCMS embedded (not headless)?

PayloadCMS 3.x runs inside the Next.js application as a plugin, eliminating the need for a separate CMS server. Benefits:

- **Single deployment** — one Vercel project, one domain, one build
- **Shared types** — TypeScript types are shared between CMS and frontend
- **Direct database access** — Local API calls without HTTP overhead
- **Lower cost** — no separate hosting for the CMS
- **Simpler auth** — single authentication system

---

### Why page-based modules (not feature-based)?

Each module maps to a page or a distinct section of the site. This creates a clear mental model:

- Developers know exactly where to find code for any page
- No ambiguity about where a component belongs
- Easy to understand the project scope by listing modules
- Collections are defined in `src/collections/` for centralized CMS management

The 7 feature modules (animals, blog, donate, emergency, our-work, supplies, transparency) cover the main frontend domains, while shared/home components live in `src/components/`.

---

### Why pnpm?

- **Speed** — significantly faster package installation than npm/yarn
- **Disk efficiency** — content-addressable storage avoids duplicate packages
- **Strict dependency resolution** — prevents phantom dependency issues
- **Drop-in replacement** — compatible with npm packages and `node_modules`
- **Vercel support** — Vercel natively supports pnpm as a package manager

---

### Why Nuqs for URL state?

Nuqs provides type-safe URL search parameter management for Next.js App Router.

- **Type-safe** — parse and serialize URL params with Zod-like schemas
- **Server component compatible** — works with React Server Components
- **Shallow updates** — URL changes without full page re-renders
- **Shareable state** — filter/search state is encoded in the URL, making pages shareable

Used for: animal filters (species, status), blog filters (tags, category), search queries, pagination.

---

## Common Issues & Solutions

### PayloadCMS type generation fails

**Symptom:** `pnpm run generate:types` throws an error.

**Solutions:**

1. Ensure the database is running and `DATABASE_URL` is correct
2. Check for syntax errors in collection definitions
3. Run `pnpm dev` first to verify PayloadCMS initializes, then run type generation in a separate terminal
4. Clear the `.next` cache: `rm -rf .next`

---

### Build fails on Vercel

**Symptom:** Deployment fails during the build step.

**Solutions:**

1. **Check environment variables** — all required vars must be set in Vercel project settings. Missing `DATABASE_URL` or `PAYLOAD_SECRET` will cause build failure.
2. **Check build logs** — Vercel dashboard shows the full build output.
3. **Test locally:** `pnpm build` — if it builds locally but not on Vercel, the issue is likely environment variables.
4. **Memory issues** — if the build runs out of memory, check for circular imports or excessive static generation.

---

### Images not displaying

**Symptom:** Images return 404 or appear broken.

**Solutions:**

1. **Local dev:** Ensure the `public/` directory exists and images are in the correct path
2. **CMS uploads:** Check that `BLOB_READ_WRITE_TOKEN` is configured (required for Vercel Blob media storage)
3. **Next.js Image:** Verify the domain is listed in `next.config.ts` under `images.remotePatterns`
4. **Format:** Ensure images are in WebP or a supported format

---

### Hot reload not working

**Symptom:** Changes to files do not appear in the browser.

**Solutions:**

1. Check the terminal for compilation errors
2. Clear the `.next` cache: `rm -rf .next && pnpm dev`
3. Hard refresh the browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)
4. Check that the file is saved and inside the `src/` directory

---

### Database connection errors

**Symptom:** `ConnectionError` or `ECONNREFUSED` when starting the dev server.

**Solutions:**

1. **Local PostgreSQL:** Verify it is running: `pg_isready`
2. **Neon:** Check the Neon dashboard for compute status (may be auto-suspended)
3. **Connection string:** Verify `DATABASE_URL` format: `postgresql://user:password@host:5432/dbname`
4. **SSL:** Neon requires SSL. Ensure `?sslmode=require` is in the connection string.

---

### PayloadCMS admin not loading

**Symptom:** `/admin` shows a blank page or errors.

**Solutions:**

1. Check the browser console for JavaScript errors
2. Ensure `PAYLOAD_SECRET` is set and at least 32 characters
3. Clear browser cache and cookies for localhost
4. Delete `.next` and rebuild: `rm -rf .next && pnpm dev`
5. Check that `payload.config.ts` has no syntax or import errors

---

## Related Docs

- [Quick Start](./quick-start.md) — setup and development workflow
- [Deployment Playbook](./deployment-playbook.md) — deployment and infrastructure
- [Testing Strategy](../reference/testing-strategy.md) — running tests
- [Glossary](../reference/glossary.md) — Turkish/English term reference
- [Technical PRD](../prd/03-technical.md) — architecture details
