"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT, useLocale } from "../lib/LangContext";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    name: "Nexus CRM",
    slug: "nexus-crm",
    img: "/assets/images/nexus-crm/NexusCover.png",
    tags: ["SaaS", "AI", "Product"],
    hoverGradient: "from-accent/60 via-pill-magenta/50 to-purple-hover/60",
    dot: "bg-accent",
  },
  {
    id: "02",
    name: "Vitrina Digital",
    slug: "vitrina",
    img: "/assets/images/vitrina/VitrineCover.png",
    tags: ["E-commerce", "React", "WhatsApp"],
    hoverGradient: "from-orange-600/60 via-orange-500/40 to-amber-400/50",
    dot: "bg-orange-500",
  },
  {
    id: "03",
    name: "Portfolio Web",
    slug: "portfolio-web",
    img: "/assets/images/portfolio-web/MickaelCover.png",
    tags: ["Next.js", "Motion", "Brand"],
    hoverGradient: "from-purple-hover/60 via-pill-magenta/50 to-accent/60",
    dot: "bg-purple-hover",
  },
];

export default function Projects() {
  const t = useT();
  const locale = useLocale();
  const base = locale === "es" ? "/es" : "";
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".projects-header", start: "top 82%", toggleActions: "play none none none" },
      });
      tl.from(".projects-topic",      { opacity: 0, y: 24, duration: 0.55, ease: "power3.out" });
      tl.from(".projects-title-line", { opacity: 0, y: 70, duration: 0.9, stagger: 0.12, ease: "power4.out" }, "-=0.3");
      tl.from(".projects-count",      { opacity: 0, y: 16, duration: 0.5, ease: "power3.out" }, "-=0.5");

      // Each card animates in individually as it enters the viewport
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, ease: "power3.out", duration: 0.85,
            scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none none" },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section
      id="projects"
      ref={container}
      className="px-6 sm:px-10 lg:px-24 py-24 lg:py-32"
    >
      {/* Header */}
      <div className="projects-header flex flex-col items-center text-center gap-6 mb-14 lg:mb-18">
        <span className="projects-topic inline-flex items-center gap-2 text-section-topic text-xl sm:text-2xl">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          {t.projects.topic}
        </span>
        <h2 className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-[1.0]">
          <span className="projects-title-line block">{t.projects.title1}</span>
          <span className="projects-title-line block">{t.projects.title2}</span>
        </h2>
        <p className="projects-count text-white/25 text-xs font-medium tracking-[0.2em] uppercase">
          {PROJECTS.length} selected works
        </p>
      </div>

      {/* Full-width stacked cards */}
      <div className="flex flex-col gap-5 lg:gap-6">
        {PROJECTS.map((p) => (
          <Link key={p.name} href={`${base}/projects/${p.slug}`} className="project-card group block">
            {/* Meta row */}
            <div className="flex items-center justify-between mb-3 px-0.5">
              <span className="text-white/20 text-[11px] font-mono tracking-widest">{p.id}</span>
              <span className={`w-2 h-2 rounded-full ${p.dot} shadow-sm`} />
            </div>

            {/* Full-width landscape image */}
            <div className="relative w-full aspect-[16/8] rounded-2xl overflow-hidden">
              <Image
                src={p.img}
                alt={p.name}
                fill
                sizes="100vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Bottom shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

              {/* Color overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${p.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Arrow */}
              <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>

              {/* Tags inside image bottom-left */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <ul className="flex gap-2 text-white/55 text-[11px] font-medium">
                  {p.tags.map((tag, i) => (
                    <li key={tag} className="flex gap-2 items-center">
                      {i > 0 && <span className="w-1 h-1 rounded-full bg-white/25" />}
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Name below card */}
            <h3 className="text-white text-2xl font-bold tracking-tight mt-4 group-hover:text-white/70 transition-colors duration-300">
              {p.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
