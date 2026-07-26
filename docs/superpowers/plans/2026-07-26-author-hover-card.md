# Author Hover Card + X (Twitter) Link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an `xUrl` field to the Author entity (backend + admin + frontend), and show a hover/click popover on the "Written By" author byline on statistic and press-release detail pages with role, article count, X link, truncated bio, and latest posts — matching the existing LinkedIn-field pattern already in the codebase.

**Architecture:** Three repos, each independently buildable/testable: `gmr-backend` (Go/Fiber/GORM) adds a nullable `x_url` column mirroring `linkedin_url`; `gmr-admin` (Next.js/React Hook Form/Zod) adds a form field mirroring the LinkedIn field; `gmr` (Next.js server components) adds a new client component `AuthorHoverCard` fed by server-side data already fetched via the existing `getReportsByAuthorId` API call, wired into the two pages that share the compact byline pattern.

**Tech Stack:** Go 1.x, Fiber v2, GORM, PostgreSQL (backend) · Next.js 15, React 19, React Hook Form, Zod, ShadCN/Tailwind (admin) · Next.js 15 App Router, React Server Components, Tailwind, CSS custom properties (frontend). No new dependencies in any repo.

## Global Constraints

- Mirror the existing `linkedinUrl`/`LinkedinURL` field pattern exactly in every repo — same validation (`validation.ValidateURL`, HTTPS required, empty allowed), same partial-update semantics, same naming style (`xUrl` in JSON/TS, `XURL`/`x_url` in Go/SQL).
- No new npm or Go dependencies. `gmr` has no Radix/popover library installed — build the hover card with plain React state.
- "Reviewed By" is out of scope for this plan — only the primary "Written By" author gets the hover card.
- Server components in `gmr` fetch data server-side and pass props down; do not add client-side data fetching for the hover card.
- If `blog.authorDetails` / `pressRelease.authorDetails` is missing (legacy content with only a string author name), fall back to the current plain avatar+name markup — never block page render.

---

### Task 1: Backend — add `x_url` column and `XURL` field to Author

**Files:**
- Create: `gmr-backend/migrations/028_add_x_url_to_authors.sql`
- Modify: `gmr-backend/internal/domain/author/author.go`

**Interfaces:**
- Produces: `author.Author.XURL string` (Go field, JSON key `xUrl`, empty string when unset) — consumed by Task 2 (handler) and by GORM (column `x_url`).

- [ ] **Step 1: Write the migration**

```sql
-- Add x_url column to authors table
ALTER TABLE authors ADD COLUMN IF NOT EXISTS x_url VARCHAR(500);

-- Add index for performance if querying by X presence
CREATE INDEX IF NOT EXISTS idx_authors_x_url ON authors(x_url) WHERE x_url IS NOT NULL;
```

Save as `gmr-backend/migrations/028_add_x_url_to_authors.sql`.

- [ ] **Step 2: Add the `XURL` field to the `Author` struct**

In `gmr-backend/internal/domain/author/author.go`, change:

```go
type Author struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name" gorm:"type:varchar(255);not null"`
	Role      string    `json:"role,omitempty" gorm:"type:varchar(100)"`
	Bio         string    `json:"bio,omitempty" gorm:"type:text"`
	ImageURL    string    `json:"imageUrl,omitempty" gorm:"type:varchar(500)"`
	LinkedinURL string    `json:"linkedinUrl,omitempty" gorm:"type:varchar(500)"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
```

to:

```go
type Author struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name" gorm:"type:varchar(255);not null"`
	Role      string    `json:"role,omitempty" gorm:"type:varchar(100)"`
	Bio         string    `json:"bio,omitempty" gorm:"type:text"`
	ImageURL    string    `json:"imageUrl,omitempty" gorm:"type:varchar(500)"`
	LinkedinURL string    `json:"linkedinUrl,omitempty" gorm:"type:varchar(500)"`
	XURL        string    `json:"xUrl,omitempty" gorm:"type:varchar(500)"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
```

- [ ] **Step 3: Verify the package builds**

Run: `cd gmr-backend && go build ./...`
Expected: exits 0, no errors.

- [ ] **Step 4: Apply the migration to the local dev database**

Run whatever migration command this project uses to apply pending `migrations/*.sql` files against the dev DB (check `gmr-backend/README.md` or `cmd/` for a migrate command; if none exists, apply directly with `psql -f migrations/028_add_x_url_to_authors.sql`). Confirm with:

