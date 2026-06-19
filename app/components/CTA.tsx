"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT, useLocale } from "../lib/LangContext";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const t = useT();
  const locale = useLocale();
  const base = locale === "es" ? "/es" : "";
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-tick", {
        opacity: 0,
        y: 30,
        scrollTrigger: { trigger: container.current, start: "top 85%" },
      });
      gsap.from(".cta-block", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: container.current, start: "top 75%" },
      });
    },
    { scope: container }
  );

  return (
    <section
      id="cta"
      ref={container}
      className="relative overflow-hidden text-white py-24 sm:py-32 lg:py-40 px-6 sm:px-12 lg:px-24"
    >
      {/* clock circle — "time is ticking" */}
      <div className="cta-tick absolute -left-32 sm:-left-24 lg:-left-16 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full bg-accent-purple flex items-center justify-center pointer-events-none">
        <div className="relative w-2 h-2">
          <span className="clock-hour absolute left-1/2 -translate-x-1/2 bottom-0 w-1 h-12 sm:h-16 lg:h-20 rounded-full bg-white" />
          <span className="clock-minute absolute left-1/2 -translate-x-1/2 bottom-0 w-1 h-16 sm:h-24 lg:h-32 rounded-full bg-white" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white" />
        </div>
      </div>

      <div className="cta-block relative z-10 flex flex-col gap-4 sm:gap-5 items-start max-w-3xl ml-auto sm:ml-[28%] lg:ml-[26%]">
        <h2 className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white/85 leading-[1.05]">
          {t.cta.title}
        </h2>
        <p className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white/85">
          {t.cta.subtitle}
        </p>
        <a
          href={`${base}/contact`}
          className="bg-accent rounded-full px-8 sm:px-12 lg:px-16 h-14 sm:h-16 lg:h-20 flex items-center justify-center text-white text-lg sm:text-2xl lg:text-3xl font-bold mt-4 sm:mt-6 hover:brightness-110 duration-300"
        >
          {t.cta.button}
        </a>
        <p className="text-base sm:text-xl lg:text-2xl text-white/70 max-w-xl mt-2">
          {t.cta.note}
        </p>
      </div>
    </section>
  );
}
