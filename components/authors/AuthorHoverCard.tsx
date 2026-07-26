'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import type { ApiAuthor } from '@/lib/api/common.types';

interface AuthorHoverCardProps {
  author: ApiAuthor;
  articleCount: number;
  latestPosts: { title: string; slug: string; href: string }[];
  children: React.ReactNode;
}

export default function AuthorHoverCard({
  author,
  articleCount,
  latestPosts,
  children,
}: AuthorHoverCardProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  useEffect(() => () => cancelClose(), []);

  const authorHref = `/authors/${slugify(author.name)}`;

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="flex items-center gap-2.5 text-left"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {children}
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 w-80 max-w-[90vw] rounded-xl border border-[var(--border)] bg-white p-5 shadow-xl z-50 text-left"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <p className="text-lg font-bold text-[var(--foreground)]">{author.name}</p>
          <p className="mt-1 text-sm font-semibold text-[var(--primary)]">
            {author.role}
            {author.role && ' · '}
            {articleCount} Article{articleCount === 1 ? '' : 's'}
            {author.xUrl && (
              <a
                href={author.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name}'s X profile`}
                className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-black text-white align-middle"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}
          </p>

          {author.bio && (
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] line-clamp-3">
              {author.bio}{' '}
              <Link href={authorHref} className="text-[var(--primary)] hover:underline whitespace-nowrap">
                See full bio
              </Link>
            </p>
          )}

          {latestPosts.length > 0 && (
            <>
              <div className="mt-4 border-t border-[var(--border)] pt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted-foreground)]">
                  Latest Posts:
                </p>
                <ul className="mt-2 space-y-2">
                  {latestPosts.map((post) => (
                    <li key={post.slug} className="flex gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full border border-[var(--muted-foreground)]" />
                      <Link href={post.href} className="text-[var(--foreground)] hover:text-[var(--primary)]">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
