# Book a Consultation — Sidebar Card

**Date:** 2026-06-13  
**Status:** Approved

## Summary

Add a "Book a Consultation" card to the right sidebar of the report detail page (`/reports/[slug]`). The card lets users navigate to the existing `/contact` page to speak with an analyst before purchasing.

## Placement

Right sidebar in `ReportContentWrapper.tsx`, stacked order (top → bottom):

1. BriefWithAI
2. CustomizeReportCard (Request Sample)
3. **BookConsultationCard** ← new
4. CTAPanel (Buy Now)

## Component

**File:** `components/reports/BookConsultationCard.tsx`

- Follows the same pattern as `CustomizeReportCard` — `React.forwardRef`, `Card`/`CardContent` shell, no props beyond `className`
- No report-specific props needed (button always links to `/contact`)

**Card contents:**
- Icon: phone or calendar SVG (inline, consistent with existing icon style)
- Heading: "Talk to an Analyst"
- Body copy: "Get expert guidance on this report before you buy."
- Button: "Book a Consultation" → `href="/contact"`, teal gradient style (`btn-glow-teal`) to visually differentiate from blue (Request Sample) and orange (Buy Now)

## Changes

| File | Change |
|------|--------|
| `components/reports/BookConsultationCard.tsx` | New file |
| `components/reports/ReportContentWrapper.tsx` | Import and render `BookConsultationCard` between `CustomizeReportCard` and `CTAPanel` |

## Out of Scope

- No modal, no form, no new backend endpoint
- No sticky bar changes
- No inline content section changes
