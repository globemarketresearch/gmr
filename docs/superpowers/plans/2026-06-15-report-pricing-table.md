# Report Pricing Table Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a tabbed Global/Region/Country Edition pricing table (4 license cards each) to the report detail page, sourced from `Report_Pricing_Structure_ 1.docx`, and realign the sidebar `CTAPanel` license tiers to the same Global Edition prices.

**Architecture:** A new static data module (`lib/pricing-tiers.ts`) holds all editions/tiers/prices. A new client component (`components/reports/ReportPricingSection.tsx`) renders edition tabs + 4 pricing cards with accordions, and is inserted into the report page's main article. `lib/license-tiers.ts` is updated in place (consumed unchanged by `CTAPanel.tsx`).

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind, lucide-react icons. No test framework in this repo — verification is via `npm run lint`, `npm run build`, and a manual dev-server check.

---

### Task 1: Pricing data module

**Files:**
- Create: `lib/pricing-tiers.ts`

- [ ] **Step 1: Create the data file**

```ts
// lib/pricing-tiers.ts

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

const ACADEMIC_NOTE =
  'Data is subject to submission of a valid university ID. Specific data is available as part of project usage; the rest remains confidential. Email our sales team to request access.';

export const PRICING_EDITIONS: PricingEdition[] = [
  {
    id: 'global',
    label: 'Global Edition',
    tiers: [
      {
        id: 'single',
        name: 'Single User License',
        price: 3499,
        reportScope: 'Competitor Analysis, 6 Regions, 34 Countries.',
        countrySegmentation: 'Top 15 Countries, Segmentation Analysis',
        deliverables: 'PDF + Excel',
        features: [
          'Report accessible by 1 user only',
          'Free 15% or 32 hours of customisation',
          'Free post-sale service assistance',
          'Direct access to lead analysts – 4 hours free consultation',
        ],
      },
      {
        id: 'corporate',
        name: 'Corporate User License',
        price: 5449,
        badge: 'Most Popular',
        reportScope: 'Competitor Analysis, 6 Regions, 34 Countries.',
        countrySegmentation: 'Top 15 Countries, Segmentation Analysis',
        deliverables: 'PDF + Excel + PPT',
        features: [
          'All Single User License features, plus',
          'Free 30% or 64 hours of customisation',
          'Unlimited user access (within organization)',
          'Exclusive previews of upcoming research',
          '15% discount on your next purchase',
          'Direct access to lead analysts – 8 hours free consultation',
        ],
      },
      {
        id: 'excel',
        name: 'Excel License',
        price: 1799,
        reportScope: 'Competitor Analysis, 6 Regions, 34 Countries.',
        countrySegmentation: 'Top 15 Countries, Segmentation Analysis',
        deliverables: 'Raw Data Workbook (.xlsx)',
        features: [
          'All data tables & charts',
          'Granular market splits included',
          'Full data customization',
        ],
      },
      {
        id: 'student',
        name: 'Student User License',
        price: 799,
        reportScope: 'Academic Use Only',
        deliverables: 'PDF (Academic Edition)',
        features: [],
        academicNote: ACADEMIC_NOTE,
      },
    ],
  },
  {
    id: 'region',
    label: 'Region Edition',
    tiers: [
      {
        id: 'single',
        name: 'Single User License',
        price: 2999,
        reportScope: 'Full breakdown of 1 Target Regional Zone.',
        deliverables: 'PDF + Excel',
        features: [
          'Report accessible by 1 user only',
          'Free 15% or 32 hours of customisation',
          'Direct access to lead analysts – 3 hours free consultation',
        ],
      },
      {
        id: 'corporate',
        name: 'Corporate User License',
        price: 4199,
        reportScope: 'Full breakdown of 1 Target Regional Zone.',
        deliverables: 'PDF + Excel + PPT',
        features: [
          'Unlimited regional sharing',
          'Free 30% or 64 hours of customisation',
          'Direct access to lead analysts – 6 hours free consultation',
        ],
      },
      {
        id: 'excel',
        name: 'Excel License',
        price: 1499,
        reportScope: 'Full breakdown of 1 Target Regional Zone.',
        deliverables: 'Raw Data Workbook (.xlsx)',
        features: ['Regional data tables & charts'],
      },
      {
        id: 'student',
        name: 'Student User License',
        price: 699,
        reportScope: 'Academic Use Only',
        deliverables: 'PDF (Academic Edition)',
        features: [],
        academicNote: ACADEMIC_NOTE,
      },
    ],
  },
  {
    id: 'country',
    label: 'Country Edition',
    tiers: [
      {
        id: 'single',
        name: 'Single User License',
        price: 1999,
        reportScope: 'Isolated 1 Country Specific Data Matrix.',
        deliverables: 'PDF + Excel',
        features: [
          'Report accessible by 1 user only',
          'Free 15% or 32 hours of customisation',
          'Direct access to lead analysts – 3 hours free consultation',
        ],
      },
      {
        id: 'corporate',
        name: 'Corporate User License',
        price: 2690,
        reportScope: 'Isolated 1 Country Specific Data Matrix.',
        deliverables: 'PDF + Excel + PPT',
        features: [
          'Enterprise-wide country sharing',
          'Free 30% or 64 hours of customisation',
          'Direct access to lead analysts – 6 hours free consultation',
        ],
      },
      {
        id: 'excel',
        name: 'Excel License',
        price: 990,
        reportScope: 'Isolated 1 Country Specific Data Matrix.',
        deliverables: 'Raw Data Workbook (.xlsx)',
        features: ['Single country tables & charts'],
      },
      {
        id: 'student',
        name: 'Student User License',
        price: 499,
        reportScope: 'Academic Use Only',
        deliverables: 'PDF (Academic Edition)',
        features: [],
        academicNote: ACADEMIC_NOTE,
      },
    ],
  },
];

export const PRICING_COMMERCIALS: string[] = [
  'Delivery: Email delivery within 24–48 hours of payment confirmation',
  'Payment: Secure online payment (card) or invoice on request for corporate orders',
  'License terms: For use by the licensed individual/organization only; redistribution outside license terms is prohibited',
];

export function getPricingEditionById(id: string): PricingEdition {
  return PRICING_EDITIONS.find((e) => e.id === id) ?? PRICING_EDITIONS[0];
}
```

