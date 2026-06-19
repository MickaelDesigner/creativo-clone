"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "../../components/SmoothScroll";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useLocale } from "../../lib/LangContext";

gsap.registerPlugin(ScrollTrigger);

const CONTENT = {
  en: {
    tags: ["Next.js", "UI/UX", "Motion Design", "Brand Identity"],
    ctaLabel: "Visit live site",
    facts: [
      { label: "Project",  value: "Personal Portfolio" },
      { label: "Year",     value: "2026" },
      { label: "Stack",    value: "Next.js + GSAP" },
      { label: "Role",     value: "Design + Dev" },
    ],
    subtitle: "The site you're reading — designed and built from scratch as a sales tool and technical showcase.",
    challengeTitle: "A portfolio is not a CV. It's the first project any client evaluates.",
    challengeP1: "Most designer portfolios are Behance links or a PDF. The challenge was to build something that demonstrates technical capabilities in the very act of existing — without saying it, showing it.",
    challengeP2: "The site had to load fast, move well on mobile, tell a clear visual story and convert visitors into potential clients. All of that without sacrificing brand identity.",
    solutionTitle: "A site that is a product in itself — every scroll proves what it can do.",
    solutionCards: [
      { t: "Editorial motion",  d: "GSAP ScrollTrigger in every section — parallax, skew, hero timeline. Animations that give rhythm without stealing the spotlight from the content." },
      { t: "Design tokens",     d: "Tailwind 4 with semantic CSS variables. One token change and the whole site changes. Scalable without chaos." },
      { t: "Real multi-lang",   d: "LangContext with full ES/EN. No heavy i18n libraries — 0kb extra in the bundle." },
    ],
    process: [
      { n: "01", title: "Brand Direction",   desc: "Voice, palette and typography definition. Midnight Void as the main color — dark, editorial, technical without being cold." },
      { n: "02", title: "Layout System",     desc: "3-column grid for projects, stack-parent for sticky layers. Each section designed as a visual moment." },
      { n: "03", title: "Motion Layer",      desc: "GSAP ScrollTrigger for parallax on covers, skew on cards and hero timeline. Motion that reinforces hierarchy, doesn't distract." },
      { n: "04", title: "Engineering",       desc: "Next.js App Router, Tailwind 4 with design tokens, ES/EN multilingual via LangContext, automatic sitemap and meta." },
      { n: "05", title: "Deploy & SEO",      desc: "Vercel + custom domain. OG images, robots.txt, canonical URLs. Lighthouse 98+. Full load under 1.2s." },
    ],
    metrics: [
      { num: "98",    label: "Lighthouse score" },
      { num: "<1.2s", label: "First Contentful Paint" },
      { num: "2",     label: "Languages (ES / EN)" },
      { num: "6+",    label: "Published case studies" },
    ],
    quoteText: "The best portfolio is the one that demonstrates what you know how to do in the very act of showing it.",
    quoteRole: "Designer + Engineer, Santa Cruz de la Sierra",
    nextLabel: "AI-powered CRM for businesses in Bolivia",
  },
  es: {
    tags: ["Next.js", "UI/UX", "Motion Design", "Brand Identity"],
    ctaLabel: "Ver sitio en vivo",
    facts: [
      { label: "Proyecto",  value: "Portfolio Personal" },
      { label: "Año",       value: "2026" },
      { label: "Stack",     value: "Next.js + GSAP" },
      { label: "Rol",       value: "Design + Dev" },
    ],
    subtitle: "El sitio que estás leyendo — diseñado y construido desde cero como herramienta de venta y vitrina técnica.",
    challengeTitle: "Un portfolio no es un CV. Es el primer proyecto que cualquier cliente evalúa.",
    challengeP1: "La mayoría de portfolios de diseñadores son Behance o un PDF. El reto era construir algo que demostrara las capacidades técnicas en el mismo acto de existir — sin decirlo, mostrándolo.",
    challengeP2: "El sitio tenía que cargar rápido, moverse bien en móvil, contar una historia visual clara y convertir visitantes en clientes potenciales. Todo eso sin sacrificar la identidad de marca.",
    solutionTitle: "Un sitio que es producto en sí mismo — cada scroll demuestra lo que puede hacer.",
    solutionCards: [
      { t: "Motion editorial",    d: "GSAP ScrollTrigger en cada sección — parallax, skew, timeline en hero. Animaciones que dan ritmo sin robar protagonismo al contenido." },
      { t: "Design tokens",       d: "Tailwind 4 con variables CSS semánticas. Un cambio en el token y todo el sitio cambia. Escalable sin caos." },
      { t: "Multi-idioma real",   d: "LangContext con ES/EN completo. Sin librerías pesadas de i18n — 0kb extra en el bundle." },
    ],
    process: [
      { n: "01", title: "Brand Direction",   desc: "Definición de voz, paleta y tipografía. Midnight Void como color principal — oscuro, editorial, técnico sin ser frío." },
      { n: "02", title: "Layout System",     desc: "Grid de 3 columnas para proyectos, stack-parent para capas sticky. Cada sección pensada como un momento visual." },
      { n: "03", title: "Motion Layer",      desc: "GSAP ScrollTrigger para parallax en covers, skew en cards y timeline en hero. Motion que refuerza jerarquía, no distrae." },
      { n: "04", title: "Engineering",       desc: "Next.js App Router, Tailwind 4 con tokens de diseño, multilenguaje ES/EN via LangContext, sitemap y meta automáticos." },
      { n: "05", title: "Deploy & SEO",      desc: "Vercel + dominio propio. OG images, robots.txt, canonical URLs. Lighthouse 98+. Carga completa bajo 1.2s." },
    ],
    metrics: [
      { num: "98",    label: "Lighthouse score" },
      { num: "<1.2s", label: "First Contentful Paint" },
      { num: "2",     label: "Idiomas (ES / EN)" },
      { num: "6+",    label: "Casos de estudio publicados" },
    ],
    quoteText: "El mejor portfolio es el que demuestra lo que sabes hacer en el mismo acto de mostrarlo.",
    quoteRole: "Designer + Engineer, Santa Cruz de la Sierra",
    nextLabel: "CRM con IA para negocios en Bolivia",
  },
} as const;

