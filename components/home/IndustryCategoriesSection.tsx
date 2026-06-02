'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import categories from '@/data/categories.json';

const categoryImages: Record<string, string> = {
  'aerospace-and-defence': '/assets/report-assets/Reports Image/Aerospace & Defence Market.png',
  'automotive-and-transportation': '/assets/report-assets/Reports Image/Automotive & Transportation Market.png',
  'chemical-and-material': '/assets/report-assets/Reports Image/Chemical & Material Market.png',
  'consumer-goods': '/assets/report-assets/Reports Image/Consumer Goods Market .png',
  'manufacturing-and-construction': '/assets/report-assets/Reports Image/Manufacturing and Construction Market.png',
  'semiconductor-and-electronics': '/assets/report-assets/Reports Image/Semiconductor & Electronics Market.png',
  'healthcare-and-pharmaceuticals': '/assets/report-assets/Reports Image/Healthcare & Pharmaceutical Market.png',
  'food-and-beverages': '/assets/report-assets/Reports Image/Food and Beverages Market .png',
  'information-and-technology': '/assets/report-assets/Reports Image/Information and Technology Market .png',
  agriculture: '/assets/report-assets/Reports Image/Agriculture Market.png',
  'energy-and-power': '/assets/report-assets/Reports Image/Energy and Power Market.png',
  packaging: '/assets/report-assets/Reports Image/Packaging Market.png',
  'smart-technologies': '/assets/report-assets/Reports Image/Smart Technologies Market.png',
};

const CARDS_PER_PAGE = 6;
const totalPages = Math.ceil(categories.length / CARDS_PER_PAGE);

