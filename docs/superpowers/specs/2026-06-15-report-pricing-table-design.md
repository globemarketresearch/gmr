# Report Pricing Table (Global / Region / Country Editions)

**Date:** 2026-06-15
**Status:** Approved

## Summary

Add a tabbed pricing table to the report detail page (`/reports/[slug]`), modeled on the Cognitive Market Research pricing UI (Global Edition / Region Edition / Country Edition tabs, each with Single User / Corporate / Excel / Student license cards). Pricing data comes from `Report_Pricing_Structure_ 1.docx`. Also realign the existing sidebar `CTAPanel` license tiers to match the Global Edition prices so the two widgets are consistent.

## Data Source

All prices and scope text below are taken directly from `Report_Pricing_Structure_ 1.docx`. No discounts/strikethrough prices are shown (the docx has no "original price" data — see brainstorm decision).

| Edition | Single User | Corporate User | Excel | Student |
|---|---|---|---|---|
| Global Edition | $3,499 | $5,449 (badge: "Most Popular") | $1,799 | $799 |
| Region Edition | $2,999 | $4,199 | $1,499 | $699 |
| Country Edition | $1,999 | $2,690 | $990 | $499 |

Per-tier content (from docx):

- **Global Edition** — Report Scope: "Competitor Analysis, 6 Regions, 34 Countries." / Country-Level Segmentation: "Top 15 Countries, Segmentation Analysis" (Single/Corporate/Excel tiers).
  - Single: Deliverables "PDF + Excel"; features: report accessible by 1 user only, free 15% or 32 hours of customisation, free post-sale service assistance, direct access to lead analysts – 4 hours free consultation.
  - Corporate: Deliverables "PDF + Excel + PPT"; features: all single-tier features plus, free 30% or 64 hours of customisation, unlimited user access (within organization), exclusive previews of upcoming research, 15% discount on next purchase, direct access to lead analysts – 8 hours free consultation.
  - Excel: Deliverables "Raw Data Workbook (.xlsx)"; features: all data tables & charts, granular market splits included, full data customization.
  - Student: Report Scope "Academic Use Only"; note: data subject to submission of university ID + specific data available as part of project usage, rest confidential — contact sales for access.

- **Region Edition** — Report Scope: "Full breakdown of 1 Target Regional Zone."
  - Single: Deliverables "PDF + Excel"; features: report accessible by 1 user only, free 15% or 32 hours of customisation, direct access to lead analysts – 3 hours free consultation.
  - Corporate: Deliverables "PDF + Excel + PPT"; features: unlimited regional sharing, free 30% or 64 hours of customisation, direct access to lead analysts – 6 hours free consultation.
  - Excel: Deliverables "Raw Data Workbook (.xlsx)"; features: regional data tables & charts.
  - Student: Report Scope "Academic Use Only"; same note as Global.

- **Country Edition** — Report Scope: "Isolated 1 Country Specific Data Matrix."
  - Single: Deliverables "PDF + Excel"; features: report accessible by 1 user only, free 15% or 32 hours of customisation, direct access to lead analysts – 3 hours free consultation.
  - Corporate: Deliverables "PDF + Excel + PPT"; features: enterprise-wide country sharing, free 30% or 64 hours of customisation, direct access to lead analysts – 6 hours free consultation.
  - Excel: Deliverables "Raw Data Workbook (.xlsx)"; features: single country tables & charts.
  - Student: Report Scope "Academic Use Only"; same note as Global.

"Commercials" accordion content is generic and identical across all tiers/editions (not in docx — standard boilerplate):
- Delivery: Email delivery within 24–48 hours of payment confirmation
- Payment: Secure online payment (card) or invoice on request for corporate orders
- License terms: For use by the licensed individual/organization only; redistribution outside license terms is prohibited

## Data Layer

**File:** `lib/pricing-tiers.ts` (new)