- [ ] **Step 2: Type-check the new file**

Run: `npx tsc --noEmit`
Expected: No errors referencing `lib/pricing-tiers.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/pricing-tiers.ts
git commit -m "feat: add static pricing tiers data for report editions"
```

---

### Task 2: Realign sidebar license tiers to Global Edition pricing

**Files:**
- Modify: `lib/license-tiers.ts` (full rewrite)

- [ ] **Step 1: Replace the file contents**

```ts
export interface LicenseTier {
  id: 'single' | 'corporate' | 'excel' | 'student';
  name: string;
  price: number;
  badge?: string;
  includes: string[];
  notIncluded?: string[];
}

export const LICENSE_TIERS: LicenseTier[] = [
  {
    id: 'single',
    name: 'Single User',
    price: 3499,
    includes: [
      'Report accessible by 1 user only',
      'PDF + Excel formats',
      'Free 15% or 32 hours of customisation',
      'Free post-sale service assistance',
      'Direct access to lead analysts – 4 hours free consultation',
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate',
    price: 5449,
    badge: 'Most Popular',
    includes: [
      'Unlimited user access (within organization)',
      'PDF + Excel + PPT formats',
      'Free 30% or 64 hours of customisation',
      'Exclusive previews of upcoming research',
      'Direct access to lead analysts – 8 hours free consultation',
    ],
  },
  {
    id: 'excel',
    name: 'Excel',
    price: 1799,
    includes: [
      'Raw Data Workbook (.xlsx)',
      'All data tables & charts',
      'Granular market splits included',
      'Full data customization',
    ],
  },
  {
    id: 'student',
    name: 'Student',
    price: 799,
    includes: [
      'Academic use only',
      'PDF (Academic Edition)',
      'Requires valid university ID',
      'Email sales for data access',
    ],
  },
];

export function getLicenseTierById(id: string): LicenseTier {
  return LICENSE_TIERS.find((t) => t.id === id) ?? LICENSE_TIERS[0];
}
```

- [ ] **Step 2: Type-check consumers**

Run: `npx tsc --noEmit`
Expected: No errors in `components/reports/CTAPanel.tsx`, `components/checkout/CheckoutForm.tsx`, or `components/checkout/OrderSummary.tsx` (they all use `tier.id`/`getLicenseTierById` generically with `string`, so the narrowed union is compatible).

- [ ] **Step 3: Commit**

```bash
git add lib/license-tiers.ts
git commit -m "feat: realign sidebar license tiers to Global Edition pricing"
```

---

### Task 3: Pricing section component

**Files:**
- Create: `components/reports/ReportPricingSection.tsx`
- Modify: `components/reports/index.ts`

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, Button } from '@/components/ui';
import { Globe2, MapPin, Flag, Check, ChevronDown } from 'lucide-react';
import {
  PRICING_EDITIONS,
  PRICING_COMMERCIALS,
  type PricingEditionId,
  type PricingTier,
} from '@/lib/pricing-tiers';

interface ReportPricingSectionProps {
  reportId?: number;
  reportSlug?: string;
}

const EDITION_ICONS: Record<PricingEditionId, React.ReactNode> = {
  global: <Globe2 className="w-4 h-4" aria-hidden="true" />,
  region: <MapPin className="w-4 h-4" aria-hidden="true" />,
  country: <Flag className="w-4 h-4" aria-hidden="true" />,
};

