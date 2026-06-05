"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { CONTACT_INFO } from "@/lib/contact";
import FooterNewsletter from "./FooterNewsletter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/industry", label: "Research Reports" },
    { href: "/statistics", label: "Statistics" },
    { href: "/press-releases", label: "Press Releases" },
    { href: "/industry", label: "All Industries" },
  ];

  const legalLinks = [
    { href: "/legal/privacy-policy", label: "Privacy Policy" },
    { href: "/legal/refund-policy", label: "Return & Refund Policy" },
    { href: "/legal/terms-and-conditions", label: "Terms & Conditions" },
    { href: "/how-to-order", label: "How to Order" },
  ];

  const socials = [
    { href: "https://www.linkedin.com/company/globemarketresearch/", Icon: Linkedin, label: "LinkedIn" },
    { href: "https://x.com/GMR172026", Icon: Twitter, label: "X (Twitter)" },
    { href: "https://www.facebook.com/people/Globe-Market-Research/61590289933378/", Icon: Facebook, label: "Facebook" },
    { href: "https://www.instagram.com/GlobeMarketResearch", Icon: Instagram, label: "Instagram" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* ── Section 1: Newsletter – dark theme ── */}
      <div className="relative bg-[#1c2333] text-white">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
        <div className="relative container mx-auto px-4 pt-12 pb-12 sm:px-6 lg:px-10">
          <div
            className="rounded-xl px-5 py-6 sm:px-8 sm:py-7"
            style={{
              background: "linear-gradient(105deg, rgba(44,200,216,0.10) 0%, rgba(44,200,216,0.04) 50%, rgba(25,195,213,0.08) 100%)",
              border: "1px solid rgba(44,200,216,0.18)",
            }}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              {/* Left copy */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-400" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-400">
                    Weekly Intelligence Feed
                  </span>
                </div>
                <p className="text-xl font-semibold text-white/90 leading-snug">
                  Subscribe to our Newsletter
                </p>
                <p className="text-xs text-white/45 leading-relaxed">
                  Market trends, research briefs, and sector insights every week.
                </p>
              </div>
              {/* Right: compact form */}
              <div className="w-full sm:w-72 lg:w-80 flex-shrink-0">
                <FooterNewsletter />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Links & info – light theme ── */}
      <div
        className="text-slate-800 border-t border-slate-200"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at top right, rgba(113, 206, 210, 0.65) 0%, rgba(168, 223, 224, 0.4) 40%, transparent 75%), " +
            "radial-gradient(ellipse 85% 75% at bottom left, rgba(113, 206, 210, 0.65) 0%, rgba(168, 223, 224, 0.4) 40%, transparent 75%), " +
            "#f4fbfb",
        }}
      >
        <div className="container mx-auto px-6 pt-12 pb-8 lg:px-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

            {/* ── Column 1: Brand ── */}
            <div className="flex flex-col items-center text-center sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block mb-2 group">
                <Image
                  src="/assets/images/logo.png"
                  alt="Globe Market Research"
                  width={320}
                  height={88}
                  sizes="320px"
                  className="h-40 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                />
              </Link>

              <p className="text-sm text-slate-500 leading-relaxed max-w-[240px] mb-6">
                Delivering actionable insights that drive strategic decisions across global markets.
              </p>

              {/* Social icons */}
              <div className="flex gap-3 justify-center">
                {socials.map(({ href, Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-blue-200 flex items-center justify-center text-[#4169E1] hover:text-white hover:bg-[#4169E1] hover:border-[#4169E1] transition-all duration-200"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Column 2: Quick Links ── */}
            <div className="flex flex-col items-start text-left">
              <h3 className="mb-5 text-sm font-semibold text-slate-800 tracking-wide">
                Quick Links
              </h3>
              <ul className="space-y-3.5 text-sm">
                {quickLinks.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-slate-500 hover:text-sky-600 transition-colors duration-150 min-h-[44px] flex items-center sm:min-h-0 sm:block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Column 3: Legal ── */}
            <div className="flex flex-col items-start text-left">
              <h3 className="mb-5 text-sm font-semibold text-slate-800 tracking-wide">
                Legal
              </h3>
              <ul className="space-y-3.5 text-sm">
                {legalLinks.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-slate-500 hover:text-sky-600 transition-colors duration-150 min-h-[44px] flex items-center sm:min-h-0 sm:block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Column 4: Get In Touch ── */}
            <div className="flex flex-col items-start text-left">
              <h3 className="mb-5 text-sm font-semibold text-slate-800 tracking-wide">
                Get In Touch
              </h3>
              <div className="space-y-4 text-sm w-full">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-start gap-2.5 text-slate-500 hover:text-sky-600 transition-colors duration-150 min-h-[44px] sm:min-h-0"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-sky-500" />
                  <span className="break-all leading-snug">{CONTACT_INFO.email}</span>
                </a>
                <Image
                  src="/assets/other/secure-payments.png"
                  alt="Accepted payment methods"
                  width={280}
                  height={60}
                  className="h-auto w-full max-w-[280px] mt-2 mix-blend-multiply"
                />
              </div>
            </div>
          </div>


          {/* ── Bottom bar ── */}
          <div className="mt-5 pt-5 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-400">
              &copy; {currentYear} Globe Market Research. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
