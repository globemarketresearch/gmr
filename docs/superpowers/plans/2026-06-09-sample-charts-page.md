# Sample Charts Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `/sample-charts` page showcasing 11 interactive Recharts visualizations, and redirect to it after request-sample form submission.

**Architecture:** Two new files (`data.ts` + `page.tsx`) under `app/sample-charts/`. The form's success handler is changed from `setSubmitted(true)` to `router.push('/sample-charts')`. No API calls, no server components — all client-side Recharts with hardcoded market research data.

**Tech Stack:** Next.js 15 App Router, React 19, Recharts 2.15, Tailwind CSS, existing `@/components/ui` (Card, Section, Container, Badge, Button)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `app/sample-charts/data.ts` | All 11 hardcoded datasets |
| Create | `app/sample-charts/page.tsx` | `"use client"` page: hero + 2-per-row chart grid + footer CTA |
| Modify | `app/request-sample/RequestSampleForm.tsx` | Replace inline success state with `router.push('/sample-charts')` |

---

## Task 1: Create chart data file

**Files:**
- Create: `app/sample-charts/data.ts`

- [ ] **Step 1: Create `app/sample-charts/data.ts` with all datasets**

```ts
export const lineData = [
  { year: '2020', value: 42.3 },
  { year: '2021', value: 48.7 },
  { year: '2022', value: 56.1 },
  { year: '2023', value: 64.8 },
  { year: '2024', value: 74.2 },
  { year: '2025', value: 85.1 },
  { year: '2026', value: 97.6 },
  { year: '2027', value: 112.0 },
  { year: '2028', value: 128.5 },
  { year: '2029', value: 147.4 },
  { year: '2030', value: 169.1 },
  { year: '2031', value: 193.9 },
  { year: '2032', value: 222.5 },
];

export const barData = [
  { region: 'North America', revenue: 28.4 },
  { region: 'Europe', revenue: 19.7 },
  { region: 'APAC', revenue: 16.3 },
  { region: 'MEA', revenue: 5.8 },
  { region: 'LATAM', revenue: 3.9 },
];

export const areaData = [
  { year: '2020', diagnostics: 12.4, therapeutics: 18.6, devices: 8.2, services: 3.1 },
  { year: '2021', diagnostics: 14.2, therapeutics: 21.3, devices: 9.8, services: 3.4 },
  { year: '2022', diagnostics: 16.8, therapeutics: 24.9, devices: 11.3, services: 3.1 },
  { year: '2023', diagnostics: 19.5, therapeutics: 28.7, devices: 13.0, services: 3.6 },
  { year: '2024', diagnostics: 22.6, therapeutics: 33.1, devices: 14.9, services: 3.6 },
];

export const pieData = [
  { name: 'Therapeutics', value: 44.6 },
  { name: 'Diagnostics', value: 30.4 },
  { name: 'Devices', value: 20.1 },
  { name: 'Services', value: 3.2 },
  { name: 'Other', value: 1.7 },
];

export const stackedBarData = [
  { year: '2020', pharma: 15.2, biotech: 12.8, medtech: 8.4, services: 5.9 },
  { year: '2021', pharma: 17.6, biotech: 14.7, medtech: 9.6, services: 6.8 },
  { year: '2022', pharma: 20.3, biotech: 17.1, medtech: 11.1, services: 7.6 },
  { year: '2023', pharma: 23.4, biotech: 19.8, medtech: 12.8, services: 8.8 },
  { year: '2024', pharma: 27.0, biotech: 23.0, medtech: 14.8, services: 9.4 },
];

export const scatterData = [
  { price: 120, volume: 3400 },
  { price: 85, volume: 5600 },
  { price: 210, volume: 1800 },
  { price: 65, volume: 8200 },
  { price: 175, volume: 2100 },
  { price: 95, volume: 4700 },
  { price: 145, volume: 3100 },
  { price: 55, volume: 9800 },
  { price: 280, volume: 950 },
  { price: 130, volume: 3800 },
];

export const radarData = [
  { dimension: 'Innovation', companyA: 85, companyB: 72, companyC: 61 },
  { dimension: 'Market Share', companyA: 78, companyB: 65, companyC: 53 },
  { dimension: 'Distribution', companyA: 65, companyB: 88, companyC: 74 },
  { dimension: 'Pricing Power', companyA: 72, companyB: 60, companyC: 82 },
  { dimension: 'R&D Spend', companyA: 90, companyB: 55, companyC: 68 },
  { dimension: 'Brand Equity', companyA: 83, companyB: 70, companyC: 59 },
];

export const radialBarData = [
  { name: 'Market Penetration', value: 68, fill: '#3b82f6' },
  { name: 'Customer Retention', value: 82, fill: '#10b981' },
  { name: 'Revenue Growth', value: 74, fill: '#f59e0b' },
  { name: 'Operational Efficiency', value: 91, fill: '#8b5cf6' },
];

export const composedData = [
  { year: '2020', revenue: 42.3, cagr: null },
  { year: '2021', revenue: 48.7, cagr: null },
  { year: '2022', revenue: 56.1, cagr: null },
  { year: '2023', revenue: 64.8, cagr: null },
  { year: '2024', revenue: 74.2, cagr: 14.8 },
  { year: '2025', revenue: 85.1, cagr: 14.7 },
  { year: '2026', revenue: 97.6, cagr: 14.7 },
  { year: '2027', revenue: 112.0, cagr: 14.8 },
  { year: '2028', revenue: 128.5, cagr: 14.7 },
  { year: '2029', revenue: 147.4, cagr: 14.7 },
  { year: '2030', revenue: 169.1, cagr: 14.7 },
];

export const treemapData = [
  { name: 'Pharma', size: 27.0 },
  { name: 'Biotech', size: 23.0 },
  { name: 'MedTech', size: 14.8 },
  { name: 'Diagnostics', size: 9.4 },
  { name: 'Digital Health', size: 7.2 },
  { name: 'CRO/CMO', size: 5.6 },
  { name: 'Distribution', size: 4.1 },
  { name: 'Other', size: 2.8 },
];

export const funnelData = [
  { value: 100, name: 'Market Awareness', fill: '#3b82f6' },
  { value: 78, name: 'Active Consideration', fill: '#10b981' },
  { value: 54, name: 'Intent to Purchase', fill: '#f59e0b' },
  { value: 38, name: 'Evaluation Stage', fill: '#ef4444' },
  { value: 22, name: 'Purchase Complete', fill: '#8b5cf6' },
];

export const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const TREEMAP_COLORS = [
  '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa',
  '#0f766e', '#0d9488', '#14b8a6', '#2dd4bf',
];
```

