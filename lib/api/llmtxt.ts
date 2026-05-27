/**
 * LLM-readable content generators for Globe Market Research
 *
 * Implements the llms.txt specification (https://llmstxt.org):
 *   /llms.txt      → concise index with links
 *   /llms-full.txt → complete content for LLM consumption
 *
 * Data strategy: fetch live from API, fall back to static JSON on failure.
 */

import { apiFetch } from './config';
import type { ApiCategory } from './categories.types';
import type { ApiReport } from './reports.types';
import type { ApiBlog } from './blogs.types';
import type { ApiPressRelease } from './press-releases.types';

// Static fallback data (always available at build time)
import reportsData from '@/data/reports.json';
import blogsData from '@/data/blogs.json';
import consultingData from '@/data/services.json';
import categoriesData from '@/data/categories.json';

const BASE_URL = 'https://www.globemarketresearch.com';

// ─── Static data interfaces (shapes match the JSON files) ─────────────────────

interface StaticReport {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  region: string;
  marketSize2024?: string;
  marketSize2032?: string;
  cagr?: string;
  forecastPeriod?: string;
}

interface StaticBlog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

interface StaticConsultingService {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  overview: string;
  servicesInclude: string[];
}

interface StaticCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

// ─── API fetchers (silent fail → empty array) ─────────────────────────────────

async function fetchCategories(): Promise<ApiCategory[]> {
  try {
    const res = await apiFetch<unknown>('/api/v1/categories?limit=200');
    if (!res.success || !res.data) return [];
    const d = res.data as Record<string, unknown>;
    if (Array.isArray(d)) return d as ApiCategory[];
    if (Array.isArray(d['data'])) return d['data'] as ApiCategory[];
  } catch { /* silent */ }
  return [];
}

async function fetchReports(
  page = 1,
  limit = 500,
): Promise<{ reports: ApiReport[]; total: number }> {
  try {
    const res = await apiFetch<unknown>(
      `/api/v1/reports?status=published&page=${page}&limit=${limit}`,
    );
    if (!res.success || !res.data) return { reports: [], total: 0 };
    const d = res.data as Record<string, unknown>;
    if (Array.isArray(d)) return { reports: d as ApiReport[], total: d.length };
    if (Array.isArray(d['data'])) {
      const nested = d as { data: ApiReport[]; meta?: { total?: number } };
      return {
        reports: nested.data,
        total: (nested.meta?.total ?? nested.data.length) as number,
      };
    }
  } catch { /* silent */ }
  return { reports: [], total: 0 };
}

async function fetchBlogs(limit = 300): Promise<ApiBlog[]> {
  try {
    const res = await apiFetch<unknown>(
      `/api/v1/blogs?status=published&limit=${limit}`,
    );
    if (!res.success || !res.data) return [];
    const d = res.data as Record<string, unknown>;
    if (Array.isArray(d)) return d as ApiBlog[];
    if (Array.isArray(d['blogs'])) return d['blogs'] as ApiBlog[];
    if (Array.isArray(d['data'])) return d['data'] as ApiBlog[];
  } catch { /* silent */ }
  return [];
}

async function fetchPressReleases(limit = 300): Promise<ApiPressRelease[]> {
  try {
    const res = await apiFetch<unknown>(
      `/api/v1/press-releases?status=published&limit=${limit}`,
    );
    if (!res.success || !res.data) return [];
    const d = res.data as Record<string, unknown>;
    if (Array.isArray(d)) return d as ApiPressRelease[];
    if (Array.isArray(d['pressReleases'])) return d['pressReleases'] as ApiPressRelease[];
    if (Array.isArray(d['data'])) return d['data'] as ApiPressRelease[];
  } catch { /* silent */ }
  return [];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toISOString().split('T')[0];
  } catch {
    return dateStr;
  }
}

function stripHtml(html?: string): string {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300);
}

// ─── /llms.txt — concise index (llms.txt spec §1) ─────────────────────────────

/**
 * Generates /llms.txt — a navigational index following the llms.txt spec.
 *
 * Format:
 *   # Site Name
 *   > Tagline
 *   Optional body text
 *   ## Section
 *   - [Title](URL): description
 */
