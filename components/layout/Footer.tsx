"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
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
    { href: "/submit-news", label: "Submit News" },
  ];

  const legalLinks = [
    { href: "/legal/privacy-policy", label: "Privacy Policy" },
    { href: "/legal/refund-policy", label: "Return & Refund Policy" },
    { href: "/legal/cancellation-policy", label: "Terms & Conditions" },
    { href: "/contact", label: "How to Order" },
    { href: "/contact", label: "Frequently Asked Questions" },
    { href: "/legal/refund-policy", label: "Payment Method" },
  ];

  const socials = [
    { href: "https://www.linkedin.com/company/healthcare-foresights/", Icon: Linkedin, label: "LinkedIn" },
    { href: "https://x.com/Healthcare_F", Icon: Twitter, label: "X (Twitter)" },
    { href: "https://www.facebook.com/people/Healthcare-Foresights/61588605652792/", Icon: Facebook, label: "Facebook" },
    { href: "https://www.instagram.com/GlobeMarketResearch", Icon: Instagram, label: "Instagram" },
  ];

  return (
    <footer className="relative bg-[#1c2333] text-white overflow-hidden">
      {/* Subtle top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

      <div className="relative container mx-auto px-6 pt-14 pb-8 lg:px-10">

        {/* ── Newsletter band ──────────────────────────────────────── */}
        <div
          className="mb-12 rounded-xl px-6 py-7 sm:px-8"
          style={{
            background: "linear-gradient(105deg, rgba(44,200,216,0.10) 0%, rgba(44,200,216,0.04) 50%, rgba(25,195,213,0.08) 100%)",
            border: "1px solid rgba(44,200,216,0.18)",
          }}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Left copy */}
            <div className="space-y-1 max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="relative flex h-1.5 w-1.5"
                >
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-400" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-400">
                  Weekly Intelligence Feed
                </span>
              </div>
              <p className="text-sm font-semibold text-white/90 leading-snug">
                Subscribe to our Newsletter
              </p>
              <p className="text-xs text-white/45 leading-relaxed">
                Market trends, research briefs, and sector insights — every week.
              </p>
            </div>
            {/* Right: compact form */}
            <div className="sm:w-72 lg:w-80">
              <FooterNewsletter />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* ── Column 1: Brand ── */}
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="inline-block mb-5 group">
              <Image
                src="/assets/images/logo.jpg"
                alt="Globe Market Research"
                width={160}
                height={44}
                sizes="160px"
                className="h-20 w-auto rounded-lg opacity-90 group-hover:opacity-100 transition-opacity duration-200"
              />
            </Link>

            {/* Payment method badges */}
            {/* <div className="flex flex-wrap justify-center gap-1.5 mb-5">
              {paymentMethods.map((brand) => (
                <span
                  key={brand}
                  className="px-2 py-0.5 bg-white/10 border border-white/20 rounded text-[9px] font-bold text-white/65 tracking-wide"
                >
                  {brand}
                </span>
              ))}
            </div> */}

            <p className="text-sm text-white/50 leading-relaxed max-w-[200px] mb-6">
              Delivering actionable insights that drive strategic decisions across global markets.
            </p>

            {/* Social icons */}
            <div className="flex gap-2 justify-center">
              {socials.map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/35 hover:text-white hover:border-sky-400/60 hover:bg-sky-400/10 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div className="flex flex-col items-start text-left">
            <h3 className="mb-5 text-sm font-semibold text-white tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/50 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Legal ── */}
          <div className="flex flex-col items-start text-left">
            <h3 className="mb-5 text-sm font-semibold text-white tracking-wide">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              {legalLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/50 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Get In Touch ── */}
          <div className="flex flex-col items-start text-left">
            <h3 className="mb-5 text-sm font-semibold text-white tracking-wide">
              Get In Touch
            </h3>
            <div className="space-y-4 text-sm w-full">
              {/* Email */}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-start gap-2.5 text-white/50 hover:text-white transition-colors duration-150"
              >
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" />
                <span className="break-all leading-snug">
                  {CONTACT_INFO.email}
                </span>
              </a>

              {/* Phone – USA */}
              <a
                href={`tel:${CONTACT_INFO.offices.usa.phone}`}
                className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors duration-150"
              >
                <Phone className="w-4 h-4 shrink-0 text-sky-400" />
                <span>{CONTACT_INFO.offices.usa.phoneFormatted}</span>
              </a>

              {/* Phone – India */}
              <a
                href={`tel:${CONTACT_INFO.offices.india.phone}`}
                className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors duration-150"
              >
                <Phone className="w-4 h-4 shrink-0 text-sky-400" />
                <span>{CONTACT_INFO.offices.india.phoneFormatted}</span>
              </a>

              {/* Address */}
              <div className="flex items-start gap-2.5 text-white/50">
                <MapPin className="w-4 h-4 shrink-0 text-sky-400 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  {CONTACT_INFO.offices.usa.addressLine1},<br />
                  {CONTACT_INFO.offices.usa.city}, {CONTACT_INFO.offices.usa.state}{" "}
                  {CONTACT_INFO.offices.usa.postalCode}<br />
                  {CONTACT_INFO.offices.usa.country}
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar – fully centered ── */}
        <div className="mt-12 pt-5 border-t border-white/10 text-center">
          <p className="text-xs text-white/35">
            &copy; {currentYear} Globe Market Research. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
