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
    subtitle: "Centralize WhatsApp, Instagram and Email. Close more sales with a bot that works 24/7.",
    subtitleAccent: " The CRM Bolivia needed.",
    ctaDemo: "Live demo",
    ctaBrochure: "Industry brochures →",
    info: [
      { label: "Services",  value: "Product Eng · UI/UX · AI" },
      { label: "Year",      value: "2026" },
      { label: "Client",    value: "Nexus CRM (own)" },
      { label: "Role",      value: "Founder + Lead Dev" },
    ],
    overviewLabel: "Overview",
    overviewTitle: "While your competition loses sales by replying late,",
    overviewAccent: " you close 3x faster with AI.",
    challengeLabel: "The Problem",
    challengeTitle: "Bolivian businesses have customers. What they lack is a system to keep them.",
    challengeP1: "90% of sales in Bolivia happen through WhatsApp. The problem: without a unified tool, every lead who writes on Instagram, every email inquiry and every WhatsApp message mixes into chaos — and sales get lost between forgotten chats.",
    challengeP2: "Nexus was born to solve exactly that: centralize all channels, automate responses with AI and give every business a professional sales system without needing an IT team.",
    galleryLabels: [
      "Omnichannel Inbox",
      "Live Dashboard",
      "CRM Contacts",
      "Access Control",
      "n8n Automations",
      "Appointment Calendar",
      "Finance Module",
      "Reports & Analytics",
    ],
    metrics: [
      { num: "3",    unit: "channels", label: "WhatsApp · Instagram · Email — unified in one inbox" },
      { num: "24/7", unit: "",         label: "AI bot active non-stop, responding while you sleep" },
      { num: "80%",  unit: "less",     label: "Average response time vs. manual management" },
      { num: "∞",    unit: "",         label: "Possible automations — without writing a single line of code" },
    ],
    processLabel: "How we built it",
    processSub:   "From idea to production-ready system — no shortcuts, no technical debt.",
    process: [
      { n: "01", title: "Discovery",      tag: "2 weeks",
        desc: "We mapped every pain point: unanswered messages, leads going cold, appointments lost in daily chaos. We defined exactly what to solve — and for whom." },
      { n: "02", title: "Architecture",   tag: "1 week",
        desc: "We designed a multi-tenant system from day one: a single platform serving hundreds of businesses simultaneously without compromising performance or data privacy." },
      { n: "03", title: "Design System",  tag: "2 weeks",
        desc: "Dark, clean and premium interface. Design tokens, reusable components. So intuitive users learn on their own — no manual, no training, no friction." },
      { n: "04", title: "Engineering",    tag: "6 weeks",
        desc: "Unified inbox for 3 channels, Nova AI Bot with conversation memory, Kanban Pipeline with drag & drop, real-time reports. Modern stack, clean code, unlimited scale." },
      { n: "05", title: "Launch & Scale", tag: "ongoing",
        desc: "Continuous deployment on Vercel, 24/7 monitoring, zero-downtime updates. The system grows with every business that adopts it — new channels, new features, zero interruptions." },
    ],
    techSub: "Built with the tools the world's fastest startups use.",
    techRoles: {
      "React 19":       "UI Framework",
      "TypeScript":     "Strong typing",
      "Vite":           "Ultra-fast build",
      "Supabase":       "DB + Auth + Realtime",
      "Tailwind 4":     "Design tokens",
      "OpenRouter AI":  "LLM Gateway",
      "Evolution API":  "Official WhatsApp",
      "n8n":            "Automations",
      "dnd-kit":        "Drag & Drop",
      "TanStack Query": "Server state",
      "Vercel":         "Deploy + Edge",
    },
    quoteText: "I used to lose clients because I couldn't reply fast enough. Now the bot responds instantly and I just close the deals.",
    quoteAuthor: "Carlos M.",
    quoteRole: "Owner, Andina Consulting — Santa Cruz de la Sierra",
    nextLabel: "E-commerce SaaS with WhatsApp cart for local businesses",
    resultsLabel: "Results",
  },
  es: {
    subtitle: "Centraliza WhatsApp, Instagram y Email. Cierra más ventas con un bot que trabaja 24/7.",
    subtitleAccent: " El CRM que Bolivia necesitaba.",
    ctaDemo: "Ver demo en vivo",
    ctaBrochure: "Brochures por industria →",
    info: [
      { label: "Services",  value: "Product Eng · UI/UX · AI" },
      { label: "Year",      value: "2026" },
      { label: "Client",    value: "Nexus CRM (propio)" },
      { label: "Role",      value: "Founder + Lead Dev" },
    ],
    overviewLabel: "Overview",
    overviewTitle: "Mientras tu competencia pierde ventas por responder tarde,",
    overviewAccent: " vos cerrás 3x más rápido con IA.",
    challengeLabel: "El Problema",
    challengeTitle: "Los negocios bolivianos tienen clientes. Lo que les falta es un sistema para no perderlos.",
    challengeP1: "El 90% de las ventas en Bolivia pasan por WhatsApp. El problema: sin una herramienta unificada, cada lead que escribe por Instagram, cada consulta por email y cada mensaje por WhatsApp se mezcla en el caos — y las ventas se pierden entre chats olvidados.",
    challengeP2: "Nexus nació para resolver exactamente eso: centralizar todos los canales, automatizar las respuestas con IA y darle a cada negocio un sistema de ventas profesional sin necesidad de un equipo de TI.",
    galleryLabels: [
      "Inbox Omnichannel",
      "Dashboard en vivo",
      "CRM de Contactos",
      "Control de Acceso",
      "Automatizaciones n8n",
      "Calendario de Citas",
      "Módulo Finanzas",
      "Reportes & Analytics",
    ],
    metrics: [
      { num: "3",    unit: "canales",  label: "WhatsApp · Instagram · Email — unificados en un solo inbox" },
      { num: "24/7", unit: "",        label: "Bot IA activo sin parar, respondiendo mientras dormís" },
      { num: "80%",  unit: "menos",   label: "Tiempo de respuesta promedio frente a gestión manual" },
      { num: "∞",    unit: "",        label: "Automatizaciones posibles — sin escribir una línea de código" },
    ],
    processLabel: "Cómo lo construimos",
    processSub:   "De la idea al sistema en producción — sin atajos, sin deuda técnica.",
    process: [
      { n: "01", title: "Discovery",      tag: "2 semanas",
        desc: "Mapeamos cada punto de dolor: mensajes sin responder, leads que se enfrían, citas que se pierden en el caos del día a día. Definimos exactamente qué resolver — y para quién." },
      { n: "02", title: "Architecture",   tag: "1 semana",
        desc: "Diseñamos un sistema multi-tenant desde el día uno: una sola plataforma que sirve a cientos de negocios simultáneamente sin comprometer performance ni privacidad de datos." },
      { n: "03", title: "Design System",  tag: "2 semanas",
        desc: "Interfaz oscura, limpia y premium. Tokens de diseño, componentes reutilizables. Tan intuitiva que los usuarios aprenden solos — sin manual, sin capacitación, sin fricción." },
      { n: "04", title: "Engineering",    tag: "6 semanas",
        desc: "Inbox unificado para 3 canales, Bot Nova IA con memoria de conversación, Pipeline Kanban con drag & drop, reportes en tiempo real. Stack moderno, código limpio, escala sin límite." },
      { n: "05", title: "Launch & Scale", tag: "ongoing",
        desc: "Deploy continuo en Vercel, monitoreo 24/7, actualizaciones sin downtime. El sistema crece con cada negocio que lo adopta — nuevos canales, nuevas funciones, cero interrupciones." },
    ],
    techSub: "Construido con las herramientas que usan las startups más rápidas del mundo.",
    techRoles: {
      "React 19":       "UI Framework",
      "TypeScript":     "Tipado fuerte",
      "Vite":           "Build ultra-rápido",
      "Supabase":       "DB + Auth + Realtime",
      "Tailwind 4":     "Design tokens",
      "OpenRouter AI":  "LLM Gateway",
      "Evolution API":  "WhatsApp oficial",
      "n8n":            "Automatizaciones",
      "dnd-kit":        "Drag & Drop",
      "TanStack Query": "Estado servidor",
      "Vercel":         "Deploy + Edge",
    },
    quoteText: "Antes perdía clientes porque no podía contestar tan rápido. Ahora el bot responde al instante y yo solo cierro los deals.",
    quoteAuthor: "Carlos M.",
    quoteRole: "Dueño, Consultora Andina — Santa Cruz de la Sierra",
    nextLabel: "E-commerce SaaS con WhatsApp cart para negocios locales",
    resultsLabel: "Resultados",
  },
} as const;

