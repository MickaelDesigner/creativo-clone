"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Footer from "./Footer";
import { useT } from "../lib/LangContext";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  { label: "Email",    value: "hello@mickaelvasquez.tech",   href: "mailto:hello@mickaelvasquez.tech" },
  { label: "GitHub",   value: "github.com/MickaelDesigner",  href: "https://github.com/MickaelDesigner" },
  { label: "Location", value: "Remote · Worldwide",          href: "#" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/mickaeldiseno/" },
  { label: "Facebook",  href: "https://www.facebook.com/mickaeldiseno" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/mickael-vasquez-carvallo/" },
  { label: "Behance",   href: "https://www.behance.net/mickaelvasquez" },
  { label: "Dribbble",  href: "https://dribbble.com/Mickael_vc" },
  { label: "GitHub",    href: "https://github.com/MickaelDesigner" },
];

const SERVICES = [
  "UI/UX Design",
  "Web Development",
  "Brand Identity",
  "Product Engineering",
  "Other",
];

function Field({
  name, label, type = "text", placeholder, textarea = false,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2 text-white/90">
      <span className="text-xs uppercase tracking-widest text-white/50">{label}</span>
      {textarea ? (
        <textarea
          name={name}
          rows={5}
          placeholder={placeholder}
          className="bg-transparent border-b border-white/20 focus:border-accent outline-none py-3 text-lg text-white placeholder-white/30 transition-colors duration-300 resize-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="bg-transparent border-b border-white/20 focus:border-accent outline-none py-3 text-lg text-white placeholder-white/30 transition-colors duration-300"
        />
      )}
    </label>
  );
}

function ContactPageInner() {
  const t = useT();
  const container = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<string>(SERVICES[0]);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".contact-topic", { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" });
      tl.from(".contact-line", {
        opacity: 0, y: 60, duration: 0.9, stagger: 0.13, ease: "power4.out",
      }, "-=0.3");
      tl.from(".contact-sub", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, "-=0.4");

      gsap.from(".contact-info-card", {
        opacity: 0, y: 50, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-info-grid", start: "top 85%" },
      });
      gsap.from(".contact-form-block", {
        opacity: 0, y: 50, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form-block", start: "top 85%" },
      });
      gsap.from(".contact-fact", {
        opacity: 0, y: 40, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-facts", start: "top 85%" },
      });
    },
    { scope: container }
  );

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
          <span className="contact-line block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] text-white ml-0 sm:ml-12 lg:ml-20">
            {t.contact.line2}
          </span>
          <span className="contact-line block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] ml-0 sm:ml-20 lg:ml-40 bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          {/* Left — info cards */}
          <div className="contact-info-grid flex flex-col gap-6">
            {CONTACT_INFO.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="contact-info-card group block rounded-3xl border border-white/10 bg-services-bg/50 backdrop-blur-sm p-6 lg:p-8 hover:border-accent/60 hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-xs uppercase tracking-widest text-white/50 mb-2">{c.label}</p>
                <p className="text-2xl lg:text-3xl font-semibold tracking-tight group-hover:text-purple-hover transition-colors duration-300">
                  {c.value}
                </p>
              </a>
            ))}

            <div className="contact-info-card rounded-3xl border border-white/10 bg-services-bg/50 backdrop-blur-sm p-6 lg:p-8">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-3">{t.contact.infoHours}</p>
              <p className="text-lg lg:text-xl text-white/90">{t.contact.infoHoursVal}</p>
              <p className="text-lg lg:text-xl text-white/60">{t.contact.infoHoursTime}</p>
            </div>

            <div className="contact-info-card rounded-3xl border border-white/10 bg-services-bg/50 backdrop-blur-sm p-6 lg:p-8">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-3">{t.contact.infoFollow}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/70">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={`${s.label} — Mickael Vasquez (@MickaelDesigner)`}
                    className="hover:text-purple-hover hover:-translate-y-0.5 transition-all duration-300 text-sm lg:text-base"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <form
            className="contact-form-block rounded-3xl bg-services-bg p-8 lg:p-12 flex flex-col gap-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              setTimeout(() => setSubmitted(false), 4000);
            }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">
              {t.contact.formTitle}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field name="name"    label={t.contact.labelName}    placeholder={t.contact.phName} />
              <Field name="company" label={t.contact.labelCompany} placeholder={t.contact.phCompany} />
            </div>

            <Field name="email" label={t.contact.labelEmail} type="email" placeholder={t.contact.phEmail} />

            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-white/50">
                {t.contact.labelService}
              </span>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelected(s)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold border transition-all duration-200 ${
                      selected === s
                        ? "bg-accent border-accent text-white"
                        : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-white/50">{t.contact.labelBudget}</span>
              <div className="flex flex-wrap gap-2">
                {["< $5k", "$5k – $15k", "$15k – $50k", "$50k+"].map((b) => (
                  <button
                    key={b}
                    type="button"
                    className="rounded-full px-4 py-2 text-sm border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all duration-200"
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <Field
              name="message"
              label={t.contact.labelMessage}
              placeholder={t.contact.phMessage}
              textarea
            />

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2">
              <button
                type="submit"
                className="group bg-accent rounded-full px-10 h-14 lg:h-16 flex items-center justify-center text-white font-bold text-base lg:text-lg hover:brightness-110 transition-all duration-300"
              >
                {submitted ? t.contact.submitted : t.contact.submit}
              </button>
              <p className="text-sm text-white/50">
                {t.contact.privacyText}
                <a href="/privacy" className="text-white/80 underline">{t.contact.privacyLink}</a>.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* ─── FACTS / RESPONSE PROMISE ─── */}
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
              <span className="text-white/70 text-base lg:text-lg">{f.label}</span>
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
