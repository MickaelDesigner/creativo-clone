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

const TAGS = ["Branding", "UI/UX", "Web Development", "Strategy"];

const FACTS = [
  { label: "Client",   value: "Aurora Inc." },
  { label: "Year",     value: "2026" },
  { label: "Industry", value: "Fintech" },
  { label: "Role",     value: "Lead Design + Dev" },
];

const PROCESS = [
  { n: "01", title: "Discovery",       desc: "Stakeholder interviews and user research to map mental models around personal finance." },
  { n: "02", title: "Strategy",        desc: "Defined positioning, audience segments and a clear value ladder anchored on simplicity." },
  { n: "03", title: "Design System",   desc: "Built a token-first design system with motion guidelines and 80+ documented components." },
  { n: "04", title: "Engineering",     desc: "Shipped a typed Next.js front-end with a privacy-first analytics layer and end-to-end tests." },
  { n: "05", title: "Launch",          desc: "Soft-launched to 5k early adopters, iterated weekly on quantitative + qualitative signals." },
];

const METRICS = [
  { num: "+127%", label: "Sign-up conversion" },
  { num: "$4.2M", label: "Raised post-launch" },
  { num: "98",    label: "Lighthouse score" },
  { num: "4.9",   label: "App Store rating" },
];

function ProjectPageInner() {
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

      // Cover image parallax
      gsap.fromTo(
        ".case-cover",
        { y: -40, scale: 1.08 },
        {
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: ".case-cover", start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      gsap.from(".case-fact", {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".case-facts", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".case-section").forEach((sec) => {
        gsap.from(sec.querySelectorAll(".case-fade"), {
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
          <span className="text-section-topic text-xl sm:text-2xl">
            Case Study · 2026
          </span>
        </div>

        <h1 className="mt-8 font-bold tracking-tight leading-[0.92]">
          <span className="case-title-line block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] text-white">
            AURORA
          </span>
          <span className="case-title-line block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
            FINANCE
          </span>
        </h1>

        <p className="case-sub mt-10 max-w-2xl text-xl sm:text-2xl lg:text-3xl text-white/80 font-medium leading-snug">
          A fintech reimagined for the next generation — where money meets meaning.
        </p>

        <ul className="case-tags mt-8 flex flex-wrap gap-3">
          {TAGS.map((t) => (
            <li
              key={t}
              className="case-tag rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/80"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* ─── COVER ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pb-24">
        <div className="case-cover relative rounded-3xl overflow-hidden aspect-[16/9] lg:aspect-[16/8]">
          <Image
            src="/assets/images/prismic/ZvWhtrVsGrYSwDK7_Frame202.png"
            alt="Aurora Finance cover"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* ─── FACTS ─── */}
      <section className="case-facts case-section px-6 sm:px-10 lg:px-24 pb-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 border-t border-white/10 pt-16">
          {FACTS.map((f) => (
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
            Banking apps feel like spreadsheets. We made one that feels like a story.
          </h2>
          <div className="case-fade text-lg lg:text-xl text-white/70 leading-relaxed space-y-5">
            <p>
              Aurora came to us with a clear thesis: Gen Z doesn&apos;t need another banking dashboard — they need a money companion. The category was crowded with grids of numbers and aggressive gamification.
            </p>
            <p>
              Our job was to design a product that surfaces the why behind every dollar, without lecturing or moralizing. A tool that respects intelligence and rewards curiosity.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SHOWCASE IMAGES ─── */}
      <section className="case-section px-6 sm:px-10 lg:px-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div className="case-fade relative aspect-[4/5] rounded-3xl overflow-hidden">
            <Image
              src="/assets/images/prismic/ZvWhvbVsGrYSwDK8_Frame203.png"
              alt="Aurora interface"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="case-fade relative aspect-[4/5] rounded-3xl overflow-hidden">
            <Image
              src="/assets/images/prismic/ZvWhwbVsGrYSwDK-_Frame204.png"
              alt="Aurora dashboard"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
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
          A <span className="bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">narrative-first</span> interface where every screen tells you exactly what just happened — and why it matters.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-20">
          {[
            { t: "Story timeline", d: "Transactions grouped as moments, not rows. Each one explains itself in plain language." },
            { t: "Motion as feedback", d: "Every interaction has a deliberate response — money moves, the screen breathes." },
            { t: "Type-first system", d: "A custom serif paired with mono for numbers. Editorial, not corporate." },
          ].map((c) => (
            <div key={c.t} className="case-fade">
              <h3 className="text-2xl lg:text-3xl font-bold mb-3">{c.t}</h3>
              <p className="text-white/70 text-base lg:text-lg leading-relaxed">{c.d}</p>
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
          {PROCESS.map((p) => (
            <li
              key={p.n}
              className="case-process-step grid grid-cols-[auto_1fr] sm:grid-cols-[80px_220px_1fr] gap-x-6 gap-y-2 py-8 border-t border-white/10 first:border-t-0"
            >
              <span className="text-2xl lg:text-3xl font-bold text-white/30">{p.n}</span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white col-span-1 sm:col-span-1">
                {p.title}
              </h3>
              <p className="text-base lg:text-lg text-white/70 leading-relaxed col-span-2 sm:col-span-1">
                {p.desc}
              </p>
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
          {METRICS.map((m) => (
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
            &ldquo;They didn&apos;t just deliver a product — they reframed how we think about our users.
            <span className="bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent"> Best decision we made all year.</span>&rdquo;
          </p>
          <footer className="mt-8 flex items-center gap-4">
            <span className="w-12 h-12 rounded-full bg-accent-purple" />
            <div>
              <p className="text-white font-semibold">Mariana Costa</p>
              <p className="text-white/60 text-sm">CEO, Aurora Inc.</p>
            </div>
          </footer>
        </blockquote>
      </section>

      {/* ─── NEXT PROJECT ─── */}
      <section className="case-section px-3 sm:px-12 pb-32">
        <Link
          href="/projects/helio-travel"
          className="case-fade group block relative overflow-hidden rounded-3xl bg-accent-purple px-8 sm:px-12 lg:px-20 py-20 lg:py-32"
        >
          <div className="flex flex-col gap-4">
            <span className="text-white/60 text-sm uppercase tracking-widest">Next project</span>
            <span className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-white leading-[0.95]">
              Helio Travel <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">→</span>
            </span>
            <span className="text-white/70 mt-3 text-lg">Discovery platform for curious wanderers</span>
          </div>
        </Link>
      </section>
    </main>
  );
}

export default function AuroraFinancePage() {
  return (
    <SmoothScroll>
      <Nav />
      <ProjectPageInner />
      <Footer />
    </SmoothScroll>
  );
}
