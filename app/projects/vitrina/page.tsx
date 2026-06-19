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
    tags: ["React", "E-commerce", "UI/UX", "WhatsApp"],
    ctaLabel: "Live demo",
    facts: [
      { label: "Project",  value: "Vitrina" },
      { label: "Year",     value: "2026" },
      { label: "Industry", value: "E-commerce SaaS" },
      { label: "Role",     value: "Design + Dev" },
    ],
    subtitle: "Shopify Plus-style digital catalog — orders direct via WhatsApp, zero commissions, zero friction.",
    challengeTitle: "Bolivian businesses sell via WhatsApp. Their digital catalog made them look small.",
    challengeP1: "Beauty, fashion and personal care businesses in Bolivia manage 100% of their sales through WhatsApp. The problem: without a visual catalog, every sale starts with \"what do you have?\" and ends with a badly lit gallery photo.",
    challengeP2: "The challenge was to create a storefront that looks Shopify Plus but works with local infrastructure — no transaction fees, no Stripe, no friction. The final order arrives via WhatsApp with a formatted cart, ready to confirm.",
    solutionTitle: "A complete store that closes on WhatsApp — no commissions, no third-party apps.",
    solutionCards: [
      { t: "NovaTrend UI",   d: "2-column hero with floating product cards, announcement ticker, trust badges and promo banner with countdown. Apple + Nike in React." },
      { t: "WhatsApp Cart",  d: "The cart generates a formatted message with all products, quantities and total. One tap and the order reaches the seller." },
      { t: "Sales Chatbot",  d: "Floating assistant button with quick replies — 'View products', 'My order', 'Talk to advisor' — redirects to WhatsApp with context." },
    ],
    process: [
      { n: "01", title: "Research",       desc: "Premium reference analysis: Apple, Nike, Zara. Shopify Plus stores benchmark to define the visual standard." },
      { n: "02", title: "Design System",  desc: "White/orange palette (#FF6B35), Inter + Playfair Display typography. Tailwind tokens for consistency at scale." },
      { n: "03", title: "Components",     desc: "13 React components — AnnouncementBar, Hero with floating cards, NovaTrend ProductCard, WhatsApp Chatbot, PromoBanner with countdown." },
      { n: "04", title: "Engineering",    desc: "Vite 5 + React 18 + Framer Motion. Supabase for real-time catalog with fallback to mock data. WhatsApp cart generating formatted links." },
      { n: "05", title: "Deploy",         desc: "Vercel with continuous deploy. Supabase for real-time products. n8n for automatic sync from Google Sheets." },
    ],
    metrics: [
      { num: "13",    label: "React Components" },
      { num: "<1s",   label: "Build time (Vite)" },
      { num: "100%",  label: "Mobile responsive" },
      { num: "0€",    label: "Commission per sale" },
    ],
    quoteText: "Now my clients see the catalog, pick their products and send me the order ready. It's like having a Zara store but in my WhatsApp.",
    quoteAuthor: "Valeria M.",
    quoteRole: "Owner, Beauty Store — Santa Cruz",
    nextLabel: "The site you're reading — built from scratch",
  },
  es: {
    tags: ["React", "E-commerce", "UI/UX", "WhatsApp"],
    ctaLabel: "Ver demo en vivo",
    facts: [
      { label: "Proyecto",  value: "Vitrina" },
      { label: "Año",       value: "2026" },
      { label: "Industria", value: "E-commerce SaaS" },
      { label: "Rol",       value: "Design + Dev" },
    ],
    subtitle: "Catálogo digital estilo Shopify Plus — pedidos directo por WhatsApp, sin comisiones, sin fricción.",
    challengeTitle: "Los negocios bolivianos venden por WhatsApp. El catálogo digital los hacía parecer pequeños.",
    challengeP1: "Negocios de belleza, moda y cuidado personal en Bolivia gestionan sus ventas 100% por WhatsApp. El problema: sin un catálogo visual, cada venta empieza con \"¿qué tenés?\" y termina con una foto de galería mal iluminada.",
    challengeP2: "El reto era crear una vitrina que se vea Shopify Plus pero funcione con la infraestructura local — sin cobros por transacción, sin Stripe, sin fricción. El pedido final llega por WhatsApp con el carrito formateado, listo para confirmar.",
    solutionTitle: "Una tienda completa que cierra por WhatsApp — sin comisiones, sin apps de terceros.",
    solutionCards: [
      { t: "NovaTrend UI",       d: "Hero a 2 columnas con floating product cards, announcement ticker, trust badges y promo banner con countdown. Apple + Nike en React." },
      { t: "WhatsApp Cart",      d: "El carrito genera un mensaje formateado con todos los productos, cantidades y total. Un tap y el pedido llega al vendedor." },
      { t: "Chatbot de ventas",  d: "Botón flotante de asistente con quick replies — 'Ver productos', 'Mi pedido', 'Hablar con asesor' — redirige a WhatsApp con contexto." },
    ],
    process: [
      { n: "01", title: "Research",       desc: "Análisis de referencias premium: Apple, Nike, Zara. Benchmark de Shopify Plus stores para definir el estándar visual." },
      { n: "02", title: "Design System",  desc: "Paleta blanco/naranja (#FF6B35), tipografía Inter + Playfair Display. Tokens Tailwind para consistencia a escala." },
      { n: "03", title: "Components",     desc: "13 componentes React — AnnouncementBar, Hero con floating cards, ProductCard NovaTrend, Chatbot WhatsApp, PromoBanner con countdown." },
      { n: "04", title: "Engineering",    desc: "Vite 5 + React 18 + Framer Motion. Supabase para catálogo en tiempo real con fallback a mock data. WhatsApp cart que genera links formateados." },
      { n: "05", title: "Deploy",         desc: "Vercel con deploy continuo. Supabase para productos en tiempo real. n8n para sincronización automática desde Google Sheets." },
    ],
    metrics: [
      { num: "13",    label: "Componentes React" },
      { num: "<1s",   label: "Build time (Vite)" },
      { num: "100%",  label: "Mobile responsive" },
      { num: "0€",    label: "Comisión por venta" },
    ],
    quoteText: "Ahora mis clientes ven el catálogo, eligen sus productos y me mandan el pedido listo. Es como tener una tienda Zara pero en mi WhatsApp.",
    quoteAuthor: "Valeria M.",
    quoteRole: "Dueña, Tienda de Belleza — Santa Cruz",
    nextLabel: "El sitio que estás leyendo — construido desde cero",
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
            VITRINA
          </span>
          <span className="case-title-line block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
            DIGITAL
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
            href="https://vitrina-app-puce.vercel.app"
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
            src="/assets/images/vitrina/VitrineCover.png"
            alt="Vitrina Digital cover"
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
              src="/assets/images/vitrina/Vitrineshowcase1.png"
              alt="Vitrina product grid"
              fill sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
          <div className="case-fade relative aspect-[4/5] rounded-3xl overflow-hidden">
            <Image
              src="/assets/images/vitrina/Vitrineshowcase2.png"
              alt="Vitrina mobile view"
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
            ? <>Una{" "}<span className="bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">tienda completa</span>{" "}que cierra por WhatsApp — sin comisiones, sin apps de terceros.</>
            : <>A{" "}<span className="bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">complete store</span>{" "}that closes on WhatsApp — no commissions, no third-party apps.</>
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
            <li key={p.n} className="case-process-step grid grid-cols-[auto_1fr] sm:grid-cols-[80px_220px_1fr] gap-x-6 gap-y-2 py-8 border-t border-white/10 first:border-t-0">
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
            <span className="w-12 h-12 rounded-full bg-accent-purple" />
            <div>
              <p className="text-white font-semibold">{c.quoteAuthor}</p>
              <p className="text-white/60 text-sm">{c.quoteRole}</p>
            </div>
          </footer>
        </blockquote>
      </section>

      {/* ─── NEXT PROJECT ─── */}
      <section className="case-section px-3 sm:px-12 pb-32">
        <Link
          href="/projects/portfolio-web"
          className="case-fade group block relative overflow-hidden rounded-3xl bg-accent-purple px-8 sm:px-12 lg:px-20 py-20 lg:py-32"
        >
          <div className="flex flex-col gap-4">
            <span className="text-white/60 text-sm uppercase tracking-widest">Next project</span>
            <span className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-white leading-[0.95]">
              Portfolio Web <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">→</span>
            </span>
            <span className="text-white/70 mt-3 text-lg">{c.nextLabel}</span>
          </div>
        </Link>
      </section>
    </main>
  );
}

export default function VitrinaPage() {
  return (
    <SmoothScroll>
      <Nav />
      <ProjectPageInner />
      <Footer />
    </SmoothScroll>
  );
}
