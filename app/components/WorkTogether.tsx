"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useT } from "../lib/LangContext";

export default function WorkTogether() {
  const t = useT();
  const container = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      gsap.to(".wt-track", {
        x: "-50%",
        repeat: -1,
        ease: "none",
        duration: 18,
      });
    },
    { scope: container }
  );

  const unit = (
    <span className="flex items-center gap-14 pr-14">
      <span className="text-white text-7xl sm:text-8xl lg:text-9xl xl:text-[11rem] font-bold tracking-tight whitespace-nowrap leading-none">
        {t.workTogether.marquee}
      </span>
      <span className="flex items-center justify-center w-28 h-28 lg:w-36 lg:h-36 xl:w-44 xl:h-44 rounded-full bg-white text-bg shrink-0">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20">
          <path d="M7 7h10v10M7 17L17 7" />
        </svg>
      </span>
    </span>
  );

  return (
    <a href="#cta" ref={container} className="block py-20 overflow-hidden">
      <div className="wt-track flex w-max">
        {unit}
        {unit}
        {unit}
        {unit}
      </div>
    </a>
  );
}
