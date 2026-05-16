"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { CONTACT_INFO } from "@/lib/contact";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/industry", label: "Research Reports" },
    { href: "/statistics", label: "Statistics" },
    { href: "/press-releases", label: "Press Releases" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const legalLinks = [
    { href: "/legal/privacy-policy", label: "Privacy Policy" },
    { href: "/legal/refund-policy", label: "Refund Policy" },
    { href: "/legal/cancellation-policy", label: "Cancellation Policy" },
  ];

  const consultingLinks = [
    { href: "/consulting/market-assessment", label: "Market Assessment" },
    { href: "/consulting/healthcare-competitive-intelligence", label: "Competitive Intelligence" },
    { href: "/consulting/rd-analysis", label: "R&D Analysis" },
    { href: "/consulting/primary-market-research", label: "Primary Research" },
    { href: "/consulting/mergers-acquisitions", label: "M&A Advisory" },
  ];

  const socials = [
    { href: "https://www.facebook.com/people/Healthcare-Foresights/61588605652792/", Icon: Facebook, label: "Facebook" },
    { href: "https://www.instagram.com/GlobeMarketResearch", Icon: Instagram, label: "Instagram" },
    { href: "https://www.linkedin.com/company/healthcare-foresights/", Icon: Linkedin, label: "LinkedIn" },
    { href: "https://x.com/Healthcare_F", Icon: Twitter, label: "X (Twitter)" },
  ];

  return (
    <footer className="relative bg-[var(--featured-bg)] text-white overflow-hidden">
      {/* Gradient top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50" />

      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #7dd3fc 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4 pt-16 pb-10 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/assets/images/logo.png"
                alt="Globe Market Research"
                width={160}
                height={44}
                sizes="160px"
                className="h-20 w-auto brightness-0 invert hover:opacity-75 transition-opacity duration-200"
              />
            </Link>
            <p className="text-sm text-white/50 mb-7 leading-relaxed max-w-[210px]">
              Comprehensive market insights and analysis for global industries.
            </p>
            <div className="flex gap-2">
              {socials.map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-[var(--accent)] hover:bg-[var(--accent)]/15 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links + Legal */}
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm mb-6">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/55 hover:text-white transition-colors duration-150 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/35 hover:text-white/70 transition-colors duration-150 text-xs"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Consulting Services */}
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
              Consulting Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {consultingLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/55 hover:text-white transition-colors duration-150 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-start gap-3 text-white/55 hover:text-white transition-colors duration-150 group"
              >
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[var(--accent)] group-hover:text-[var(--accent)]" />
                <span className="break-all leading-snug">{CONTACT_INFO.email}</span>
              </a>
              <div className="flex items-center gap-3 text-white/55">
                <Phone className="w-4 h-4 shrink-0 text-[var(--accent)]" />
                <div className="flex flex-col gap-0.5">
                  <span>USA: {CONTACT_INFO.offices.usa.phoneFormatted}</span>
                  <span>India: {CONTACT_INFO.offices.india.phoneFormatted}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/request-sample"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] border border-[var(--accent)]/30 rounded-lg px-4 py-2.5 hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/60 transition-all duration-200"
            >
              Request a Sample
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            &copy; {currentYear} Globe Market Research. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-xs text-white/25 tracking-wide">Live intelligence platform</span>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-[var(--accent)] hover:bg-[var(--accent)]/15 transition-all duration-200"
              aria-label="Back to top"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
