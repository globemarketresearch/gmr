"use client";

import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

export default function ParticleCanvas() {
  const options: ISourceOptions = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: {
          value: 115,
          density: { enable: true, width: 1920, height: 1080 },
        },
        color: { value: "#bdd7ff" },
        opacity: {
          value: { min: 0.15, max: 0.5 },
          animation: { enable: true, speed: 1, sync: false },
        },
        size: { value: { min: 1, max: 3 } },
        links: {
          enable: true,
          distance: 216,
          color: "#bdd7ff",
          opacity: 0.25,
          width: 0.7,
        },
        move: {
          enable: true,
          speed: 0.4,
          direction: "none",
          random: false,
          straight: false,
          outModes: { default: "bounce" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          grab: {
            distance: 200,
            links: { opacity: 0.5 },
          },
          push: { quantity: 2 },
        },
      },
    }),
    [],
  );

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        id="tsparticles"
        className="absolute inset-0 w-full h-full"
        options={options}
      />
    </ParticlesProvider>
  );
}
