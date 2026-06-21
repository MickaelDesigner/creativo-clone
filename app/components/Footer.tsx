"use client";

import Link from "next/link";
import { useT } from "../lib/LangContext";

type FooterLink = { label: string; href: string };

// Footer site map — Services-first structure for SEO ranking on service keywords.
// Anchor text uses descriptive phrases (UI/UX Design — short tagline) which Google
// reads as a description of the destination, improving relevance for those terms.
const SERVICES: FooterLink[] = [
  { label: "UI/UX Design — Web & mobile",              href: "/#services" },
  { label: "Brand Identity — Wordmarks & systems",     href: "/#services" },
  { label: "Web Development — Next.js, React",         href: "/#services" },
  { label: "Product Engineering — MVP, SaaS, e-com",   href: "/#services" },
];

const STUDIO: FooterLink[] = [
  { label: "Selected Work — Case studies",             href: "/#projects"               },
  { label: "Approach & Process",                       href: "/projects/aurora-finance#process" },
  { label: "Technology stack",                         href: "/#technologies"           },
  { label: "Field notes (Blog)",                       href: "/blog"                    },
];

const CONNECT: FooterLink[] = [
  { label: "Start a project",                          href: "/contact"                 },
  { label: "hola@mickaelvasquez.tech",                href: "mailto:hola@mickaelvasquez.tech" },
  { label: "Schedule a call",                          href: "https://cal.com/mickaelvasquez" },
  { label: "Remote · Worldwide",                       href: "/contact"                 },
];

const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/mickaeldiseno/",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2a3.7 3.7 0 01-.9 1.4 3.7 3.7 0 01-1.4.9c-.4.2-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.7 3.7 0 01-1.4-.9 3.7 3.7 0 01-.9-1.4c-.2-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1018.6 12 6.6 6.6 0 0012 5.4zm0 10.9A4.3 4.3 0 1116.3 12 4.3 4.3 0 0112 16.3zm6.8-11.1a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/mickaeldiseno",
    path: "M24 12.07c0-6.63-5.37-12-12-12S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.26h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mickael-vasquez-carvallo/",
    path: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/mickaelvasquez",
    path: "M22 7h-6V5.5h6V7ZM9.8 12.2c.86-.42 1.5-1.18 1.5-2.4 0-2.36-1.76-3-3.84-3H1.2v12.4h6.5c2.2 0 4.3-1.06 4.3-3.54 0-1.53-.72-2.66-2.2-3.06Zm-5.7-3.1h2.6c.78 0 1.5.22 1.5 1.13 0 .84-.55 1.18-1.34 1.18H4.1V9.1Zm2.9 7.36H4.1v-2.7h3c.96 0 1.56.4 1.56 1.4 0 1-.71 1.3-1.66 1.3ZM23 13.6c0-2.74-1.6-5-4.5-5-2.82 0-4.74 2.12-4.74 4.9 0 2.88 1.82 4.86 4.74 4.86 2.2 0 3.63-1 4.32-3.1h-2.3c-.24.78-.93 1.18-1.93 1.18-1.32 0-2.02-.78-2.1-2.06H23c0-.22.02-.45.02-.68Zm-6.5-1.2c.13-1.1.78-1.78 1.93-1.78 1.2 0 1.78.7 1.86 1.78H16.5Z",
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/Mickael_vc",
    path: "M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0Zm7.93 5.53a10.17 10.17 0 0 1 2.3 6.36c-.34-.07-3.72-.76-7.13-.33-.07-.17-.14-.35-.22-.53-.21-.5-.45-1-.7-1.49 3.77-1.54 5.49-3.75 5.75-4.01ZM12 1.78c2.6 0 4.98.98 6.78 2.58-.22.31-1.77 2.38-5.4 3.75A52.4 52.4 0 0 0 9.6 2.13 10.3 10.3 0 0 1 12 1.78Zm-4.36 1.05a61.6 61.6 0 0 1 3.76 5.9c-4.75 1.26-8.94 1.24-9.4 1.24A10.26 10.26 0 0 1 7.64 2.83ZM1.77 12.01v-.31c.44.01 5.37.07 10.44-1.45.29.57.57 1.15.82 1.73l-.4.12c-5.24 1.69-8.03 6.31-8.26 6.7A10.2 10.2 0 0 1 1.77 12Zm10.23 10.22a10.2 10.2 0 0 1-6.3-2.17c.18-.37 2.18-4.22 7.92-6.22l.06-.02a42.6 42.6 0 0 1 2.2 7.82 10.16 10.16 0 0 1-3.88.59Zm5.59-1.54a44 44 0 0 0-2-7.42c3.21-.51 6.02.33 6.37.44a10.2 10.2 0 0 1-4.37 6.98Z",
  },
  {
    label: "GitHub",
    href: "https://github.com/MickaelDesigner",
    path: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.13c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z",
  },
];

