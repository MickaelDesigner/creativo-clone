"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Footer from "./Footer";
import { useT, useLocale } from "../lib/LangContext";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "01",
    name: "Nexus CRM",
    slug: "nexus-crm",
    img: "/assets/images/nexus-crm/NexusCover.png",
    tags: ["SaaS", "AI", "Product"],
    hoverGradient: "from-accent/70 via-pill-magenta/60 to-purple-hover/70",
    dot: "bg-accent",
  },
  {
    id: "02",
    name: "Vitrina Digital",
    slug: "vitrina",
    img: "/assets/images/vitrina/VitrineCover.png",
    tags: ["E-commerce", "React", "WhatsApp"],
    hoverGradient: "from-orange-600/70 via-orange-500/50 to-amber-400/60",
    dot: "bg-orange-500",
  },
  {
    id: "03",
    name: "Portfolio Web",
    slug: "portfolio-web",
    img: "/assets/images/portfolio-web/MickaelCover.png",
    tags: ["Next.js", "Motion", "Brand"],
    hoverGradient: "from-purple-hover/70 via-pill-magenta/60 to-accent/70",
    dot: "bg-purple-hover",
  },
];

function ProjectsIndexInner() {
  const t = useT();
  const locale = useLocale();
  const base = locale === "es" ? "/es" : "";
  const container = useRef<HTMLElement>(null);

  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: { perView: 1.15, spacing: 16 },
    breakpoints: {
      "(min-width: 640px)":  { slides: { perView: 1.6,  spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 3,    spacing: 28 } },
    },
  });

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".pi-topic",      { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" });
      tl.from(".pi-title-line", { opacity: 0, y: 70, duration: 0.95, stagger: 0.13, ease: "power4.out" }, "-=0.3");
      tl.from(".pi-sub",        { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, "-=0.4");

      gsap.fromTo(
        ".pi-slider-wrap",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, ease: "power3.out", duration: 0.9,
          scrollTrigger: { trigger: ".pi-slider-wrap", start: "top 82%", toggleActions: "play none none none" },
        }
      );
    },
    { scope: container }
  );

  return (
    <main ref={container} className="min-h-screen text-white">
      {/* ─── HERO ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pt-40 lg:pt-48 pb-20 lg:pb-32">
        <div className="pi-topic flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl sm:text-2xl">{t.projectsIndex.topic}</span>
        </div>

        <h1 className="mt-8 font-bold tracking-tight leading-[0.92]">
          <span className="pi-title-line block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] text-white">
            {t.projectsIndex.title1}
          </span>
          <span className="pi-title-line block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
            {t.projectsIndex.title2}
          </span>
        </h1>

        <p className="pi-sub mt-10 max-w-2xl text-xl sm:text-2xl text-white/70 leading-relaxed">
          {t.projectsIndex.sub}
        </p>
      </section>

      {/* ─── PROJECTS HORIZONTAL SLIDER ─── */}
      <section className="pb-32 lg:pb-40">
        <div className="flex items-center justify-between px-6 sm:px-10 lg:px-24 mb-10">
          <span className="text-white/25 text-xs font-medium tracking-[0.2em] uppercase">
            {t.projectsIndex.works}
          </span>
          <span className="text-white/20 text-xs font-medium tracking-wider hidden sm:block">
            {locale === "es" ? "← arrastra →" : "← drag →"}
          </span>
        </div>

        <div className="pi-slider-wrap pl-6 sm:pl-10 lg:pl-24 overflow-hidden">
          <div ref={sliderRef} className="keen-slider">
            {PROJECTS.map((p) => (
              <div key={p.name} className="keen-slider__slide pr-1">
                <Link href={`${base}/projects/${p.slug}`} className="pi-card group block">
                  <div className="flex items-center justify-between mb-3 px-0.5">
                    <span className="text-white/20 text-[11px] font-mono tracking-widest">{p.id}</span>
                    <span className={`w-2 h-2 rounded-full ${p.dot} shadow-sm`} />
                  </div>

                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 65vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${p.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    />
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <ul className="flex gap-1.5 text-white/55 text-[11px] font-medium">
                        {p.tags.map((tag, i) => (
                          <li key={tag} className="flex gap-1.5 items-center">
                            {i > 0 && <span className="w-1 h-1 rounded-full bg-white/25" />}
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-white text-xl font-bold tracking-tight mt-4 group-hover:text-white/70 transition-colors duration-300">
                    {p.name}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ProjectsIndexContent() {
  return (
    <SmoothScroll>
      <Nav />
      <ProjectsIndexInner />
      <Footer />
    </SmoothScroll>
  );
}
