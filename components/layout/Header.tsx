"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Navigation from "./Navigation";
import GoogleTranslate from "./GoogleTranslate";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep --sticky-header-height in sync so mega menus position correctly
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const update = () =>
      document.documentElement.style.setProperty("--sticky-header-height", `${el.offsetHeight}px`);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={stickyRef} className="relative w-full z-50">
      {/* Announcement bar */}
      {/* {announcementVisible && (
        <div className="relative bg-[#071524] text-white text-xs py-2 px-4 text-center flex items-center justify-center gap-3 border-b border-white/5">
          <span className="inline-flex items-center gap-1.5 bg-sky-500/10 text-sky-300 border border-sky-500/20 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase">
            <span className="w-1 h-1 rounded-full bg-sky-400 animate-pulse" />
            New
          </span>
          <span className="text-white/60 font-light tracking-wide">
            Global Pharmaceuticals Market Analysis 2026 —{" "}
            <Link
              href="/industry/pharmaceuticals"
              className="text-sky-300 hover:text-sky-100 font-medium transition-colors duration-150 underline underline-offset-2 decoration-sky-500/40 hover:decoration-sky-300"
            >
              Access Report
            </Link>
          </span>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-3 text-white/25 hover:text-white/70 transition-colors duration-150 p-1 rounded"
            aria-label="Dismiss announcement"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )} */}

      <header
        className="w-full relative transition-all duration-300"
        style={{
          background: "#fdfdfd",
          boxShadow: scrolled
            ? "0 1px 0 rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08)"
            : "0 1px 0 rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto flex h-[74px] md:h-[96px] items-center justify-between px-4 sm:px-6 lg:px-8 gap-2 md:gap-3 w-full">
          {/* Logo */}
          <h2 className="sr-only">Globe Market Research</h2>
          <Link href="/" className="flex min-w-0 items-center flex-shrink group">
            <div className="min-w-0 transition-opacity duration-200 group-hover:opacity-90">
              <Image
                src="/assets/images/logo.jpg"
                alt="Globe Market Research"
                width={360}
                height={106}
                priority
                fetchPriority="high"
                sizes="(max-width: 767px) 216px, 360px"
                className="h-[58px] w-auto max-w-[216px] object-contain md:h-[77px] md:max-w-[264px]"
              />
            </div>
          </Link>

          {/* Right side: Nav + actions */}
          <div className="flex flex-shrink-0 items-center gap-1.5 md:gap-2">
            <Navigation />

            {/* Divider */}
            <div className="hidden md:block h-5 w-px bg-gray-200 mx-1" />

            {/* Request Sample CTA */}
            <Link
              href="/request-sample"
              className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-wide px-4 py-2 rounded-lg text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2"
              style={{
                background: "linear-gradient(135deg, #1DAEBF 0%, #2CC8D8 100%)",
                boxShadow: "0 0 0 1px rgba(44,200,216,0.3), 0 2px 8px rgba(44,200,216,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 0 1px rgba(44,200,216,0.5), 0 4px 16px rgba(44,200,216,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 0 1px rgba(44,200,216,0.3), 0 2px 8px rgba(44,200,216,0.3)";
              }}
            >
              Request Sample
              <svg className="w-3 h-3 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Google Translate */}
            <div className="pl-1">
              <GoogleTranslate />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
