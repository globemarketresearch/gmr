'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui';
import { slugify } from '@/lib/utils';
import type { ApiAuthor } from '@/lib/api/common.types';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function AuthorCard({ author }: { author: ApiAuthor }) {
  return (
    <Card className="border border-slate-200 h-full">
      <CardContent className="space-y-4 p-6">
        {/* Header with profile image + name/role */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {author.imageUrl ? (
              <Image
                src={author.imageUrl}
                alt={author.name}
                width={64}
                height={64}
                className="rounded-full object-cover border-2 border-[var(--primary)]"
                unoptimized
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xl font-semibold">
                {getInitials(author.name)}
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/authors/${slugify(author.name)}`}
                className="hover:text-[var(--primary)] transition-colors"
              >
                <CardTitle className="text-lg mb-1">{author.name}</CardTitle>
              </Link>
              {author.linkedinUrl && (
                <a
                  href={author.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A66C2] hover:text-[#004182] transition-colors"
                  aria-label={`${author.name}'s LinkedIn profile`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>
            <CardDescription className="text-sm">{author.role}</CardDescription>
          </div>
        </div>

        {/* Bio */}
        <div className="text-[var(--muted-foreground)]">
          <p className="text-sm leading-relaxed line-clamp-4">{author.bio}</p>
        </div>

        {/* View Profile Button */}
        <Link
          href={`/authors/${slugify(author.name)}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors pt-2"
        >
          View Author Profile
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </CardContent>
    </Card>
  );
}