function Social({ s }: { s: { label: string; href: string; path: string } }) {
  const isExternal = s.href.startsWith("http");
  return (
    <a
      href={s.href}
      aria-label={`${s.label} — Mickael Vasquez`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
      className="text-footer-sm hover:text-purple-hover hover:scale-110 transition-all duration-300 inline-flex"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d={s.path} />
      </svg>
    </a>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title} className="flex flex-col items-center sm:items-start gap-3 text-center sm:text-left">
      <p className="text-footer-link/60 mb-2 font-semibold text-sm uppercase tracking-widest">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5 w-full">
        {links.map((l) => {
          const isExternal = l.href.startsWith("http") || l.href.startsWith("mailto:");
          return (
            <li key={l.label}>
              <Link
                href={l.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group inline-flex items-center justify-center sm:justify-start gap-1.5 hover:text-purple-hover hover:translate-x-0.5 transition-all duration-200 text-sm lg:text-base"
              >
                <span>{l.label}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[10px]">
                  &#8599;
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Footer() {
  const t = useT();
  const year = new Date().getFullYear();
  return (
    <footer
      itemScope
      itemType="https://schema.org/WPFooter"
      className="bg-footer-bg text-footer-link rounded-t-3xl mx-3 sm:mx-5 pt-16 lg:pt-20 pb-6 px-6 sm:px-10 lg:px-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-12 lg:gap-12">
        {/* col 1 — brand */}
        <div className="flex flex-col items-center sm:items-start gap-6 text-center sm:text-left">
          <Link href="/" aria-label="Mickael Vasquez — Home" className="inline-flex flex-col gap-1">
            <span className="text-3xl lg:text-4xl font-bold tracking-tight text-footer-link leading-none">
              Mickael Vasquez<span className="text-accent">.</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-footer-link/60 mt-2">
              {t.footer.role}
            </span>
          </Link>

          <p className="text-sm lg:text-base text-footer-link/80 leading-relaxed max-w-xs">
            {t.footer.tagline}
          </p>

          <div className="flex gap-4 justify-center sm:justify-start">
            {SOCIALS.map((s) => (
              <Social key={s.label} s={s} />
            ))}
          </div>
        </div>

        <FooterColumn title={t.footer.services} links={SERVICES} />
        <FooterColumn title={t.footer.studio}   links={STUDIO} />
        <FooterColumn title={t.footer.connect}  links={CONNECT} />
      </div>

      <div className="border-t border-footer-link/15 mt-16 pt-6 flex flex-col sm:flex-row gap-3 sm:gap-6 items-center justify-between text-xs sm:text-sm text-footer-link/70 text-center">
        <p>
          © {year} Mickael Vasquez. {t.footer.role} · {t.footer.rights}
        </p>
        <p>
          {t.footer.builtWith} →{" "}
          <a href="mailto:hola@mickaelvasquez.tech" className="text-footer-link hover:text-purple-hover underline">
            hola@mickaelvasquez.tech
          </a>
        </p>
      </div>
    </footer>
  );
}
