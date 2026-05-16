"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Navigation from "./Navigation";
import GoogleTranslate from "./GoogleTranslate";
import { SearchBar } from "@/components/ui";

export default function Header() {
  const [announcementVisible, setAnnouncementVisible] = useState(true);
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
    <div ref={stickyRef} className="sticky top-0 z-50 w-full">
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
          background: "rgba(8, 24, 40, 0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: scrolled
            ? "0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.4)"
            : "0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-[1400px] 2xl:max-w-[1760px] mx-auto flex h-[68px] items-center justify-between px-4 sm:px-6 lg:px-8 gap-3 w-full">
          {/* Logo */}
          <h2 className="sr-only">Globe Market Research</h2>
          <Link href="/" className="flex items-center flex-shrink-0 group">
            <Image
              src="/assets/images/logo.png"
              alt="Globe Market Research"
              width={180}
              height={50}
              priority
              fetchPriority="high"
              sizes="180px"
              className="h-12 w-auto md:h-[52px] transition-opacity duration-200 group-hover:opacity-90 brightness-0 invert"
            />
          </Link>

          {/* Search — desktop */}
          <div className="hidden lg:flex flex-1 max-w-sm xl:max-w-md mx-6">
            <SearchBar
              variant="header"
              placeholder="Search reports, industries…"
              className="w-full [&_input]:bg-white/[0.06] [&_input]:border-white/10 [&_input]:text-white/80 [&_input]:placeholder:text-white/25 [&_input]:rounded-lg [&_input]:text-sm [&_input]:h-9 [&_input:focus]:border-sky-500/40 [&_input:focus]:bg-white/[0.08] [&_input:focus]:ring-0 [&_svg:not(.clear-icon)]:text-white/30"
            />
          </div>

          {/* Right side: Nav + actions */}
          <div className="flex items-center gap-2">
            <Navigation />

            {/* Divider */}
            <div className="hidden md:block h-5 w-px bg-white/10 mx-1" />

            {/* Request Sample CTA */}
            <Link
              href="/request-sample"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide px-4 py-2 rounded-lg text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)",
                boxShadow: "0 0 0 1px rgba(14,165,233,0.3), 0 2px 8px rgba(2,132,199,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 0 1px rgba(14,165,233,0.5), 0 4px 16px rgba(2,132,199,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 0 1px rgba(14,165,233,0.3), 0 2px 8px rgba(2,132,199,0.3)";
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
