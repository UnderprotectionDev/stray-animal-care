# Deployment Playbook

> Last updated: 2026-03-16

---

## First Deployment Checklist

Complete these steps in order for the initial production deployment.

### 1. Neon Database Setup

- [ ] Create a Neon project at [neon.tech](https://neon.tech)
- [ ] Create a `production` branch (main database)
- [ ] Create a `preview` branch (for Vercel preview deployments)
- [ ] Copy the connection string — you will need it for `DATABASE_URL`

### 2. Vercel Project Setup

- [ ] Import repository from GitHub in the Vercel dashboard
- [ ] Set framework preset to **Next.js**
- [ ] Set build command to `pnpm run build`
- [ ] Set install command to `pnpm install`
- [ ] Leave output directory as default (`.next`)
- [ ] Set Node.js version to **20.x**

### 3. Environment Variables

Configure all environment variables in Vercel before the first deploy.

### 4. Domain & DNS

- [ ] Add custom domain in Vercel project settings
- [ ] Update DNS records at your registrar (Vercel provides the values)
- [ ] SSL certificate is provisioned automatically by Vercel
- [ ] Verify domain is working with HTTPS

### 5. First Deploy

- [ ] Push to `main` branch to trigger deployment
- [ ] Verify PayloadCMS auto-migration runs successfully in build logs
- [ ] Access `/admin` to create the first admin user
- [ ] Configure SiteSettings global (IBAN, contact info, social links)
- [ ] Verify all pages load correctly

---

## Environment Variables

| Variable                  | Required | Environment     | Description                                |
| ------------------------- | -------- | --------------- | ------------------------------------------ |
| `DATABASE_URL`            | Yes      | All             | Neon PostgreSQL connection string           |
| `PAYLOAD_SECRET`          | Yes      | All             | PayloadCMS encryption key (min 32 chars)    |
| `NEXT_PUBLIC_SITE_URL`    | Yes      | All             | Full site URL (e.g., `https://example.com`) |
| `INSTAGRAM_TOKEN`         | Yes      | Production      | Instagram Graph API long-lived token        |
| `VERCEL_ANALYTICS_ID`     | No       | Production      | Vercel Web Analytics ID                     |
| `CRON_SECRET`             | Yes      | Production      | Secret for securing cron job endpoints      |
| `REVALIDATION_SECRET`     | Yes      | Production      | Secret for on-demand ISR revalidation       |
| `NEXT_PUBLIC_GA_ID`       | No       | Production      | Google Analytics measurement ID             |
| `BLOB_READ_WRITE_TOKEN`   | No      | Production      | Vercel Blob storage token (media uploads)   |

### Generating Secrets

```bash
# Generate PAYLOAD_SECRET
openssl rand -base64 32

# Generate CRON_SECRET / REVALIDATION_SECRET
openssl rand -hex 32
```

### Environment-Specific Notes

- **Preview deployments** use the Neon `preview` branch via `DATABASE_URL`
- **`NEXT_PUBLIC_SITE_URL`** must match the deployment URL (use Vercel system env vars for previews)
- **Instagram token** needs refreshing every 60 days — set a calendar reminder

---

## Database Schema Sync

This project uses `push: true` in the database adapter configuration. PayloadCMS automatically syncs the database schema on startup — **no migration files are used**.

| Event                | Behavior                                          |
| -------------------- | ------------------------------------------------- |
| First deploy         | PayloadCMS creates all tables from collection schemas |
| Schema change deploy | PayloadCMS auto-syncs schema on startup (`push: true`) |
| Rollback             | Manual — schema changes are not automatically reversed |

### Safety Notes

- Always test schema changes on the Neon `preview` branch first
- Back up the database before deploying destructive schema changes (column drops, type changes)
- The `payload_migrations` table exists but is empty — all migrations were removed in favor of `push: true`

---

## Vercel Settings

### Build Configuration

| Setting            | Value              |
| ------------------ | ------------------ |
| Framework Preset   | Next.js            |
| Build Command      | `pnpm run build`    |
| Install Command    | `pnpm install`      |
| Output Directory   | (default)          |
| Node.js Version    | 20.x              |
| Root Directory     | (default)          |

### Recommended Vercel Features

- **Web Analytics** — enable for traffic monitoring
- **Speed Insights** — enable for Core Web Vitals tracking
- **Skew Protection** — enable to prevent stale client/server mismatches
- **Cron Jobs** — configure for Instagram token refresh and scheduled tasks

### Cron Jobs

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/instagram-refresh",
      "schedule": "0 0 * * 0"
    },
    {
      "path": "/api/cron/sitemap-revalidate",
      "schedule": "0 3 * * *"
    }
  ]
}
```

---

## Monitoring

### Vercel Dashboard

| Tool              | What to Monitor                                |
| ----------------- | ---------------------------------------------- |
| Deployments       | Build status, build duration, deploy logs       |
| Functions         | Invocation count, errors, duration, cold starts |
| Web Analytics     | Page views, unique visitors, referrers          |
| Speed Insights    | LCP, FID, CLS, TTFB per page                   |
| Logs              | Runtime errors, API route failures              |

### Neon Dashboard

| Metric            | What to Watch                                  |
| ----------------- | ---------------------------------------------- |
| Connections       | Active connections vs. pool limit               |
| Query performance | Slow queries (> 500ms)                          |
| Storage           | Database size growth over time                  |
| Compute           | Auto-suspend behavior, cold start latency       |

### Health Checks

Create a `/api/health` endpoint that verifies:

- Application is running
- Database connection is active
- PayloadCMS is initialized
- Critical environment variables are set

---

## Rollback Procedure

### Quick Rollback via Vercel

1. Open the Vercel dashboard
2. Navigate to **Deployments**
3. Find the last known good deployment
4. Click the three-dot menu and select **Promote to Production**
5. The previous deployment is instantly promoted — no rebuild needed

### Database Rollback

If the deployment included schema changes:

1. Check the migration that was applied in the build logs
2. Write a reverse migration manually if needed
3. Run the reverse migration against the production database
4. Then promote the previous Vercel deployment

**Important:** Vercel rollback does not reverse database migrations. Always consider database compatibility when rolling back.

---

## Incident Response

### Triage Steps

```
1. Is the site completely down?
   → Check Vercel Status Page (vercel.com/status)
   → Check Neon Status Page (neon.tech/status)

