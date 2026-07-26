'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import type { ApiAuthor } from '@/lib/api/common.types';

interface AuthorHoverCardProps {
  author: ApiAuthor;
  articleCount: number;
  latestPosts: { title: string; slug: string; href: string }[];
  children: React.ReactNode;
}

// Gap kept between the panel and the trigger / viewport edges when measuring
// available space, so the panel never touches the header or window border.
const PANEL_MARGIN = 12;
const PANEL_WIDTH = 320;
const MIN_PANEL_HEIGHT = 160;
const PREFERRED_PANEL_HEIGHT = 260;

interface PanelPosition {
  left: number;
  top?: number;
  bottom?: number;
  maxHeight: number;
}

export default function AuthorHoverCard({
  author,
  articleCount,
  latestPosts,
  children,
}: AuthorHoverCardProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<PanelPosition | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

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
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        panelRef.current &&
        !panelRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  useEffect(() => () => cancelClose(), []);

  // Portalled to document.body and positioned with `fixed` coordinates
  // computed from the trigger's real screen position — this escapes any
  // `overflow-hidden` ancestor (e.g. the page hero's clipped background),
  // which an absolutely-positioned descendant never can. Flips above/below
  // the trigger based on actual available space and caps height with an
  // internal scroll so the panel always fits on-screen.
  useLayoutEffect(() => {
    if (!open || !containerRef.current) return;

    const measure = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom - PANEL_MARGIN;
      const spaceAbove = rect.top - PANEL_MARGIN;
      const left = Math.min(rect.left, window.innerWidth - PANEL_WIDTH - PANEL_MARGIN);

      if (spaceBelow >= PREFERRED_PANEL_HEIGHT || spaceBelow >= spaceAbove) {
        setPosition({
          left,
          top: rect.bottom + PANEL_MARGIN,
          maxHeight: Math.max(MIN_PANEL_HEIGHT, spaceBelow),
        });
      } else {
        setPosition({
          left,
          bottom: window.innerHeight - rect.top + PANEL_MARGIN,
          maxHeight: Math.max(MIN_PANEL_HEIGHT, spaceAbove),
        });
      }
    };

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [open]);

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

      {open &&
        mounted &&
        position &&
        createPortal(
          <div
            ref={panelRef}
            className="fixed w-80 max-w-[90vw] overflow-y-auto rounded-xl border border-[hsl(var(--border))] bg-white p-5 shadow-xl z-50 text-left"
            style={{
              left: position.left,
              top: position.top,
              bottom: position.bottom,
              maxHeight: position.maxHeight,
            }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <p className="text-lg font-bold text-[hsl(var(--foreground))]">{author.name}</p>
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
              <>
                <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))] line-clamp-3">
                  {author.bio}
                </p>
                <Link
                  href={authorHref}
                  className="mt-1 inline-block text-sm text-[var(--primary)] hover:underline"
                >
                  See full bio
                </Link>
              </>
            )}

            {latestPosts.length > 0 && (
              <div className="mt-4 border-t border-[hsl(var(--border))] pt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
                  Latest Posts:
                </p>
                <ul className="mt-2 space-y-2">
                  {latestPosts.map((post) => (
                    <li key={post.slug} className="flex gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full border border-[hsl(var(--muted-foreground))]" />
                      <Link href={post.href} className="text-[hsl(var(--foreground))] hover:text-[var(--primary)]">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
