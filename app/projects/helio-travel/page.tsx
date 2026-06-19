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

const INFO = [
  { label: "Services",  value: "Web Design · Animation · Strategy" },
  { label: "Year",      value: "2026" },
  { label: "Client",    value: "Helio Travel Co." },
  { label: "Role",      value: "Design & Front-End" },
];

const GALLERY = [
  { src: "/assets/images/prismic/ZvWhvbVsGrYSwDK8_Frame203.png", aspect: "aspect-[4/5]",   span: "lg:col-span-2 lg:row-span-2" },
  { src: "/assets/images/prismic/ZvWhwbVsGrYSwDK-_Frame204.png", aspect: "aspect-square",  span: "lg:col-span-1" },
  { src: "/assets/images/prismic/ZvWhxrVsGrYSwDK__Frame205.png", aspect: "aspect-square",  span: "lg:col-span-1" },
  { src: "/assets/images/prismic/ZvWhzLVsGrYSwDLA_Frame206.png", aspect: "aspect-[4/3]",   span: "lg:col-span-2" },
  { src: "/assets/images/prismic/ZvWhtrVsGrYSwDK7_Frame202.png", aspect: "aspect-[4/3]",   span: "lg:col-span-2" },
  { src: "/assets/images/prismic/ZvWhwbVsGrYSwDK-_Frame204.png", aspect: "aspect-square",  span: "lg:col-span-1" },
];

const PROCESS = [
  { n: "01", title: "Research",      tag: "2 weeks"  },
  { n: "02", title: "Wireframes",    tag: "1 week"   },
  { n: "03", title: "Visual Design", tag: "3 weeks"  },
  { n: "04", title: "Prototyping",   tag: "2 weeks"  },
  { n: "05", title: "Development",   tag: "5 weeks"  },
  { n: "06", title: "Launch",        tag: "ongoing"  },
];

const TECH = ["Next.js", "Framer Motion", "GSAP", "Sanity CMS", "Mapbox", "Vercel", "Figma", "Webflow"];

const MARQUEE = [
  "Discovery Platform",
  "Editorial UX",
  "Map-First Design",
  "Animation",
  "Performance",
];

