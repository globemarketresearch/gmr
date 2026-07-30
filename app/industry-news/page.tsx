import { Suspense } from "react";
import IndustryNewsListingClient from "@/components/industry-news/IndustryNewsListingClient";
import { getIndustryNewsList, isApiError } from "@/lib/api";
import IndustryNewsLoading from "./loading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry News",
  description: "Stay updated with the latest industry news, market trends, and healthcare developments from Globe Market Research.",
  keywords: ["industry news", "healthcare news", "market trends", "market updates"],
  alternates: {
    canonical: '/industry-news',
  },
};

export const revalidate = 300;

async function IndustryNewsContent() {
  const response = await getIndustryNewsList({
    status: 'published',
    page: 1,
    limit: 8,
    sort_by: 'publish_date_desc',
  });

  if (isApiError(response)) {
    console.error('Failed to fetch industry news:', response.message);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Unable to Load Industry News</h2>
          <p className="text-gray-600">{response.message}</p>
        </div>
      </div>
    );
  }

  const totalItems = response.meta?.totalItems ?? response.data.length;
  const totalPages = response.meta?.totalPages ?? 1;

  return (
    <IndustryNewsListingClient
      industryNewsList={response.data}
      totalItems={totalItems}
      totalPages={totalPages}
    />
  );
}

export default function IndustryNewsPage() {
  return (
    <Suspense fallback={<IndustryNewsLoading />}>
      <IndustryNewsContent />
    </Suspense>
  );
}