const GALLERY_SRCS = [
  { src: "/assets/images/nexus-crm/NexusMensajes.png",         aspect: "aspect-[4/5]",  span: "lg:col-span-2 lg:row-span-2" },
  { src: "/assets/images/nexus-crm/NexusDashboard.png",        aspect: "aspect-square", span: "lg:col-span-1"               },
  { src: "/assets/images/nexus-crm/NexusContactos.png",        aspect: "aspect-square", span: "lg:col-span-1"               },
  { src: "/assets/images/nexus-crm/NexusControlA.png",         aspect: "aspect-[4/3]",  span: "lg:col-span-2"               },
  { src: "/assets/images/nexus-crm/NexusAutomatizaciones.png", aspect: "aspect-[4/3]",  span: "lg:col-span-2"               },
  { src: "/assets/images/nexus-crm/NexusCalendario.png",       aspect: "aspect-square", span: "lg:col-span-1"               },
  { src: "/assets/images/nexus-crm/NexusFinanzas.png",         aspect: "aspect-square", span: "lg:col-span-1"               },
  { src: "/assets/images/nexus-crm/NexusReportes.png",         aspect: "aspect-[21/9]", span: "lg:col-span-4"              },
];

const TECH = [
  "React 19", "TypeScript", "Vite", "Supabase", "Tailwind 4",
  "OpenRouter AI", "Evolution API", "n8n", "dnd-kit", "TanStack Query", "Vercel",
];