2. Are specific pages/features broken?
   → Check Vercel Function Logs for errors
   → Check browser console for client-side errors

3. Is the CMS admin inaccessible?
   → Check DATABASE_URL is valid
   → Check Neon dashboard for connection issues
   → Verify PAYLOAD_SECRET has not changed

4. Are images/media not loading?
   → Check Vercel Blob storage status
   → Verify BLOB_READ_WRITE_TOKEN is valid

5. Is the Instagram feed not updating?
   → Check INSTAGRAM_TOKEN expiration
   → Verify cron job is running (Vercel dashboard → Cron Jobs)
```

### Severity Levels

| Level    | Examples                               | Response Time | Action                          |
| -------- | -------------------------------------- | ------------- | ------------------------------- |
| Critical | Site down, donation flow broken        | Immediate     | Rollback, notify stakeholders   |
| High     | CMS inaccessible, broken pages         | < 1 hour      | Investigate, fix or rollback    |
| Medium   | Instagram feed stale, slow performance | < 4 hours     | Investigate, schedule fix       |
| Low      | Minor UI issues, typos                 | Next sprint   | Log issue, fix in next deploy   |

---

## Performance Budget

| Metric                 | Budget     | Measurement Tool    |
| ---------------------- | ---------- | ------------------- |
| Largest Contentful Paint (LCP) | < 2.5s    | Vercel Speed Insights |
| Cumulative Layout Shift (CLS)  | < 0.1     | Vercel Speed Insights |
| First Input Delay (FID)        | < 100ms   | Vercel Speed Insights |
| Total JS bundle (initial)      | < 150KB   | Bundle analyzer       |
| Total CSS (initial)            | < 30KB    | Bundle analyzer       |
| Time to First Byte (TTFB)     | < 800ms   | Lighthouse CI         |
| Lighthouse Performance Score   | >= 90     | Lighthouse CI         |

### Enforcement

- Bundle size is checked in CI via `@next/bundle-analyzer`
- Lighthouse CI runs nightly with minimum thresholds
- Vercel Speed Insights provides ongoing real-user monitoring

---

## Related Docs

- [Technical PRD](../prd/03-technical.md) — architecture and infrastructure details
- [Quick Start](../guides/quick-start.md) — local development setup
- [Testing Strategy](../reference/testing-strategy.md) — CI pipeline details
- [Roadmap](../prd/05-roadmap.md) — release timeline
