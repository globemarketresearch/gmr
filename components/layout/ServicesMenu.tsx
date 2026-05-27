"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Service } from "@/lib/api/services.types";

interface ServicesMenuProps {
  services: Service[];
  isActive: boolean;
}

const iconColors: string[] = [
  "#2563eb", "#7c3aed", "#059669", "#ea580c", "#0891b2", "#e11d48", "#d97706",
];

function SmallIcon({ name, color }: { name: string; color: string }) {
  const cls = "w-3.5 h-3.5";
  const icons: Record<string, React.ReactNode> = {
    "chart-bar": (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    "adjustments": (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    "rocket": (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.818" />
      </svg>
    ),
    "briefcase": (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    "search-circle": (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    "eye": (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    "users": (
      <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };
  return <span style={{ color }}>{icons[name] ?? icons["briefcase"]}</span>;
}

export default function ServicesMenu({ services, isActive }: ServicesMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

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
    else if ((e.key === "Enter" || e.key === " ") && e.target === triggerRef.current) {
      e.preventDefault(); setIsOpen(!isOpen);
    }
  };

  // Split into two columns
  const col1 = services.slice(0, Math.ceil(services.length / 2));
  const col2 = services.slice(Math.ceil(services.length / 2));

  return (
    <div className="relative" onMouseLeave={close} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={open}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Browse services"
        className={cn(
          "relative text-[13px] tracking-wide transition-all duration-150 whitespace-nowrap py-1",
          "flex items-center gap-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent rounded",
          isActive
            ? "font-extrabold text-black"
            : "font-medium text-black/55 hover:text-black hover:font-semibold"
        )}
      >
        Services
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
        aria-label="Services"
        aria-hidden={!isOpen}
        style={{
          top: "var(--sticky-header-height, 68px)",
          background: "#ffffff",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 rounded-full bg-blue-500" />
              <div>
                <h2 className="text-sm font-bold text-[#0f2236] tracking-tight">Research &amp; Consulting Services</h2>
                <p className="text-[11px] text-[#6b7a8d] mt-0.5">Intelligence and advisory across 7 service lines</p>
              </div>
            </div>
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              All services
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Two-column service grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            {[col1, col2].map((col, ci) => (
              <div key={ci} className="flex flex-col gap-1">
                {col.map((service, i) => {
                  const idx = ci === 0 ? i : col1.length + i;
                  const color = iconColors[idx % iconColors.length];
                  return (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      onClick={() => setIsOpen(false)}
                      role="menuitem"
                      tabIndex={isOpen ? 0 : -1}
                      className="group flex items-start gap-3 p-3 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50/50 transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"
                    >
                      <div
                        className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-150"
                        style={{ background: `${color}15` }}
                      >
                        <SmallIcon name={service.icon} color={color} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[12.5px] font-semibold text-[#1a2b3c] group-hover:text-blue-700 transition-colors duration-150 leading-tight">
                          {service.title}
                        </h4>
                        <p className="text-[11px] text-[#8a9aaa] mt-0.5 line-clamp-1 leading-snug">
                          {service.tagline}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[11px] text-slate-400">
              Tailored market research and consulting for your business
            </p>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white px-3 py-1.5 rounded-lg transition-all duration-150"
              style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}
            >
              Speak to an Analyst
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
