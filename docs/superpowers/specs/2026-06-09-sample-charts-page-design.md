# Sample Charts Page — Design Spec
_Date: 2026-06-09_

## Overview

After a successful request-sample form submission, redirect the user to `/sample-charts` — a showcase page demonstrating the types of interactive visualizations that appear inside GMR research reports. The page is publicly accessible (not gated) and uses Recharts, which is already installed.

---

## Routing & Navigation

- **New route:** `app/sample-charts/page.tsx` (client component — `"use client"` required for Recharts)
- **Redirect trigger:** In `app/request-sample/RequestSampleForm.tsx`, replace the `setSubmitted(true)` inline success state with `router.push('/sample-charts')` using Next.js `useRouter`.
- The page is reachable directly via URL with no query params required.

---

## Page Layout

### Hero Section
- Heading: "Interactive Data Visualizations"
- Sub-heading: "Every GMR report includes interactive charts like these — built for clarity, precision, and insight."
- Badge: "Report Preview"

### Charts Grid
- 2 charts per row using a CSS grid (`grid-cols-1 md:grid-cols-2`)
- Each chart lives in a `Card` component with a title and short description
- Charts are full-width within their card, height ~320px each
- All charts use the existing `var(--primary)` and complementary palette

### Footer CTA
- Brief copy: "Ready to explore the full report?"
- Button linking back to `/reports`

---

## Charts (ordered most → least common in market research)

| # | Chart Type | Title | Data Theme |
|---|-----------|-------|------------|
| 1 | **Line Chart** | Global Market Size (2020–2032) | USD Billion by year |
| 2 | **Bar Chart** | Revenue by Region (2024) | North America, Europe, APAC, MEA, LATAM |
| 3 | **Area Chart** | Cumulative Market Growth | Stacked area by segment |
| 4 | **Pie / Donut Chart** | Market Share by Segment (2024) | % breakdown of 5 segments |
| 5 | **Stacked Bar Chart** | Segment Revenue 2020–2024 | Multiple series stacked |
| 6 | **Scatter Chart** | Price vs. Volume by Product | Bubble scatter |
| 7 | **Radar Chart** | Competitive Positioning | 6 dimensions across 3 players |
| 8 | **Radial Bar Chart** | Key Performance Indicators | 4 KPI gauges |
| 9 | **Composed Chart** | Historical + Forecast (Bar+Line) | Revenue bar + CAGR line overlay |
| 10 | **Treemap** | Market Segment Hierarchy | Nested revenue segments |
| 11 | **Funnel Chart** | Market Adoption Pipeline | Awareness → Purchase stages |

Row 6 (Funnel) renders alone on the left; right cell is empty or a CTA card.

---

## Data

All data is **static, hardcoded** — realistic-looking market research figures (USD billions, percentages, CAGR values). No API calls, no dynamic loading. Data is co-located in the page file or a sibling `data.ts` file.

---

## Component Structure

```
app/
  sample-charts/
    page.tsx          ← "use client", renders hero + charts grid
    data.ts           ← all hardcoded chart datasets
```

Recharts components used: `LineChart`, `BarChart`, `AreaChart`, `PieChart`, `RadarChart`, `RadialBarChart`, `ComposedChart`, `Treemap`, `FunnelChart`, `ScatterChart` — all from `recharts`.

Each chart is wrapped with `ResponsiveContainer width="100%" height={320}`.

---

## Styling

- Uses existing `Card`, `Section`, `Container`, `Badge`, `Button` from `@/components/ui`
- Color palette: `var(--primary)` + `#3b82f6`, `#10b981`, `#f59e0b`, `#ef4444`, `#8b5cf6`
- Tooltip enabled on all charts via Recharts `<Tooltip />`
- Legend enabled where applicable
- No dark-mode-specific overrides needed (CSS vars handle it)

---

## Out of Scope

- No server-side data fetching
- No chart download/export functionality
- No animation beyond Recharts defaults
- No gating — page is public
