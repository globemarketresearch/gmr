"use client"

import React from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface MarketGrowthChartProps {
  marketSize2024: string;
  marketSize2032: string;
  cagr: string;
  forecastPeriod?: string;
  className?: string;
}

// Parses "USD 5.9 bn" → { currencyCode: "USD", value: 5.9, unit: "bn" }
function parseMarketValue(raw: string) {
  const match = raw.trim().match(/^([A-Z]{2,5})\s+([\d,]+(?:\.\d+)?)\s*([a-zA-Z]*)$/);
  if (match) {
    return {
      currencyCode: match[1],
      value: parseFloat(match[2].replace(/,/g, '')),
      unit: match[3] ?? '',
    };
  }
  return {
    currencyCode: '',
    value: parseFloat(raw.replace(/[^0-9.]/g, '')),
    unit: raw.match(/[a-zA-Z]+$/)?.[0] ?? '',
  };
}

export const MarketGrowthChart: React.FC<MarketGrowthChartProps> = ({
  marketSize2024,
  marketSize2032,
  cagr,
  forecastPeriod,
  className,
}) => {
  const startParsed = parseMarketValue(marketSize2024);
  const endParsed = parseMarketValue(marketSize2032);

  const start = startParsed.value;
  const end = endParsed.value;
  const currencyCode = startParsed.currencyCode || endParsed.currencyCode || 'USD';
  const unit = startParsed.unit || endParsed.unit || 'bn';

  const parts = forecastPeriod?.split('-');
  const startYear = parts?.[0] ? parseInt(parts[0]) : 2024;
  const endYear = parts?.[1] ? parseInt(parts[1]) : 2032;

  const years: number[] = [];
  for (let y = startYear; y <= endYear; y++) years.push(y);

  const cagrRate = parseFloat(cagr.replace(/[^0-9.]/g, '')) / 100;

  const chartData = years.map((year, index) => {
    const value = cagrRate > 0
      ? start * Math.pow(1 + cagrRate, index)
      : start * Math.pow(end / start, index / (years.length - 1));
    return {
      year: year.toString(),
      marketSize: parseFloat(value.toFixed(2)),
    };
  });

  const midYear = years[Math.floor(years.length / 2)].toString();

  const chartConfig = {
    marketSize: {
      label: "Market Size",
      color: "#0284c7",
    },
  } satisfies ChartConfig;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-[var(--teal-deep)]">Market Size &amp; Forecast</CardTitle>
        <CardDescription>
          Projected market growth {startYear}–{endYear} at a CAGR of {cagr}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 16, right: 20, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillMarketSize" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color, #e5e7eb)" />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12, fill: '#64748b', fontFamily: 'var(--font-geist-sans, inherit)' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'var(--font-geist-sans, inherit)' }}
              tickFormatter={(v) => `${v} ${unit}`}
              width={60}
            />
            <ReferenceLine
              x={midYear}
              stroke="#cbd5e1"
              strokeDasharray="4 3"
              label={{ value: '▲', position: 'top', fill: '#94a3b8', fontSize: 10 }}
            />
            <ChartTooltip
              cursor={{ stroke: '#0284c7', strokeWidth: 1, strokeDasharray: '4 2' }}
              content={
                <ChartTooltipContent
                  formatter={(value) => (
                    <span className="font-semibold text-[#0284c7]">
                      {currencyCode} {Number(value).toFixed(1)} {unit}
                    </span>
                  )}
                />
              }
            />
            <Area
              dataKey="marketSize"
              type="monotone"
              fill="url(#fillMarketSize)"
              stroke="#0284c7"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: '#0284c7', strokeWidth: 0 }}
            />
          </AreaChart>
        </ChartContainer>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border-color,#e5e7eb)] text-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#0284c7] opacity-80" />
            <span className="text-muted-foreground">Revenue ({currencyCode} {unit})</span>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">{startYear}</p>
              <p className="font-semibold text-foreground">{marketSize2024}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">{endYear}</p>
              <p className="font-semibold text-[#0284c7]">{marketSize2032}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">CAGR</p>
              <p className="font-semibold text-emerald-600">{cagr}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
