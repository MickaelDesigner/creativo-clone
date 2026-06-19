"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useT, useLocale, altPath } from "../lib/LangContext";
import type { Locale } from "../lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function Nav() {
  const t = useT();
  const locale = useLocale();
  const container = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const base = locale === "es" ? "/es" : "";
  const LINKS = [
    { id: "projects", name: t.nav.projects, href: `${base}/projects` },
    { id: "contact", name: t.nav.contact, href: `${base}/contact` },
    { id: "blog", name: t.nav.blog, href: `${base}/blog` },
  ];

  useGSAP(
    () => {
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          if (y < 120) setHidden(false);
          else setHidden(self.direction === 1);
        },
      });
      return () => st.kill();
    },
    { scope: container }
  );

  // Body scroll lock + Esc to close while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const LangSwitch = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex items-center gap-1 text-sm font-semibold" aria-label={t.nav.language}>
      {(["en", "es"] as Locale[]).map((lng) => (
        <Link
          key={lng}
          href={altPath(pathname, lng)}
          onClick={onNavigate}
          aria-current={locale === lng ? "true" : undefined}
          className={`px-2 py-1 rounded transition-colors ${
            locale === lng ? "text-accent" : "text-white/50 hover:text-white"
          }`}
        >
          {lng.toUpperCase()}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <header
        ref={container}
        className={`fixed top-0 left-0 right-0 z-[99] flex items-center py-5 px-4 sm:px-12 md:px-16 lg:px-24 bg-bg/70 backdrop-blur-md transition-transform duration-500 ease-out ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <Link
          href={base || "/"}
          aria-label="Mickael Vasquez — Creative Tech Designer · Home"
          className="shrink-0 relative leading-none"
        >
          <span className="text-white font-bold text-xl lg:text-2xl tracking-tight">
            Mickael<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 lg:gap-10">
          {LINKS.map((l) => (
            <Link
              key={l.id}
              href={l.href}
              className="relative text-white text-sm lg:text-base font-bold brightness-75 hover:brightness-100 duration-300"
            >
              {l.name}
            </Link>
          ))}
        </nav>

        {/* Desktop right cluster */}
        <div className="ml-auto hidden md:flex items-center gap-4">
          <LangSwitch />
          <Link
            href={`${base}/contact`}
            className="group relative flex items-center justify-center bg-accent rounded-full px-6 h-12 lg:h-14 text-white text-sm lg:text-base font-semibold brightness-100 hover:brightness-110 duration-300 overflow-hidden"
          >
            <span className="cta-text transition-all duration-300 ease-out">{t.nav.cta}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/misc/hand-wave.svg"
              alt=""
              aria-hidden
              className="cta-hand absolute w-0 h-7 opacity-0 scale-50 origin-[70%_80%] transition-all duration-300"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t.nav.open}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="ml-auto md:hidden flex flex-col items-center justify-center gap-1.5 w-11 h-11 rounded-lg"
        >
          <span className="block w-6 h-0.5 bg-white rounded-full" />
          <span className="block w-6 h-0.5 bg-white rounded-full" />
          <span className="block w-4 h-0.5 bg-white rounded-full self-end mr-2.5" />
        </button>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[120] md:hidden transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label={t.nav.close}
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          tabIndex={open ? 0 : -1}
        />
        <nav
          className={`absolute top-0 right-0 h-full w-[82%] max-w-sm bg-surface flex flex-col px-7 pt-7 pb-10 transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-white font-bold text-xl">
              Mickael<span className="text-accent">.</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.nav.close}
              className="w-11 h-11 flex items-center justify-center text-white text-2xl rounded-lg"
            >
              ✕
            </button>
          </div>

          <ul className="mt-12 flex flex-col gap-2">
            {LINKS.map((l) => (
              <li key={l.id}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-white text-2xl font-semibold hover:text-accent transition-colors"
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={`${base}/contact`}
            onClick={() => setOpen(false)}
            className="mt-8 flex items-center justify-center bg-accent rounded-full h-14 text-white text-base font-semibold"
          >
            {t.nav.cta}
          </Link>

          <div className="mt-auto pt-8 border-t border-white/10">
            <span className="block text-white/40 text-xs uppercase tracking-wide mb-2">
              {t.nav.language}
            </span>
            <LangSwitch onNavigate={() => setOpen(false)} />
          </div>
        </nav>
      </div>
    </>
  );
}