```sql
\d authors
```

Expected: `x_url` column of type `varchar(500)` present.

- [ ] **Step 5: Commit**

```bash
cd gmr-backend
git add migrations/028_add_x_url_to_authors.sql internal/domain/author/author.go
git commit -m "feat(author): add x_url column and XURL field"
```

---

### Task 2: Backend — validate and persist `xUrl` in Create/Update handlers

**Files:**
- Modify: `gmr-backend/internal/handler/author_handler.go`
- Test: `gmr-backend/internal/handler/author_handler_test.go`

**Interfaces:**
- Consumes: `author.Author.XURL` (Task 1), `validation.ValidateURL(string) error` (existing, `gmr-backend/pkg/validation/url.go`).
- Produces: `POST /api/v1/authors` and `PUT /api/v1/authors/:id` accept and validate `xUrl` in the request body, same rules as `linkedinUrl`.

- [ ] **Step 1: Write the failing tests**

Append to `gmr-backend/internal/handler/author_handler_test.go`:

```go
// Tests for X URL validation in Create handler
func TestAuthorHandler_Create_WithValidXURL(t *testing.T) {
	mockService := &mockAuthorService{
		createFunc: func(a *author.Author) error {
			if a.XURL != "https://x.com/johndoe" {
				t.Errorf("Expected XURL to be set correctly, got %s", a.XURL)
			}
			return nil
		},
	}

	handler := NewAuthorHandler(mockService)
	app := fiber.New()
	app.Post("/authors", handler.Create)

	reqBody := map[string]interface{}{
		"name": "John Doe",
		"xUrl": "https://x.com/johndoe",
	}
	bodyBytes, _ := json.Marshal(reqBody)

	req := httptest.NewRequest("POST", "/authors", bytes.NewReader(bodyBytes))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("Failed to perform request: %v", err)
	}

	if resp.StatusCode != fiber.StatusCreated {
		bodyBytes, _ := io.ReadAll(resp.Body)
		t.Errorf("Expected status 201, got %d. Body: %s", resp.StatusCode, string(bodyBytes))
	}
}

func TestAuthorHandler_Create_WithInvalidXURL(t *testing.T) {
	mockService := &mockAuthorService{}
	handler := NewAuthorHandler(mockService)
	app := fiber.New()
	app.Post("/authors", handler.Create)

	reqBody := map[string]interface{}{
		"name": "John Doe",
		"xUrl": "not-a-url",
	}
	bodyBytes, _ := json.Marshal(reqBody)

	req := httptest.NewRequest("POST", "/authors", bytes.NewReader(bodyBytes))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("Failed to perform request: %v", err)
	}

	if resp.StatusCode != fiber.StatusBadRequest {
		t.Errorf("Expected status 400, got %d", resp.StatusCode)
	}
}

// Tests for X URL validation in Update handler
func TestAuthorHandler_Update_XURL(t *testing.T) {
	existingAuthor := &author.Author{
		ID:   1,
		Name: "John Doe",
	}

	mockService := &mockAuthorService{
		getByIDFunc: func(id uint) (*author.Author, error) {
			return existingAuthor, nil
		},
		updateFunc: func(id uint, a *author.Author) error {
			if a.XURL != "https://x.com/updated" {
				t.Errorf("Expected XURL to be updated, got %s", a.XURL)
			}
			return nil
		},
	}

	handler := NewAuthorHandler(mockService)
	app := fiber.New()
	app.Put("/authors/:id", handler.Update)

	reqBody := map[string]interface{}{
		"xUrl": "https://x.com/updated",
	}
	bodyBytes, _ := json.Marshal(reqBody)

	req := httptest.NewRequest("PUT", "/authors/1", bytes.NewReader(bodyBytes))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("Failed to perform request: %v", err)
	}

	if resp.StatusCode != fiber.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		t.Errorf("Expected status 200, got %d. Body: %s", resp.StatusCode, string(bodyBytes))
	}
}

func TestAuthorHandler_Update_ClearXURL(t *testing.T) {
	existingAuthor := &author.Author{
		ID:   1,
		Name: "John Doe",
		XURL: "https://x.com/johndoe",
	}

	mockService := &mockAuthorService{
		getByIDFunc: func(id uint) (*author.Author, error) {
			return existingAuthor, nil
		},
		updateFunc: func(id uint, a *author.Author) error {
			if a.XURL != "" {
				t.Errorf("Expected XURL to be cleared, got %s", a.XURL)
			}
			return nil
		},
	}

	handler := NewAuthorHandler(mockService)
	app := fiber.New()
	app.Put("/authors/:id", handler.Update)

	reqBody := map[string]interface{}{
		"xUrl": "",
	}
	bodyBytes, _ := json.Marshal(reqBody)

	req := httptest.NewRequest("PUT", "/authors/1", bytes.NewReader(bodyBytes))
	req.Header.Set("Content-Type", "application/json")

	resp, err := app.Test(req)
	if err != nil {
		t.Fatalf("Failed to perform request: %v", err)
	}

	if resp.StatusCode != fiber.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		t.Errorf("Expected status 200, got %d. Body: %s", resp.StatusCode, string(bodyBytes))
	}
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd gmr-backend && go test ./internal/handler/... -run TestAuthorHandler_Create_WithValidXURL -v`
Expected: compile error (`a.XURL undefined`) or, once it compiles against Task 1's struct, a `400`/wrong-field failure — because the handler doesn't read/validate `xUrl` yet.

