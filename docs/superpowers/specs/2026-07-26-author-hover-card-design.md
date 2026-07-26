# Author Hover Card + X (Twitter) Link — Design

## Problem

Statistic and press-release detail pages show a compact author byline (avatar + name)
in the hero author bar, but it's dead — no way to see the author's role, bio, article
count, or social link without navigating away to `/authors/[slug]`. The user wants a
hover popover on that byline (reference: a screenshot of a competitor site showing
"Written By" / "Reviewed By" avatars that open a card with role, article count, an X
(Twitter) icon, a truncated bio with "See full bio", and a "Latest Posts" list).

Scope decisions made during brainstorming:
- Apply the hover card to **all content detail pages that use the compact byline
  pattern**: statistic (`/statistic/[slug]`) and press-release (`/press-release/[slug]`).
  The reports page (`/reports/[slug]`) already shows full `AuthorCard`s in its
  "Meet the Team" section (name, role, bio, LinkedIn, view-profile link, all visible
  without a hover) — that UX stays as-is; we only add the new X link there for
  consistency.
- **"Reviewed By" is out of scope.** The backend's existing `reviewedBy` field on
  blogs/press-releases points to a `User` (internal admin login), which has no bio,
  photo, role title, or public article list — it can't drive a public popover like the
  reference screenshot's "Reviewed By: Barry Elad". Only "Written By" (the existing
  primary author relationship) gets the hover card. Reviewed By can be revisited later
  once there's a decision on how to model a public-facing reviewer.
- No new frontend dependency. `gmr` has no Radix/popover primitives installed
  (`package.json` has no `radix` packages). The hover card is a small custom client
  component using local state, not a new library.

## 1. Backend (`gmr-backend`) — X (Twitter) URL on Author

Mirrors the existing `linkedin_url` field exactly.

- **Migration** `migrations/013_add_x_url_to_authors.sql`:
  ```sql
  ALTER TABLE authors ADD COLUMN IF NOT EXISTS x_url VARCHAR(500);
  CREATE INDEX IF NOT EXISTS idx_authors_x_url ON authors(x_url) WHERE x_url IS NOT NULL;
  ```
- **`internal/domain/author/author.go`**: add
  `XURL string \`json:"xUrl,omitempty" gorm:"type:varchar(500)"\`` to the `Author` struct.
- **`internal/handler/author_handler.go`**:
  - `Create`: validate `req.XURL` with `validation.ValidateURL` when non-empty (same
    pattern as `LinkedinURL`).
  - `Update`: in the `bodyMap` partial-update block, add an `xUrl` check mirroring the
    `linkedinUrl` block (validate if non-empty, allow clearing via empty string).
  - Update the two doc comments (`@Description` on Create/Update) to mention `xUrl`.
- Swagger JSON/YAML regeneration (`swag init`) is left to the normal build process —
  not hand-edited as part of this change.

## 2. Admin panel (`gmr-admin`) — X URL field on author form

- **`lib/types/reports.ts`**: add `xUrl?: string` to `ReportAuthor` and `AuthorFormData`.
- **`components/authors/author-form.tsx`**:
  - Add `xUrl: z.string().url('Please enter a valid URL').optional().or(z.literal(''))`
    to `authorFormSchema`.
  - Add `xUrl: author.xUrl || ''` / `xUrl: ''` to the two `defaultValues` branches.
  - Add a `FormField` for `xUrl` directly under the LinkedIn field: label "X (Twitter)
    Profile", placeholder `https://x.com/username`, type `url`, helper text "X (Twitter)
    profile URL (optional)".
- `author-list.tsx` is unchanged — the X link is not shown in the list table, only on
  the edit form and on the public site.

## 3. Frontend (`gmr`) — AuthorHoverCard

### Types
- **`lib/api/common.types.ts`**: add `xUrl?: string` to `ApiAuthor`.

### New component: `components/authors/AuthorHoverCard.tsx`
Client component (`'use client'`). Wraps a trigger (the existing avatar + name markup)
and shows a popover card on hover (desktop, `onMouseEnter`/`onMouseLeave` with a short
close delay so moving the pointer into the card doesn't dismiss it) and on click/tap
(mobile — toggles open, closes on outside click via a `mousedown` listener on
`document`). No portal; absolutely positioned (`absolute top-full left-0 mt-2`) inside a
`relative` wrapper, `z-50`, matching the reference screenshot's white rounded card with
shadow.

Props:
```ts
interface AuthorHoverCardProps {
  author: ApiAuthor;
  articleCount: number;
  latestPosts: { title: string; slug: string; href: string }[];
  children: React.ReactNode; // the trigger element (avatar + name)
}
```

Card contents (top to bottom), styled with the existing design tokens
(`var(--primary)`, `var(--foreground)`, `var(--muted-foreground)`, `var(--border)`):
1. Name (bold, larger) + role, "· N Articles"
2. X icon link (only if `author.xUrl` set) — opens in new tab, `aria-label` with
   author's name
3. Truncated bio (`line-clamp-3`) + "See full bio" link → `/authors/[slug via slugify]`
4. Divider
5. "LATEST POSTS" label + up to 4 linked post titles (bullet list)

If `articleCount` is 0, the "Latest Posts" section is omitted entirely (no empty state
noise).

### Data fetching (server-side, per page)
Both `app/statistic/[slug]/page.tsx` and `app/press-release/[slug]/page.tsx` already
call the API for the main content item. Add, alongside the existing fetch:

```ts
const authorReports = blog.authorDetails
  ? await getReportsByAuthorId(blog.authorDetails.id, { status: 'published', limit: 5 })
  : null;
```

- `articleCount`: since `getReportsByAuthorId` doesn't return a total separate from the
  page of results, request `limit: 1000` (same approach `AuthorProfile`/`app/authors/[slug]`
  already use) and derive `articleCount = reports.length`, `latestPosts = reports.slice(0, 4)`
  excluding the current item by slug.
- If the author fetch fails or `authorDetails` is missing, fall back to the current
  plain avatar+name markup (no hover card) — never block page render on this.
- `latestPosts[].href` is built as `/reports/${slug}` (reports are the only content
  type `getReportsByAuthorId` returns; this matches what `AuthorReportsListing`
  already assumes).

### Wiring into existing byline bars
In both pages, replace:
```tsx
<div className="flex items-center gap-2.5"> ... avatar ... <span>{blog.author}</span> </div>
```
with the same markup as `children`, wrapped in `<AuthorHoverCard author={...} .../>`,
only when `blog.authorDetails` (the full `ApiAuthor` object) is present — otherwise
render the existing plain markup unchanged (covers legacy content with only a string
`author` name and no linked author record).

### Reused elsewhere: X icon on existing author displays
- **`components/authors/AuthorCard.tsx`**: add an X icon link next to the existing
  LinkedIn icon, same visual treatment, shown only if `author.xUrl` is set.
- **`components/authors/AuthorProfile.tsx`**: same addition next to the LinkedIn icon
  in the header row.

## Testing / Verification
- `npm run lint` and `npm run build` in `gmr` (component compiles, no type errors).
- `go build ./...` in `gmr-backend`.
- `npm run type-check` in `gmr-admin`.
- Manual: run `gmr` dev server, open a statistic and a press-release detail page, hover
  the author avatar → card appears with role/count/bio/X icon/latest posts; click "See
  full bio" → navigates to author page; tab/click on mobile-width viewport toggles the
  card. Run `gmr-admin` dev server, edit an author, add an X URL, save, confirm it
  round-trips through the backend and renders on the public site.