export async function generateLLMTxt(): Promise<string> {
  const staticReports = reportsData as StaticReport[];
  const staticServices = consultingData as StaticConsultingService[];
  const staticCategories = categoriesData as StaticCategory[];

  // Fetch live categories for accurate list; reports count is always handy
  const [catResult, reportResult] = await Promise.allSettled([
    fetchCategories(),
    fetchReports(1, 1), // just need total
  ]);

  const categories: Array<{ name: string; slug: string; description?: string }> =
    catResult.status === 'fulfilled' && catResult.value.length > 0
      ? catResult.value
      : staticCategories;

  const totalReports =
    reportResult.status === 'fulfilled' && reportResult.value.total > 0
      ? reportResult.value.total
      : staticReports.length;

  let out = '';

  // ── Header ──
  out += '# Globe Market Research\n\n';
  out += '> A comprehensive global market research and consulting firm delivering'
    + ' business intelligence, syndicated research reports, and strategic advisory'
    + ' services across aerospace, automotive, chemicals, consumer goods, healthcare,'
    + ' technology, energy, and more.\n\n';
  out += `Globe Market Research maintains a library of **${totalReports}+ market research reports**,`
    + ` covering ${categories.length} industry verticals, enriched with statistics, press releases,`
    + ' and bespoke consulting offerings for enterprises worldwide.\n\n';

  // ── Key Resources ──
  out += '## Key Resources\n\n';
  out += `- [Research Reports](${BASE_URL}/reports): Full library of syndicated market research`
    + ' reports — market sizing, CAGR forecasts, competitive intelligence, regional breakdowns\n';
  out += `- [Statistics & Insights](${BASE_URL}/statistics): Industry statistics, analysis articles,`
    + ' and expert thought leadership across global markets\n';
  out += `- [Press Releases](${BASE_URL}/press-releases): Latest market research news, product launches,`
    + ' and strategic announcements\n';
  out += `- [Consulting Services](${BASE_URL}/consulting): Bespoke market research, feasibility studies,`
    + ' competitive benchmarking, and C-suite advisory\n';
  out += `- [Industry Categories](${BASE_URL}/industry): Browse all research by industry vertical\n`;
  out += `- [About Us](${BASE_URL}/about): Research methodology, analyst team, and global coverage\n`;
  out += `- [Contact](${BASE_URL}/contact): Reach our research team for custom engagements\n\n`;

  // ── Machine-readable full index ──
  out += '## LLM-Readable Content\n\n';
  out += `- [Full Content Index](${BASE_URL}/llms-full.txt): Complete machine-readable index`
    + ' of all reports, statistics, press releases, and consulting services with full metadata\n\n';

  // ── Industry Categories ──
  out += '## Industry Categories\n\n';
  categories.slice(0, 40).forEach(cat => {
    const desc = cat.description ? `: ${cat.description}` : '';
    out += `- [${cat.name}](${BASE_URL}/categories/${cat.slug})${desc}\n`;
  });
  out += '\n';

  // ── Featured Reports (recent 20 from static JSON as stable sample) ──
  out += '## Featured Research Reports\n\n';
  [...staticReports]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20)
    .forEach(r => {
      const tags: string[] = [];
      if (r.cagr) tags.push(`CAGR ${r.cagr}`);
      if (r.forecastPeriod) tags.push(r.forecastPeriod);
      if (r.region) tags.push(r.region);
      const suffix = tags.length ? ` (${tags.join(' | ')})` : '';
      out += `- [${r.title}](${BASE_URL}/reports/${r.slug})${suffix}:`
        + ` ${r.description.slice(0, 120).replace(/\n/g, ' ')}…\n`;
    });
  out += '\n';

  // ── Consulting Services ──
  out += '## Consulting Services\n\n';
  staticServices.slice(0, 12).forEach(s => {
    out += `- [${s.title}](${BASE_URL}/consulting/${s.slug}): ${s.description.slice(0, 100).replace(/\n/g, ' ')}\n`;
  });
  out += '\n';

  // ── Footer ──
  out += '---\n\n';
  out += `Generated: ${new Date().toISOString()}\n`;
  out += `Summary: ${BASE_URL}/llms.txt\n`;
  out += `Full index: ${BASE_URL}/llms-full.txt\n`;
  out += `Sitemap: ${BASE_URL}/sitemap.xml\n`;

  return out;
}

// ─── /llms-full.txt — comprehensive content (llms.txt spec §2) ────────────────

/**
 * Generates /llms-full.txt — exhaustive content dump for deep LLM indexing.
 *
 * Fetches all data from the live API; falls back to static JSON per section.
 */