- [ ] **Step 2: Commit**

```bash
git add app/sample-charts/data.ts
git commit -m "feat: add sample-charts static datasets"
```

---

## Task 2: Create the sample-charts page

**Files:**
- Create: `app/sample-charts/page.tsx`

- [ ] **Step 1: Create `app/sample-charts/page.tsx`**

```tsx
"use client";

import {
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  PieChart, Pie, Cell,
  ScatterChart, Scatter,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  RadialBarChart, RadialBar,
  ComposedChart,
  Treemap,
  FunnelChart, Funnel, LabelList,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import { Section, Container, Card, CardContent, CardHeader, CardTitle, CardDescription, Badge, Button } from "@/components/ui";
import {
  lineData, barData, areaData, pieData, stackedBarData,
  scatterData, radarData, radialBarData, composedData,
  treemapData, funnelData, COLORS, TREEMAP_COLORS,
} from "./data";

const CHART_HEIGHT = 320;

interface ChartCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

export default function SampleChartsPage() {
  return (
    <>
      {/* Hero */}
      <Section padding="lg" background="muted" className="pb-8">
        <Container size="lg">
          <div className="text-center space-y-4">
            <Badge variant="primary" size="md">Report Preview</Badge>
            <h1 className="text-4xl md:text-5xl font-bold">Interactive Data Visualizations</h1>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Every GMR report includes interactive charts like these — built for clarity, precision, and insight.
            </p>
          </div>
        </Container>
      </Section>

      {/* Charts Grid */}
      <Section className="pt-8">
        <Container size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* 1. Line Chart */}
            <ChartCard
              title="Global Market Size (2020–2032)"
              description="Historical data and forecast in USD Billion. CAGR: 14.7%"
            >
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <LineChart data={lineData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} unit="B" />
                  <Tooltip formatter={(v: number) => [`$${v}B`, "Market Size"]} />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 2. Bar Chart */}
            <ChartCard
              title="Revenue by Region (2024)"
              description="USD Billion breakdown across major global regions"
            >
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="region" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 11 }} unit="B" />
                  <Tooltip formatter={(v: number) => [`$${v}B`, "Revenue"]} />
                  <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
                    {barData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 3. Area Chart */}
            <ChartCard
              title="Cumulative Market Growth by Segment"
              description="Stacked area showing segment contributions 2020–2024 (USD Billion)"
            >
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <AreaChart data={areaData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} unit="B" />
                  <Tooltip formatter={(v: number) => [`$${v}B`]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="therapeutics" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="diagnostics" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="devices" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="services" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 4. Pie / Donut Chart */}
            <ChartCard
              title="Market Share by Segment (2024)"
              description="Percentage share of total addressable market across key segments"
            >
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => [`${v}%`, "Share"]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 5. Stacked Bar Chart */}
            <ChartCard
              title="Segment Revenue 2020–2024"
              description="Stacked annual revenue by industry segment (USD Billion)"
            >
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <BarChart data={stackedBarData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} unit="B" />
                  <Tooltip formatter={(v: number) => [`$${v}B`]} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="pharma" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} name="Pharma" />
                  <Bar dataKey="biotech" stackId="a" fill="#10b981" name="Biotech" />
                  <Bar dataKey="medtech" stackId="a" fill="#f59e0b" name="MedTech" />
                  <Bar dataKey="services" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Services" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 6. Scatter Chart */}
            <ChartCard
              title="Price vs. Volume by Product"
              description="Correlation between unit price (USD) and annual sales volume across products"
            >
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <ScatterChart margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="price" name="Price" unit="$" tick={{ fontSize: 11 }} label={{ value: 'Unit Price ($)', position: 'insideBottom', offset: -2, fontSize: 11 }} />
                  <YAxis dataKey="volume" name="Volume" tick={{ fontSize: 11 }} label={{ value: 'Volume', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(v: number, name: string) => [name === "Price" ? `$${v}` : v.toLocaleString(), name]} />
                  <Scatter data={scatterData} fill="#3b82f6" fillOpacity={0.7} />
                </ScatterChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 7. Radar Chart */}
            <ChartCard
              title="Competitive Positioning Matrix"
              description="Multi-dimensional comparison of top 3 market players across key strategic factors"
            >
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={110}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                  <Radar name="Company A" dataKey="companyA" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                  <Radar name="Company B" dataKey="companyB" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                  <Radar name="Company C" dataKey="companyC" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 8. Radial Bar Chart */}
            <ChartCard
              title="Key Performance Indicators"
              description="Score out of 100 across four critical business performance dimensions"
            >
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={120}
                  data={radialBarData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar dataKey="value" label={{ position: "insideStart", fill: "#fff", fontSize: 10 }} background />
                  <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => [`${v}/100`]} />
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 9. Composed Chart */}
            <ChartCard
              title="Historical Revenue & Forecast (2020–2030)"
              description="Bar chart for revenue (USD Billion) overlaid with projected CAGR % line"
            >
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <ComposedChart data={composedData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11 }} unit="B" />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} unit="%" domain={[14, 16]} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" fillOpacity={0.7} radius={[4, 4, 0, 0]} name="Revenue (B)" />
                  <Line yAxisId="right" type="monotone" dataKey="cagr" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="CAGR %" connectNulls={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 10. Treemap */}
            <ChartCard
              title="Market Segment Hierarchy (2024)"
              description="Proportional area view of revenue contribution by segment (USD Billion)"
            >
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <Treemap
                  data={treemapData}
                  dataKey="size"
                  aspectRatio={4 / 3}
                  content={({ x, y, width, height, name, index }: {
                    x?: number; y?: number; width?: number; height?: number; name?: string; index?: number;
                  }) => {
                    const i = index ?? 0;
                    if (!x || !y || !width || !height || width < 20 || height < 20) return <g />;
                    return (
                      <g>
                        <rect x={x} y={y} width={width} height={height} fill={TREEMAP_COLORS[i % TREEMAP_COLORS.length]} stroke="#fff" strokeWidth={2} />
                        {width > 50 && height > 30 && (
                          <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={11} fontWeight={500}>
                            {name}
                          </text>
                        )}
                      </g>
                    );
                  }}
                >
                  <Tooltip formatter={(v: number) => [`$${v}B`, "Revenue"]} />
                </Treemap>
              </ResponsiveContainer>
            </ChartCard>

            {/* 11. Funnel Chart */}
            <ChartCard
              title="Market Adoption Pipeline"
              description="Conversion funnel from market awareness through to completed purchase"
            >
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <FunnelChart>
                  <Tooltip formatter={(v: number) => [`${v}%`, "Stage"]} />
                  <Funnel dataKey="value" data={funnelData} isAnimationActive>
                    <LabelList position="center" fill="#fff" fontSize={12} fontWeight={500} dataKey="name" />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </ChartCard>

          </div>

          {/* Footer CTA */}
          <div className="mt-16 text-center space-y-4">
            <p className="text-lg text-[var(--muted-foreground)]">Ready to explore the full report?</p>
            <Link href="/reports">
              <Button variant="primary" size="lg">Browse All Reports</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Start dev server and verify the page renders at `http://localhost:3000/sample-charts`**

