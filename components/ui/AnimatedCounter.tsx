"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

function parseValue(raw: string): { num: number; prefix: string; suffix: string } {
  const match = raw.match(/^([^0-9]*)([0-9,]+)([^0-9]*)$/);
  if (!match) return { num: 0, prefix: "", suffix: raw };
  return {
    prefix: match[1],
    num: parseInt(match[2].replace(/,/g, ""), 10),
    suffix: match[3],
  };
}

function formatNumber(n: number, originalHadComma: boolean): string {
  if (originalHadComma && n >= 1000) {
    return n.toLocaleString("en-US");
  }
  return String(n);
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const { num, prefix, suffix } = parseValue(value);
  const hasComma = value.includes(",");
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * num));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(display, hasComma)}{suffix}
    </span>
  );
}
