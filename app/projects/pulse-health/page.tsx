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

const TAGS = ["Product Design", "iOS · Android", "Health Tech", "Design System"];

const FEATURES = [
  { icon: "♥",  title: "Heart-rate first",   desc: "Continuous monitoring with passive nudges — never alerts, always insights." },
  { icon: "✦",  title: "Sleep cycles",        desc: "Map your rest with precision. Wake gently at the right point in your cycle." },
  { icon: "◐",  title: "Mindful minutes",     desc: "Breathing exercises tuned to your current state, not someone else's average." },
  { icon: "▲",  title: "Adaptive coaching",   desc: "An AI companion that learns your patterns and adjusts goals weekly." },
];

const APP_METRICS = [
  { num: "2.4M",  label: "Active users" },
  { num: "4.9",   label: "App Store rating" },
  { num: "92%",   label: "30-day retention" },
  { num: "180s",  label: "Avg. daily session" },
];

const TIMELINE = [
  { month: "Jan", title: "Discovery sprint",      desc: "12 user interviews, 3 competitor teardowns, 1 north star." },
  { month: "Feb", title: "Design system",          desc: "Token-first system in Figma. 60+ components shipped." },
  { month: "Mar", title: "Prototype + test",       desc: "Clickable prototype tested with 24 users across 3 cohorts." },
  { month: "May", title: "Beta release",           desc: "TestFlight rollout to 500 invitees. Iterated weekly on feedback." },
  { month: "Jul", title: "Public launch",          desc: "Featured by Apple in App of the Day · 5 markets simultaneously." },
];