function ProjectPageInner() {
  const locale = useLocale();
  const c = CONTENT[locale as keyof typeof CONTENT] ?? CONTENT.en;
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".case-topic", { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" });
      tl.from(".case-title-line", {
        opacity: 0, y: 80, duration: 0.95, stagger: 0.13, ease: "power4.out",
      }, "-=0.3");
      tl.from(".case-sub", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, "-=0.4");
      tl.from(".case-tag", {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.07, ease: "power3.out",
      }, "-=0.4");

      gsap.fromTo(
        ".case-cover",
        { y: -40, scale: 1.08 },
        {
          y: 0, scale: 1, ease: "none",
          scrollTrigger: { trigger: ".case-cover", start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      gsap.from(".case-fact", {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".case-facts", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".case-section").forEach((sec) => {
        const fades = sec.querySelectorAll(".case-fade");
        if (!fades.length) return;
        gsap.from(fades, {
          opacity: 0, y: 50, duration: 0.9, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 80%" },
        });
      });

      gsap.from(".case-process-step", {
        opacity: 0, x: -40, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".case-process", start: "top 75%" },
      });

      gsap.from(".case-metric", {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".case-metrics", start: "top 80%" },
      });
    },
    { scope: container }
  );

  return (
    <main ref={container} className="min-h-screen text-white">
      {/* ─── HERO ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pt-40 lg:pt-48 pb-12">
        <div className="case-topic flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl sm:text-2xl">Case Study · 2026</span>
        </div>

        <h1 className="mt-8 font-bold tracking-tight leading-[0.92]">
          <span className="case-title-line block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] text-white">
            PORTFOLIO
          </span>
          <span className="case-title-line block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
            WEB
          </span>
        </h1>

        <p className="case-sub mt-10 max-w-2xl text-xl sm:text-2xl lg:text-3xl text-white/80 font-medium leading-snug">
          {c.subtitle}
        </p>

        <ul className="case-tags mt-8 flex flex-wrap gap-3">
          {c.tags.map((tag) => (
            <li key={tag} className="case-tag rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/80">
              {tag}
            </li>
          ))}
        </ul>

        <div className="case-tag mt-8 flex flex-wrap gap-4 items-center">
          <a
            href="https://mickaelvasquez.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            {c.ctaLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </section>

      {/* ─── COVER ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pb-24">
        <div className="case-cover relative rounded-3xl overflow-hidden aspect-[16/9] lg:aspect-[16/8]">
          <Image
            src="/assets/images/portfolio-web/MickaelCover.png"
            alt="Portfolio Web cover"
            fill sizes="100vw"
            className="object-cover object-top"
            priority
          />
        </div>
      </section>

      {/* ─── FACTS ─── */}
      <section className="case-facts case-section px-6 sm:px-10 lg:px-24 pb-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 border-t border-white/10 pt-16">
          {c.facts.map((f) => (
            <div key={f.label} className="case-fact flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-white/50">{f.label}</span>
              <span className="text-2xl lg:text-3xl font-semibold text-white">{f.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── THE CHALLENGE ─── */}
      <section className="case-section px-6 sm:px-10 lg:px-24 pb-32">
        <div className="case-fade flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl">The Challenge</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <h2 className="case-fade text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            {c.challengeTitle}
          </h2>
          <div className="case-fade text-lg lg:text-xl text-white/70 leading-relaxed space-y-5">
            <p>{c.challengeP1}</p>
            <p>{c.challengeP2}</p>
          </div>
        </div>
      </section>

      {/* ─── SHOWCASE IMAGES ─── */}
      <section className="case-section px-6 sm:px-10 lg:px-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="case-fade relative aspect-[4/5] rounded-3xl overflow-hidden">
            <Image
              src="/assets/images/portfolio-web/MickaelShowcase1.png"
              alt="Portfolio case study page"
              fill sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
          <div className="case-fade relative aspect-[4/5] rounded-3xl overflow-hidden">
            <Image
              src="/assets/images/portfolio-web/MickaelShowcase2.png"
              alt="Portfolio Nexus CRM case study"
              fill sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* ─── THE SOLUTION ─── */}
      <section className="case-section bg-services-bg rounded-t-3xl mx-3 sm:mx-12 px-6 sm:px-10 lg:px-24 py-32">
        <div className="case-fade flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl">The Solution</span>
        </div>
        <h2 className="case-fade text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-5xl">
          {locale === "es"
            ? <>Un sitio que es{" "}<span className="bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">producto en sí mismo</span>{" "}— cada scroll demuestra lo que puede hacer.</>
            : <>A site that is{" "}<span className="bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">a product in itself</span>{" "}— every scroll proves what it can do.</>
          }
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-20">
          {c.solutionCards.map((card) => (
            <div key={card.t} className="case-fade">
              <h3 className="text-2xl lg:text-3xl font-bold mb-3">{card.t}</h3>
              <p className="text-white/70 text-base lg:text-lg leading-relaxed">{card.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="case-process case-section px-6 sm:px-10 lg:px-24 py-32">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl">Process</span>
        </div>
        <ul className="flex flex-col">
          {c.process.map((p) => (
            <li
              key={p.n}
              className="case-process-step grid grid-cols-[auto_1fr] sm:grid-cols-[80px_220px_1fr] gap-x-6 gap-y-2 py-8 border-t border-white/10 first:border-t-0"
            >
              <span className="text-2xl lg:text-3xl font-bold text-white/30">{p.n}</span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white col-span-1 sm:col-span-1">{p.title}</h3>
              <p className="text-base lg:text-lg text-white/70 leading-relaxed col-span-2 sm:col-span-1">{p.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── METRICS ─── */}
      <section className="case-metrics case-section px-6 sm:px-10 lg:px-24 pb-32">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl">Results</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 border-t border-white/10 pt-16">
          {c.metrics.map((m) => (
            <div key={m.label} className="case-metric flex flex-col gap-2">
              <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
                {m.num}
              </span>
              <span className="text-white/70 text-sm lg:text-base">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section className="case-section px-6 sm:px-10 lg:px-24 pb-40">
        <blockquote className="case-fade max-w-5xl">
          <p className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
            &ldquo;{c.quoteText}&rdquo;
          </p>
          <footer className="mt-8 flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-accent" />
            <div>
              <p className="text-white font-semibold">Mickael Vasquez</p>
              <p className="text-white/60 text-sm">{c.quoteRole}</p>
            </div>
          </footer>
        </blockquote>
      </section>

      {/* ─── NEXT PROJECT ─── */}
      <section className="case-section px-3 sm:px-12 pb-32">
        <Link
          href="/projects/nexus-crm"
          className="case-fade group block relative overflow-hidden rounded-3xl bg-accent-purple px-8 sm:px-12 lg:px-20 py-20 lg:py-32"
        >
          <div className="flex flex-col gap-4">
            <span className="text-white/60 text-sm uppercase tracking-widest">Next project</span>
            <span className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-white leading-[0.95]">
              Nexus CRM <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">→</span>
            </span>
            <span className="text-white/70 mt-3 text-lg">{c.nextLabel}</span>
          </div>
        </Link>
      </section>
    </main>
  );
}

export default function PortfolioWebPage() {
  return (
    <SmoothScroll>
      <Nav />
      <ProjectPageInner />
      <Footer />
    </SmoothScroll>
  );
}
