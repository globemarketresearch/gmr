"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import categories from "@/data/categories.json";
import servicesData from "@/data/services.json";
import MegaMenu from "./MegaMenu";
import ServicesMenu from "./ServicesMenu";
import { cn } from "@/lib/utils";
import { Service } from "@/lib/api/services.types";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Statistics", href: "/statistics" },
  { name: "Press Releases", href: "/press-releases" },
];

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const isActive =
    pathname === href ||
    pathname.startsWith(href + "/") ||
    (href === "/statistics" && pathname.startsWith("/statistic/"));

  return (
    <Link
      href={href}
      className={cn(
        "relative text-[14.5px] tracking-wide transition-all duration-150 whitespace-nowrap py-1",
        isActive
          ? "font-extrabold text-black"
          : "font-medium text-black/55 hover:text-black hover:font-semibold"
      )}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-[18px] left-0 right-0 h-[2px] bg-cyan-400 rounded-full" />
      )}
    </Link>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const services = servicesData as Service[];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-4 lg:gap-5">
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.name} pathname={pathname} />
        ))}

        <MegaMenu
          categories={categories}
          isActive={pathname.startsWith("/industry") || pathname.startsWith("/reports")}
        />

        {/* New Services dropdown (7 core service lines) */}
        <ServicesMenu
          services={services}
          isActive={pathname.startsWith("/services")}
        />

        <NavLink href="/about" label="About Us" pathname={pathname} />
        <NavLink href="/contact" label="Contact" pathname={pathname} />
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 hover:bg-gray-100"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
      >
        <div className="relative w-[18px] h-[14px]">
          <span className={cn(
            "absolute left-0 w-[18px] h-[1.5px] transition-all duration-250 bg-gray-600",
            isMobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
          )} />
          <span className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 w-[18px] h-[1.5px] transition-all duration-250 bg-gray-600",
            isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
          )} />
          <span className={cn(
            "absolute left-0 w-[18px] h-[1.5px] transition-all duration-250 bg-gray-600",
            isMobileMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
          )} />
        </div>
      </button>

      {mounted && createPortal(
        <>
          {/* Mobile Backdrop */}
          <div
            className={cn(
              "fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-sm transition-opacity duration-300",
              isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Drawer */}
          <div
            className={cn(
              "fixed inset-0 z-50 md:hidden",
              "transition-transform duration-300 ease-out",
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            aria-hidden={!isMobileMenuOpen}
            style={{
              background: "linear-gradient(180deg, #071828 0%, #0a1e30 100%)",
              boxShadow: isMobileMenuOpen ? "-24px 0 60px rgba(0,0,0,0.5)" : "none",
            }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/5">
              <span className="text-white/40 text-xs font-semibold tracking-[0.12em] uppercase">Navigation</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
                aria-label="Close menu"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100%-65px)]">
              <nav className="flex flex-col p-3 gap-0.5">
                {[...navItems, { name: "About Us", href: "/about" }, { name: "Contact", href: "/contact" }].map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 py-2.5 px-3 text-sm font-medium rounded-lg transition-all duration-150",
                        isActive
                          ? "text-cyan-300 bg-cyan-500/10"
                          : "text-white/60 hover:text-white/90 hover:bg-white/5"
                      )}
                    >
                      {isActive && <span className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />}
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Services Section (new 7 core services) */}
              <div className="mx-3 mt-2 pt-4 border-t border-white/5">
                <span className="block px-3 mb-2 text-[10px] font-bold text-white/20 tracking-[0.12em] uppercase">
                  Services
                </span>
                <Link
                  href="/services"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 px-3 text-sm font-semibold text-sky-300 hover:text-sky-200 hover:bg-sky-500/5 rounded-lg transition-colors"
                >
                  All Services
                  <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <div className="flex flex-col gap-0.5 mt-0.5">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-2 px-3 text-[13px] text-white/40 hover:text-white/70 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Reports Section */}
              <div className="mx-3 mt-4 pt-4 border-t border-white/5">
                <span className="block px-3 mb-2 text-[10px] font-bold text-white/20 tracking-[0.12em] uppercase">
                  Reports
                </span>
                <Link
                  href="/industry"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 px-3 text-sm font-semibold text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/5 rounded-lg transition-colors"
                >
                  All Reports
                  <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <div className="flex flex-col gap-0.5 mt-0.5">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/industry/${category.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-2 px-3 text-[13px] text-white/40 hover:text-white/70 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="m-4 mt-6">
                <Link
                  href="/request-sample"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-3 text-center text-white text-sm font-semibold rounded-lg transition-all duration-200"
                  style={{
                    background: "linear-gradient(135deg, #1DAEBF 0%, #2CC8D8 100%)",
                    boxShadow: "0 4px 16px rgba(44,200,216,0.35)",
                  }}
                >
                  Request Sample Report
                </Link>
              </div>

              {/* Social */}
              <div className="px-5 pb-8 pt-2">
                <div className="flex items-center gap-4">
                  {[
                    { href: "https://www.facebook.com/people/Healthcare-Foresights/61588605652792/", Icon: Facebook, label: "Facebook" },
                    { href: "https://www.instagram.com/GlobeMarketResearch", Icon: Instagram, label: "Instagram" },
                    { href: "https://www.linkedin.com/company/healthcare-foresights/", Icon: Linkedin, label: "LinkedIn" },
                    { href: "https://x.com/Healthcare_F", Icon: Twitter, label: "X" },
                  ].map(({ href, Icon, label }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-white/20 hover:text-cyan-400 transition-colors duration-150"
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
