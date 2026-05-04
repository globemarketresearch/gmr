# Report Components

Premium, enterprise-grade components for healthcare research report detail pages.

## Components

### TableOfContents

A sticky, interactive table of contents with automatic section highlighting based on scroll position.

**Features:**
- Sticky positioning on desktop (hidden on mobile)
- Auto-highlights active section using IntersectionObserver
- Smooth scroll navigation
- Visual hierarchy for nested sections
- Responsive design

**Usage:**
```tsx
import { TableOfContents } from '@/components/reports/TableOfContents';

const items = [
  { id: "overview", title: "Market Overview", level: 1 },
  { id: "market-size", title: "Market Size & Forecast", level: 1 },
  { id: "segmentation", title: "Market Segmentation", level: 1 },
  { id: "seg-type", title: "By Service Type", level: 2 },
];

<TableOfContents items={items} />
```

### CTAPanel

A conversion-optimized CTA panel for purchasing reports or requesting samples.

**Features:**
- Sticky positioning in sidebar
- Multiple action buttons (Buy, Request Sample, Ask Analyst)
- Pricing display with multi-user discount messaging
- Feature checklist (PDF/Excel, updates, support, customization)
- Professional styling with border accent

**Usage:**
```tsx
import { CTAPanel } from '@/components/reports/CTAPanel';

<CTAPanel price="$2,995" />
```

### MarketSizeChart

Static, CSS-based bar chart showing market size forecast with key metrics.

**Features:**
- No external chart library dependencies
- Responsive bar chart with hover tooltips
- Three metric cards (2024 size, 2032 projection, CAGR)
- Gradient styling for professional appearance
- Automatic data interpolation for forecast years

**Usage:**
```tsx
import { MarketSizeChart } from '@/components/reports/MarketSizeChart';

<MarketSizeChart
  marketSize2024="$87.4 billion"
  marketSize2032="$286.2 billion"
  cagr="16.8%"
/>
```

### SegmentationChart

Horizontal bar chart for displaying market segmentation data.

**Features:**
- Multiple color variants for different segments
- Percentage-based bars with smooth animations
- Optional CAGR display per segment
- Optional descriptions for segments
- Fully responsive

**Usage:**
```tsx
import { SegmentationChart } from '@/components/reports/SegmentationChart';

const segments = [
  { name: "Tele-consulting", share: "38.7%", description: "Real-time consultations" },
  { name: "Tele-monitoring", share: "29.4%", description: "Remote patient monitoring" },
];

<SegmentationChart
  title="By Service Type"
  segments={segments}
/>
```

## Report Data Structure

Reports with full detail page content should include the following extended fields in `data/reports.json`:

```typescript
{
  // Basic fields (existing)
  "id": 1,
  "slug": "report-slug",
  "title": "Report Title",
  "description": "Brief description",
  "category": "Category Name",
  "date": "December 15, 2025",
  "price": "$2,995",
  "region": "Global",
  "year": "2025",
  "reportType": "Market Analysis",
  "pages": 145,

  // Extended fields for detail page
  "reportCode": "TMD-2025-1145",
  "baseYear": "2024",
  "forecastPeriod": "2025-2032",
  "marketSize2024": "$87.4 billion",
  "marketSize2032": "$286.2 billion",
  "cagr": "16.8%",

  // Content sections
  "overview": "Long-form market overview text...",
  "keyFindings": [
    "Finding 1",
    "Finding 2"
  ],

  // Segmentation data
  "segmentation": {
    "byType": [
      { "name": "Segment Name", "share": "38.7%", "description": "Optional description" }
    ],
    "byApplication": [...],
    "byEndUser": [...],
    "byRegion": [
      { "name": "North America", "share": "45.2%", "cagr": "14.3%" }
    ]
  },

  // Key players
  "keyPlayers": [
    { "name": "Company Name", "marketShare": "14.2%", "headquarters": "United States" }
  ],

  // Table of contents
  "tableOfContents": [
    { "id": "overview", "title": "Market Overview", "level": 1 },
    { "id": "seg-type", "title": "By Service Type", "level": 2 }
  ]
}
```

## Layout Structure

The report detail page uses a 3-column grid layout on desktop:

```
┌─────────────────────────────────────────────────────┐
│ Breadcrumb Navigation                               │
├──────────┬────────────────────────┬─────────────────┤
│   TOC    │   Main Content         │   CTA Panel     │
│ (sticky) │                        │   (sticky)      │
│   3 col  │      6 col             │    3 col        │
│          │                        │                 │
│          │ - Header with badges   │ - Price         │
│          │ - Market Overview      │ - Buy buttons   │
│          │ - Market Size Chart    │ - Features      │
│          │ - Segmentation         │                 │
│          │ - Key Players          │                 │
│          │ - Drivers              │                 │
│          │ - Challenges           │                 │
└──────────┴────────────────────────┴─────────────────┘
```

On mobile/tablet, the layout stacks:
- TOC hidden (can be added as mobile menu if needed)
- Main content full width
- CTA panel at the end

## Design Principles

1. **B2B Professional**: Clean, neutral colors with strategic use of primary blue
2. **Scannable**: Clear section hierarchy, ample whitespace
3. **Data-Focused**: Charts and metrics prominently displayed
4. **Conversion-Optimized**: CTA panel always visible, multiple action options
5. **Performance**: No heavy chart libraries, CSS-only visualizations
6. **Accessibility**: Semantic HTML, keyboard navigation, ARIA labels

## Section Scroll Behavior

The TableOfContents component uses IntersectionObserver to track which section is currently visible:

- **Threshold**: Section is "active" when it crosses the top 100px of viewport
- **Visual Feedback**: Active section gets blue border and text color
- **Smooth Scroll**: Click navigation scrolls smoothly with offset for fixed header
- All content sections need `id` attributes matching TOC items
- Use `scroll-mt-24` class for proper offset with sticky elements

## Extending the Components

All components are built with composition in mind:

- Accept standard `className` prop for custom styling
- Use `React.forwardRef` for ref forwarding
- Leverage design system tokens (CSS variables)
- Follow existing patterns from `/components/ui`

Example extending SegmentationChart with custom colors:

```tsx
<SegmentationChart
  title="Custom Chart"
  segments={segments}
  className="bg-gray-50 p-8 rounded-xl"
/>
```