- [ ] **Step 3: Implement `xUrl` handling in `Create`**

In `gmr-backend/internal/handler/author_handler.go`, in `Create`, after the existing LinkedIn validation block:

```go
	// Validate LinkedIn URL if provided
	if req.LinkedinURL != "" {
		if err := validation.ValidateURL(req.LinkedinURL); err != nil {
			return response.BadRequest(c, "Invalid LinkedIn URL: "+err.Error())
		}
	}
```

add:

```go
	// Validate X URL if provided
	if req.XURL != "" {
		if err := validation.ValidateURL(req.XURL); err != nil {
			return response.BadRequest(c, "Invalid X URL: "+err.Error())
		}
	}
```

- [ ] **Step 4: Implement `xUrl` handling in `Update`**

In the same file, in `Update`, inside the `bodyMap` block, after:

```go
			if _, ok := bodyMap["linkedinUrl"]; ok {
				if req.LinkedinURL != "" {
					if err := validation.ValidateURL(req.LinkedinURL); err != nil {
						return response.BadRequest(c, "Invalid LinkedIn URL: "+err.Error())
					}
				}
				existing.LinkedinURL = req.LinkedinURL
			}
```

add:

```go
			if _, ok := bodyMap["xUrl"]; ok {
				if req.XURL != "" {
					if err := validation.ValidateURL(req.XURL); err != nil {
						return response.BadRequest(c, "Invalid X URL: "+err.Error())
					}
				}
				existing.XURL = req.XURL
			}
```

- [ ] **Step 5: Update the two doc comments**

In `Create`'s doc comment, change:
```
// @Param author body author.Author true "Author data (name is required with min 2 chars, role, bio, and linkedinUrl are optional. linkedinUrl must be a valid HTTPS URL)"
```
to:
```
// @Param author body author.Author true "Author data (name is required with min 2 chars, role, bio, linkedinUrl, and xUrl are optional. linkedinUrl and xUrl must be valid HTTPS URLs)"
```

In `Update`'s doc comment, change:
```
// @Param author body author.Author true "Updated author data (all fields are optional for partial updates. linkedinUrl can be updated or cleared, must be a valid HTTPS URL if provided)"
```
to:
```
// @Param author body author.Author true "Updated author data (all fields are optional for partial updates. linkedinUrl and xUrl can be updated or cleared, must be a valid HTTPS URL if provided)"
```

- [ ] **Step 6: Run the full handler test suite**

Run: `cd gmr-backend && go test ./internal/handler/... -v -run TestAuthorHandler`
Expected: PASS for all `TestAuthorHandler_*` tests, including the four new ones.

- [ ] **Step 7: Commit**

```bash
cd gmr-backend
git add internal/handler/author_handler.go internal/handler/author_handler_test.go
git commit -m "feat(author): validate and persist xUrl in create/update handlers"
```

---

### Task 3: Admin — add X (Twitter) URL field to the author form

**Files:**
- Modify: `gmr-admin/lib/types/reports.ts`
- Modify: `gmr-admin/components/authors/author-form.tsx`

