"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Footer from "./Footer";
import TopicHeader from "./TopicHeader";
import { useT, useLocale } from "../lib/LangContext";

gsap.registerPlugin(ScrollTrigger);

function AboutPageInner() {
  const t = useT();
  const locale = useLocale();
  const base = locale === "es" ? "/es" : "";
  const container = useRef<HTMLElement>(null);

  const isEn = locale === "en";

  /* ── Content ─────────────────────────────────────────────────── */

  const heroSub = isEn
    ? "From advertising to AI — 15 years of creative technology."
    : "De la publicidad a la IA — 15 años de tecnología creativa.";

  const storyParagraphs = isEn
    ? [
        "My journey began 15 years ago in advertising. I learned the craft of storytelling, the power of visual identity, and how to move people through design.",
        "As digital transformed everything, I moved into front-end development and UX. I built brands for companies, designed products that shipped, and learned engineering from the code up — not just from mockups.",
        "Then came AI. I didn't just watch it happen — I built JARVIS, an orchestrator system of 11 specialized AI agents that helps me design, code, and ship faster than ever. It's my co-pilot, not my replacement.",
        "Today I work as a Creative Tech Designer — a blend of designer, engineer, and strategist. I lead with my personal brand while offering studio-level services in UI/UX, brand identity, web development, and product engineering.",
      ]
    : [
        "Mi viaje comenzó hace 15 años en publicidad. Aprendí el arte de contar historias, el poder de la identidad visual y cómo conmover a las personas a través del diseño.",
        "Cuando lo digital lo transformó todo, me moví hacia el desarrollo front-end y el UX. Construí marcas para empresas, diseñé productos que se lanzaron y aprendí ingeniería desde el código, no solo desde los mockups.",
        "Luego llegó la IA. No solo la vi pasar — construí JARVIS, un sistema orquestador de 11 agentes de IA especializados que me ayuda a diseñar, programar y lanzar más rápido que nunca. Es mi copiloto, no mi reemplazo.",
        "Hoy trabajo como Creative Tech Designer — una mezcla de diseñador, ingeniero y estratega. Lidero con mi marca personal mientras ofrezco servicios de nivel estudio en UI/UX, identidad de marca, desarrollo web e ingeniería de producto.",
      ];

  const stats = isEn
    ? [
        { num: "15+", label: "Years in advertising, design & development" },
        { num: "120+", label: "Projects shipped" },
        { num: "8+", label: "Years building digital products" },
        { num: "11", label: "AI Agents in the JARVIS team" },
      ]
    : [
        { num: "15+", label: "Años en publicidad, diseño y desarrollo" },
        { num: "120+", label: "Proyectos entregados" },
        { num: "8+", label: "Años construyendo productos digitales" },
        { num: "11", label: "Agentes de IA en el equipo JARVIS" },
      ];

  const philosophyTitle = isEn ? "How I work" : "Cómo trabajo";

  const philosophyItems = isEn
    ? [
        { title: "Quality over quantity", desc: "Every project deserves full attention. I take on fewer clients to deliver exceptional results." },
        { title: "Design-driven engineering", desc: "Code is a medium, not an end. Every pixel is intentional, every interaction considered." },
        { title: "AI as collaborator", desc: "AI amplifies human creativity. I build systems that accelerate — not replace — the creative process." },
        { title: "Remote-first, worldwide", desc: "Location is irrelevant. I work with founders and teams across continents, time zones, and cultures." },
      ]
    : [
        { title: "Calidad sobre cantidad", desc: "Cada proyecto merece atención total. Tomo menos clientes para ofrecer resultados excepcionales." },
        { title: "Ingeniería guiada por diseño", desc: "El código es un medio, no un fin. Cada píxel es intencional, cada interacción está pensada." },
        { title: "La IA como colaboradora", desc: "La IA amplifica la creatividad humana. Construyo sistemas que aceleran — no reemplazan — el proceso creativo." },
        { title: "Remote-first, mundial", desc: "La ubicación es irrelevante. Trabajo con fundadores y equipos a través de continentes, husos horarios y culturas." },
      ];

  const services = isEn
    ? [
        { title: "UI/UX Design", desc: "Web & mobile interfaces, design systems, prototyping, usability testing.", icon: "palette" },
        { title: "Brand Identity", desc: "Wordmarks, visual systems, brand guidelines, positioning strategy.", icon: "pen-tool" },
        { title: "Web Development", desc: "Next.js, React, Tailwind — performant, accessible, beautiful by default.", icon: "code" },
        { title: "Product Engineering", desc: "MVP development, SaaS, e-commerce, AI integration, API design.", icon: "cpu" },
      ]
    : [
        { title: "UI/UX Design", desc: "Interfaces web y móvil, sistemas de diseño, prototipado, pruebas de usabilidad.", icon: "palette" },
        { title: "Identidad de Marca", desc: "Logotipos, sistemas visuales, guías de marca, estrategia de posicionamiento.", icon: "pen-tool" },
        { title: "Desarrollo Web", desc: "Next.js, React, Tailwind — rendimiento, accesibilidad, belleza por defecto.", icon: "code" },
        { title: "Ingeniería de Producto", desc: "Desarrollo de MVP, SaaS, e-commerce, integración de IA, diseño de API.", icon: "cpu" },
      ];

  const serviceIcons: Record<string, React.ReactNode> = {
    palette: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.6 1.5-1.3 0-.33-.13-.66-.37-.9-.28-.28-.44-.66-.44-1.05 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.52-4.5-10-10-10z"/>
      </svg>
    ),
    "pen-tool": (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/><path d="m15 5 3 3"/>
      </svg>
    ),
    code: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    cpu: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2"/><path d="M15 2v2"/><path d="M9 20v2"/><path d="M15 20v2"/><path d="M2 9h2"/><path d="M2 15h2"/><path d="M20 9h2"/><path d="M20 15h2"/>
      </svg>
    ),
  };

  /* ── Animations ───────────────────────────────────────────────── */

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".about-topic", { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" });
      tl.from(".about-title-line", { opacity: 0, y: 70, duration: 0.95, stagger: 0.13, ease: "power4.out" }, "-=0.3");
      tl.from(".about-sub", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, "-=0.4");

      gsap.from(".about-story-p", {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".about-story", start: "top 82%" },
      });

      gsap.from(".about-stat", {
        opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".about-stats", start: "top 85%" },
      });

      gsap.from(".about-philosophy-item", {
        opacity: 0, y: 40, duration: 0.6, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".about-philosophy", start: "top 82%" },
      });

      gsap.from(".about-service", {
        opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".about-services", start: "top 82%" },
      });

      gsap.from(".about-cta-block", {
        opacity: 0, y: 50, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".about-cta", start: "top 80%" },
      });
    },
    { scope: container }
  );

  return (
    <main ref={container} className="min-h-screen text-white">

      {/* ─── HERO ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pt-40 lg:pt-48 pb-20 lg:pb-32">
        <div className="about-topic flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl sm:text-2xl">
            {isEn ? "About" : "Sobre mí"}
          </span>
        </div>

        <h1 className="mt-8 font-bold tracking-tight leading-[0.92]">
          <span className="about-title-line block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] text-white">
            {isEn ? "About" : "Sobre"}
          </span>
          <span className="about-title-line block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
            {isEn ? "Me" : "mí"}
          </span>
        </h1>

        <p className="about-sub mt-10 max-w-2xl text-xl sm:text-2xl text-white/70 leading-relaxed">
          {heroSub}
        </p>
      </section>

      {/* ─── PHOTO ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pb-20 lg:pb-32">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
          <div className="about-photo shrink-0 relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/assets/images/mickael-vasquez.jpg"
              alt="Mickael Vasquez"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
              priority
            />
          </div>

          {/* Quick intro */}
          <div className="flex-1 max-w-2xl">
            <TopicHeader label={isEn ? "Who I am" : "Quién soy"} />
            <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-white/70 leading-relaxed">
              {isEn
                ? "Mickael Vasquez — a Creative Tech Designer based in Santa Cruz, Bolivia. 15 years bridging advertising, design and engineering to build brand systems, AI-driven products and modern web experiences."
                : "Mickael Vasquez — Creative Tech Designer basado en Santa Cruz, Bolivia. 15 años uniendo publicidad, diseño e ingeniería para construir sistemas de marca, productos con IA y experiencias web modernas."}
            </p>
          </div>
        </div>
      </section>

      {/* ─── STORY ─── */}
      <section className="about-story px-6 sm:px-10 lg:px-24 pb-32 lg:pb-40">
        <div className="max-w-4xl">
          <TopicHeader label={isEn ? "Story" : "Historia"} />
          <div className="mt-10 space-y-6">
            {storyParagraphs.map((p, i) => (
              <p key={i} className="about-story-p text-lg sm:text-xl lg:text-2xl text-white/70 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="about-stats px-6 sm:px-10 lg:px-24 pb-32 lg:pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 border-t border-white/10 pt-16 lg:pt-20">
          {stats.map((s) => (
            <div key={s.label} className="about-stat flex flex-col gap-2">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
                {s.num}
              </span>
              <span className="text-white/60 text-base lg:text-lg">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section className="about-philosophy px-6 sm:px-10 lg:px-24 pb-32 lg:pb-40">
        <TopicHeader label={philosophyTitle} />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {philosophyItems.map((item) => (
            <div
              key={item.title}
              className="about-philosophy-item rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-8"
            >
              <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-white/60 text-base lg:text-lg leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="about-services px-6 sm:px-10 lg:px-24 pb-32 lg:pb-40">
        <TopicHeader label={isEn ? "Services" : "Servicios"} />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="about-service rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-8 hover:border-accent/50 hover:bg-accent/[0.04] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                {serviceIcons[svc.icon] ?? null}
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-white tracking-tight mb-2">
                {svc.title}
              </h3>
              <p className="text-white/50 text-sm lg:text-base leading-relaxed">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="about-cta px-6 sm:px-10 lg:px-24 pb-32 lg:pb-40">
        <div className="about-cta-block relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/20 via-accent-purple/10 to-purple-hover/20 border border-white/10 p-10 lg:p-16">
          {/* Subtle glow */}
          <div className="pointer-events-none absolute -top-40 -right-40 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-start gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              {isEn ? "Start a project" : "Empieza un proyecto"}
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-lg">
              {isEn
                ? "Let's build something great together."
                : "Construyamos algo grande juntos."}
            </p>
            <Link
              href={`${base}/contact`}
              className="group relative overflow-hidden bg-gradient-to-r from-accent to-pill-magenta rounded-full px-10 h-14 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                {isEn ? "Let's talk" : "Hablemos"}
                <svg
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default function AboutContent() {
  return (
    <SmoothScroll>
      <Nav />
      <AboutPageInner />
      <Footer />
    </SmoothScroll>
  );
}
