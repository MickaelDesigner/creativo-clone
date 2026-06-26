"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Footer from "./Footer";
import { useT, useLocale } from "../lib/LangContext";

gsap.registerPlugin(ScrollTrigger);

// Static info cards — email & GitHub live in social section below


const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/mickaeldiseno/" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/mickael-vasquez-carvallo/" },
  { label: "Behance",   href: "https://www.behance.net/mickaelvasquez" },
  { label: "Dribbble",  href: "https://dribbble.com/Mickael_vc" },
  { label: "GitHub",    href: "https://github.com/MickaelDesigner" },
];

const SERVICES = ["UI/UX Design", "Web Development", "Brand Identity", "Product Engineering", "Other"];
const BUDGETS  = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+"];

/* ── Chip toggle button ─────────────────────────────────────────── */
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold border transition-all duration-200 ${
        active
          ? "bg-accent border-accent text-white shadow-lg shadow-accent/25"
          : "border-white/15 text-white/60 hover:border-white/40 hover:text-white bg-white/[0.03]"
      }`}
    >
      {label}
    </button>
  );
}

/* ── Underline text input ───────────────────────────────────────── */
function Field({
  name, label, type = "text", placeholder, textarea = false, required = false,
}: {
  name: string; label: string; type?: string;
  placeholder?: string; textarea?: boolean; required?: boolean;
}) {
  return (
    <label className="group flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-widest text-white/40 group-focus-within:text-accent transition-colors duration-300">
        {label}{required && <span className="text-accent ml-0.5">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={5}
          placeholder={placeholder}
          required={required}
          className="bg-transparent border-b border-white/15 focus:border-accent outline-none py-3 text-base text-white placeholder-white/25 transition-colors duration-300 resize-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className="bg-transparent border-b border-white/15 focus:border-accent outline-none py-3 text-base text-white placeholder-white/25 transition-colors duration-300"
        />
      )}
    </label>
  );
}

/* ── Main page inner ────────────────────────────────────────────── */
function ContactPageInner() {
  const t = useT();
  const locale = useLocale();
  const container = useRef<HTMLElement>(null);

  const [service, setService]   = useState(SERVICES[0]);
  const [budget, setBudget]     = useState("");
  const [status, setStatus]     = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(".contact-topic", { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" });
    tl.from(".contact-line",  { opacity: 0, y: 60, duration: 0.9, stagger: 0.13, ease: "power4.out" }, "-=0.3");
    tl.from(".contact-sub",   { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, "-=0.4");

    gsap.from(".contact-fact", {
      opacity: 0, y: 40, duration: 0.6, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".contact-facts", start: "top 85%" },
    });
  }, { scope: container });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          service,
          budget: budget || "",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Network error");
      }
      setStatus("success");
      form.reset();
      setService(SERVICES[0]);
      setBudget("");
    } catch (err) {
      setStatus("error");
      const detail = err instanceof Error ? err.message : "";
      setErrorMsg(
        locale === "es"
          ? `Error: ${detail || "Algo salió mal"}. Escribime a mickael.vc7@gmail.com`
          : `Error: ${detail || "Something went wrong"}. Email me at mickael.vc7@gmail.com`
      );
      setTimeout(() => setStatus("idle"), 10000);
    }
  }

  return (
    <main ref={container} className="min-h-screen text-white">

      {/* ─── HERO ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pt-40 lg:pt-48 pb-20 lg:pb-32">
        <div className="contact-topic flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-xl sm:text-2xl">{t.contact.topic}</span>
        </div>

        <h1 className="mt-8 font-bold tracking-tight leading-[0.95]">
          <span className="contact-line block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] text-white">
            {t.contact.line1}
          </span>
          <span className="contact-line block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] text-white sm:ml-12 lg:ml-20">
            {t.contact.line2}
          </span>
          <span className="contact-line block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] sm:ml-20 lg:ml-40 bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
            {t.contact.line3}
          </span>
        </h1>

        <p className="contact-sub mt-10 lg:mt-16 max-w-xl text-lg sm:text-xl text-white/70 leading-relaxed">
          {t.contact.subBefore}
          <span className="text-white font-semibold">{t.contact.subName}</span>
          {t.contact.subAfter}
        </p>
      </section>

      {/* ─── INFO + FORM ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">

          {/* ── Left — info cards ── */}
          <div className="contact-info-grid flex flex-col gap-4">

            {/* Availability */}
            <div className="contact-info-card rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-[11px] uppercase tracking-widest text-white/40 mb-3">
                {locale === "es" ? "Disponibilidad" : "Availability"}
              </p>
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-xl font-semibold text-white">
                  {locale === "es" ? "Disponible ahora" : "Available now"}
                </span>
              </div>
              <p className="text-sm text-white/50 mt-2 ml-6">
                {locale === "es" ? "Abriendo agenda · Q3 2026" : "Taking new projects · Q3 2026"}
              </p>
            </div>

            {/* Cal.com booking */}
            <a
              id="schedule"
              href="https://cal.com/mickael-vasquez-carvallo/personal"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card group block rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-accent/50 hover:-translate-y-0.5 hover:bg-accent/[0.06] transition-all duration-300"
            >
              <p className="text-[11px] uppercase tracking-widest text-white/40 mb-3">
                {locale === "es" ? "Agendar llamada" : "Book a call"}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold text-white group-hover:text-accent transition-colors duration-300">
                  {locale === "es" ? "30 min · Gratis" : "30 min · Free"}
                </p>
                <span className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent group-hover:text-white transition-colors duration-300">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </span>
              </div>
              <p className="text-sm text-white/50 mt-1.5">cal.com/mickael-vasquez-carvallo ↗</p>
            </a>

            {/* Location */}
            <div className="contact-info-card rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-[11px] uppercase tracking-widest text-white/40 mb-3">
                {locale === "es" ? "Ubicación" : "Location"}
              </p>
              <p className="text-xl font-semibold text-white">Remote · Worldwide</p>
              <p className="text-sm text-white/50 mt-1">Santa Cruz de la Sierra, Bolivia</p>
            </div>

            {/* Hours */}
            <div className="contact-info-card rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-[11px] uppercase tracking-widest text-white/40 mb-3">{t.contact.infoHours}</p>
              <p className="text-base text-white/90 font-medium">{t.contact.infoHoursVal}</p>
              <p className="text-sm text-white/50 mt-1">{t.contact.infoHoursTime}</p>
            </div>

            {/* Social */}
            <div className="contact-info-card rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-[11px] uppercase tracking-widest text-white/40 mb-4">{t.contact.infoFollow}</p>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white hover:border-white/30 hover:bg-white/[0.06] transition-all duration-200"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right — form ── */}
          <div className="contact-form-block relative rounded-3xl bg-white/[0.04] border border-white/10 p-8 lg:p-12 overflow-hidden">
            {/* Subtle glow top-right */}
            <div className="pointer-events-none absolute -top-32 -right-32 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />

            {/* SUCCESS STATE */}
            {status === "success" ? (
              <div className="relative flex flex-col items-center text-center gap-6 py-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-pill-magenta flex items-center justify-center shadow-lg shadow-accent/30">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white">
                  {locale === "es" ? "¡Mensaje enviado!" : "Message sent!"}
                </h3>
                <p className="text-white/60 text-lg max-w-sm leading-relaxed">
                  {locale === "es"
                    ? "Recibí tu mensaje. Te respondo en menos de 24 horas."
                    : "Got your message. I'll reply within 24 hours."}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 rounded-full border border-white/20 px-8 h-12 text-sm font-semibold text-white/70 hover:text-white hover:border-white/40 transition-all duration-200"
                >
                  {locale === "es" ? "Enviar otro" : "Send another"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex flex-col gap-7">
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                  {t.contact.formTitle}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field name="name"    label={t.contact.labelName}    placeholder={t.contact.phName}    required />
                  <Field name="company" label={t.contact.labelCompany} placeholder={t.contact.phCompany} />
                </div>

                <Field name="email" label={t.contact.labelEmail} type="email" placeholder={t.contact.phEmail} required />

                {/* Service chips */}
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] uppercase tracking-widest text-white/40">{t.contact.labelService}</span>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <Chip key={s} label={s} active={service === s} onClick={() => setService(s)} />
                    ))}
                  </div>
                </div>

                {/* Budget chips */}
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] uppercase tracking-widest text-white/40">{t.contact.labelBudget}</span>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <Chip key={b} label={b} active={budget === b} onClick={() => setBudget(b === budget ? "" : b)} />
                    ))}
                  </div>
                </div>

                <Field
                  name="message"
                  label={t.contact.labelMessage}
                  placeholder={t.contact.phMessage}
                  textarea
                  required
                />

                {/* Error */}
                {status === "error" && (
                  <div className="rounded-2xl bg-red-500/10 border border-red-500/30 px-5 py-4 text-sm text-red-400">
                    {errorMsg}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group relative overflow-hidden bg-gradient-to-r from-accent to-pill-magenta rounded-full px-10 h-14 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-300"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity=".25" />
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        {locale === "es" ? "Enviando…" : "Sending…"}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {t.contact.submit}
                        <svg className="group-hover:translate-x-1 transition-transform duration-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    )}
                  </button>
                  <p className="text-xs text-white/35 leading-relaxed">
                    {t.contact.privacyText}
                    <a href="/privacy" className="text-white/55 underline underline-offset-2 hover:text-white transition-colors">{t.contact.privacyLink}</a>.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="contact-facts px-6 sm:px-10 lg:px-24 pb-32 lg:pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 border-t border-white/10 pt-16 lg:pt-20">
          {[
            { num: t.contact.stat1Num, label: t.contact.stat1Label },
            { num: t.contact.stat2Num, label: t.contact.stat2Label },
            { num: t.contact.stat3Num, label: t.contact.stat3Label },
          ].map((f) => (
            <div key={f.label} className="contact-fact flex flex-col gap-2">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
                {f.num}
              </span>
              <span className="text-white/60 text-base lg:text-lg">{f.label}</span>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

export default function ContactContent() {
  return (
    <SmoothScroll>
      <Nav />
      <ContactPageInner />
      <Footer />
    </SmoothScroll>
  );
}
