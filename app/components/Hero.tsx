"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SOCIALS } from "../lib/site";
import { useT } from "../lib/LangContext";

type Cursor = { id: string; name: string; color: string; x: string; y: string };

// Compact set of "multiplayer" cursors for the short intro.
const CURSORS: Cursor[] = [
  { id: "a", name: "Danny",   color: "#9999ff", x: "28vw", y: "32vh" },
  { id: "b", name: "Ravindu", color: "#42a5f5", x: "70vw", y: "40vh" },
  { id: "c", name: "Nayantha", color: "#ff4081", x: "52vw", y: "64vh" },
];

export default function Hero() {
  const t = useT();
  const container = useRef<HTMLElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Reduced motion (or small screens): skip the intro entirely.
      if (prefersReduced) {
        gsap.set(".hero-intro", { display: "none" });
        setIntroDone(true);
        return;
      }

      // Hero content is visible by default (good LCP). The intro overlay sits
      // on top and fades away after ~3s, revealing it.
      gsap.set(".hero-intro", { opacity: 1 });
      gsap.set(".intro-cursor", { opacity: 0 });
      gsap.set(".intro-word", { maxWidth: 0, opacity: 0 });
      gsap.set(".intro-lead", { opacity: 0, color: "#3a3a4a" });

      const tl = gsap.timeline({ onComplete: () => setIntroDone(true) });
      tlRef.current = tl;

      // Lead headline fades in, then brightens to lavender
      tl.to(".intro-lead", { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.1);
      tl.to(".intro-lead", { color: "#c8b6e2", duration: 0.4 }, 0.7);

      // Cursors fly in from offscreen
      CURSORS.forEach((c, i) => {
        const sel = `.intro-cursor-${c.id}`;
        gsap.set(sel, { x: i % 2 ? "110vw" : "-10vw", y: c.y });
        tl.to(sel, { opacity: 1, duration: 0.2 }, 0.6 + i * 0.25);
        tl.to(sel, { x: c.x, y: c.y, duration: 0.7, ease: "power2.inOut" }, 0.6 + i * 0.25);
      });

      // Reveal the accent words
      tl.to(".intro-word-1", { maxWidth: "360px", opacity: 1, duration: 0.5, ease: "power2.out" }, 1.6);

      // Hold a beat, then fade everything out to reveal the hero
      tl.to(".intro-cursor", { opacity: 0, duration: 0.4, stagger: 0.05 }, 2.7);
      tl.to(".hero-intro", { opacity: 0, duration: 0.6, ease: "power2.in" }, 2.9);
      tl.set(".hero-intro", { display: "none" }, 3.6);
    },
    { scope: container }
  );

  const skipIntro = () => {
    tlRef.current?.kill();
    gsap.to(".hero-intro", {
      opacity: 0,
      duration: 0.35,
      onComplete: () => {
        gsap.set(".hero-intro", { display: "none" });
        setIntroDone(true);
      },
    });
  };

  return (
    <section
      ref={container}
      className="relative min-h-[100dvh] overflow-hidden bg-bg"
    >
      {/* ─── Real hero content — visible immediately (LCP) ─── */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-24">
        <h1 className="font-bold tracking-tight leading-[0.95] text-white">
          <span className="flex items-start gap-3 lg:gap-8 flex-wrap">
            <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem]">
              {t.hero.line1}
            </span>
            <span className="block text-purple-soft text-xs sm:text-base font-semibold leading-tight mt-2 lg:mt-7 max-w-[230px]">
              <span className="text-accent">●</span> {t.hero.role}
              <br />
              {t.hero.roleSub}
              <br />
              {t.hero.availability}
            </span>
          </span>
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] mt-1 lg:mt-2 ml-0 sm:ml-12 lg:ml-20">
            {t.hero.line2}
          </span>
          <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] mt-1 lg:mt-2 ml-0 sm:ml-20 lg:ml-40 bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
            {t.hero.line3}
          </span>
        </h1>
      </div>

      {/* ─── Socials (bottom-right) ─── */}
      <div className="absolute bottom-6 lg:bottom-14 right-6 sm:right-12 lg:right-24 z-20">
        <ul className="relative flex items-center gap-5 lg:gap-6">
          {SOCIALS.slice(0, 5).map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} — Mickael Vasquez`}
                className="block text-white/70 hover:text-purple-hover hover:scale-125 hover:-translate-y-1.5 transition-all duration-300 ease-out"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ─── Intro overlay (covers hero, fades out after ~3s) ─── */}
      {!introDone && (
        <div
          className="hero-intro fixed inset-0 z-[120] bg-bg flex items-center justify-center px-6"
          style={{ opacity: 0 }}
          aria-hidden
        >
          <p className="intro-lead font-bold tracking-tight leading-[1.1] text-4xl sm:text-6xl lg:text-7xl text-center max-w-5xl">
            {(() => {
              const [prefix, suffix = ""] = t.hero.lead.split(t.hero.leadAccent);
              return (
                <>
                  {prefix}
                  <span
                    className="intro-word intro-word-1 inline-block overflow-hidden whitespace-nowrap align-baseline"
                    style={{ color: "#7c3aed" }}
                  >
                    <span className="inline-block">{t.hero.leadAccent}</span>
                  </span>
                  {suffix}
                </>
              );
            })()}
          </p>

          {/* Cursors */}
          {CURSORS.map((c) => (
            <div
              key={c.id}
              className={`intro-cursor intro-cursor-${c.id} fixed top-0 left-0 pointer-events-none select-none z-[130]`}
              style={{ opacity: 0 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill={c.color} aria-hidden>
                <path d="M5 3l14 7-6 2-2 6-6-15z" />
              </svg>
              <span
                className="block text-[10px] font-semibold text-white px-1.5 py-0.5 rounded translate-x-3 -translate-y-1 w-fit whitespace-nowrap"
                style={{ backgroundColor: c.color }}
              >
                {c.name}
              </span>
            </div>
          ))}

          {/* Skip intro */}
          <button
            onClick={skipIntro}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[140] pointer-events-auto text-white/70 hover:text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/20 hover:border-white/50 transition-colors"
          >
            {t.hero.skip} →
          </button>
        </div>
      )}
    </section>
  );
}
