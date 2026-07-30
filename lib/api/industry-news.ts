// Industry News API client functions

import { apiFetch, buildQueryString, type ApiResponse, type PaginationMeta } from './config';
import type {
  IndustryNewsFilters,
  IndustryNewsListData,
  IndustryNewsDetailData,
  IndustryNews,
  ApiIndustryNews,
} from './industry-news.types';
import { mapApiIndustryNewsListToIndustryNewsList, mapApiIndustryNewsToIndustryNews } from './mappers';

/**
 * Fetch all industry news from the API
 *
 * @param filters - Optional filters (page, limit, status, categoryId, etc.)
 * @returns Promise<ApiResponse<IndustryNews[]>>
 *
 * @example
 * const response = await getIndustryNewsList({ status: 'published', limit: 100 });
 * if (!isApiError(response)) {
 *   const industryNews = response.data;
 * }
 */
export async function getIndustryNewsList(
  filters?: IndustryNewsFilters
): Promise<ApiResponse<IndustryNews[]>> {
  const params: Record<string, string | number | boolean | undefined> = {
    page: filters?.page || 1,
    limit: filters?.limit || 100,
    status: filters?.status || 'published',
    ...(filters?.category && { category: filters.category }),
    ...(filters?.categoryId && { categoryId: filters.categoryId }),
    ...(filters?.authorId && { authorId: filters.authorId }),
    ...(filters?.search && { search: filters.search }),
    ...(filters?.sort_by && { sort_by: filters.sort_by }),
  };

  const queryString = buildQueryString(params);
  const response = await apiFetch<IndustryNewsListData>(`/api/v1/industry-news${queryString}`);

  // If error, return as-is
  if (!response.success) {
    return response;
  }

  // Handle different response structures
  let apiIndustryNews: ApiIndustryNews[];

  // Check if data is directly the array or nested
  if (Array.isArray(response.data)) {
    // API returned array directly
    apiIndustryNews = response.data;
  } else if (response.data && typeof response.data === 'object' && 'industryNews' in response.data) {
    // API returned { industryNews: [...], page, limit, total, totalPages }
    apiIndustryNews = (response.data as { industryNews: ApiIndustryNews[] }).industryNews;
  } else {
    console.error('Unexpected response structure:', response.data);
    return {
      success: false,
      error: 'invalid_response',
      message: 'API returned unexpected response structure',
    };
  }

  // Map API industry news to UI format
  const mappedIndustryNews = mapApiIndustryNewsListToIndustryNewsList(apiIndustryNews);

  // Backend returns { industryNews: [...], total, page, limit, totalPages }
  const rawData = response.data as { total?: number; page?: number; limit?: number; totalPages?: number };
  const mappedMeta: PaginationMeta | undefined = rawData.total !== undefined
    ? {
        currentPage: rawData.page ?? 1,
        totalPages: rawData.totalPages ?? 1,
        totalItems: Number(rawData.total ?? 0),
        itemsPerPage: rawData.limit ?? 10,
        hasNextPage: (rawData.page ?? 1) < (rawData.totalPages ?? 1),
        hasPreviousPage: (rawData.page ?? 1) > 1,
      }
    : undefined;

  return {
    success: true,
    data: mappedIndustryNews,
    meta: mappedMeta,
  };
}

/**
 * Fetch a single industry news item by slug
 *
 * @param slug - Industry news slug
 * @returns Promise<ApiResponse<IndustryNews>>
 *
 * @example
 * const response = await getIndustryNewsBySlug('global-cancer-therapeutics-market-reaches-150-billion');
 * if (!isApiError(response)) {
 *   const industryNews = response.data;
 * }
 */
export async function getIndustryNewsBySlug(slug: string): Promise<ApiResponse<IndustryNews>> {
  const response = await apiFetch<IndustryNewsDetailData>(`/api/v1/industry-news/slug/${slug}`);

  // If error, return as-is
  if (!response.success) {
    return response;
  }

  // Handle different response structures
  let apiIndustryNewsItem: ApiIndustryNews;

  if (response.data && typeof response.data === 'object') {
    // Check if data is nested or direct
    if ('industryNews' in response.data) {
      apiIndustryNewsItem = (response.data as { industryNews: ApiIndustryNews }).industryNews;
    } else {
      // Assume response.data is the industry news item itself
      apiIndustryNewsItem = response.data;
    }
  } else {
    console.error('Unexpected response structure for getIndustryNewsBySlug:', response.data);
    return {
      success: false,
      error: 'invalid_response',
      message: 'API returned unexpected response structure',
    };
  }

  // Map API industry news to UI format
  const mappedIndustryNews = mapApiIndustryNewsToIndustryNews(apiIndustryNewsItem);

  return {
    success: true,
    data: mappedIndustryNews,
  };
}

/**
 * Search industry news by query string
 *
 * @param query - Search query string
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 50)
 * @returns Promise<ApiResponse<IndustryNews[]>>
 *
 * @example
 * const response = await searchIndustryNews('cancer therapeutics', 1, 20);
 * if (!isApiError(response)) {
 *   const results = response.data;
 * }
 */
export async function searchIndustryNews(
  query: string,
  page: number = 1,
  limit: number = 50
): Promise<ApiResponse<IndustryNews[]>> {
  return getIndustryNewsList({
    search: query,
    page,
    limit,
    status: 'published',
  });
}
