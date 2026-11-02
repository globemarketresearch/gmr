"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const insightsLinks = [
  {
    name: "Press Releases",
    href: "/press-releases",
    description: "Announcements and new report launches",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    color: "#0891b2",
  },
  {
    name: "Industry News",
    href: "/industry-news",
    description: "Latest developments across sectors",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    color: "#2563eb",
  },
];

interface InsightsMenuProps {
  pathname: string;
}

export default function InsightsMenu({ pathname }: InsightsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isActive = insightsLinks.some(
    (l) => pathname === l.href || pathname.startsWith(l.href + "/")
  );

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  // Close when navigating
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const open = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(true), 80);
  };

  const close = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), 180);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setIsOpen(false); triggerRef.current?.focus(); }
  };

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={cn(
          "relative text-[14.5px] tracking-wide transition-all duration-150 whitespace-nowrap py-1",
          "flex items-center gap-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent rounded",
          isActive
            ? "font-extrabold text-black"
            : "font-medium text-black/55 hover:text-black hover:font-semibold"
        )}
      >
        Insights
        <svg
          className={cn("w-3 h-3 transition-transform duration-200 opacity-60", isOpen && "rotate-180")}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
        {isActive && !isOpen && (
          <span className="absolute -bottom-[18px] left-0 right-0 h-[2px] bg-cyan-400 rounded-full" />
        )}
      </button>

      {/* Dropdown — pt-4 acts as a hover bridge between trigger and panel */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50 w-[280px]",
          "transition-all duration-200 ease-out",
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        )}
        aria-hidden={!isOpen}
      >
        <div
          role="menu"
          aria-label="Insights"
          className="rounded-xl bg-white p-1.5 border border-black/[0.06]"
          style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }}
        >
          {insightsLinks.map((item) => {
            const itemActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
                className={cn(
                  "group flex items-start gap-3 p-2.5 rounded-lg transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40",
                  itemActive ? "bg-cyan-50/70" : "hover:bg-slate-50"
                )}
              >
                <span
                  className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  {item.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold text-[#1a2b3c] group-hover:text-blue-700 transition-colors duration-150 leading-tight">
                    {item.name}
                  </span>
                  <span className="block text-[11px] text-[#8a9aaa] mt-0.5 leading-snug">
                    {item.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