**Interfaces:**
- Consumes: backend `POST/PUT /api/v1/authors` now accepting `xUrl` (Task 2).
- Produces: `ReportAuthor.xUrl?: string`, `AuthorFormData.xUrl?: string` — consumed by `gmr`'s `ApiAuthor` type in Task 4 (same shape, different repo/type name, both sourced from the same API response).

- [ ] **Step 1: Add `xUrl` to the types**

In `gmr-admin/lib/types/reports.ts`, change:

```ts
export interface ReportAuthor {
  id: number;
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  createdAt: string;
  updatedAt: string;
}
```

to:

```ts
export interface ReportAuthor {
  id: number;
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  xUrl?: string;
  createdAt: string;
  updatedAt: string;
}
```

and change:

```ts
export interface AuthorFormData {
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
}
```

to:

```ts
export interface AuthorFormData {
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  xUrl?: string;
}
```

- [ ] **Step 2: Add `xUrl` to the Zod schema and default values**

In `gmr-admin/components/authors/author-form.tsx`, change:

```ts
const authorFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().optional(),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  linkedinUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});
```

to:

```ts
const authorFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().optional(),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  linkedinUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  xUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});
```

Change the `defaultValues`:

```ts
    defaultValues: author
      ? {
          name: author.name,
          role: author.role || '',
          bio: author.bio || '',
          imageUrl: author.imageUrl || '',
          linkedinUrl: author.linkedinUrl || '',
        }
      : {
          name: '',
          role: '',
          bio: '',
          imageUrl: '',
          linkedinUrl: '',
        },
```

to:

```ts
    defaultValues: author
      ? {
          name: author.name,
          role: author.role || '',
          bio: author.bio || '',
          imageUrl: author.imageUrl || '',
          linkedinUrl: author.linkedinUrl || '',
          xUrl: author.xUrl || '',
        }
      : {
          name: '',
          role: '',
          bio: '',
          imageUrl: '',
          linkedinUrl: '',
          xUrl: '',
        },
```

- [ ] **Step 3: Add the form field**

In the same file, after the `linkedinUrl` `FormField` block (which ends right before the closing `</CardContent>`), add:

```tsx
            <FormField
              control={form.control}
              name="xUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>X (Twitter) Profile</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://x.com/username"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>X (Twitter) profile URL (optional)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
```

- [ ] **Step 4: Type-check and build**

Run: `cd gmr-admin && npm run type-check`
Expected: exits 0, no errors.

- [ ] **Step 5: Manual verification**

Run: `cd gmr-admin && npm run dev`, open `/authors` (or wherever the author create/edit route is — check `lib/navigation.ts` if unsure), create or edit an author, enter `https://x.com/testuser` in the new "X (Twitter) Profile" field, save. Confirm the save succeeds (network tab shows `xUrl` in the request and response) and reopening the edit form shows the value persisted.

- [ ] **Step 6: Commit**

```bash
cd gmr-admin
git add lib/types/reports.ts components/authors/author-form.tsx
git commit -m "feat(authors): add X (Twitter) URL field to author form"
```

---

### Task 4: Frontend — `ApiAuthor.xUrl` type and `AuthorHoverCard` component

**Files:**
- Modify: `gmr/lib/api/common.types.ts`
- Create: `gmr/components/authors/AuthorHoverCard.tsx`

**Interfaces:**
- Consumes: `ApiAuthor` (existing, extended with `xUrl`), `slugify` from `@/lib/utils` (existing), `Report` type `{ slug: string; title: string }` (existing, `gmr/lib/api/reports.types.ts`).
- Produces:
  ```ts
  interface AuthorHoverCardProps {
    author: ApiAuthor;
    articleCount: number;
    latestPosts: { title: string; slug: string; href: string }[];
    children: React.ReactNode;
  }
  export default function AuthorHoverCard(props: AuthorHoverCardProps): JSX.Element;
  ```
  Consumed by Task 5 (statistic and press-release pages).

- [ ] **Step 1: Add `xUrl` to `ApiAuthor`**

In `gmr/lib/api/common.types.ts`, change:

```ts
export interface ApiAuthor {
  id: number;
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  createdAt: string;
  updatedAt: string;
}
```

to:

```ts
export interface ApiAuthor {
  id: number;
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  xUrl?: string;
  createdAt: string;
  updatedAt: string;
}
```

