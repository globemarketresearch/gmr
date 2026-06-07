"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

interface MegaMenuProps {
  categories: Category[];
  isActive: boolean;
}

export default function MegaMenu({ categories, isActive }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const open = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(true), 100);
  };

  const close = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), 180);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setIsOpen(false); triggerRef.current?.focus(); }
    else if ((e.key === "Enter" || e.key === " ") && e.target === triggerRef.current) {
      e.preventDefault(); setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative" onMouseLeave={close} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={open}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Browse reports by category"
        className={cn(
          "relative text-[14.5px] tracking-wide transition-all duration-150 whitespace-nowrap py-1",
          "flex items-center gap-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent rounded",
          isActive
            ? "font-extrabold text-black"
            : "font-medium text-black/55 hover:text-black hover:font-semibold"
        )}
      >
        Reports
        <svg
          className={cn("w-3 h-3 transition-transform duration-200 opacity-60", isOpen && "rotate-180")}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
        {isActive && !isOpen && (
          <span className="absolute -bottom-[18px] left-0 right-0 h-[2px] bg-sky-400 rounded-full" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ top: "var(--sticky-header-height, 68px)" }}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Dropdown Panel */}
      <div
        className={cn(
          "fixed left-0 right-0 z-50",
          "transition-all duration-250 ease-out",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-3 pointer-events-none"
        )}
        onMouseEnter={open}
        onMouseLeave={close}
        role="menu"
        aria-label="Report categories"
        aria-hidden={!isOpen}
        style={{
          top: "var(--sticky-header-height, 68px)",
          background: "#ffffff",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          {/* Panel Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 rounded-full bg-sky-500" />
              <div>
                <h2 className="text-sm font-bold text-[#0f2236] tracking-tight">Research Reports</h2>
                <p className="text-[11px] text-[#6b7a8d] mt-0.5">Browse by industry sector</p>
              </div>
            </div>
            <Link
              href="/industry"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-sky-600 hover:text-sky-700 transition-colors"
            >
              View all reports
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {categories.map((category, i) => (
              <Link
                key={category.id}
                href={`/industry/${category.slug}`}
                onClick={() => setIsOpen(false)}
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
                className="group block p-3.5 rounded-lg border border-transparent hover:border-sky-100 hover:bg-sky-50/70 transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40"
                style={{ animationDelay: `${i * 20}ms` }}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-slate-100 group-hover:bg-sky-100 transition-colors duration-150">
                    <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-500 transition-colors duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[12.5px] font-semibold text-[#1a2b3c] group-hover:text-sky-700 transition-colors duration-150 leading-tight">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-[11px] text-[#8a9aaa] mt-1 line-clamp-2 leading-snug">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer strip */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[11px] text-slate-400">
              {categories.length} industry sectors covered
            </p>
            <Link
              href="/request-sample"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white px-3 py-1.5 rounded-lg transition-all duration-150"
              style={{ background: "linear-gradient(135deg, #0284c7, #0ea5e9)" }}
            >
              Request Custom Report
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
