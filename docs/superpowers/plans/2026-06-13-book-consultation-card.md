# Book a Consultation Sidebar Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Book a Consultation" card to the right sidebar of the report detail page, between the Request Sample card and the Buy Now panel.

**Architecture:** New `BookConsultationCard` component follows the existing `CustomizeReportCard` pattern exactly — `React.forwardRef`, `Card`/`CardContent` shell, inline SVG icon, teal button linking to `/contact`. One import + one JSX line added to `ReportContentWrapper.tsx`.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS, existing `@/components/ui` Card/Button primitives.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `components/reports/BookConsultationCard.tsx` | New sidebar card component |
| Modify | `components/reports/ReportContentWrapper.tsx` | Import and render the new card |

---

### Task 1: Create BookConsultationCard component

**Files:**
- Create: `components/reports/BookConsultationCard.tsx`

- [ ] **Step 1: Create the file with this exact content**

```tsx
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, Button } from '@/components/ui';

interface BookConsultationCardProps {
  className?: string;
}

export const BookConsultationCard = React.forwardRef<HTMLDivElement, BookConsultationCardProps>(
  ({ className }, ref) => {
    return (
      <Card ref={ref} className={className}>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
              style={{ background: 'rgba(29,174,191,0.12)' }}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#1DAEBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.28-1.28a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </span>
            <h3 className="text-lg font-bold leading-tight">Talk to an Analyst</h3>
          </div>

          <p className="text-sm text-[var(--muted-foreground)]">
            Get expert guidance on this report before you buy.
          </p>

          <Link href="/contact">
            <Button
              variant="outline"
              className="w-full mt-2 relative overflow-hidden bg-[#E0F7FA] text-[#00838F] hover:text-[#006064] hover:bg-[#B2EBF2] border-[#80DEEA] hover:border-[#4DD0E1] focus:ring-[#1DAEBF] btn-glow-teal"
              size="lg"
            >
              Book a Consultation
              <span className="btn-shine" aria-hidden="true" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }
);

BookConsultationCard.displayName = 'BookConsultationCard';
```

- [ ] **Step 2: Commit**

```bash
git add components/reports/BookConsultationCard.tsx
git commit -m "feat: add BookConsultationCard sidebar component"
```

---

### Task 2: Wire BookConsultationCard into ReportContentWrapper

**Files:**
- Modify: `components/reports/ReportContentWrapper.tsx`

- [ ] **Step 1: Add import at the top of the file (after the existing BriefWithAI import)**

Find this line in `components/reports/ReportContentWrapper.tsx`:
```tsx
import { BriefWithAI } from './BriefWithAI';
```

Add directly below it:
```tsx
import { BookConsultationCard } from './BookConsultationCard';
```

- [ ] **Step 2: Add JSX between CustomizeReportCard and CTAPanel**

Find this block in the right sidebar (around line 133):
```tsx
          <BriefWithAI reportTitle={reportTitle} reportSlug={reportSlug} />
          <CustomizeReportCard reportTitle={reportTitle} reportSlug={reportSlug} reportId={reportId} />
          <CTAPanel discounted_price={discounted_price} price={price} reportTitle={reportTitle} reportSlug={reportSlug} reportId={reportId} />
```

Replace with:
```tsx
          <BriefWithAI reportTitle={reportTitle} reportSlug={reportSlug} />
          <CustomizeReportCard reportTitle={reportTitle} reportSlug={reportSlug} reportId={reportId} />
          <BookConsultationCard />
          <CTAPanel discounted_price={discounted_price} price={price} reportTitle={reportTitle} reportSlug={reportSlug} reportId={reportId} />
```

- [ ] **Step 3: Verify the dev server compiles without errors**

Run: `npm run dev`  
Expected: Server starts on `http://localhost:3000` with no TypeScript or module errors in the terminal.

- [ ] **Step 4: Manually verify in browser**

Open any report page, e.g. `http://localhost:3000/reports/[any-slug]`.  
Expected: Right sidebar shows four cards in order — BriefWithAI, Request Sample, **Talk to an Analyst**, Buy Now. Clicking "Book a Consultation" navigates to `/contact`.

- [ ] **Step 5: Commit**

```bash
git add components/reports/ReportContentWrapper.tsx
git commit -m "feat: wire BookConsultationCard into report sidebar"
```
