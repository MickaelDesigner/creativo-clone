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

gsap.registerPlugin(ScrollTrigger);

const FACTS = [
  { label: "Stack",     value: "Webflow + Shopify" },
  { label: "Build time", value: "6 weeks" },
  { label: "Pages",     value: "42" },
  { label: "Markets",   value: "12" },
];

const BIG_METRICS = [
  { num: "+412%", label: "Sessions / month",      delta: "vs. previous site" },
  { num: "$8.7M", label: "GMV first quarter",     delta: "first 90 days post-launch" },
  { num: "2.3s",  label: "LCP global p75",        delta: "down from 6.1s" },
  { num: "0",     label: "Devs needed",           delta: "fully managed by the marketing team" },
];

const STACK = [
  { name: "Webflow",    cat: "CMS" },
  { name: "Shopify",    cat: "Commerce" },
  { name: "Klaviyo",    cat: "Lifecycle" },
  { name: "Algolia",    cat: "Search" },
  { name: "Vercel Edge", cat: "Hosting" },
  { name: "Plausible",  cat: "Analytics" },
  { name: "Sanity",     cat: "Content" },
  { name: "Stripe",     cat: "Payments" },
];

const PHASES = [
  { week: "W1–W2", title: "Strategy & IA",       desc: "Mapped the catalogue, defined personas, scoped 42 pages with the client." },
  { week: "W3–W4", title: "Design system",       desc: "30 reusable components in Webflow. Brand-tuned for performance." },
  { week: "W5",    title: "Build & integrate",   desc: "Shopify connected, Klaviyo flows live, Algolia indexed in 4 days." },
  { week: "W6",    title: "Launch & handoff",    desc: "Trained the marketing team. Documented every component. Shipped." },
];

