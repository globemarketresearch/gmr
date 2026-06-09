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

interface TreemapContentProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  index?: number;
}

function TreemapContent({ x, y, width, height, name, index }: TreemapContentProps) {
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
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  content={<TreemapContent /> as any}
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
