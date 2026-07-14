// Media Mention types

export interface ApiMediaMention {
  id: number;
  title: string;
  link?: string;
  imageUrl?: string;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}
