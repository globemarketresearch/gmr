// Media Mention types

export interface ApiMediaMention {
  id: number;
  title: string;
  link?: string;
  imageUrl?: string;
  displayOrder?: number;
  reportSlug?: string;
  reportLinkText?: string;
  createdAt?: string;
  updatedAt?: string;
}