```ts
export type PricingEditionId = 'global' | 'region' | 'country';
export type PricingLicenseId = 'single' | 'corporate' | 'excel' | 'student';

export interface PricingTier {
  id: PricingLicenseId;
  name: string;
  price: number;
  badge?: string;
  reportScope: string;
  countrySegmentation?: string;
  deliverables: string;
  features: string[];
  academicNote?: string;
}

export interface PricingEdition {
  id: PricingEditionId;
  label: string;
  tiers: PricingTier[];
}

export const PRICING_EDITIONS: PricingEdition[];
export const PRICING_COMMERCIALS: string[]; // shared "Commercials" bullets

export function getPricingEditionById(id: string): PricingEdition;
```

## New Component: `components/reports/ReportPricingSection.tsx`

Client component (`"use client"` — needs tab/accordion state).

**Structure:**
- Section heading "Report Pricing" + static "Currency: USD" label (top-right, non-interactive — no real currency conversion).
- Tab row: Global Edition / Region Edition / Country Edition (icon + label, active-tab underline style similar to screenshot).
- Below tabs: responsive grid of 4 cards (1 col mobile, 2 col tablet, 4 col desktop) for the active edition's tiers.

**Card contents (per tier):**
- Header: tier name; Corporate tier gets a "Most Popular" ribbon badge (top-right corner, matching screenshot's red ribbon style).
- Price: `$X,XXX` large bold.
- Accordion 1 — **Data Included** (default open): report scope text, country-level segmentation (if present), or academic-use note for Student tier.
- Accordion 2 — **Access & Deliverables** (default closed): "Deliverables: ..." line + features bullet list (with check icons).
- Accordion 3 — **Commercials** (default closed): shared `PRICING_COMMERCIALS` bullets.
- "Buy Now — {Tier Name}" button at bottom → `/checkout/{reportId ?? reportSlug}?edition={editionId}&license={tierId}`. For Student tier, button reads "Request Access" and links to `/contact` instead (academic access requires manual verification).

**Accordion implementation:** simple local `useState<Set<string>>` per card (no external library), reusing existing disclosure chevron pattern if one exists in `components/ui` (otherwise inline SVG chevron consistent with `FAQ.tsx`/`StyledReportContent`).

## Placement in `app/reports/[slug]/page.tsx`

- Render `<ReportPricingSection reportId={report.id} reportSlug={report.slug} />` inside `<article>`, right after the metric-cards section (`section.mb-10`) and before "Market Size and Forecast" / Executive Summary.
- Wrap in `<section id="pricing" className="mb-12">` with heading `<h2 id="pricing">Report Pricing</h2>` (consistent with other section headings — `text-2xl font-bold text-[var(--teal-deep)] mb-6 scroll-mt-24`).
- For `hasFullContent` reports, add a "Pricing" entry to `sidebarTOC` (in the `staticSections`/`allSections` array, alongside "Competitive Landscape").

## Sidebar Realignment: `lib/license-tiers.ts`

Update `LICENSE_TIERS` array (consumed by `CTAPanel.tsx`, unchanged structurally) to match the **Global Edition** tier data from `PRICING_EDITIONS`:

| id | name | price | badge |
|---|---|---|---|
| single | Single User | 3499 | — |
| corporate | Corporate | 5449 | "Most Popular" |
| excel | Excel | 1799 | — |
| student | Student | 799 | — |

`includes` arrays use each tier's `features` (trimmed to ~4 items for sidebar compactness). The `id` union type changes from `'single' | 'multi' | 'corporate' | 'dataset'` to `'single' | 'corporate' | 'excel' | 'student'` — `CTAPanel.tsx` and `getLicenseTierById` need no other changes since they're generic over `LicenseTier`.

## Out of Scope

- Real currency conversion/selector (static "USD" label only)
- Per-report pricing variation (all reports use the same static config)
- Discount/strikethrough pricing (not present in source docx)
- Backend/checkout changes beyond passing `edition`/`license` query params (existing `/checkout/[id]` route already reads `license`; `edition` param can be ignored by checkout for now if unused)