Run: `npm run dev`

Check:
- Page loads without console errors
- Hero section shows "Interactive Data Visualizations" heading and "Report Preview" badge
- 11 chart cards render in a 2-per-row grid on desktop
- Tooltips appear on hover for each chart
- Footer CTA button links to `/reports`

- [ ] **Step 3: Commit**

```bash
git add app/sample-charts/page.tsx
git commit -m "feat: add sample-charts showcase page with 11 interactive Recharts visualizations"
```

---

## Task 3: Redirect form to /sample-charts on success

**Files:**
- Modify: `app/request-sample/RequestSampleForm.tsx`

Currently at line 99: `setSubmitted(true);` — this triggers an inline success card.

- [ ] **Step 1: Add `useRouter` import and replace success handler**

In `app/request-sample/RequestSampleForm.tsx`, make these two changes:

**Change 1** — add `useRouter` to the import on line 3:
```tsx
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
```

**Change 2** — add `const router = useRouter();` after the `captchaRef` declaration (around line 19):
```tsx
const captchaRef = useRef<CaptchaRef>(null);
const router = useRouter();
```

**Change 3** — replace `setSubmitted(true);` (line 99) with:
```tsx
router.push('/sample-charts');
```

**Change 4** — remove the `submitted` state and the `setSubmitted` setter since they are no longer used. Remove line 36:
```tsx
// Remove this line:
const [submitted, setSubmitted] = useState(false);
```

