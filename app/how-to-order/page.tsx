import { Section, Container, Badge } from "@/components/ui";
import type { Metadata } from "next";
import {
  ShoppingCart,
  Mail,
  FileCheck2,
  PackageCheck,
  User,
  Users,
  Building2,
  ClipboardList,
  CreditCard,
  Truck,
  Microscope,
  HeadphonesIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Order | Globe Market Research",
  description:
    "Ordering a market research report from Globe Market Research is simple, secure, and designed to help buyers receive the right research support without delay.",
  alternates: { canonical: "/how-to-order" },
};

const highlights = [
  { Icon: ShoppingCart, label: "Easy Online Order",    accent: "#2563eb" },
  { Icon: Mail,         label: "Email Support",        accent: "#0891b2" },
  { Icon: FileCheck2,   label: "Flexible Licensing",   accent: "#059669" },
  { Icon: PackageCheck, label: "Secure Delivery",      accent: "#7c3aed" },
];

const onlineSteps = [
  "Visit the required market research report page.",
  "Review the report description, segmentation, regional coverage, and table of contents.",
  "Select the suitable license type.",
  "Click on the purchase or buy option.",
  "Complete the secure payment process.",
  "Receive order confirmation and report delivery details by email.",
];

const emailSteps = [
  "Identify the report or research topic you want to purchase.",
  "Send your order request to the sales or support team.",
  "Mention the report title, license type, company details, and contact information.",
  "Add any customization needs, target region, or urgent delivery requirement.",
  "Our team will review the request and share the next steps.",
  "After payment confirmation, the report will be delivered as per the agreed timeline.",
];

const helpItems = [
  { Icon: ShoppingCart,    label: "Report purchase support" },
  { Icon: ClipboardList,   label: "Sample copy request" },
  { Icon: FileCheck2,      label: "Table of contents review" },
  { Icon: FileCheck2,      label: "License selection guidance" },
  { Icon: Microscope,      label: "Custom research inquiry" },
  { Icon: Users,           label: "Bulk report purchase" },
  { Icon: CreditCard,      label: "Invoice and payment assistance" },
  { Icon: HeadphonesIcon,  label: "Analyst discussion request" },
];

