# M16: Social Media Automation

## Description

Automate social media sharing when new content is published — auto-post to Instagram and Twitter/X when blog posts, emergency cases, or animal profiles are created in the CMS. Uses a database queue processed by Vercel Cron instead of direct API calls from CMS hooks.

## Dependencies

- **M10** — Polish & Launch (content must be flowing)
- **M13** — Admin Dashboard (workflow integration)

## Technology Choices

| Concern | Technology | Rationale |
|---|---|---|
| Queue infrastructure | **Vercel Cron + Neon DB queue table** | Decoupled from CMS hooks, reliable, retryable |
| Instagram API | Instagram Graph API | Official API for business accounts |
| Twitter/X API | Twitter API v2 | Current version of Twitter API |
| Image processing | **sharp** | Already in Next.js stack, fast image resizing |

## Scope

- Social queue table in Neon DB for decoupled post scheduling
- Vercel Cron job to process queue every 5 minutes
- Auto-share to Instagram (via Graph API)
- Auto-share to Twitter/X (via API v2)
- CMS hooks insert into queue (never post directly)
- Share preview and scheduling
- Social media post templates
- Rate limiting, retry logic, and image optimization

## Tasks

### T16.1: Set up social queue infrastructure

**What:** Create a `social_queue` table in Neon DB and a Vercel Cron job that processes the queue every 5 minutes. CMS hooks will insert into this table; the cron job handles actual posting.

**Files:**
- `src/migrations/create-social-queue.ts` (migration to create table)
- `src/app/api/cron/social-queue/route.ts` (Vercel Cron handler)
- `vercel.json` (cron schedule configuration)
- `src/lib/social/queue.ts` (queue insert/update helpers)

**Table schema — `social_queue`:**

| Column | Type | Description |
|---|---|---|
| id | `serial PRIMARY KEY` | Auto-increment ID |
| platform | `varchar(20) NOT NULL` | `instagram` or `twitter` |
| content_type | `varchar(50) NOT NULL` | `blog`, `emergency`, or `animal` |
| content_id | `integer NOT NULL` | PayloadCMS document ID |
| post_text | `text NOT NULL` | Formatted post text |
| image_url | `text` | URL to the image to attach |
| status | `varchar(20) DEFAULT 'pending'` | `pending`, `processing`, `posted`, `failed` |
| retry_count | `integer DEFAULT 0` | Number of retries attempted |
| scheduled_at | `timestamptz NOT NULL` | When to post (allows future scheduling) |
| posted_at | `timestamptz` | When actually posted (null until success) |
| error | `text` | Last error message if failed |
| created_at | `timestamptz DEFAULT now()` | Row creation timestamp |

**Cron job behavior:**
1. Query `social_queue` for rows where `status = 'pending'` and `scheduled_at <= now()`
2. Set status to `processing`
3. Call platform API
4. On success: set `status = 'posted'`, record `posted_at`
5. On failure: apply retry logic (see below)

**Acceptance Criteria:**
- [ ] `social_queue` table created via migration
- [ ] Vercel Cron runs every 5 minutes (`*/5 * * * *`)
- [ ] Cron endpoint secured with `CRON_SECRET` header verification
- [ ] Queue helper functions: `enqueue()`, `markPosted()`, `markFailed()`
- [ ] Only pending items with `scheduled_at <= now()` are processed

---

### T16.2: Create social post templates

**What:** Define post templates for each content type (blog, emergency, animal) with appropriate text, hashtags, and image.

**Files:**
- `src/lib/social/templates.ts`

**Acceptance Criteria:**
- [ ] Blog post template: title, excerpt, link, hashtags
- [ ] Emergency case template: title, urgency message, link, photo
- [ ] Animal profile template: name, type, story snippet, photo
- [ ] Templates support TR and EN
- [ ] Character limits respected per platform (Instagram: 2200 chars, Twitter: 280 chars)

---

### T16.3: Implement CMS hooks for queue insertion

**What:** Add PayloadCMS `afterChange` hooks that insert into the `social_queue` table when content is published. Hooks never call social APIs directly.

**Files:**
- `src/modules/blog/hooks/afterPublish.ts`
- `src/modules/emergency/hooks/afterCreate.ts`
- `src/modules/animals/hooks/afterPublish.ts`