**Change 5** — remove the `{submitted ? ( ... ) : ( <form>...</form> )}` conditional in the JSX (lines 149–327). Replace it with just the form directly:
```tsx
<CardContent>
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* ...form fields unchanged... */}
  </form>
</CardContent>
```

The full updated `handleSubmit` function (lines 55–100) should look like:
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);

  if (!isBusinessEmail(formData.email)) {
    setError("Please use a business email address.");
    return;
  }

  if (!captchaRef.current?.validate()) {
    setError("Please enter the captcha correctly.");
    return;
  }

  setIsSubmitting(true);

  const apiData = {
    fullName: formData.fullName,
    email: formData.email,
    company: formData.company,
    jobTitle: formData.jobTitle,
    phone: formData.phone ? `${formData.dialCode}${formData.phone}` : undefined,
    country: formData.country,
    countryCode: formData.countryCode,
    dialCode: formData.dialCode,
    reportTitle: formData.reportTitle,
    reportSlug: formData.reportSlug || undefined,
    additionalInfo: formData.additionalInfo || undefined,
  };

  const response = await submitRequestSampleForm(apiData);

  setIsSubmitting(false);

  if (isFormError(response)) {
    setError(response.message);
    return;
  }

  router.push('/sample-charts');
};
```

- [ ] **Step 2: Verify redirect works**

With dev server running:
1. Navigate to `http://localhost:3000/request-sample`
2. Fill out the form with valid data and a business email
3. Submit the form
4. Confirm browser navigates to `/sample-charts`
5. Confirm all 11 charts are visible

- [ ] **Step 3: Commit**

```bash
git add app/request-sample/RequestSampleForm.tsx
git commit -m "feat: redirect to /sample-charts after request-sample form submission"
```
