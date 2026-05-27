"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  opacityDir: number;
}

const PARTICLE_COUNT = 115;
const LINK_DISTANCE = 216;
const SPEED = 0.4;
const GRAB_DISTANCE = 200;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      vx: rand(-SPEED, SPEED),
      vy: rand(-SPEED, SPEED),
      radius: rand(1, 3),
      opacity: rand(0.15, 0.5),
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }));

    const handleResize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => { mouseRef.current = null; };
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mx, y: my,
          vx: rand(-SPEED, SPEED),
          vy: rand(-SPEED, SPEED),
          radius: rand(1, 3),
          opacity: rand(0.15, 0.5),
          opacityDir: 1,
        });
        if (particles.length > PARTICLE_COUNT + 20) particles.splice(0, 2);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mouse = mouseRef.current;

      for (const p of particles) {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Breathe opacity
        p.opacity += p.opacityDir * 0.002;
        if (p.opacity >= 0.5) { p.opacity = 0.5; p.opacityDir = -1; }
        if (p.opacity <= 0.15) { p.opacity = 0.15; p.opacityDir = 1; }

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(189,215,255,${p.opacity})`;
        ctx.fill();
      }

      // Draw links between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(189,215,255,${0.25 * (1 - dist / LINK_DISTANCE)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Grab: connect mouse to nearby particles with brighter lines
      if (mouse) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < GRAB_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(189,215,255,${0.5 * (1 - dist / GRAB_DISTANCE)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden
    />
  );
}