const MARQUEE = [
  "Inbox Omnichannel", "Bot Nova IA", "Pipeline Kanban",
  "Lead Scoring", "Multi-tenant", "Automatizaciones",
];

function ProjectPageInner() {
  const locale = useLocale();
  const c = CONTENT[locale as keyof typeof CONTENT] ?? CONTENT.en;
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(".vs-topic",  { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" });
    tl.from(".vs-title",  { opacity: 0, y: 70, duration: 1.0, ease: "power4.out" }, "-=0.3");
    tl.from(".vs-sub",    { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, "-=0.4");
    tl.from(".vs-cta",    { opacity: 0, y: 20, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.3");

    gsap.fromTo(".vs-cover-inner",
      { y: -30 },
      { y: 0, ease: "none",
        scrollTrigger: { trigger: ".vs-cover", start: "top bottom", end: "bottom top", scrub: true } }
    );

    gsap.from(".vs-info-item", {
      opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".vs-info", start: "top 85%" },
    });

    gsap.from(".vs-overview .vs-fade", {
      opacity: 0, y: 50, duration: 0.8, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ".vs-overview", start: "top 80%" },
    });

    gsap.from(".vs-challenge .vs-fade", {
      opacity: 0, y: 50, duration: 0.8, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: ".vs-challenge", start: "top 80%" },
    });

    gsap.utils.toArray<HTMLElement>(".vs-tile").forEach((tile) => {
      gsap.fromTo(tile,
        { y: 80, skewY: 1.5 },
        { y: 0, skewY: 0, ease: "none",
          scrollTrigger: { trigger: tile, start: "top bottom", end: "top center", scrub: true } }
      );
    });

    gsap.from(".vs-metric", {
      opacity: 0, y: 50, duration: 0.7, stagger: 0.12, ease: "power3.out",
      scrollTrigger: { trigger: ".vs-metrics", start: "top 80%" },
    });

    gsap.utils.toArray<HTMLElement>(".vs-step").forEach((step) => {
      gsap.from(step, {
        opacity: 0, x: -40, duration: 0.65, ease: "power3.out",
        scrollTrigger: { trigger: step, start: "top 92%", once: true },
      });
    });

    const track = document.querySelector<HTMLElement>(".vs-marquee-track");
    if (track) {
      const w = track.scrollWidth / 2;
      gsap.to(track, { x: -w, duration: 22, ease: "none", repeat: -1 });
    }

    gsap.utils.toArray<HTMLElement>(".vs-tech-pill").forEach((pill, i) => {
      gsap.from(pill, {
        opacity: 0, y: 20, duration: 0.5, delay: (i % 4) * 0.05, ease: "power3.out",
        scrollTrigger: { trigger: pill, start: "top 95%", once: true },
      });
    });

    gsap.from(".vs-quote", {
      opacity: 0, y: 40, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".vs-quote", start: "top 80%" },
    });
  }, { scope: container });

  return (
    <main ref={container} className="min-h-screen text-white">

      {/* ─── HERO ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pt-40 lg:pt-48 pb-12 text-center">
        <div className="vs-topic inline-flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl sm:text-2xl">Nexus CRM · 2026</span>
        </div>

        <h1 className="vs-title mt-8 text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[13rem] font-bold tracking-tight leading-[0.88] bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
          Nexus<br />CRM
        </h1>

        <p className="vs-sub mt-10 mx-auto max-w-2xl text-xl sm:text-2xl text-white/80 font-medium leading-snug">
          {c.subtitle}
          <span className="text-white">{c.subtitleAccent}</span>
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="https://demo.mickaelvasquez.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="vs-cta group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-pill-magenta px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 transition-all duration-300"
          >
            {c.ctaDemo}
            <svg className="group-hover:translate-x-1 transition-transform duration-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <a
            href="https://demo.mickaelvasquez.tech/brochures/"
            target="_blank"
            rel="noopener noreferrer"
            className="vs-cta inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            {c.ctaBrochure}
          </a>
        </div>
      </section>

      {/* ─── COVER ─── */}
      <section className="vs-cover px-3 sm:px-6 lg:px-10 pb-24">
        <div className="vs-cover-inner rounded-3xl overflow-hidden bg-neutral-950 border border-white/5">
          <div className="relative w-full aspect-[16/9]">
            <Image
              src="/assets/images/nexus-crm/NexusCover.png"
              alt="Nexus CRM — Vista principal del sistema"
              fill
              sizes="100vw"
              className="object-contain object-center"
              priority
            />
          </div>
        </div>
      </section>

      {/* ─── INFO BAR ─── */}
      <section className="vs-info px-6 sm:px-10 lg:px-24 pb-32">
        <div className="border-t border-white/10 pt-12 grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          {c.info.map((i) => (
            <div key={i.label} className="vs-info-item flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-white/50">{i.label}</span>
              <span className="text-lg lg:text-xl font-semibold text-white leading-tight">{i.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── OVERVIEW + MARQUEE ─── */}
      <section className="vs-overview pb-20">
        <div className="px-6 sm:px-10 lg:px-24 mb-16">
          <div className="vs-fade flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-section-topic" />
            <span className="text-section-topic text-xl">{c.overviewLabel}</span>
          </div>
          <h2 className="vs-fade text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-5xl">
            {c.overviewTitle}
            <span className="bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">{c.overviewAccent}</span>
          </h2>
        </div>

        <div className="vs-fade two-transparent-ends overflow-hidden py-8">
          <div className="vs-marquee-track flex gap-12 whitespace-nowrap will-change-transform">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="flex items-center gap-12 text-4xl sm:text-5xl lg:text-7xl font-bold text-white/15 tracking-tight">
                {m}
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-accent to-pill-magenta" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE CHALLENGE ─── */}
      <section className="vs-challenge px-6 sm:px-10 lg:px-24 pb-32 pt-12">
        <div className="vs-fade flex items-center gap-3 mb-10">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl">{c.challengeLabel}</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <h2 className="vs-fade text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            {c.challengeTitle}
          </h2>
          <div className="vs-fade text-lg lg:text-xl text-white/70 leading-relaxed space-y-5">
            <p>{c.challengeP1}</p>
            <p>{c.challengeP2}</p>
          </div>
        </div>
      </section>

      {/* ─── GALLERY MOSAIC ─── */}
      <section className="px-3 sm:px-6 lg:px-10 pb-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {GALLERY_SRCS.map((g, i) => (
            <div
              key={i}
              className={`vs-tile relative rounded-2xl overflow-hidden ${g.aspect} ${g.span} bg-neutral-950`}
            >
              <Image
                src={g.src}
                alt={c.galleryLabels[i] ?? ""}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover object-left-top"
              />
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-block rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] sm:text-xs font-semibold text-white/90 border border-white/10">
                  {c.galleryLabels[i]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── METRICS ─── */}
      <section className="vs-metrics px-6 sm:px-10 lg:px-24 pb-32">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl">{c.resultsLabel}</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/10 pt-16">
          {c.metrics.map((m) => (
            <div key={m.num} className="vs-metric flex flex-col gap-3">
              <div className="flex items-end gap-2">
                <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent leading-none">
                  {m.num}
                </span>
                {m.unit && (
                  <span className="text-lg lg:text-xl font-semibold text-white/60 mb-1">{m.unit}</span>
                )}
              </div>
              <p className="text-sm lg:text-base text-white/60 leading-snug">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="vs-process bg-services-bg rounded-t-3xl mx-3 sm:mx-12 px-6 sm:px-10 lg:px-24 py-32">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl">{c.processLabel}</span>
        </div>
        <p className="text-white/50 text-lg mb-14 max-w-xl">{c.processSub}</p>

        <ul className="flex flex-col">
          {c.process.map((p) => (
            <li
              key={p.n}
              className="vs-step group border-t border-white/10 py-10 hover:px-4 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-6 mb-4">
                <div className="flex items-baseline gap-6 lg:gap-10">
                  <span className="text-xl lg:text-2xl font-bold text-white/25 w-12 shrink-0">{p.n}</span>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white group-hover:text-purple-hover transition-colors duration-300 leading-tight">
                    {p.title}
                  </span>
                </div>
                <span className="text-sm text-white/40 uppercase tracking-widest shrink-0 mt-2">{p.tag}</span>
              </div>
              <p className="text-base lg:text-lg text-white/60 leading-relaxed ml-[4.5rem] lg:ml-[5.5rem] max-w-3xl">
                {p.desc}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── QUOTE ─── */}
      <section className="px-6 sm:px-10 lg:px-24 py-32">
        <div className="vs-quote relative rounded-3xl bg-accent-purple px-8 sm:px-12 lg:px-20 py-16 lg:py-24 overflow-hidden">
          <span className="absolute top-8 left-8 text-9xl font-bold text-white/10 leading-none select-none">&ldquo;</span>
          <blockquote className="relative">
            <p className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-snug text-white max-w-4xl">
              {c.quoteText}
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">C</span>
              <div>
                <p className="text-white font-semibold">{c.quoteAuthor}</p>
                <p className="text-white/60 text-sm">{c.quoteRole}</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="vs-tech px-6 sm:px-10 lg:px-24 pb-32">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl">Tech Stack</span>
        </div>
        <p className="text-white/50 text-lg mb-10 max-w-xl">{c.techSub}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {TECH.map((name) => (
            <div
              key={name}
              className="vs-tech-pill group flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 cursor-default"
            >
              <span className="text-base lg:text-lg font-semibold text-white">{name}</span>
              <span className="text-xs text-white/40 group-hover:text-accent/80 transition-colors">
                {c.techRoles[name as keyof typeof c.techRoles]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NEXT PROJECT ─── */}
      <section className="px-3 sm:px-12 pb-32">
        <Link
          href="/projects/vitrina"
          className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400 px-8 sm:px-12 lg:px-20 py-20 lg:py-32"
        >
          <div className="flex flex-col gap-4">
            <span className="text-white/70 text-sm uppercase tracking-widest">Next project</span>
            <span className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-white leading-[0.95]">
              Vitrina Digital{" "}
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">→</span>
            </span>
            <span className="text-white/80 mt-3 text-lg">{c.nextLabel}</span>
          </div>
        </Link>
      </section>

    </main>
  );
}

export default function NexusCRMPage() {
  return (
    <SmoothScroll>
      <Nav />
      <ProjectPageInner />
      <Footer />
    </SmoothScroll>
  );
}
