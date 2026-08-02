# Media Mention Report Link — Public Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render an optional second line inside each media-mention card on `/media-mentions`, linking to an internal report, without breaking the existing whole-card external link.

**Architecture:** Extend `ApiMediaMention` with `reportSlug`/`reportLinkText` (both already resolved server-side by the backend plan — this repo does no lookups of its own). In `app/media-mentions/page.tsx`, restructure the card so the existing whole-card external `<a>` becomes an absolutely-positioned "stretched link" (`absolute inset-0`) behind the card content, and the new report link renders as a normal anchor inside that content with `pointer-events-auto` — this avoids nesting `<a>` inside `<a>` (invalid HTML, unpredictable click behavior) while keeping both links independently clickable.

**Tech Stack:** Next.js 15 App Router, Server Components (no client JS needed for this).

## Global Constraints

- This repo has no test framework configured — verification is `npm run lint`, `npm run build`, and manual QA against the dev server (matches existing convention: no `*.test.tsx` files exist here).
- Keep this a Server Component — no `"use client"` needed, this is pure conditional rendering of server-fetched data.
- The report line must only render when *both* `reportSlug` and `reportLinkText` are present (legacy mentions have neither) — no placeholder/empty state.
- The report link opens in a new tab (`target="_blank" rel="noopener noreferrer"`), same as the existing external `link`.
- Do not touch `lib/api/media-mentions.ts` — it already passes the full API payload through unchanged; only the type needs extending.

---

### Task 1: Extend `ApiMediaMention` type

**Files:**
- Modify: `lib/api/media-mentions.types.ts`

**Interfaces:**
- Produces: `ApiMediaMention.reportSlug?: string`, `ApiMediaMention.reportLinkText?: string` — consumed by Task 2.

- [ ] **Step 1: Edit the file**

```ts
// Media Mention types

export interface ApiMediaMention {
  id: number;
  title: string;
  link?: string;
  imageUrl?: string;
  displayOrder?: number;
  reportSlug?: string;
  reportLinkText?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no new errors from this file (existing repo-wide errors, if any, are out of scope).

- [ ] **Step 3: Commit**

```bash
git add lib/api/media-mentions.types.ts
git commit -m "feat: add reportSlug/reportLinkText to ApiMediaMention type"
```

---

### Task 2: Render the report link inside the card

**Files:**
- Modify: `app/media-mentions/page.tsx`

**Interfaces:**
- Consumes: `ApiMediaMention.reportSlug`/`reportLinkText` (Task 1).

- [ ] **Step 1: Replace the card-rendering block**

Replace the `mentions.map(...)` block (current lines 38-74) with:

```tsx
          {mentions.map((mention) => {
            const hasReportLink = Boolean(mention.reportSlug && mention.reportLinkText);

            return (
              <div
                key={mention.id}
                className="relative flex flex-col items-center justify-center gap-3 rounded-2xl border p-6 h-full bg-[var(--card)] hover:shadow-md transition-shadow"
              >
                {mention.link && (
                  <a
                    href={mention.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Read coverage on ${mention.title}`}
                    className="absolute inset-0 z-0 rounded-2xl"
                  />
                )}

                <div className="relative z-[1] flex flex-col items-center justify-center gap-3 w-full pointer-events-none">
                  <div className="w-full h-16 flex items-center justify-center">
                    {mention.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={mention.imageUrl}
                        alt={mention.title}
                        className="max-h-16 max-w-full object-contain"
                      />
                    ) : (
                      <span className="font-semibold text-[var(--foreground)] text-center">
                        {mention.title}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-[var(--muted-foreground)] text-center">
                    {mention.title}
                  </span>
                  {hasReportLink && (
                    <a
                      href={`/reports/${mention.reportSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto relative z-10 text-xs underline text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-center"
                    >
                      {mention.reportLinkText}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
```

This keeps the whole card clickable to the external `link` (now an absolutely-positioned overlay anchor at `z-0` instead of a wrapping element — a "stretched link"), while the report-link anchor sits above it (`z-10`, `pointer-events-auto` overriding the content wrapper's `pointer-events-none`) so it's independently clickable without ever nesting inside the external `<a>`.

- [ ] **Step 2: Verify it compiles and lints**

Run: `npm run lint`
Expected: no errors (in particular, no "no-img-element" regression — the existing `eslint-disable` comment is preserved).

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: succeeds, including static generation of `/media-mentions`.

- [ ] **Step 4: Manual QA in the dev server**

Run: `npm run dev`, then in a browser at `/media-mentions`:
1. For a mention with both `link` and a linked report (create/edit one via the admin plan first): confirm clicking anywhere on the card body opens the external article in a new tab, and clicking specifically the report-link text opens `/reports/{slug}` in a new tab — not the external link.
2. For a mention with only `link` (no report): confirm card behaves exactly as before (whole card clickable, no second line).
3. For a mention with a linked report but no `link`: confirm the card isn't wrapped in any anchor, but the report-link line still renders and works.
4. For a legacy mention with neither: confirm it renders exactly as it did before this change (no layout shift, no empty second line).
5. Inspect the DOm via browser devtools to confirm there is no `<a>` nested inside another `<a>` anywhere in the mentions grid.

- [ ] **Step 5: Commit**

```bash
git add app/media-mentions/page.tsx
git commit -m "feat: render internal report link on media mention cards"
```

---

## Final Verification

- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] Manual QA checklist in Task 2 Step 4 completed against a backend that has both other plans deployed (otherwise `reportSlug`/`reportLinkText` will never be present in the API response and only the "legacy mention" case is testable)
