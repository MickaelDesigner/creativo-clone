"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "../lib/LangContext";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [
  "nuxt", "blender", "webflow", "node", "react",
  "vue", "next", "figma", "svelt", "framer",
  "tailwind", "wordpress", "mongo", "docker",
];

export default function Technologies() {
  const t = useT();
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".tech-icon",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: container.current, start: "top 85%" },
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      id="technologies"
      ref={container}
      className="py-32 flex flex-col items-center mt-20 px-6 sm:px-10 lg:px-24"
    >
      <div className="flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 text-section-topic text-xl sm:text-2xl">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          {t.technologies.topic}
        </span>
        <h2 className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-white mt-6 leading-[1.0]">
          {t.technologies.title1}
          <br />
          {t.technologies.title2}
        </h2>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-6 sm:gap-8 mt-20">
        {ICONS.map((name) => (
          <div
            key={name}
            className="tech-icon flex items-center justify-center aspect-square transition-all duration-300 hover:-translate-y-3 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(134,67,251,0.5)]"
            style={{ opacity: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/assets/images/icons/${name}-icon.svg`}
              alt={name}
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