- [ ] **Step 2: Create the `AuthorHoverCard` component**

Create `gmr/components/authors/AuthorHoverCard.tsx`:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import type { ApiAuthor } from '@/lib/api/common.types';

interface AuthorHoverCardProps {
  author: ApiAuthor;
  articleCount: number;
  latestPosts: { title: string; slug: string; href: string }[];
  children: React.ReactNode;
}

export default function AuthorHoverCard({
  author,
  articleCount,
  latestPosts,
  children,
}: AuthorHoverCardProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  useEffect(() => () => cancelClose(), []);

  const authorHref = `/authors/${slugify(author.name)}`;

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="flex items-center gap-2.5 text-left"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {children}
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 w-80 max-w-[90vw] rounded-xl border border-[var(--border)] bg-white p-5 shadow-xl z-50 text-left"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <p className="text-lg font-bold text-[var(--foreground)]">{author.name}</p>
          <p className="mt-1 text-sm font-semibold text-[var(--primary)]">
            {author.role}
            {author.role && ' · '}
            {articleCount} Article{articleCount === 1 ? '' : 's'}
            {author.xUrl && (
              <a
                href={author.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name}'s X profile`}
                className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-white align-middle"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}
          </p>

          {author.bio && (
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] line-clamp-3">
              {author.bio}{' '}
              <Link href={authorHref} className="text-[var(--primary)] hover:underline whitespace-nowrap">
                See full bio
              </Link>
            </p>
          )}

          {latestPosts.length > 0 && (
            <>
              <div className="mt-4 border-t border-[var(--border)] pt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
                  Latest Posts:
                </p>
                <ul className="mt-2 space-y-2">
                  {latestPosts.map((post) => (
                    <li key={post.slug} className="flex gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full border border-[var(--muted-foreground)]" />
                      <Link href={post.href} className="text-[var(--foreground)] hover:text-[var(--primary)]">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `cd gmr && npx tsc --noEmit`
Expected: exits 0, no errors related to `AuthorHoverCard.tsx` or `common.types.ts`.

- [ ] **Step 4: Commit**

```bash
cd gmr
git add lib/api/common.types.ts components/authors/AuthorHoverCard.tsx
git commit -m "feat(authors): add AuthorHoverCard component and xUrl type"
```

---

### Task 5: Frontend — wire `AuthorHoverCard` into statistic and press-release pages

**Files:**
- Modify: `gmr/app/statistic/[slug]/page.tsx`
- Modify: `gmr/app/press-release/[slug]/page.tsx`

**Interfaces:**
- Consumes: `AuthorHoverCard` (Task 4), `getReportsByAuthorId` (existing, `gmr/lib/api/authors.ts`, returns `ApiResponse<Report[]>` where `Report` has `slug` and `title`), `isApiError` (existing, `gmr/lib/api`).

- [ ] **Step 1: Fetch author reports in the statistic page**

In `gmr/app/statistic/[slug]/page.tsx`, change the existing import line:

```ts
import { getBlogs, getBlogBySlug, isApiError } from "@/lib/api";
```

to:

```ts
import { getBlogs, getBlogBySlug, getReportsByAuthorId, isApiError } from "@/lib/api";
```

and add a new import line for the component:

```ts
import AuthorHoverCard from "@/components/authors/AuthorHoverCard";
```

After `const blog = response.data;` (currently line 90), add:

```ts
  const authorReportsResponse = blog.authorDetails
    ? await getReportsByAuthorId(blog.authorDetails.id, { status: 'published', limit: 1000 })
    : null;
  const authorReports =
    authorReportsResponse && !isApiError(authorReportsResponse) ? authorReportsResponse.data : [];
  const authorArticleCount = authorReports.length;
  const authorLatestPosts = authorReports
    .filter((r) => r.slug !== blog.slug)
    .slice(0, 4)
    .map((r) => ({ title: r.title, slug: r.slug, href: `/reports/${r.slug}` }));
```

- [ ] **Step 2: Replace the static avatar+name markup with the hover card**

In the same file, change the author bar's inner block:

```tsx
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ background: 'var(--accent)' }}
              >
                {blog.author.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <span className="font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{blog.author}</span>
            </div>
```

to:

```tsx
            {blog.authorDetails ? (
              <AuthorHoverCard
                author={blog.authorDetails}
                articleCount={authorArticleCount}
                latestPosts={authorLatestPosts}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: 'var(--accent)' }}
                >
                  {blog.author.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <span className="font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{blog.author}</span>
              </AuthorHoverCard>
            ) : (
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: 'var(--accent)' }}
                >
                  {blog.author.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <span className="font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>{blog.author}</span>
              </div>
            )}
```

- [ ] **Step 3: Repeat Steps 1–2 for the press-release page**

In `gmr/app/press-release/[slug]/page.tsx`, change the existing import line:

```ts
import { getPressReleases, getPressReleaseBySlug, getReportBySlug, isApiError } from "@/lib/api";
```

to:

```ts
import { getPressReleases, getPressReleaseBySlug, getReportBySlug, getReportsByAuthorId, isApiError } from "@/lib/api";
```

and add the same `AuthorHoverCard` import used in Step 1. Then apply the same two changes as Steps 1–2, substituting `pressRelease` for `blog` throughout (`pressRelease.authorDetails`, `pressRelease.slug`, `pressRelease.author`).

- [ ] **Step 4: Type-check and build**

Run: `cd gmr && npm run build`
Expected: build succeeds with no type errors in either modified page or in `AuthorHoverCard.tsx`.

- [ ] **Step 5: Manual verification**

Run: `cd gmr && npm run dev`. Open a statistic detail page (`/statistic/<slug>`) for a blog whose author has `linkedinUrl`/`xUrl`/`bio` set in the admin (set one via Task 3 if none exists). Confirm:
- Hovering the avatar/name on desktop opens the card within ~0ms and it doesn't flicker when moving the mouse from the trigger into the card.
- The card shows role, article count, the X icon (only if `xUrl` set) linking out in a new tab, truncated bio with a working "See full bio" link to `/authors/<slug>`, and up to 4 "Latest Posts" links that navigate to `/reports/<slug>`.
- Clicking the trigger on a mobile-width viewport (e.g. browser dev tools responsive mode) toggles the card open/closed, and clicking outside it closes it.
- Repeat on a press-release detail page (`/press-release/<slug>`).
- Open a statistic/press-release page whose blog/pressRelease has no `authorDetails` (only a plain `author` string) — confirm the plain avatar+name still renders with no console errors and no hover card.

- [ ] **Step 6: Commit**

```bash
cd gmr
git add app/statistic/\[slug\]/page.tsx app/press-release/\[slug\]/page.tsx
git commit -m "feat(authors): wire AuthorHoverCard into statistic and press-release pages"
```

---

### Task 6: Frontend — X icon on `AuthorCard` and `AuthorProfile`

**Files:**
- Modify: `gmr/components/authors/AuthorCard.tsx`
- Modify: `gmr/components/authors/AuthorProfile.tsx`

**Interfaces:**
- Consumes: `ApiAuthor.xUrl` (Task 4).

- [ ] **Step 1: Add the X icon to `AuthorCard.tsx`**

In `gmr/components/authors/AuthorCard.tsx`, after the closing `</a>` of the existing `author.linkedinUrl &&` block (inside the `<div className="flex items-center gap-2">` that also wraps the `CardTitle` link), add:

```tsx
              {author.xUrl && (
                <a
                  href={author.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700 transition-colors"
                  aria-label={`${author.name}'s X profile`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
```

- [ ] **Step 2: Add the X icon to `AuthorProfile.tsx`**

In `gmr/components/authors/AuthorProfile.tsx`, after the closing `</a>` of the existing `author.linkedinUrl &&` block (inside the `<div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">`), add:

```tsx
                {author.xUrl && (
                  <a
                    href={author.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-700 transition-colors w-fit"
                    aria-label={`${author.name}'s X profile`}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
```

- [ ] **Step 3: Type-check and build**

Run: `cd gmr && npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 4: Manual verification**

Run: `cd gmr && npm run dev`. Open `/authors` and `/authors/<slug>` for an author with `xUrl` set — confirm the X icon renders next to the LinkedIn icon in both the card grid and the profile header, and opens the correct URL in a new tab. For an author without `xUrl`, confirm no broken/empty icon shows.

- [ ] **Step 5: Commit**

```bash
cd gmr
git add components/authors/AuthorCard.tsx components/authors/AuthorProfile.tsx
git commit -m "feat(authors): show X icon on AuthorCard and AuthorProfile"
```
