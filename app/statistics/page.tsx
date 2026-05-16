import { Suspense } from "react";
import StatisticsListingClient from "@/components/statistics/StatisticsListingClient";
import { getBlogs, isApiError } from "@/lib/api";
import StatisticsLoading from "@/app/statistic/loading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Statistics | Trends, News & Analysis",
  description: "Read expert statistics on healthcare trends, innovations, policy updates, market developments, and industry insights.",
  keywords: ["healthcare statistics", "healthcare insights", "healthcare trends", "medical industry news", "healthcare analysis"],
  alternates: {
    canonical: '/statistics',
  },
};

export const revalidate = 300;

async function StatisticsContent() {
  const response = await getBlogs({ status: 'published', page: 1, limit: 8, sort_by: 'publish_date_desc' });

  if (isApiError(response)) {
    console.error('Failed to fetch statistics:', response.message);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Unable to Load Articles</h2>
          <p className="text-gray-600">{response.message}</p>
        </div>
      </div>
    );
  }

  const totalItems = response.meta?.totalItems ?? response.data.length;
  const totalPages = response.meta?.totalPages ?? 1;

  return (
    <StatisticsListingClient
      blogs={response.data}
      totalItems={totalItems}
      totalPages={totalPages}
    />
  );
}

export default function StatisticsPage() {
  return (
    <Suspense fallback={<StatisticsLoading />}>
      <StatisticsContent />
    </Suspense>
  );
}