interface PricingAccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function PricingAccordion({ title, defaultOpen, children }: PricingAccordionProps) {
  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <div className="border-t border-[var(--border)] pt-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left text-xs font-semibold uppercase tracking-wide text-[var(--primary)] py-1.5"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="pb-2 text-xs text-[var(--muted-foreground)] space-y-2">{children}</div>
      )}
    </div>
  );
}

interface PricingCardProps {
  tier: PricingTier;
  editionId: PricingEditionId;
  reportId?: number;
  reportSlug?: string;
}

function PricingCard({ tier, editionId, reportId, reportSlug }: PricingCardProps) {
  const isStudent = tier.id === 'student';
  const buyHref = isStudent
    ? '/contact'
    : `/checkout/${reportId ?? reportSlug}?edition=${editionId}&license=${tier.id}`;
  const buyLabel = isStudent
    ? 'Request Access'
    : `Buy Now — ${tier.name.replace(' License', '').replace(' User', '')}`;

  return (
    <Card className={`relative flex flex-col ${tier.badge ? 'border-[var(--primary)] shadow-primary' : ''}`}>
      {tier.badge && (
        <span className="absolute -top-2.5 right-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
          {tier.badge}
        </span>
      )}
      <CardContent className="flex flex-col flex-1 space-y-3 pt-5">
        <h3 className="text-sm font-bold text-[var(--foreground)]">{tier.name}</h3>
        <p className="text-2xl font-bold text-[var(--primary)]">${tier.price.toLocaleString()}</p>

        <PricingAccordion title="Data Included" defaultOpen>
          {isStudent ? (
            <p>{tier.academicNote}</p>
          ) : (
            <>
              <p className="font-semibold text-[var(--foreground)]">Report Scope</p>
              <p>{tier.reportScope}</p>
              {tier.countrySegmentation && (
                <>
                  <p className="font-semibold text-[var(--foreground)] mt-2">Country-Level Segmentation</p>
                  <p>{tier.countrySegmentation}</p>
                </>
              )}
            </>
          )}
        </PricingAccordion>

        <PricingAccordion title="Access & Deliverables">
          <p>
            <span className="font-semibold text-[var(--foreground)]">Deliverables: </span>
            {tier.deliverables}
          </p>
          {tier.features.length > 0 && (
            <ul className="space-y-1.5 mt-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </PricingAccordion>

        <PricingAccordion title="Commercials">
          <ul className="space-y-1.5">
            {PRICING_COMMERCIALS.map((line) => (
              <li key={line} className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </PricingAccordion>

        <div className="flex-1" />

        <Link href={buyHref} className="block">
          <Button className="w-full relative overflow-hidden btn-glow-teal" size="lg">
            {buyLabel}
            <span className="btn-shine" aria-hidden="true" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export function ReportPricingSection({ reportId, reportSlug }: ReportPricingSectionProps) {
  const [activeEdition, setActiveEdition] = useState<PricingEditionId>('global');
  const edition = PRICING_EDITIONS.find((e) => e.id === activeEdition) ?? PRICING_EDITIONS[0];

  return (
    <section id="pricing" className="mb-12 scroll-mt-24">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <h2 className="text-2xl font-bold text-[var(--teal-deep)]">Report Pricing</h2>
        <span className="text-xs font-medium text-[var(--muted-foreground)] border border-[var(--border)] rounded-md px-3 py-1.5">
          Currency: USD
        </span>
      </div>

      <div className="flex items-center gap-2 border-b border-[var(--border)] mb-6 overflow-x-auto">
        {PRICING_EDITIONS.map((ed) => (
          <button
            key={ed.id}
            type="button"
            onClick={() => setActiveEdition(ed.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors duration-150 whitespace-nowrap ${
              activeEdition === ed.id
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
            aria-pressed={activeEdition === ed.id}
          >
            {EDITION_ICONS[ed.id]}
            {ed.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {edition.tiers.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            editionId={edition.id}
            reportId={reportId}
            reportSlug={reportSlug}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Export from the reports component index**

In `components/reports/index.ts`, add:

```ts
export { ReportPricingSection } from './ReportPricingSection';
```

- [ ] **Step 3: Type-check and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: No errors or warnings for the new files.

- [ ] **Step 4: Commit**

```bash
git add components/reports/ReportPricingSection.tsx components/reports/index.ts
git commit -m "feat: add tabbed report pricing section component"
```

---

### Task 4: Wire pricing section into the report page

**Files:**
- Modify: `app/reports/[slug]/page.tsx`

- [ ] **Step 1: Import the component**

Near the other component imports (around line 17-19), add:

```tsx
import { ReportPricingSection } from "@/components/reports/ReportPricingSection";
```

- [ ] **Step 2: Add "Report Pricing" to the sidebar TOC for full-content reports**

In the `if (hasFullContent && report.marketDetails) { ... }` block (around lines 212-238), the TOC is assembled as:

```tsx
    const allSections: SidebarTOCItem[] = [
      ...toc,
      ...staticSections,
      ...addStaticSectionsToTOC(
        [],
        !!(report.authors && report.authors.length > 0),
        !!(report.faqs && report.faqs.length > 0)
      )
    ];

    sidebarTOC = allSections;
```

Change it to prepend a pricing entry so it appears first in the sidebar nav (matching its position as the first section in the article body):

```tsx
    const allSections: SidebarTOCItem[] = [
      { id: 'pricing', title: 'Report Pricing', level: 2 },
      ...toc,
      ...staticSections,
      ...addStaticSectionsToTOC(
        [],
        !!(report.authors && report.authors.length > 0),
        !!(report.faqs && report.faqs.length > 0)
      )
    ];

    sidebarTOC = allSections;
```

- [ ] **Step 3: Render the section in the article**

The metric cards section currently ends like this (around lines 575-592):

```tsx
              <section className="mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {metricCards.map((card) => (
                    <Card
                      key={card.label}
                      className={`${card.bg} border border-transparent hover:border-[#0284c7]/30 hover:from-[#bdd8ed] hover:to-[#d6ecf8] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default`}
                    >
                      <CardContent className="flex items-center gap-3" style={{padding: '8px'}}>
                        {card.icon}
                        <div>
                          <p className={`text-sm lg:text-[10px] 2xl:text-xs font-semibold ${card.labelColor}`}>{card.label}</p>
                          <p className={`text-lg lg:text-xs 2xl:text-base font-bold ${card.valueColor}`}>{card.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {hasFullContent ? (
```

Insert the pricing section between the metric-cards `</section>` and the `{hasFullContent ? (` line:

```tsx
              <section className="mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {metricCards.map((card) => (
                    <Card
                      key={card.label}
                      className={`${card.bg} border border-transparent hover:border-[#0284c7]/30 hover:from-[#bdd8ed] hover:to-[#d6ecf8] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default`}
                    >
                      <CardContent className="flex items-center gap-3" style={{padding: '8px'}}>
                        {card.icon}
                        <div>
                          <p className={`text-sm lg:text-[10px] 2xl:text-xs font-semibold ${card.labelColor}`}>{card.label}</p>
                          <p className={`text-lg lg:text-xs 2xl:text-base font-bold ${card.valueColor}`}>{card.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <ReportPricingSection reportId={report.id} reportSlug={report.slug} />

              {hasFullContent ? (
```

- [ ] **Step 4: Type-check, lint, and build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: All pass with no new errors/warnings.

- [ ] **Step 5: Manual check in dev server**

Run: `npm run dev`, open `http://localhost:3000/reports/<any-existing-report-slug>` (pick a slug from `data/reports.json`).

Verify:
- "Report Pricing" section appears after the 4 metric cards, with Global/Region/Country Edition tabs (Global active by default).
- Each edition shows 4 cards (Single, Corporate w/ "Most Popular" badge, Excel, Student) with correct prices ($3,499 / $5,449 / $1,799 / $799 for Global; $2,999 / $4,199 / $1,499 / $699 for Region; $1,999 / $2,690 / $990 / $499 for Country).
- "Data Included" accordion is open by default; "Access & Deliverables" and "Commercials" expand/collapse on click.
- "Buy Now — ..." buttons link to `/checkout/<id>?edition=<edition>&license=<tier>`; Student's "Request Access" links to `/contact`.
- For a report with full TOC content, "Report Pricing" appears as the first sidebar TOC entry and scrolling to it works.
- Sidebar `CTAPanel` (right column) now shows Single $3,499 / Corporate $5,449 ("Most Popular") / Excel $1,799 / Student $799.

- [ ] **Step 6: Commit**

```bash
git add app/reports/[slug]/page.tsx
git commit -m "feat: wire report pricing section into report detail page"
```

---

## Self-Review Notes

- Spec coverage: pricing data module (Task 1), sidebar realignment (Task 2), pricing section component with tabs/accordions/badges/buy buttons (Task 3), page placement + TOC entry (Task 4) — all spec sections covered. Currency/discounts/per-report variation explicitly out of scope and not implemented.
- Type consistency: `PricingEditionId`/`PricingLicenseId`/`PricingTier`/`PricingEdition` defined in Task 1 are used as-is in Task 3 imports. `LicenseTier.id` union in Task 2 (`'single' | 'corporate' | 'excel' | 'student'`) matches `PricingLicenseId` in Task 1 for consistency, though they remain separate types per the spec (sidebar vs. full table).
- No placeholders: all data values, code, and commands are concrete.