export default function HowToOrderPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="bg-[var(--muted)]">
        <Container size="sm">
          <div className="mb-6">
            <Badge variant="default">Ordering Guide</Badge>
          </div>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            How to Order
          </h1>
          <p className="text-xl text-[var(--muted-foreground)] mb-4 leading-relaxed">
            Ordering a market research report from Globe Market Research is simple, secure, and
            designed to help buyers receive the right research support without delay. Whether you
            need a syndicated industry report, a customized market study, or analyst support for
            a specific business question, our ordering process ensures clarity at every step.
          </p>
          <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
            Our team assists clients before and after purchase so they can select the most
            relevant report, understand the scope of coverage, and receive timely access to the
            required market insights.
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="sm">

          {/* ── Key Highlights (same icon-card style as Legal pages) ── */}
          <style>{`
            @keyframes lh-shimmer {
              0%   { transform: translateX(-120%) skewX(-15deg); }
              100% { transform: translateX(300%)  skewX(-15deg); }
            }
            .lh-card {
              position: relative; overflow: hidden; border-radius: 16px;
              padding: 28px 16px 24px;
              display: flex; flex-direction: column; align-items: center;
              cursor: default; user-select: none;
              background: #ffffff;
              border: 1.5px solid #e5e7eb;
              box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 0 0 0 transparent;
              transition: transform 0.26s cubic-bezier(.34,1.56,.64,1), box-shadow 0.26s ease, border-color 0.26s ease;
            }
            @media (prefers-color-scheme: dark) {
              .lh-card { background: color-mix(in srgb, var(--muted) 80%, white); border-color: var(--border); }
            }
            .lh-card::before {
              content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
              border-radius: 16px 16px 0 0;
              background: var(--lh-accent, #2563eb);
              transform: scaleX(0); transform-origin: left;
              transition: transform 0.3s cubic-bezier(.34,1,.64,1);
            }
            .lh-card:hover { transform: translateY(-5px); border-color: color-mix(in srgb, var(--lh-accent, #2563eb) 40%, #e5e7eb); box-shadow: 0 12px 32px -8px color-mix(in srgb, var(--lh-accent, #2563eb) 20%, transparent), 0 4px 16px -4px rgba(0,0,0,0.1); }
            .lh-card:hover::before { transform: scaleX(1); }
            .lh-shimmer { position: absolute; inset: 0; background: linear-gradient(105deg, transparent 40%, color-mix(in srgb, var(--lh-accent, #2563eb) 8%, white) 50%, transparent 60%); opacity: 0; pointer-events: none; transition: opacity 0.1s; }
            .lh-card:hover .lh-shimmer { opacity: 1; animation: lh-shimmer 0.5s ease forwards; }
            .lh-icon-shell { width: 60px; height: 60px; border-radius: 14px; margin-bottom: 14px; display: flex; align-items: center; justify-content: center; position: relative; background: color-mix(in srgb, var(--lh-accent, #2563eb) 10%, #f8faff); border: 1px solid color-mix(in srgb, var(--lh-accent, #2563eb) 18%, #e5e7eb); transition: background 0.26s ease, border-color 0.26s ease, transform 0.3s cubic-bezier(.34,1.56,.64,1); }
            .lh-card:hover .lh-icon-shell { background: color-mix(in srgb, var(--lh-accent, #2563eb) 16%, #f0f4ff); border-color: color-mix(in srgb, var(--lh-accent, #2563eb) 35%, #e5e7eb); transform: scale(1.1) rotate(-5deg); }
            .lh-icon { color: var(--lh-accent, #2563eb); transition: transform 0.3s cubic-bezier(.34,1.56,.64,1); position: relative; z-index: 1; }
            .lh-line { width: 20px; height: 1.5px; border-radius: 99px; margin-bottom: 10px; background: color-mix(in srgb, var(--lh-accent, #2563eb) 35%, #e5e7eb); transition: width 0.26s ease, background 0.26s ease; }
            .lh-card:hover .lh-line { width: 32px; background: var(--lh-accent, #2563eb); }
            .lh-label { font-size: 11px; font-weight: 600; letter-spacing: 0.03em; text-align: center; line-height: 1.45; color: #6b7280; transition: color 0.2s ease; }
            .lh-card:hover .lh-label { color: #111827; }
          `}</style>

          <section className="my-10" aria-label="Key highlights">
            <div className="flex items-center gap-4 mb-8">
              <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
              <span className="shrink-0 font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--muted-foreground)" }}>
                Key Highlights
              </span>
              <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {highlights.map(({ Icon, label, accent }) => (
                <div key={label} className="lh-card" style={{ "--lh-accent": accent } as React.CSSProperties}>
                  <div className="lh-shimmer" />
                  <div className="lh-icon-shell">
                    <Icon className="lh-icon" size={26} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <div className="lh-line" />
                  <p className="lh-label">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Two Ways to Order ── */}
          <h2 className="text-3xl font-bold mt-12 mb-4">Two Easy Ways to Order</h2>

          {/* Method 1 */}
          <div className="rounded-2xl border border-[var(--border)] p-8 mb-8 bg-[var(--card)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 border border-blue-100">
                <ShoppingCart size={20} strokeWidth={1.75} className="text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold">Method 1: Order Online</h3>
            </div>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Online ordering is the fastest way to purchase a report. Visit the report page,
              review the scope and table of contents, select the preferred license type, and
              proceed with the purchase option available on the page. After submitting the order,
              you will be directed to the payment process. Once payment is confirmed, the report
              access or delivery details will be shared with the registered email address.
            </p>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
              Step-by-Step Online Ordering Process
            </h4>
            <ol className="space-y-3">
              {onlineSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[var(--foreground)] leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Method 2 */}
          <div className="rounded-2xl border border-[var(--border)] p-8 mb-12 bg-[var(--card)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-50 border border-cyan-100">
                <Mail size={20} strokeWidth={1.75} className="text-cyan-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold">Method 2: Order Through Email</h3>
            </div>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Clients can also place an order by contacting the Globe Market Research team
              directly through email. This option is useful for custom research requests,
              corporate purchases, procurement approvals, invoice-based payments, or bulk report
              requirements. When sending an order request, please include your name, company name,
              report title, license type, billing details, and any specific customization or
              delivery requirement.
            </p>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
              Step-by-Step Email Ordering Process
            </h4>
            <ol className="space-y-3">
              {emailSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[var(--foreground)] leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* ── License Types ── */}
          <h2 className="text-3xl font-bold mb-4">Available License Types</h2>
          <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
            Choosing the right license is important because it defines how the report can be used
            within your organization. Globe Market Research offers different license options based
            on user access and business needs.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-12">
            {[
              {
                Icon: User,
                title: "Single User License",
                accent: "#2563eb",
                desc: "Suitable for one individual buyer. The report access is limited to one authorized user and cannot be shared across teams, departments, or external parties.",
              },
              {
                Icon: Users,
                title: "Multi User License",
                accent: "#0891b2",
                desc: "Suitable for a small team within the same organization. It allows selected users to access the report for internal business use, depending on the agreed license terms.",
              },
              {
                Icon: Building2,
                title: "Corporate License",
                accent: "#7c3aed",
                desc: "Suitable for wider organizational access. Commonly used by companies that need report access across multiple teams, departments, business units, or group-level decision makers.",
              },
            ].map(({ Icon, title, accent, desc }) => (
              <div
                key={title}
                className="rounded-2xl border p-6 flex flex-col gap-3 bg-[var(--card)]"
                style={{ borderColor: `color-mix(in srgb, ${accent} 25%, #e5e7eb)` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `color-mix(in srgb, ${accent} 10%, #f8faff)`,
                    border: `1px solid color-mix(in srgb, ${accent} 20%, #e5e7eb)`,
                  }}
                >
                  <Icon size={22} strokeWidth={1.75} style={{ color: accent }} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-base">{title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* ── Informational Sections ── */}
          {[
            {
              Icon: ClipboardList,
              accent: "#059669",
              title: "Request a Sample Before Ordering",
              body: "Clients may request a sample copy before placing an order. A sample helps buyers understand the report format, research depth, coverage style, and data presentation before making a purchase decision. You can also request the table of contents, segment coverage, regional scope, or analyst clarification before confirming your order.",
            },
            {
              Icon: Microscope,
              accent: "#7c3aed",
              title: "Customization Support",
              body: "If the published report does not fully match your business requirement, Globe Market Research can provide customization support. This may include additional country analysis, company profiling, segment-level insights, competitive benchmarking, pricing analysis, demand assessment, or forecast support. Customization requests are reviewed by our analyst team before confirmation. The final scope, timeline, and cost are shared based on the research requirement.",
            },
            {
              Icon: CreditCard,
              accent: "#d97706",
              title: "Payment and Invoice Support",
              body: "Payments can be completed through the approved payment methods shared during the ordering process. For corporate clients, invoice-based payment support may be provided based on procurement needs and order confirmation. After successful payment, the invoice and order confirmation details will be shared with the buyer.",
            },
            {
              Icon: Truck,
              accent: "#0891b2",
              title: "Report Delivery",
              body: "Once payment is verified, the report is delivered through email or secure digital access. Standard report delivery is completed as per the timeline confirmed during the order process. For custom research projects, delivery time may vary depending on the depth of research, analyst work required, and scope of customization.",
            },
          ].map(({ Icon, accent, title, body }) => (
            <div key={title} className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `color-mix(in srgb, ${accent} 10%, #f8faff)`,
                    border: `1px solid color-mix(in srgb, ${accent} 20%, #e5e7eb)`,
                  }}
                >
                  <Icon size={18} strokeWidth={1.75} style={{ color: accent }} aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-bold">{title}</h2>
              </div>
              <p className="text-[var(--muted-foreground)] leading-relaxed pl-12">{body}</p>
            </div>
          ))}

          {/* ── Need Help ── */}
          <div className="rounded-2xl border border-[var(--border)] p-8 mb-12 bg-[var(--muted)]">
            <div className="flex items-center gap-3 mb-2">
              <HeadphonesIcon size={22} strokeWidth={1.75} className="text-blue-600" aria-hidden="true" />
              <h2 className="text-2xl font-bold">Need Help Ordering?</h2>
            </div>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Our team is available to assist with report selection, license options, sample
              requests, payment support, customization, and delivery-related questions.
            </p>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
              You can contact us for:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {helpItems.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} strokeWidth={1.75} className="text-blue-600" aria-hidden="true" />
                  </div>
                  <span className="text-sm text-[var(--foreground)]">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Why Order ── */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-3">Why Order from Globe Market Research?</h2>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              Globe Market Research provides structured and decision-focused market intelligence
              for business planning, competitive analysis, investment evaluation, product strategy,
              and market entry decisions. Our ordering process is built to offer transparency,
              secure transactions, professional support, and timely access to relevant market
              insights.
            </p>
          </div>

          {/* ── Contact ── */}
          <div className="mt-16 pt-8 border-t border-[var(--border)] text-center">
            <h2 className="text-2xl font-bold mb-3">Contact Our Team</h2>
            <p className="text-[var(--muted-foreground)] mb-2">
              For orders, sample requests, customization support, or payment assistance, please
              contact Globe Market Research through the email, phone number, or contact form
              available on the website.
            </p>
            <p className="text-lg mb-6">
              Contact us at{" "}
              <a
                href="mailto:support@globemarketresearch.com"
                className="text-[var(--primary)] hover:underline font-medium"
              >
                support@globemarketresearch.com
              </a>
            </p>
            <p className="text-[var(--muted-foreground)]">
              Our team will review your request and guide you through the next step.
            </p>
          </div>

        </Container>
      </Section>
    </>
  );
}