**Hook behavior:**
1. Check if `autoShare` field is enabled on the document
2. Generate post text using templates from T16.2
3. Insert one row per platform into `social_queue` with `status = 'pending'`
4. Set `scheduled_at` to `now()` (immediate) or a future time if scheduled

**Acceptance Criteria:**
- [ ] Publishing a blog post inserts 2 queue rows (Instagram + Twitter)
- [ ] Creating an active emergency case inserts 2 queue rows
- [ ] Publishing a new animal profile inserts 2 queue rows
- [ ] Sharing can be disabled per-post via a CMS `autoShare` toggle field
- [ ] Hook failures never block the CMS save operation (wrapped in try/catch)
- [ ] Queue insertion is logged for debugging

---

### T16.4: Set up social media API clients

**What:** Configure API clients for Instagram Graph API and Twitter API v2 with proper authentication.

**Files:**
- `src/lib/social/instagram.ts`
- `src/lib/social/twitter.ts`
- `.env.local` (API keys, access tokens)

**Acceptance Criteria:**
- [ ] Instagram Graph API client authenticated
- [ ] Twitter API v2 client authenticated
- [ ] Token refresh mechanisms in place
- [ ] API keys stored in environment variables

---

### T16.5: Add share preview in admin

**What:** Show a preview of what the social media post will look like before publishing.

**Files:**
- `src/modules/settings/components/SocialPreview.tsx`

**Acceptance Criteria:**
- [ ] Preview shows post text, image, and link
- [ ] Preview for both Instagram and Twitter formats
- [ ] Toggle to enable/disable auto-share for each post

---

## Rate Limiting

Stay well under platform limits to avoid account restrictions:

| Platform | Official Limit | Our Limit | Rationale |
|---|---|---|---|
| Instagram | 25 posts/day | **10 posts/day** | Conservative to avoid shadow-banning |
| Twitter/X | 300 tweets/day | **50 tweets/day** | Generous buffer for safety |

- Rate limits tracked per platform per calendar day (UTC)
- If daily limit reached, new queue items get `scheduled_at` set to next day 09:00 UTC
- Rate limit counters stored in `social_queue` table (count posted items per day)

## Retry Logic

Failed posts use exponential backoff:

| Retry # | Delay | Action |
|---|---|---|
| 1 | 1 minute | Re-queue with `scheduled_at = now() + 1min` |
| 2 | 5 minutes | Re-queue with `scheduled_at = now() + 5min` |
| 3 | 30 minutes | Re-queue with `scheduled_at = now() + 30min` |
| 4+ | — | Mark as `failed`, stop retrying |

- Max 3 retries per queue item
- `retry_count` incremented on each failure
- Error message stored in `error` column for debugging
- Failed items visible in admin dashboard for manual review

## Image Optimization

Images are auto-resized using **sharp** before posting to match platform requirements:

| Platform | Dimensions | Format | Quality |
|---|---|---|---|
| Instagram (square) | 1080x1080 | JPEG | 85% |
| Instagram (portrait) | 1080x1350 | JPEG | 85% |
| Twitter/X | 1200x675 | JPEG | 85% |

- Source image fetched from Media collection URL
- Resized in-memory using sharp (no disk writes)
- Aspect ratio preserved with cover-fit cropping
- Format auto-selected: square for Instagram by default, portrait if source is tall

## Milestone Acceptance Criteria

- [ ] Blog posts auto-share to Instagram and Twitter when published
- [ ] Emergency cases auto-share when created as active
- [ ] Social post templates produce well-formatted content
- [ ] Share preview works in admin panel
- [ ] Sharing can be disabled per-post
- [ ] Queue processes every 5 minutes via Vercel Cron
- [ ] Failed shares retry with exponential backoff (max 3 retries)
- [ ] Rate limits enforced per platform per day
- [ ] Images auto-resized to platform-specific dimensions

## Verification

1. Publish a blog post with auto-share enabled — verify 2 rows inserted in `social_queue`
2. Wait for cron job — verify Instagram and Twitter posts created
3. Create an active emergency case — verify social shares queued and posted
4. Disable auto-share toggle, publish a post — verify no queue rows inserted
5. Preview social post in admin — verify preview matches actual post
6. Simulate API failure — verify retry at 1min, 5min, 30min intervals, then marked as failed
7. Check rate limiting — verify posts beyond daily limit are scheduled for next day
8. Verify image dimensions on posted content match platform specs