function ProjectInner() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".dc-topic", { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" });
      tl.from(".dc-title-line", {
        opacity: 0, y: 80, duration: 1.0, stagger: 0.13, ease: "power4.out",
      }, "-=0.3");
      tl.from(".dc-sub", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, "-=0.4");

      gsap.from(".dc-fact", {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".dc-facts", start: "top 85%" },
      });

      // Hero cover parallax
      gsap.fromTo(
        ".dc-cover img",
        { y: -40, scale: 1.1 },
        {
          y: 0, scale: 1, ease: "none",
          scrollTrigger: { trigger: ".dc-cover", start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      // Big metrics — staggered counter feel
      gsap.from(".dc-big-metric", {
        opacity: 0, y: 80, duration: 1.0, stagger: 0.18, ease: "power4.out",
        scrollTrigger: { trigger: ".dc-big-metrics", start: "top 80%" },
      });

      // Phases
      gsap.from(".dc-phase", {
        opacity: 0, y: 50, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".dc-phases", start: "top 75%" },
      });

      // Stack pills
      gsap.from(".dc-stack-pill", {
        opacity: 0, scale: 0.85, duration: 0.5, stagger: 0.04, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".dc-stack", start: "top 85%" },
      });

      // Before/After reveal
      gsap.from(".dc-compare-card", {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".dc-compare", start: "top 80%" },
      });
    },
    { scope: container }
  );

  return (
    <main ref={container} className="min-h-screen text-white">
      {/* ─── HERO ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pt-32 sm:pt-40 lg:pt-48 pb-12">
        <div className="dc-topic flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl lg:text-2xl">
            E-commerce · No-code Build
          </span>
        </div>

        <h1 className="mt-6 sm:mt-10 font-bold tracking-tight leading-[0.92]">
          <span className="dc-title-line block text-5xl sm:text-6xl md:text-7xl lg:text-[8.5rem] xl:text-[11rem] text-white">
            Drift
          </span>
          <span className="dc-title-line block text-5xl sm:text-6xl md:text-7xl lg:text-[8.5rem] xl:text-[11rem] bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
            Commerce
          </span>
        </h1>

        <p className="dc-sub mt-6 sm:mt-10 max-w-3xl text-lg sm:text-xl lg:text-2xl text-white/80 font-medium leading-snug">
          A direct-to-consumer brand needed a storefront that scales — without a dev team. We shipped a no-code stack in 6 weeks.
        </p>
      </section>

      {/* ─── COVER ─── */}
      <section className="dc-cover px-3 sm:px-6 lg:px-10 pb-16 sm:pb-24">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/8]">
          <Image
            src="/assets/images/prismic/ZvWhzLVsGrYSwDLA_Frame206.png"
            alt="Drift Commerce hero"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* ─── FACTS ─── */}
      <section className="dc-facts px-6 sm:px-10 lg:px-24 pb-20 sm:pb-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 border-t border-white/10 pt-10 sm:pt-16">
          {FACTS.map((f) => (
            <div key={f.label} className="dc-fact flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-white/50">{f.label}</span>
              <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-tight">
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BIG METRICS (the headline-as-numbers section) ─── */}
      <section className="dc-big-metrics bg-services-bg rounded-t-3xl mx-3 sm:mx-12 px-6 sm:px-10 lg:px-24 py-20 sm:py-32">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl">Results · first quarter</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-12 sm:mb-20 max-w-4xl">
          Numbers that did the talking.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 sm:gap-y-20 lg:gap-y-24 gap-x-8 lg:gap-x-16">
          {BIG_METRICS.map((m) => (
            <div key={m.label} className="dc-big-metric flex flex-col gap-3 sm:gap-4 border-t border-white/10 pt-6 sm:pt-8">
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-bold tracking-tight leading-[0.9] bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
                {m.num}
              </span>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{m.label}</span>
              <span className="text-sm sm:text-base text-white/60">{m.delta}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BEFORE / AFTER ─── */}
      <section className="dc-compare px-6 sm:px-10 lg:px-24 py-20 sm:py-32">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl">Before · After</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-4xl mb-12 sm:mb-16">
          A storefront that used to leak conversion at every step.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="dc-compare-card rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
            <span className="text-xs uppercase tracking-widest text-white/50 block mb-3 sm:mb-4">Before</span>
            <ul className="flex flex-col gap-3 sm:gap-4 text-base sm:text-lg text-white/80">
              <li className="flex items-start gap-3"><span className="text-accent mt-1">▸</span> 6.1s LCP on product pages</li>
              <li className="flex items-start gap-3"><span className="text-accent mt-1">▸</span> 2.4% checkout completion</li>
              <li className="flex items-start gap-3"><span className="text-accent mt-1">▸</span> Required 2 devs to publish copy</li>
              <li className="flex items-start gap-3"><span className="text-accent mt-1">▸</span> No A/B testing infrastructure</li>
              <li className="flex items-start gap-3"><span className="text-accent mt-1">▸</span> Single-market launch capacity</li>
            </ul>
          </div>
          <div className="dc-compare-card rounded-3xl bg-gradient-to-br from-accent/20 via-pill-magenta/10 to-purple-hover/20 border border-accent/30 p-6 sm:p-10">
            <span className="text-xs uppercase tracking-widest text-purple-hover block mb-3 sm:mb-4">After</span>
            <ul className="flex flex-col gap-3 sm:gap-4 text-base sm:text-lg text-white">
              <li className="flex items-start gap-3"><span className="text-purple-hover mt-1">▸</span> 2.3s LCP global p75</li>
              <li className="flex items-start gap-3"><span className="text-purple-hover mt-1">▸</span> 7.8% checkout completion</li>
              <li className="flex items-start gap-3"><span className="text-purple-hover mt-1">▸</span> Marketing publishes solo, daily</li>
              <li className="flex items-start gap-3"><span className="text-purple-hover mt-1">▸</span> Built-in split-test framework</li>
              <li className="flex items-start gap-3"><span className="text-purple-hover mt-1">▸</span> 12 markets, 6 languages, one stack</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── PHASES ─── */}
      <section className="dc-phases px-6 sm:px-10 lg:px-24 py-20 sm:py-32">
        <div className="flex items-center gap-3 mb-10 sm:mb-12">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl">6-week build</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {PHASES.map((p, i) => (
            <div
              key={p.week}
              className="dc-phase relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 lg:p-8 flex flex-col gap-3 sm:gap-4 hover:border-accent/50 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl sm:text-4xl font-bold text-white/30">0{i + 1}</span>
              <span className="text-xs uppercase tracking-widest text-purple-hover">{p.week}</span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{p.title}</h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── STACK ─── */}
      <section className="dc-stack px-6 sm:px-10 lg:px-24 py-20 sm:py-32">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl">Tech stack</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-4xl mb-10 sm:mb-16">
          Eight tools. One zero-maintenance machine.
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {STACK.map((s) => (
            <div
              key={s.name}
              className="dc-stack-pill flex flex-col gap-1 rounded-xl border border-white/15 px-4 py-4 sm:px-5 sm:py-5 hover:border-accent hover:bg-white/[0.04] transition-all duration-300"
            >
              <span className="text-xs uppercase tracking-widest text-white/50">{s.cat}</span>
              <span className="text-lg sm:text-xl font-bold text-white">{s.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pb-24 sm:pb-40">
        <blockquote className="max-w-5xl">
          <p className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white">
            &ldquo;We replaced our entire dev pipeline with a stack the marketing team owns end-to-end.{" "}
            <span className="bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">It still feels like cheating.</span>&rdquo;
          </p>
          <footer className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4">
            <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent-purple" />
            <div>
              <p className="text-white font-semibold text-sm sm:text-base">Theo Lansing</p>
              <p className="text-white/60 text-xs sm:text-sm">Head of Growth, Drift Commerce</p>
            </div>
          </footer>
        </blockquote>
      </section>

      {/* ─── NEXT ─── */}
      <section className="px-3 sm:px-12 pb-24 sm:pb-32">
        <Link
          href="/projects/aurora-finance"
          className="group block relative overflow-hidden rounded-3xl bg-accent-purple px-6 sm:px-12 lg:px-20 py-16 sm:py-20 lg:py-32"
        >
          <div className="flex flex-col gap-2 sm:gap-4">
            <span className="text-white/60 text-xs sm:text-sm uppercase tracking-widest">Next project</span>
            <span className="text-4xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-white leading-[0.95]">
              Aurora Finance{" "}
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">→</span>
            </span>
            <span className="text-white/70 mt-2 sm:mt-3 text-base sm:text-lg">A fintech reimagined for the next generation</span>
          </div>
        </Link>
      </section>
    </main>
  );
}

export default function DriftCommercePage() {
  return (
    <SmoothScroll>
      <Nav />
      <ProjectInner />
      <Footer />
    </SmoothScroll>
  );
}