export async function generateLLMFullTxt(): Promise<string> {
  const staticReports = reportsData as StaticReport[];
  const staticBlogs = blogsData as StaticBlog[];
  const staticServices = consultingData as StaticConsultingService[];
  const staticCategories = categoriesData as StaticCategory[];

  // Parallel fetch — each settles independently
  const [catResult, reportResult, blogResult, prResult] = await Promise.allSettled([
    fetchCategories(),
    fetchReports(1, 1000),
    fetchBlogs(500),
    fetchPressReleases(500),
  ]);

  const categories: Array<{ name: string; slug: string; description?: string; report_count?: number }> =
    catResult.status === 'fulfilled' && catResult.value.length > 0
      ? catResult.value
      : staticCategories;

  const { reports: apiReports, total: reportsTotal } =
    reportResult.status === 'fulfilled'
      ? reportResult.value
      : { reports: [], total: staticReports.length };

  const apiBlogs: ApiBlog[] =
    blogResult.status === 'fulfilled' ? blogResult.value : [];

  const apiPRs: ApiPressRelease[] =
    prResult.status === 'fulfilled' ? prResult.value : [];

  const usingLiveReports = apiReports.length > 0;
  const usingLiveBlogs = apiBlogs.length > 0;
  const usingLivePRs = apiPRs.length > 0;

  let out = '';

  // ── Header ──
  out += '# Globe Market Research — Full Content Index\n\n';
  out += '> Complete machine-readable index of all published content on Globe Market Research.\n';
  out += '> Source: https://llmstxt.org\n\n';
  out += `| Metric | Count |\n`;
  out += `|--------|-------|\n`;
  out += `| Research Reports | ${reportsTotal} |\n`;
  out += `| Statistics & Insights | ${usingLiveBlogs ? apiBlogs.length : staticBlogs.length} |\n`;
  out += `| Press Releases | ${usingLivePRs ? apiPRs.length : 'N/A'} |\n`;
  out += `| Industry Categories | ${categories.length} |\n`;
  out += `| Consulting Services | ${staticServices.length} |\n\n`;
  out += `Summary index: ${BASE_URL}/llms.txt\n`;
  out += `Generated: ${new Date().toISOString()}\n\n`;

  // ─────────────────────────────────────────────
  // 1. INDUSTRY CATEGORIES
  // ─────────────────────────────────────────────
  out += '---\n\n';
  out += '## Industry Categories\n\n';
  categories.forEach(cat => {
    out += `### ${cat.name}\n`;
    if (cat.description) out += `${cat.description}\n`;
    if (cat.report_count != null) out += `Reports available: ${cat.report_count}\n`;
    out += `URL: ${BASE_URL}/categories/${cat.slug}\n\n`;
  });

  // ─────────────────────────────────────────────
  // 2. RESEARCH REPORTS
  // ─────────────────────────────────────────────
  out += '---\n\n';
  out += '## Research Reports\n\n';

  if (usingLiveReports) {
    apiReports.forEach(r => {
      out += `### ${r.title}\n`;
      out += `${stripHtml(r.description) || stripHtml(r.summary) || ''}\n`;
      out += `Category: ${r.category_name ?? 'General'}\n`;
      if (r.geography && r.geography.length > 0) {
        out += `Regions: ${r.geography.join(', ')}\n`;
      }
      if (r.market_metrics) {
        const m = r.market_metrics;
        if (m.cagr) {
          out += `CAGR: ${m.cagr}`;
          if (m.cagrStartYear && m.cagrEndYear) out += ` (${m.cagrStartYear}–${m.cagrEndYear})`;
          out += '\n';
        }
        if (m.currentRevenue) {
          out += `Market Size: ${m.currentRevenue} (${m.currentYear ?? 'base'})`;
          if (m.forecastRevenue) out += ` → ${m.forecastRevenue} (${m.forecastYear ?? 'forecast'})`;
          out += '\n';
        }
      }
      out += `Pages: ${r.page_count}\n`;
      if (r.price) out += `Price: $${r.price}\n`;
      if (r.publish_date) out += `Published: ${formatDate(r.publish_date)}\n`;
      out += `URL: ${BASE_URL}/reports/${r.slug}\n\n`;
    });
  } else {
    // Static fallback
    staticReports.forEach(r => {
      out += `### ${r.title}\n`;
      out += `${r.description}\n`;
      out += `Category: ${r.category} | Region: ${r.region}\n`;
      if (r.cagr && r.forecastPeriod) out += `CAGR: ${r.cagr} | Forecast: ${r.forecastPeriod}\n`;
      if (r.marketSize2024 && r.marketSize2032) {
        out += `Market Size: ${r.marketSize2024} (2024) → ${r.marketSize2032} (2032)\n`;
      }
      out += `URL: ${BASE_URL}/reports/${r.slug}\n\n`;
    });
  }

  // ─────────────────────────────────────────────
  // 3. STATISTICS & INSIGHTS (BLOGS)
  // ─────────────────────────────────────────────
  out += '---\n\n';
  out += '## Statistics & Industry Insights\n\n';

  if (usingLiveBlogs) {
    apiBlogs.forEach(b => {
      out += `### ${b.title}\n`;
      out += `${b.excerpt}\n`;
      out += `Category: ${b.category?.name ?? 'General'}\n`;
      if (b.author?.name) out += `Author: ${b.author.name}\n`;
      if (b.publishDate) out += `Published: ${formatDate(b.publishDate)}\n`;
      if (b.tags) out += `Tags: ${b.tags}\n`;
      out += `URL: ${BASE_URL}/statistics/${b.slug}\n\n`;
    });
  } else {
    staticBlogs.forEach(b => {
      out += `### ${b.title}\n`;
      out += `${b.excerpt}\n`;
      out += `Category: ${b.category} | Author: ${b.author} | Published: ${b.date} | ${b.readTime}\n`;
      out += `URL: ${BASE_URL}/statistics/${b.slug}\n\n`;
    });
  }

  // ─────────────────────────────────────────────
  // 4. PRESS RELEASES
  // ─────────────────────────────────────────────
  if (usingLivePRs) {
    out += '---\n\n';
    out += '## Press Releases\n\n';
    apiPRs.forEach(pr => {
      out += `### ${pr.title}\n`;
      out += `${pr.excerpt}\n`;
      out += `Category: ${pr.category?.name ?? 'General'}\n`;
      if (pr.author?.name) out += `Source: ${pr.author.name}\n`;
      if (pr.location) out += `Location: ${pr.location}\n`;
      if (pr.publishDate) out += `Published: ${formatDate(pr.publishDate)}\n`;
      out += `URL: ${BASE_URL}/press-releases/${pr.slug}\n\n`;
    });
  }

  // ─────────────────────────────────────────────
  // 5. CONSULTING SERVICES
  // ─────────────────────────────────────────────
  out += '---\n\n';
  out += '## Consulting Services\n\n';

  const svcCategories = [...new Set(staticServices.map(s => s.category))];
  svcCategories.forEach(cat => {
    out += `### ${cat}\n\n`;
    staticServices
      .filter(s => s.category === cat)
      .forEach(s => {
        out += `#### ${s.title}\n`;
        out += `${s.description}\n\n`;
        out += `${s.overview}\n\n`;
        out += 'Key deliverables:\n';
        s.servicesInclude.forEach(item => {
          out += `- ${item}\n`;
        });
        out += `\nURL: ${BASE_URL}/consulting/${s.slug}\n\n`;
      });
  });

  // ─────────────────────────────────────────────
  // 6. SITE STRUCTURE
  // ─────────────────────────────────────────────
  out += '---\n\n';
  out += '## Site Structure\n\n';
  out += `- Home: ${BASE_URL}/\n`;
  out += `- Research Reports: ${BASE_URL}/reports\n`;
  out += `- Statistics & Insights: ${BASE_URL}/statistics\n`;
  out += `- Press Releases: ${BASE_URL}/press-releases\n`;
  out += `- Consulting: ${BASE_URL}/consulting\n`;
  out += `- Industry Categories: ${BASE_URL}/industry\n`;
  out += `- About Us: ${BASE_URL}/about\n`;
  out += `- Contact: ${BASE_URL}/contact\n`;
  out += `- LLM Index: ${BASE_URL}/llms.txt\n`;
  out += `- LLM Full: ${BASE_URL}/llms-full.txt\n`;
  out += `- Sitemap: ${BASE_URL}/sitemap.xml\n\n`;
  out += '---\n\n';
  out += `Generated: ${new Date().toISOString()}\n`;
  out += `Data source: ${usingLiveReports ? 'Live API' : 'Static JSON (fallback)'}\n`;

  return out;
}
