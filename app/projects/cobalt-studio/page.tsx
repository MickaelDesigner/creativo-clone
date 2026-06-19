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

const PALETTE = [
  { name: "Cobalt",   hex: "#1947E5", text: "white" },
  { name: "Indigo",   hex: "#0B1F8C", text: "white" },
  { name: "Sky",      hex: "#6FB8FF", text: "#0B1F8C" },
  { name: "Bone",     hex: "#F4F1EA", text: "#0B1F8C" },
  { name: "Carbon",   hex: "#0E0E14", text: "white" },
];

const TYPE_SPECIMENS = [
  { font: "Display",  weight: "700", sample: "Aa Bb Cc", note: "Headlines · 80-200pt" },
  { font: "Body",     weight: "500", sample: "Aa Bb Cc", note: "Editorial · 14-22pt" },
  { font: "Mono",     weight: "400", sample: "Aa Bb Cc", note: "Data & code · 12-16pt" },
];

const APPLICATIONS = [
  { title: "Stationery",       desc: "Business cards, letterhead, envelopes",         img: "/assets/images/prismic/ZvWhxrVsGrYSwDK__Frame205.png" },
  { title: "Digital",          desc: "Website, app, social templates",                img: "/assets/images/prismic/ZvWhvbVsGrYSwDK8_Frame203.png" },
  { title: "Environmental",    desc: "Signage, wayfinding, exhibition",               img: "/assets/images/prismic/ZvWhtrVsGrYSwDK7_Frame202.png" },
  { title: "Merchandise",      desc: "Apparel, tote bags, stickers",                  img: "/assets/images/prismic/ZvWhzLVsGrYSwDLA_Frame206.png" },
];

const PRINCIPLES = [
  { n: "01", t: "Confident, not loud",  d: "Restraint is luxury. Whitespace is the brand." },
  { n: "02", t: "One voice, many channels", d: "Consistency across every touchpoint, without rigidity." },
  { n: "03", t: "Editorial, always",    d: "We treat every layout like the cover of a magazine." },
];

