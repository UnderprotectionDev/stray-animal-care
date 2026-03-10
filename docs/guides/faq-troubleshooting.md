# FAQ & Troubleshooting

> Last updated: 2026-03-10

---

## Development FAQs

### How do I add a new module?

1. Create the module directory with the standard structure:

```bash
mkdir -p src/modules/my-module/{components,hooks,lib,__tests__}
```

2. Create a barrel export file:

```ts
// src/modules/my-module/index.ts
export { MyComponent } from "./components/my-component";
```

3. If the module needs CMS data, add a `collection.ts` and register it in `payload.config.ts`.

4. Create the page at `src/app/(frontend)/[locale]/my-slug/page.tsx` that imports from the module.

See [Quick Start — Module Development Workflow](./quick-start.md#module-development-workflow) for a full walkthrough.

---

### How do I create a new collection?

1. Define the collection in your module:

```ts
// src/modules/my-module/collection.ts
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
import { MyCollection } from "@/modules/my-module/collection";

export default buildConfig({
  collections: [
    // ... existing collections
    MyCollection,
  ],
});
```

3. Regenerate types:

```bash
pnpm run payload:generate-types
```

4. Restart the dev server. PayloadCMS will auto-create the database table.

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

### How do I add translations?

1. Add keys to both locale files:

```json
// src/messages/tr.json
{
  "my-module": {
    "title": "Baslik",
    "description": "Aciklama metni"
  }
}
```

```json
// src/messages/en.json
{
  "my-module": {
    "title": "Title",
    "description": "Description text"
  }
}
```

2. Use in components:

```tsx
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("my-module");
  return <h1>{t("title")}</h1>;
}
```

3. For server components, use `getTranslations`:

```tsx
import { getTranslations } from "next-intl/server";

export default async function MyPage() {
  const t = await getTranslations("my-module");
  return <h1>{t("title")}</h1>;
}
```

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

This is instant and does not require a rebuild. Note that database migrations are not reversed automatically. See [Deployment Playbook — Rollback Procedure](./deployment-playbook.md#rollback-procedure).

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

1. Go to `/admin` and click **Blog Yazilari** (Blog Posts)
2. Click **Create New**
3. Write the title and content using the rich text editor
4. Add tags (e.g., `kurtarma`, `tedavi`, `gunluk`)
5. Upload a featured image
6. Fill in SEO fields (meta title, description)
7. Set publish status: **Draft** (saves but not public) or **Published**
8. Click **Save**

---

### How do I update the IBAN?

1. Go to `/admin` and click **Site Ayarlari** (Site Settings)
2. Find the **IBAN** field and update it
3. Update the **Account Holder Name** if needed
4. For international donations, update the **SWIFT/BIC** and **Bank Name** fields
5. Click **Save**

Changes are reflected on the site after ISR revalidation.

---

### How do I moderate supporter comments?

1. Go to `/admin` and click **Destek Yorumlari** (Supporter Comments)
2. New comments appear with a **Pending** status
3. Review each comment and set status to **Approved** or **Rejected**
4. Approved comments appear on the donation page

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
- Co-located collections keep CMS definitions close to their consumers

The 18 modules cover all pages plus cross-cutting concerns (layout, shared, media, settings).

---

### Why Bun?

- **Speed** — significantly faster package installation and script execution than npm/yarn
- **Built-in test runner compatibility** — works with Vitest
- **Drop-in replacement** — compatible with npm packages and `node_modules`
- **Vercel support** — Vercel natively supports Bun as a package manager

---

### Why Biome over ESLint?

- **Performance** — written in Rust, 10-100x faster than ESLint + Prettier
- **Unified tool** — linting and formatting in a single tool
- **Zero config** — sensible defaults, minimal configuration needed
- **No plugin fatigue** — no need to install and configure dozens of ESLint plugins
- **Consistent formatting** — deterministic output, no Prettier disagreements

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

**Symptom:** `pnpm run payload:generate-types` throws an error.

**Solutions:**

1. Ensure the database is running and `DATABASE_URL` is correct
2. Check for syntax errors in collection definitions
3. Run `pnpm run dev` first to verify PayloadCMS initializes, then run type generation in a separate terminal
4. Clear the `.next` cache: `rm -rf .next`

---

### Build fails on Vercel

**Symptom:** Deployment fails during the build step.

**Solutions:**

1. **Check environment variables** — all required vars must be set in Vercel project settings. Missing `DATABASE_URL` or `PAYLOAD_SECRET` will cause build failure.
2. **Check build logs** — Vercel dashboard shows the full build output.
3. **Test locally:** `pnpm run build` — if it builds locally but not on Vercel, the issue is likely environment variables.
4. **Memory issues** — if the build runs out of memory, check for circular imports or excessive static generation.

---

### Translations missing / showing keys instead of text

**Symptom:** UI shows `my-module.title` instead of the translated string.

**Solutions:**

1. Verify the key exists in both `src/messages/tr.json` and `src/messages/en.json`
2. Check that the namespace matches: `useTranslations("my-module")` needs keys under `"my-module"` in the JSON
3. Restart the dev server after adding new locale files
4. Check for JSON syntax errors in locale files (trailing commas, missing quotes)

---

### Images not displaying

**Symptom:** Images return 404 or appear broken.

**Solutions:**

1. **Local dev:** Ensure the `public/` directory exists and images are in the correct path
2. **CMS uploads:** Check that `BLOB_READ_WRITE_TOKEN` is configured (if using Vercel Blob)
3. **Next.js Image:** Verify the domain is listed in `next.config.ts` under `images.remotePatterns`
4. **Format:** Ensure images are in WebP or a supported format

---

### Hot reload not working

**Symptom:** Changes to files do not appear in the browser.

**Solutions:**

1. Check the terminal for compilation errors
2. Clear the `.next` cache: `rm -rf .next && pnpm run dev`
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
4. Delete `.next` and rebuild: `rm -rf .next && pnpm run dev`
5. Check that `payload.config.ts` has no syntax or import errors

---

## Related Docs

- [Quick Start](./quick-start.md) — setup and development workflow
- [Deployment Playbook](./deployment-playbook.md) — deployment and infrastructure
- [Testing Strategy](../reference/testing-strategy.md) — running tests
- [Glossary](../reference/glossary.md) — Turkish/English term reference
- [Technical PRD](../prd/03-technical.md) — architecture details
