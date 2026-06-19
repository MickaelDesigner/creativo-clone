"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "../lib/LangContext";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    quote:
      "They reimagined our entire platform in weeks. Conversions jumped 40% and the team finally loves their own product.",
    avatar: "/assets/images/testimonials/Seb.png",
    name: "Sebastian Cole",
    role: "CEO, Northwind",
  },
  {
    quote:
      "Pixel-perfect execution paired with real strategic thinking. Rare combination, genuinely impressed.",
    avatar: "/assets/images/testimonials/firefly.png",
    name: "Firefly Labs",
    role: "Founder",
  },
  {
    quote:
      "The animations carry our story without ever getting in the way. Customers keep mentioning the site.",
    avatar: "/assets/images/testimonials/Tamanna.jpeg",
    name: "Tamanna Rao",
    role: "Head of Product",
  },
  {
    quote:
      "Fast, communicative, and obsessed with detail. We shipped ahead of schedule with zero surprises.",
    avatar: "/assets/images/testimonials/Palav.jpg",
    name: "Palav Mehta",
    role: "CTO, Quanta",
  },
  {
    quote:
      "From brand to build, everything felt cohesive. Our investors noticed the polish immediately.",
    avatar: "/assets/images/testimonials/Heli.jpg",
    name: "Heli Shah",
    role: "Marketing Lead",
  },
  {
    quote:
      "A studio that actually listens. They translated a vague brief into something better than we imagined.",
    avatar: "/assets/images/testimonials/Perera.jpeg",
    name: "Daniel Perera",
    role: "Director, Atlas",
  },
];

export default function Testimonials() {
  const t = useT();
  const container = useRef<HTMLElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const sliderWrap = useRef<HTMLDivElement>(null);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: { perView: "auto", spacing: 24 },
  });

  useGSAP(
    () => {
      gsap.from(".tt-sub", {
        opacity: 0,
        y: 40,
        scrollTrigger: { trigger: ".tt-sub", start: "top 85%" },
      });
    },
    { scope: container }
  );

  useEffect(() => {
    const wrap = sliderWrap.current;
    const badge = dragRef.current;
    if (!wrap || !badge) return;
    const move = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      gsap.to(badge, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    };
    const leave = () => gsap.to(badge, { opacity: 0, duration: 0.3 });
    wrap.addEventListener("pointermove", move);
    wrap.addEventListener("pointerleave", leave);
    return () => {
      wrap.removeEventListener("pointermove", move);
      wrap.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section
      id="testimonials"
      ref={container}
      className="mt-36 flex flex-col items-center"
    >
      <h2 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-center leading-[1.0] text-white px-4">
        {t.testimonials.title1}
        <br />
        {t.testimonials.title2}
      </h2>
      <p className="tt-sub text-3xl sm:text-4xl lg:text-6xl font-bold text-center text-purple-soft px-4 mb-20">
        {t.testimonials.subtitle}
      </p>

      <div ref={sliderWrap} className="relative w-full px-4 cursor-grab">
        <div
          ref={dragRef}
          className="pointer-events-none absolute top-0 left-0 z-30 opacity-0 -translate-x-1/2 -translate-y-1/2 bg-black text-white text-sm rounded-full px-4 py-2"
        >
          {t.testimonials.drag}
        </div>
        <div ref={sliderRef} className="keen-slider">
          {ITEMS.map((t, i) => (
            <div
              key={i}
              className="keen-slider__slide bg-white text-black rounded-3xl min-w-[400px] !w-[25vw] p-10 flex flex-col justify-between gap-10"
              style={{ minWidth: 400, width: "25vw", maxWidth: "90vw" }}
            >
              <p className="text-xl leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-lg">{t.name}</p>
                  <p className="text-black/60">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
