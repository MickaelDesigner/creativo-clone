"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TopicHeader from "./TopicHeader";
import { useT } from "../lib/LangContext";

gsap.registerPlugin(ScrollTrigger);

type Service = { name: string; tags: string[] };

const SERVICES: Service[] = [
  { name: "UI/UX Design",          tags: ["Figma", "Prototyping", "Wire-Frame", "Creative Design"] },
  { name: "Web Development",       tags: ["Next.js", "React", "Headless CMS", "Webflow"] },
  { name: "Brand Identity Design", tags: ["Logo Design", "Brand Guidelines", "Typography", "Visual Identity"] },
  { name: "Product Engineering",   tags: ["E-commerce", "MVP Development", "SaaS Development", "Mobile Apps"] },
];

function ServiceRow({ name, tags }: Service) {
  const [hovered, setHovered] = useState(false);
  const [display, setDisplay] = useState(name);

  useEffect(() => {
    if (!hovered) {
      setDisplay(name);
      return;
    }
    const sequence = [...tags, name];
    let i = 0;
    setDisplay(sequence[0]);
    const id = window.setInterval(() => {
      i += 1;
      if (i >= sequence.length) { window.clearInterval(id); return; }
      setDisplay(sequence[i]);
    }, 320);
    return () => window.clearInterval(id);
  }, [hovered, name, tags]);

  return (
    <div
      className="service-row py-7"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={`block w-fit text-5xl sm:text-6xl lg:text-7xl tracking-tight font-semibold cursor-pointer
                   transition-colors duration-200 ease-out
                   bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text
                   ${hovered ? "text-transparent" : "text-[#34345f]"}`}
      >
        {display}
      </span>
      <ul
        className={`mt-0 max-h-0 overflow-hidden opacity-0 -translate-y-1
                   flex flex-wrap gap-x-6 gap-y-2 text-purple-soft/80 text-sm sm:text-base
                   transition-all duration-300 ease-out
                   ${hovered ? "!mt-3 !max-h-20 !opacity-100 !translate-y-0" : ""}`}
      >
        {tags.map((t) => (
          <li key={t} className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Services() {
  const t = useT();
  const wrapper = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Expand blue bg from centered card to full width on scroll
      gsap.fromTo(
        wrapper.current,
        { marginLeft: "10vw", marginRight: "10vw" },
        {
          marginLeft: "0px",
          marginRight: "0px",
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapper.current,
            start: "top 88%",
            end: "top 35%",
            scrub: 1.2,
          },
        }
      );

      // Divider lines draw in
      gsap.utils.toArray<HTMLElement>(".service-divider").forEach((line) => {
        gsap.fromTo(
          line,
          { width: "0%" },
          {
            width: "100%",
            ease: "power2.out",
            scrollTrigger: { trigger: line, start: "top 90%", end: "top 60%", scrub: true },
          }
        );
      });

      // Service rows fade in
      gsap.from(".service-row", {
        opacity: 0,
        y: 30,
        stagger: 0.06,
        scrollTrigger: { trigger: container.current, start: "top 70%" },
      });
    },
    { scope: wrapper }
  );

  return (
    <div ref={wrapper} id="services">
      <section
        ref={container}
        className="bg-services-bg rounded-t-3xl pt-[15dvh] pb-40 min-h-screen relative overflow-hidden"
      >
        <div className="px-6 sm:px-10 lg:px-24">
          <TopicHeader label={t.services.topic} />
          <h2 className="service-row mt-4 text-white text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {t.services.title}
          </h2>

          <div className="mt-16">
            {SERVICES.map((s) => (
              <div key={s.name}>
                <ServiceRow name={s.name} tags={s.tags} />
                <div className="service-divider h-px w-full bg-stone-400/60" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade — blue melts into the main dark background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-52 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #141414 0%, #141414 15%, transparent 100%)",
          }}
        />
      </section>
    </div>
  );
}