function ProjectInner() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".cs-topic", { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" });
      tl.from(".cs-title", {
        opacity: 0, y: 70, duration: 1.0, ease: "power4.out",
      }, "-=0.3");
      tl.from(".cs-sub", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, "-=0.4");

      // Color palette stagger
      gsap.from(".cs-swatch", {
        opacity: 0, y: 80, duration: 0.85, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".cs-palette", start: "top 80%" },
      });

      // Type specimens
      gsap.from(".cs-spec", {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".cs-type", start: "top 80%" },
      });

      // Applications
      gsap.utils.toArray<HTMLElement>(".cs-app").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Principles
      gsap.from(".cs-principle", {
        opacity: 0, x: -40, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".cs-principles", start: "top 75%" },
      });
    },
    { scope: container }
  );

  return (
    <main ref={container} className="min-h-screen text-white">
      {/* ─── HERO ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24">
        <div className="cs-topic flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl lg:text-2xl">
            Brand Identity · 2026
          </span>
        </div>

        <h1 className="cs-title mt-8 sm:mt-10 font-bold tracking-[-0.04em] leading-[0.85] text-5xl sm:text-7xl md:text-8xl lg:text-[11rem] xl:text-[15rem]">
          <span className="block">COBALT</span>
          <span className="block bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent italic">studio</span>
        </h1>

        <p className="cs-sub mt-8 sm:mt-12 max-w-2xl text-lg sm:text-xl lg:text-2xl text-white/80 font-medium leading-snug">
          A complete identity system for a contemporary creative practice — built to look as good on a billboard as on a business card.
        </p>
      </section>

      {/* ─── COVER (sticky on desktop, normal on mobile) ─── */}
      <section className="px-3 sm:px-6 lg:px-10 pb-20 sm:pb-32">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src="/assets/images/prismic/ZvWhxrVsGrYSwDK__Frame205.png"
            alt="Cobalt Studio identity"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* ─── PALETTE ─── */}
      <section className="cs-palette px-6 sm:px-10 lg:px-24 pb-24 sm:pb-32">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl">Color palette</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-4xl mb-10 sm:mb-16">
          Five colors. Endless combinations.
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {PALETTE.map((c) => (
            <div
              key={c.name}
              className="cs-swatch group relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden p-4 sm:p-5 lg:p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2"
              style={{ backgroundColor: c.hex }}
            >
              <span className="text-xs uppercase tracking-widest" style={{ color: c.text }}>
                {c.name}
              </span>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold font-mono" style={{ color: c.text }}>
                {c.hex}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TYPOGRAPHY ─── */}
      <section className="cs-type bg-services-bg rounded-t-3xl mx-3 sm:mx-12 px-6 sm:px-10 lg:px-24 py-20 sm:py-32">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl">Typography</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-4xl mb-10 sm:mb-16">
          A three-voice system — Display, Body, Mono.
        </h2>

        <div className="flex flex-col">
          {TYPE_SPECIMENS.map((t, i) => (
            <div
              key={t.font}
              className={`cs-spec grid grid-cols-1 sm:grid-cols-[160px_1fr_180px] gap-4 sm:gap-8 py-8 sm:py-12 ${i !== 0 ? "border-t border-white/10" : ""}`}
            >
              <div>
                <span className="text-xs uppercase tracking-widest text-white/50 block mb-1">{t.font}</span>
                <span className="text-base sm:text-lg text-white">Weight {t.weight}</span>
              </div>
              <span
                className={`text-5xl sm:text-6xl lg:text-8xl xl:text-9xl tracking-tight leading-none ${
                  t.font === "Display" ? "font-bold" : t.font === "Mono" ? "font-mono" : "font-medium"
                }`}
              >
                {t.sample}
              </span>
              <span className="text-sm sm:text-base text-white/60 self-end">{t.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRINCIPLES ─── */}
      <section className="cs-principles px-6 sm:px-10 lg:px-24 py-20 sm:py-32">
        <div className="flex items-center gap-3 mb-10 sm:mb-16">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl">Principles</span>
        </div>

        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {PRINCIPLES.map((p) => (
            <li
              key={p.n}
              className="cs-principle flex flex-col gap-3 sm:gap-4 border-t border-white/10 pt-6 sm:pt-8"
            >
              <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-accent to-purple-hover bg-clip-text text-transparent">
                {p.n}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                {p.t}
              </h3>
              <p className="text-base sm:text-lg text-white/70 leading-relaxed">{p.d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── APPLICATIONS ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pb-24 sm:pb-32">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl">Applications</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-4xl mb-10 sm:mb-16">
          One system. Everywhere.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {APPLICATIONS.map((a) => (
            <article
              key={a.title}
              className="cs-app group relative aspect-[4/5] sm:aspect-[4/5] lg:aspect-[5/4] rounded-2xl sm:rounded-3xl overflow-hidden"
            >
              <Image
                src={a.img}
                alt={a.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 flex flex-col gap-1 sm:gap-2">
                <span className="text-xs uppercase tracking-widest text-white/70">{a.desc}</span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  {a.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pb-24 sm:pb-40">
        <blockquote className="max-w-5xl">
          <p className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white">
            &ldquo;The system we got isn&apos;t a static document — it&apos;s a way of thinking. A year in,{" "}
            <span className="bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">it still surprises us.</span>&rdquo;
          </p>
          <footer className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4">
            <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1947E5]" />
            <div>
              <p className="text-white font-semibold text-sm sm:text-base">Eleni Markou</p>
              <p className="text-white/60 text-xs sm:text-sm">Creative Director, Cobalt Studio</p>
            </div>
          </footer>
        </blockquote>
      </section>

      {/* ─── NEXT ─── */}
      <section className="px-3 sm:px-12 pb-24 sm:pb-32">
        <Link
          href="/projects/drift-commerce"
          className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1947E5] to-[#0B1F8C] px-6 sm:px-12 lg:px-20 py-16 sm:py-20 lg:py-32"
        >
          <div className="flex flex-col gap-2 sm:gap-4">
            <span className="text-white/60 text-xs sm:text-sm uppercase tracking-widest">Next project</span>
            <span className="text-4xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-white leading-[0.95]">
              Drift Commerce{" "}
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">→</span>
            </span>
            <span className="text-white/70 mt-2 sm:mt-3 text-base sm:text-lg">A no-code commerce stack built for scale</span>
          </div>
        </Link>
      </section>
    </main>
  );
}

export default function CobaltStudioPage() {
  return (
    <SmoothScroll>
      <Nav />
      <ProjectInner />
      <Footer />
    </SmoothScroll>
  );
}
