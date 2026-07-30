// Industry News types for API integration
import type { ApiCategory } from './categories.types';
import type { ApiAuthor } from './common.types';

/**
 * Industry News status from API
 */
export type IndustryNewsStatus = 'draft' | 'review' | 'published';

/**
 * Industry News metadata from API
 */
export interface ApiIndustryNewsMetadata {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  [key: string]: string | string[] | undefined;
}

/**
 * Industry News entity from API (matches actual API response)
 */
export interface ApiIndustryNews {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  categoryId?: number;
  authorId?: number;
  author?: ApiAuthor;
  category?: ApiCategory;
  tags?: string;
  status: IndustryNewsStatus;
  publishDate?: string | null;
  scheduledPublishEnabled?: boolean;
  location?: string;
  metadata?: ApiIndustryNewsMetadata;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string | null;
  reviewedBy?: number | null;
}

/**
 * UI Industry News interface (used by components)
 */
export interface IndustryNews {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string;

  // Extended fields for detail page
  tags?: string[];
  location?: string;

  // Full nested objects from API
  authorId?: number;
  categoryId?: number;
  authorDetails?: ApiAuthor;
  categoryDetails?: ApiCategory;

  // Metadata fields
  metadata?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };

  // Publishing fields
  status?: IndustryNewsStatus;
  publishDate?: string | null;
  scheduledPublishEnabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Industry News filters for API queries
 */
export interface IndustryNewsFilters {
  page?: number;
  limit?: number;
  status?: IndustryNewsStatus;
  category?: string;
  categoryId?: number;
  authorId?: number;
  search?: string;
  sort_by?: string;
}

/**
 * Paginated list of industry news from API
 */
export interface IndustryNewsListData {
  industryNews: ApiIndustryNews[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Single industry news detail response from API
 */
export interface IndustryNewsDetailData {
  industryNews: ApiIndustryNews;
}
