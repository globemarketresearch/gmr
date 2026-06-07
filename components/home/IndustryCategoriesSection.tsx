'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Cpu, Activity, UtensilsCrossed, Monitor, Sprout, Zap, Package, Wifi, Car, FlaskConical, ShoppingBag, Factory } from 'lucide-react';
import categories from '@/data/categories.json';

const BASE = '/assets/report-assets/reports-image';
const categoryImages: Record<string, string> = {
  'aerospace-and-defence':         `${BASE}/aerospace-and-defence.png`,
  'automotive-and-transportation':  `${BASE}/automotive-and-transportation.png`,
  'chemical-and-material':          `${BASE}/chemical-and-material.png`,
  'consumer-goods':                 `${BASE}/consumer-goods.png`,
  'manufacturing-and-construction': `${BASE}/manufacturing-and-construction.png`,
  'semiconductor-and-electronics':  `${BASE}/semiconductor-and-electronics.png`,
  'healthcare-and-pharmaceuticals': `${BASE}/healthcare-and-pharmaceuticals.png`,
  'food-and-beverages':             `${BASE}/food-and-beverages.png`,
  'information-and-technology':     `${BASE}/information-and-technology.png`,
  'agriculture':                    `${BASE}/agriculture.png`,
  'energy-and-power':               `${BASE}/energy-and-power.png`,
  'packaging':                      `${BASE}/packaging.png`,
  'smart-technologies':             `${BASE}/smart-technologies.png`,
};

const categoryIcons: Record<string, React.ReactNode> = {
  'automotive-and-transportation': <Car size={22} strokeWidth={1.5} />,
  'chemical-and-material': <FlaskConical size={22} strokeWidth={1.5} />,
  'consumer-goods': <ShoppingBag size={22} strokeWidth={1.5} />,
  'manufacturing-and-construction': <Factory size={22} strokeWidth={1.5} />,
  'semiconductor-and-electronics': <Cpu size={22} strokeWidth={1.5} />,
  'healthcare-and-pharmaceuticals': <Activity size={22} strokeWidth={1.5} />,
  'food-and-beverages': <UtensilsCrossed size={22} strokeWidth={1.5} />,
  'information-and-technology': <Monitor size={22} strokeWidth={1.5} />,
  agriculture: <Sprout size={22} strokeWidth={1.5} />,
  'energy-and-power': <Zap size={22} strokeWidth={1.5} />,
  packaging: <Package size={22} strokeWidth={1.5} />,
  'smart-technologies': <Wifi size={22} strokeWidth={1.5} />,
};

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max).trimEnd() + '...' : str;
}