function ProjectPageInner() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".vs-topic", { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" });
      tl.from(".vs-title", {
        opacity: 0, y: 70, duration: 1.0, ease: "power4.out",
      }, "-=0.3");
      tl.from(".vs-sub", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, "-=0.4");

      // Cover parallax
      gsap.fromTo(
        ".vs-cover img",
        { y: -60, scale: 1.12 },
        {
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: ".vs-cover", start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      // Info bar
      gsap.from(".vs-info-item", {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".vs-info", start: "top 85%" },
      });

      // Overview reveal
      gsap.from(".vs-overview .vs-fade", {
        opacity: 0, y: 50, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".vs-overview", start: "top 80%" },
      });

      // Gallery cards rise
      gsap.utils.toArray<HTMLElement>(".vs-tile").forEach((tile) => {
        gsap.fromTo(
          tile,
          { y: 90, skewY: 2 },
          {
            y: 0,
            skewY: 0,
            ease: "none",
            scrollTrigger: { trigger: tile, start: "top bottom", end: "top center", scrub: true },
          }
        );
      });

      // Process list
      gsap.from(".vs-step", {
        opacity: 0, x: -40, duration: 0.65, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".vs-process", start: "top 80%" },
      });

      // Marquee scroll
      const marqueeTrack = document.querySelector<HTMLElement>(".vs-marquee-track");
      if (marqueeTrack) {
        const w = marqueeTrack.scrollWidth / 2;
        gsap.to(marqueeTrack, {
          x: -w,
          duration: 18,
          ease: "none",
          repeat: -1,
        });
      }

      // Tech grid
      gsap.from(".vs-tech-pill", {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.05, ease: "power3.out",
        scrollTrigger: { trigger: ".vs-tech", start: "top 85%" },
      });

      // Quote
      gsap.from(".vs-quote", {
        opacity: 0, y: 40, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".vs-quote", start: "top 80%" },
      });
    },
    { scope: container }
  );

  return (
    <main ref={container} className="min-h-screen text-white">
      {/* ─── HERO ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pt-40 lg:pt-48 pb-12 text-center">
        <div className="vs-topic inline-flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl sm:text-2xl">Helio Travel · 2026</span>
        </div>

        <h1 className="vs-title mt-8 text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[13rem] font-bold tracking-tight leading-[0.88] bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
          Helio<br />Travel
        </h1>

        <p className="vs-sub mt-10 mx-auto max-w-2xl text-xl sm:text-2xl text-white/80 font-medium leading-snug">
          A discovery platform for curious wanderers — built around stories, not stars.
        </p>
      </section>

      {/* ─── COVER IMAGE ─── */}
      <section className="vs-cover px-3 sm:px-6 lg:px-10 pb-24">
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src="/assets/images/prismic/ZvWhvbVsGrYSwDK8_Frame203.png"
            alt="Helio Travel hero"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* ─── INFO BAR ─── */}
      <section className="vs-info px-6 sm:px-10 lg:px-24 pb-32">
        <div className="border-t border-white/10 pt-12 grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          {INFO.map((i) => (
            <div key={i.label} className="vs-info-item flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-white/50">{i.label}</span>
              <span className="text-lg lg:text-xl font-semibold text-white leading-tight">{i.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── OVERVIEW MARQUEE ─── */}
      <section className="vs-overview pb-32">
        <div className="px-6 sm:px-10 lg:px-24 mb-16">
          <div className="vs-fade flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-section-topic" />
            <span className="text-section-topic text-xl">Overview</span>
          </div>
          <h2 className="vs-fade text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-5xl">
            Built for travelers who plan with playlists, not spreadsheets.
          </h2>
        </div>

        {/* Infinite marquee tags */}
        <div className="vs-fade two-transparent-ends overflow-hidden py-8">
          <div className="vs-marquee-track flex gap-12 whitespace-nowrap will-change-transform">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="flex items-center gap-12 text-4xl sm:text-5xl lg:text-7xl font-bold text-white/15 tracking-tight">
                {m}
                <span className="w-3 h-3 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY (mosaic) ─── */}
      <section className="px-3 sm:px-6 lg:px-10 pb-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {GALLERY.map((g, i) => (
            <div
              key={i}
              className={`vs-tile relative rounded-2xl overflow-hidden ${g.aspect} ${g.span ?? ""}`}
            >
              <Image
                src={g.src}
                alt={`Helio gallery ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="vs-process bg-services-bg rounded-t-3xl mx-3 sm:mx-12 px-6 sm:px-10 lg:px-24 py-32">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl">Process</span>
        </div>

        <ul className="flex flex-col">
          {PROCESS.map((p) => (
            <li
              key={p.n}
              className="vs-step group flex items-baseline justify-between gap-6 py-8 border-t border-white/10 hover:px-4 transition-all duration-300"
            >
              <div className="flex items-baseline gap-6 lg:gap-10">
                <span className="text-xl lg:text-2xl font-bold text-white/30 w-12">{p.n}</span>
                <span className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-white group-hover:text-purple-hover transition-colors duration-300">
                  {p.title}
                </span>
              </div>
              <span className="text-sm text-white/50 uppercase tracking-widest">{p.tag}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── QUOTE CARD ─── */}
      <section className="px-6 sm:px-10 lg:px-24 py-32">
        <div className="vs-quote relative rounded-3xl bg-accent-purple px-8 sm:px-12 lg:px-20 py-16 lg:py-24 overflow-hidden">
          <span className="absolute top-8 left-8 text-9xl font-bold text-white/15 leading-none">&ldquo;</span>
          <blockquote className="relative">
            <p className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-snug text-white max-w-4xl">
              The visual system they built carries the brand far beyond the app. We see it everywhere — billboards, merch, partnerships. It just keeps working.
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-white/20" />
              <div>
                <p className="text-white font-semibold">Jonas Weber</p>
                <p className="text-white/70 text-sm">Founder, Helio Travel</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="vs-tech px-6 sm:px-10 lg:px-24 pb-32">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl">Tech stack</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {TECH.map((t) => (
            <span
              key={t}
              className="vs-tech-pill rounded-full border border-white/15 px-5 py-2.5 text-base lg:text-lg text-white/80 hover:border-accent hover:text-white transition-all duration-300"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ─── NEXT PROJECT ─── */}
      <section className="px-3 sm:px-12 pb-32">
        <Link
          href="/projects/aurora-finance"
          className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent via-pill-magenta to-purple-hover px-8 sm:px-12 lg:px-20 py-20 lg:py-32"
        >
          <div className="flex flex-col gap-4">
            <span className="text-white/70 text-sm uppercase tracking-widest">Next project</span>
            <span className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-white leading-[0.95]">
              Aurora Finance{" "}
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">→</span>
            </span>
            <span className="text-white/80 mt-3 text-lg">A fintech reimagined for the next generation</span>
          </div>
        </Link>
      </section>
    </main>
  );
}

export default function HelioTravelPage() {
  return (
    <SmoothScroll>
      <Nav />
      <ProjectPageInner />
      <Footer />
    </SmoothScroll>
  );
}