function ProjectInner() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".ph-topic", { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" });
      tl.from(".ph-title-line", { opacity: 0, y: 70, duration: 0.95, stagger: 0.12, ease: "power4.out" }, "-=0.3");
      tl.from(".ph-sub", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, "-=0.4");
      tl.from(".ph-tag", { opacity: 0, y: 20, duration: 0.5, stagger: 0.07, ease: "power3.out" }, "-=0.4");

      gsap.fromTo(
        ".ph-cover img",
        { y: -30, scale: 1.1 },
        {
          y: 0, scale: 1, ease: "none",
          scrollTrigger: { trigger: ".ph-cover", start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      gsap.utils.toArray<HTMLElement>(".ph-section").forEach((sec) => {
        gsap.from(sec.querySelectorAll(".ph-fade"), {
          opacity: 0, y: 50, duration: 0.85, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sec, start: "top 80%" },
        });
      });

      gsap.from(".ph-feature", {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".ph-features", start: "top 80%" },
      });

      gsap.from(".ph-timeline-row", {
        opacity: 0, x: -40, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".ph-timeline", start: "top 75%" },
      });

      gsap.from(".ph-metric", {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".ph-metrics", start: "top 80%" },
      });
    },
    { scope: container }
  );

  return (
    <main ref={container} className="min-h-screen text-white">
      {/* ─── HERO ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pt-32 sm:pt-40 lg:pt-48 pb-12">
        <div className="ph-topic flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl lg:text-2xl">
            Case Study · Health Tech
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-16 items-end mt-8 lg:mt-12">
          <h1 className="font-bold tracking-tight leading-[0.92]">
            <span className="ph-title-line block text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] xl:text-[10rem] text-white">
              Pulse
            </span>
            <span className="ph-title-line block text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] xl:text-[10rem] bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
              Health
            </span>
          </h1>

          <div className="ph-sub flex flex-col gap-4">
            <p className="text-lg sm:text-xl text-white/80 leading-snug">
              A mobile-first wellness companion designed for the next billion users — quiet, kind, and always there.
            </p>
            <ul className="flex flex-wrap gap-2 mt-2">
              {TAGS.map((t) => (
                <li
                  key={t}
                  className="ph-tag rounded-full border border-white/20 px-3 py-1 text-xs sm:text-sm text-white/80"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── COVER ─── */}
      <section className="ph-cover px-3 sm:px-6 lg:px-10 pb-20 sm:pb-28">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/8]">
          <Image
            src="/assets/images/prismic/ZvWhwbVsGrYSwDK-_Frame204.png"
            alt="Pulse Health cover"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* ─── OVERVIEW + DEVICES ─── */}
      <section className="ph-section px-6 sm:px-10 lg:px-24 pb-24 sm:pb-32">
        <div className="ph-fade flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl">Overview</span>
        </div>
        <h2 className="ph-fade text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] max-w-5xl">
          Health apps shout. We made one that listens — and only speaks when it matters.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-16 sm:mt-20">
          {[
            "/assets/images/prismic/ZvWhxrVsGrYSwDK__Frame205.png",
            "/assets/images/prismic/ZvWhzLVsGrYSwDLA_Frame206.png",
            "/assets/images/prismic/ZvWhtrVsGrYSwDK7_Frame202.png",
          ].map((src, i) => (
            <div key={i} className="ph-fade relative aspect-[3/4] rounded-2xl overflow-hidden bg-services-bg">
              <Image
                src={src}
                alt={`Pulse Health screen ${i + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES (split cards) ─── */}
      <section className="ph-features ph-section bg-services-bg rounded-t-3xl mx-3 sm:mx-12 px-6 sm:px-10 lg:px-24 py-20 sm:py-32">
        <div className="ph-fade flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl">Core features</span>
        </div>
        <h2 className="ph-fade text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-12 sm:mb-16 max-w-4xl">
          Four pillars. Zero noise.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="ph-feature group rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-10 hover:border-accent/60 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="block text-4xl sm:text-5xl mb-4 sm:mb-6 bg-gradient-to-br from-accent to-purple-hover bg-clip-text text-transparent">
                {f.icon}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 group-hover:text-purple-hover transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="ph-timeline ph-section px-6 sm:px-10 lg:px-24 py-20 sm:py-32">
        <div className="flex items-center gap-3 mb-10 sm:mb-12">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl">Timeline · 2026</span>
        </div>

        <ul className="flex flex-col">
          {TIMELINE.map((t, i) => (
            <li
              key={t.month}
              className="ph-timeline-row grid grid-cols-[60px_1fr] sm:grid-cols-[100px_200px_1fr] gap-x-4 sm:gap-x-8 gap-y-2 py-6 sm:py-8 border-t border-white/10 last:border-b first:border-t-0 sm:first:border-t"
            >
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-accent to-purple-hover bg-clip-text text-transparent">
                {t.month}
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white col-span-1">
                {t.title}
              </h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed col-span-2 sm:col-span-1">
                {t.desc}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── METRICS ─── */}
      <section className="ph-metrics ph-section px-6 sm:px-10 lg:px-24 pb-20 sm:pb-32">
        <div className="flex items-center gap-3 mb-10 sm:mb-12">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl">Impact</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 border-t border-white/10 pt-12 sm:pt-16">
          {APP_METRICS.map((m) => (
            <div key={m.label} className="ph-metric flex flex-col gap-2">
              <span className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
                {m.num}
              </span>
              <span className="text-white/70 text-sm lg:text-base">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NEXT ─── */}
      <section className="px-3 sm:px-12 pb-24 sm:pb-32">
        <Link
          href="/projects/cobalt-studio"
          className="group block relative overflow-hidden rounded-3xl bg-accent-purple px-6 sm:px-12 lg:px-20 py-16 sm:py-20 lg:py-32"
        >
          <div className="flex flex-col gap-2 sm:gap-4">
            <span className="text-white/60 text-xs sm:text-sm uppercase tracking-widest">Next project</span>
            <span className="text-4xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-white leading-[0.95]">
              Cobalt Studio{" "}
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">→</span>
            </span>
            <span className="text-white/70 mt-2 sm:mt-3 text-base sm:text-lg">A brand system built to scale</span>
          </div>
        </Link>
      </section>
    </main>
  );
}

export default function PulseHealthPage() {
  return (
    <SmoothScroll>
      <Nav />
      <ProjectInner />
      <Footer />
    </SmoothScroll>
  );
}
