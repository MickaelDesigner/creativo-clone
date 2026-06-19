"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useT } from "../lib/LangContext";

const CLIENTS = [
  "NEXUS Agro",
  "NETHRA Eye Care",
  "Speed Freaks",
  "DEBONAIR",
  "Cridiance",
  "Lumora",
  "Atlas Forge",
];

export default function ClientsMarquee() {
  const t = useT();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".marquee-track", {
        x: "-50%",
        repeat: -1,
        ease: "none",
        duration: 20,
      });
    },
    { scope: container }
  );

  const items = [...CLIENTS, ...CLIENTS];

  return (
    <section className="py-28">
      <h2 className="text-3xl lg:text-4xl font-bold text-center text-white mb-12">
        {t.clients.title}
      </h2>
      <div ref={container} className="two-transparent-ends overflow-hidden">
        <div className="marquee-track flex items-center gap-16 lg:gap-24 w-max">
          {items.map((c, i) => (
            <span
              key={`${c}-${i}`}
              className="whitespace-nowrap text-white/40 hover:text-white/80 transition-colors duration-300 text-2xl lg:text-3xl font-semibold tracking-tight"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
