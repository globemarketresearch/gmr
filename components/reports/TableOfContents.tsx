'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { SidebarTOCItem } from '@/lib/toc-utils';

interface TableOfContentsProps {
  items: SidebarTOCItem[];
  className?: string;
  onShowFullTOC?: () => void;
  showFullTOC?: boolean;
  onNavigateToSection?: (sectionId: string) => void;
  label?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  className,
  onShowFullTOC,
  showFullTOC,
  onNavigateToSection,
  label = 'Report Details',
}) => {
  const [activeId, setActiveId] = useState<string>('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const item = activeItemRef.current;
    if (!container || !item) return;

    const containerTop = container.scrollTop;
    const containerBottom = containerTop + container.clientHeight;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;

    if (itemTop < containerTop || itemBottom > containerBottom) {
      container.scrollTo({
        top: itemTop - container.clientHeight / 2 + item.offsetHeight / 2,
        behavior: 'smooth',
      });
    }
  }, [activeId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    if (showFullTOC && onNavigateToSection) {
      // Full TOC is open: trigger close + scroll sequence
      onNavigateToSection(id);
    } else {
      // Normal behavior: scroll immediately
      const element = document.getElementById(id);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav
      className={cn(
        'flex flex-col max-h-[calc(100vh-8rem)]',
        className
      )}
    >
      <div className="flex flex-col flex-1 min-h-0">
        {onShowFullTOC && (
          <button
            onClick={onShowFullTOC}
            className="mb-5 w-full group relative flex-shrink-0 overflow-hidden rounded-xl active:scale-[0.985] transition-all duration-200"
            style={{ boxShadow: '0 4px 16px 0 rgba(2,132,199,0.30)' }}
          >
            <div className="relative flex items-center gap-3 px-4 py-3.5 bg-gradient-to-br from-[#0f2236] via-[#0284c7] to-[#0ea5e9] rounded-xl">
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.09] to-transparent pointer-events-none"
                style={{ transition: 'transform 0.7s ease' }}
              />
              <svg
                className="w-4 h-4 text-sky-200 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 11h16M4 16h10" />
              </svg>
              <span className="text-white text-[12px] font-semibold uppercase tracking-[0.1em] leading-none">
                Table of Contents
              </span>
              <svg
                className="w-3.5 h-3.5 text-white/40 ml-auto flex-shrink-0 group-hover:text-sky-200 group-hover:translate-x-0.5 transition-all duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}

        {/* Header */}
        <div className="flex items-center gap-2 mb-4 flex-shrink-0">
          <div className="w-1 h-4 rounded-full bg-[var(--primary)]" />
          <h3 className="text-[11px] font-bold text-[var(--primary)] uppercase tracking-[0.12em]">
            {label}
          </h3>
        </div>

        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pb-4">
          <ul className="space-y-1.5">
            {items.map((item, index) => {
              const isActive = activeId === item.id;
              return (
                <li
                  key={item.id}
                  ref={isActive ? activeItemRef : null}
                  className="transition-all duration-200"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={cn(
                      'group flex items-center gap-3 py-2.5 px-3.5 rounded-lg transition-all duration-200',
                      isActive
                        ? 'bg-[var(--primary)] text-white shadow-md shadow-[rgba(2,132,199,0.25)]'
                        : 'bg-white hover:bg-[var(--accent-muted)] text-[var(--foreground)] border border-gray-100 hover:border-[var(--primary)] shadow-sm'
                    )}
                  >
                    <span
                      className={cn(
                        'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors duration-200',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-[var(--primary)] group-hover:text-white'
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className={cn(
                      'text-sm leading-snug transition-colors duration-200',
                      isActive ? 'font-semibold' : 'font-medium'
                    )}>
                      {item.title}
                    </span>
                    {isActive && (
                      <svg className="w-3.5 h-3.5 ml-auto flex-shrink-0 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
