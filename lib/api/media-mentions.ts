// Media Mentions API client functions

import { apiFetch, type ApiResponse } from './config';
import type { ApiMediaMention } from './media-mentions.types';

interface MediaMentionsListData {
  data?: ApiMediaMention[];
  [key: string]: unknown;
}

export async function getMediaMentions(): Promise<ApiResponse<ApiMediaMention[]>> {
  const response = await apiFetch<MediaMentionsListData>('/api/v1/media-mentions?limit=100');

  if (!response.success) return response;

  let mentions: ApiMediaMention[];

  if (Array.isArray(response.data)) {
    mentions = response.data;
  } else if (response.data && 'data' in response.data && Array.isArray(response.data.data)) {
    mentions = response.data.data as ApiMediaMention[];
  } else {
    return { success: false, error: 'invalid_response', message: 'Unexpected response structure' };
  }

  mentions = [...mentions].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  return { success: true, data: mentions };
}