export default function IndustryCategoriesSection() {
  const [page, setPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const pageRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const drag = useRef({
    active: false,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    offset: 0,
    hasMoved: false,
  });

  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getPageWidth = () => wrapperRef.current?.offsetWidth ?? 0;

  const applyTransform = useCallback((offset: number, animated: boolean) => {
    const el = trackRef.current;
    if (!el) return;
    const x = -(pageRef.current * getPageWidth()) + offset;
    el.style.transition = animated ? 'transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
    el.style.transform = `translateX(${x}px)`;
  }, []);

  const snapToPage = useCallback((target: number) => {
    const clamped = Math.max(0, Math.min(totalPages - 1, target));
    pageRef.current = clamped;
    setPage(clamped);
    applyTransform(0, true);
  }, [applyTransform]);

  const scheduleAuto = useCallback(() => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    autoTimer.current = setTimeout(() => {
      snapToPage((pageRef.current + 1) % totalPages);
    }, 5000);
  }, [snapToPage]);

  useEffect(() => {
    scheduleAuto();
    return () => { if (autoTimer.current) clearTimeout(autoTimer.current); };
  }, [page, scheduleAuto]);

  // ── Mouse drag ────────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    drag.current = {
      active: true,
      startX: e.clientX,
      lastX: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
      offset: 0,
      hasMoved: false,
    };
    setIsDragging(true);
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!drag.current.active) return;
    const now = performance.now();
    const dt = now - drag.current.lastTime;
    const dx = e.clientX - drag.current.lastX;
    drag.current.velocity = dt > 0 ? dx / dt : 0;
    drag.current.lastX = e.clientX;
    drag.current.lastTime = now;
    drag.current.offset = e.clientX - drag.current.startX;
    if (Math.abs(drag.current.offset) > 4) drag.current.hasMoved = true;
    applyTransform(drag.current.offset, false);
  }, [applyTransform]);

  const onMouseUp = useCallback(() => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setIsDragging(false);
    const pageW = getPageWidth();
    const total = (drag.current.lastX - drag.current.startX) + drag.current.velocity * 120;
    const threshold = pageW * 0.15;
    let target = pageRef.current;
    if (total < -threshold) target = pageRef.current + 1;
    else if (total > threshold) target = pageRef.current - 1;
    snapToPage(target);
    scheduleAuto();
  }, [snapToPage, scheduleAuto]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  // ── Touch ─────────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    const t = e.touches[0];
    drag.current = {
      active: true,
      startX: t.clientX,
      lastX: t.clientX,
      lastTime: performance.now(),
      velocity: 0,
      offset: 0,
      hasMoved: false,
    };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!drag.current.active) return;
    const t = e.touches[0];
    const now = performance.now();
    const dt = now - drag.current.lastTime;
    const dx = t.clientX - drag.current.lastX;
    drag.current.velocity = dt > 0 ? dx / dt : 0;
    drag.current.lastX = t.clientX;
    drag.current.lastTime = now;
    drag.current.offset = t.clientX - drag.current.startX;
    if (Math.abs(drag.current.offset) > 4) drag.current.hasMoved = true;
    applyTransform(drag.current.offset, false);
  };

  const onTouchEnd = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const pageW = getPageWidth();
    const total = (drag.current.lastX - drag.current.startX) + drag.current.velocity * 120;
    const threshold = pageW * 0.15;
    let target = pageRef.current;
    if (total < -threshold) target = pageRef.current + 1;
    else if (total > threshold) target = pageRef.current - 1;
    snapToPage(target);
    scheduleAuto();
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.hasMoved = false;
    }
  };

  const goToDot = (i: number) => {
    snapToPage(i);
    scheduleAuto();
  };

  return (
    <section className="ind-section">
      <div className="ind-inner">
        <div className="ind-heading">
          <h2 className="ind-title">Industries We Work With</h2>
          <p className="ind-sub">Comprehensive market intelligence across key global sectors</p>
        </div>

        <div
          ref={wrapperRef}
          className="ind-viewport"
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClickCapture={onClickCapture}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div
            ref={trackRef}
            className="ind-track"
            style={{ width: `${totalPages * 100}%` }}
          >
            {Array.from({ length: totalPages }).map((_, pi) => {
              const slice = categories.slice(pi * CARDS_PER_PAGE, pi * CARDS_PER_PAGE + CARDS_PER_PAGE);
              return (
                <div
                  key={pi}
                  className="ind-page"
                  style={{ width: `${100 / totalPages}%` }}
                >
                  {slice.map((cat) => {
                    const img = categoryImages[cat.slug];
                    return (
                      <Link
                        key={cat.id}
                        href={`/industry/${cat.slug}`}
                        className="ind-card"
                        draggable={false}
                      >
                        {img && (
                          <Image
                            src={img}
                            alt={cat.name}
                            fill
                            className="ind-card-img"
                            sizes="(max-width: 768px) 50vw, 33vw"
                            draggable={false}
                          />
                        )}
                        <div className="ind-card-overlay" />
                        <div className="ind-card-content">
                          <span className="ind-card-label">{cat.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="ind-dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`ind-dot${i === page ? ' ind-dot-active' : ''}`}
              onClick={() => goToDot(i)}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .ind-section {
          background: #ffffff;
          padding: 72px 0 64px;
        }
        .ind-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .ind-heading {
          text-align: center;
          margin-bottom: 48px;
        }
        .ind-title {
          font-family: var(--font-inter), 'Inter', ui-sans-serif, sans-serif;
          font-size: clamp(1.75rem, 3.5vw, 2.4rem);
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
          line-height: 1.2;
        }
        .ind-sub {
          font-family: var(--font-roboto), 'Roboto', ui-sans-serif, sans-serif;
          font-size: 1rem;
          color: #64748b;
          margin: 0;
        }
        .ind-viewport {
          overflow: hidden;
          border-radius: 6px;
          user-select: none;
          -webkit-user-select: none;
        }
        .ind-track {
          display: flex;
          will-change: transform;
        }
        .ind-page {
          flex-shrink: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 220px);
          gap: 10px;
        }
        @media (max-width: 900px) {
          .ind-page {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 200px);
          }
        }
        @media (max-width: 560px) {
          .ind-page {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(3, 160px);
          }
        }
        .ind-card {
          position: relative;
          display: block;
          overflow: hidden;
          border-radius: 6px;
          text-decoration: none;
          outline: none;
        }
        .ind-card-img {
          object-fit: cover;
          transition: transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          pointer-events: none;
        }
        .ind-card:hover .ind-card-img {
          transform: scale(1.06);
        }
        .ind-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.78) 0%,
            rgba(0,0,0,0.36) 45%,
            rgba(0,0,0,0.12) 100%
          );
          transition: background 0.3s ease;
        }
        .ind-card:hover .ind-card-overlay {
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.86) 0%,
            rgba(0,0,0,0.50) 45%,
            rgba(0,0,0,0.20) 100%
          );
        }
        .ind-card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px 18px 20px;
        }
        .ind-card-label {
          font-family: var(--font-inter), 'Inter', ui-sans-serif, sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #ffffff;
          line-height: 1.3;
        }
        .ind-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 28px;
        }
        .ind-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          background: transparent;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .ind-dot:hover { border-color: #e85d26; transform: scale(1.15); }
        .ind-dot-active {
          background: #e85d26;
          border-color: #e85d26;
          transform: scale(1.1);
        }
      `}</style>
    </section>
  );
}