export default function IndustryCategoriesSection() {
  const featured = categories[0];
  const topRight = categories.slice(1, 5);
  const row2 = categories.slice(5, 9);
  const row3 = categories.slice(9, 13);

  return (
    <section className="ic-section">
      <div className="ic-inner">
        <div className="ic-heading">
          <h2 className="ic-title">Industry Coverage</h2>
          <p className="ic-sub">Comprehensive research across key global market sectors</p>
        </div>

        {/* Row 1: Large featured + 2×2 grid */}
        <div className="ic-row1">
          {/* Featured card */}
          <Link href={`/industry/${featured.slug}`} className="ic-featured">
            <Image
              src={categoryImages[featured.slug] ?? featured.image}
              alt={featured.name}
              fill
              className="ic-img"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="ic-overlay ic-overlay-strong" />
            <div className="ic-featured-content">
              <h3 className="ic-featured-name">{featured.name}</h3>
              <p className="ic-featured-desc">{featured.description}</p>
              <span className="ic-explore">Explore Reports &rsaquo;</span>
            </div>
          </Link>

          {/* 2×2 top-right grid */}
          <div className="ic-topright">
            {topRight.map((cat) => (
              <Link key={cat.id} href={`/industry/${cat.slug}`} className="ic-card">
                <Image
                  src={categoryImages[cat.slug] ?? cat.image}
                  alt={cat.name}
                  fill
                  className="ic-img"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="ic-overlay" />
                <div className="ic-card-content">
                  <span className="ic-card-icon">{categoryIcons[cat.slug]}</span>
                  <div>
                    <p className="ic-card-name">{cat.name}</p>
                    <p className="ic-card-desc">{truncate(cat.description, 72)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Row 2: 4 equal cards */}
        <div className="ic-row4">
          {row2.map((cat) => (
            <Link key={cat.id} href={`/industry/${cat.slug}`} className="ic-card">
              <Image
                src={categoryImages[cat.slug] ?? cat.image}
                alt={cat.name}
                fill
                className="ic-img"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="ic-overlay" />
              <div className="ic-card-content">
                <span className="ic-card-icon">{categoryIcons[cat.slug]}</span>
                <div>
                  <p className="ic-card-name">{cat.name}</p>
                  <p className="ic-card-desc">{truncate(cat.description, 72)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Row 3: 4 equal cards */}
        <div className="ic-row4">
          {row3.map((cat) => (
            <Link key={cat.id} href={`/industry/${cat.slug}`} className="ic-card">
              <Image
                src={categoryImages[cat.slug] ?? cat.image}
                alt={cat.name}
                fill
                className="ic-img"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="ic-overlay" />
              <div className="ic-card-content">
                <span className="ic-card-icon">{categoryIcons[cat.slug]}</span>
                <div>
                  <p className="ic-card-name">{cat.name}</p>
                  <p className="ic-card-desc">{truncate(cat.description, 72)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .ic-section {
          background: #eef2f9;
          padding: 24px 0 40px;
        }
        .ic-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ic-heading {
          text-align: center;
          margin-bottom: 16px;
        }
        .ic-title {
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 700;
          color: #1a2e52;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
          line-height: 1.15;
        }
        .ic-sub {
          font-size: 1rem;
          color: #64748b;
          margin: 0;
        }

        /* ── Row 1 ── */
        .ic-row1 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          height: 420px;
        }

        /* Featured card */
        .ic-featured {
          position: relative;
          display: block;
          overflow: hidden;
          border-radius: 12px;
          text-decoration: none;
          height: 100%;
        }
        .ic-featured-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 28px 28px 32px;
          z-index: 2;
        }
        .ic-featured-name {
          font-size: 1.55rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 10px;
          line-height: 1.2;
        }
        .ic-featured-desc {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.82);
          margin: 0 0 16px;
          line-height: 1.55;
          max-width: 380px;
        }
        .ic-explore {
          font-size: 0.875rem;
          font-weight: 600;
          color: #fff;
          border-bottom: 1.5px solid rgba(255,255,255,0.5);
          padding-bottom: 1px;
          transition: border-color 0.2s;
        }
        .ic-featured:hover .ic-explore {
          border-color: #fff;
        }

        /* 2×2 top-right */
        .ic-topright {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 12px;
          height: 100%;
        }

        /* ── Row 4 ── */
        .ic-row4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          height: 200px;
        }

        /* ── Shared card ── */
        .ic-card {
          position: relative;
          display: flex;
          overflow: hidden;
          border-radius: 12px;
          text-decoration: none;
          outline: none;
          height: 100%;
        }

        /* Image */
        .ic-img {
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
          pointer-events: none;
        }
        .ic-card:hover .ic-img,
        .ic-featured:hover .ic-img {
          transform: scale(1.06);
        }

        /* Overlays */
        .ic-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(5,15,40,0.82) 0%,
            rgba(5,15,40,0.42) 40%,
            rgba(5,15,40,0.15) 100%
          );
          transition: background 0.3s ease;
          z-index: 1;
        }
        .ic-overlay-strong {
          background: linear-gradient(
            to top,
            rgba(5,15,40,0.88) 0%,
            rgba(5,15,40,0.50) 40%,
            rgba(5,15,40,0.18) 100%
          );
        }
        .ic-card:hover .ic-overlay {
          background: linear-gradient(
            to top,
            rgba(5,15,40,0.90) 0%,
            rgba(5,15,40,0.55) 40%,
            rgba(5,15,40,0.22) 100%
          );
        }

        /* Card content */
        .ic-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px 16px 18px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ic-card-icon {
          color: rgba(255,255,255,0.85);
          display: flex;
          align-items: center;
          margin-bottom: 2px;
        }
        .ic-card-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
          line-height: 1.2;
        }
        .ic-card-desc {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.72);
          margin: 0;
          line-height: 1.4;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ic-row1 {
            grid-template-columns: 1fr;
            height: auto;
          }
          .ic-featured {
            height: 300px;
          }
          .ic-topright {
            height: 300px;
          }
          .ic-row4 {
            grid-template-columns: 1fr 1fr;
            height: auto;
          }
          .ic-row4 .ic-card {
            height: 160px;
          }
        }
        @media (max-width: 560px) {
          .ic-row4 {
            grid-template-columns: 1fr 1fr;
          }
          .ic-row4 .ic-card {
            height: 140px;
          }
          .ic-topright {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 480px) {
          .ic-section {
            padding: 20px 0 32px;
          }
          .ic-featured {
            height: 260px;
          }
          .ic-topright {
            grid-template-columns: 1fr;
            height: auto;
          }
          .ic-topright .ic-card {
            height: 120px;
          }
          .ic-row4 {
            grid-template-columns: 1fr;
            height: auto;
          }
          .ic-row4 .ic-card {
            height: 120px;
          }
          .ic-card-desc {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
