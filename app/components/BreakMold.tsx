"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "../lib/LangContext";

gsap.registerPlugin(ScrollTrigger);

function Word({ text }: { text: string }) {
  return (
    <span className="flex">
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="bm-letter shadow-outline-text text-7xl sm:text-8xl lg:text-9xl font-bold inline-block cursor-pointer transition-all duration-300 ease-out hover:text-accent hover:[-webkit-text-stroke:0] hover:scale-110 hover:rotate-6"
          style={i === 0 ? { transform: "rotate(-8deg)" } : undefined}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function BreakMold() {
  const t = useT();
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // gentle rise-in (no opacity:0 trap)
      gsap.fromTo(
        ".bm-letter",
        { y: 60, rotate: 12 },
        {
          y: 0,
          rotate: (_i, el: HTMLElement) =>
            el.dataset.initRotate ? Number(el.dataset.initRotate) : 0,
          stagger: 0.05,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: container.current, start: "top 80%" },
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="mt-40 flex flex-col items-center justify-center gap-2 py-20"
    >
      <Word text={t.breakMold.word1} />
      <Word text={t.breakMold.word2} />
    </section>
  );
}
