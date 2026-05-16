"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ConsultingService, ServiceCategory } from "@/lib/api/consulting.types";

interface ConsultingMenuProps {
  services: ConsultingService[];
  isActive: boolean;
}

const categoryIcons: Record<string, React.ReactNode> = {
  default: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

export default function ConsultingMenu({ services, isActive }: ConsultingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const servicesByCategory = services.reduce((acc, service) => {
    const category = service.category as ServiceCategory;
    if (!acc[category]) acc[category] = [];
    acc[category].push(service);
    return acc;
  }, {} as Record<ServiceCategory, ConsultingService[]>);

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

  const categoryEntries = Object.entries(servicesByCategory);

  return (
    <div className="relative" onMouseLeave={close} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={open}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Browse consulting services"
        className={cn(
          "relative text-[13px] font-medium tracking-wide transition-colors duration-150 whitespace-nowrap py-1",
          "flex items-center gap-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent rounded",
          isActive ? "text-white" : "text-white/55 hover:text-white/90"
        )}
      >
        Consulting
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
        aria-label="Consulting services"
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
              <div className="w-1 h-5 rounded-full bg-emerald-500" />
              <div>
                <h2 className="text-sm font-bold text-[#0f2236] tracking-tight">Consulting &amp; Services</h2>
                <p className="text-[11px] text-[#6b7a8d] mt-0.5">Expert-led research and advisory</p>
              </div>
            </div>
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              All services
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Services by Category */}
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: `repeat(${Math.min(categoryEntries.length, 3)}, 1fr)` }}
          >
            {categoryEntries.map(([category, categoryServices]) => (
              <div key={category}>
                {/* Category label */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px flex-1 bg-slate-100" />
                  <span className="text-[10px] font-bold text-slate-400 tracking-[0.1em] uppercase flex-shrink-0">
                    {category}
                  </span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                {/* Services */}
                <div className="flex flex-col gap-1">
                  {categoryServices.map((service) => (
                    <Link
                      key={service.id}
                      href={`/consulting/${service.slug}`}
                      onClick={() => setIsOpen(false)}
                      role="menuitem"
                      tabIndex={isOpen ? 0 : -1}
                      className="group flex items-start gap-3 p-3 rounded-xl border border-transparent hover:border-emerald-100 hover:bg-emerald-50/50 transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                    >
                      <div className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-slate-100 group-hover:bg-emerald-100 transition-colors duration-150 text-slate-400 group-hover:text-emerald-500">
                        {categoryIcons.default}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[12.5px] font-semibold text-[#1a2b3c] group-hover:text-emerald-700 transition-colors duration-150 leading-tight">
                          {service.title}
                        </h4>
                        <p className="text-[11px] text-[#8a9aaa] mt-0.5 line-clamp-2 leading-snug">
                          {service.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA strip */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[11px] text-slate-400">
              Tailored research solutions for your business
            </p>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white px-3 py-1.5 rounded-lg transition-all duration-150"
              style={{ background: "linear-gradient(135deg, #059669, #10b981)" }}
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
