"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Footer from "./Footer";
import { useT, useLocale } from "../lib/LangContext";
import { POSTS, CATEGORIES } from "../lib/posts";

gsap.registerPlugin(ScrollTrigger);

function BlogInner() {
  const t = useT();
  const locale = useLocale();
  const base = locale === "es" ? "/es" : "";
  const container = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>("All");

  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);
  const filtered = filter === "All" ? rest : rest.filter((p) => p.category === filter);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".blog-topic", { opacity: 0, y: 30, duration: 0.6, ease: "power3.out" });
      tl.from(".blog-title-line", {
        opacity: 0, y: 70, duration: 0.95, stagger: 0.13, ease: "power4.out",
      }, "-=0.3");
      tl.from(".blog-sub", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, "-=0.4");

      gsap.from(".blog-featured", {
        opacity: 0, y: 60, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".blog-featured", start: "top 85%" },
      });

      gsap.from(".blog-category-chip", {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.05, ease: "power3.out",
        scrollTrigger: { trigger: ".blog-categories", start: "top 90%" },
      });

      gsap.utils.toArray<HTMLElement>(".blog-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
      });

      gsap.from(".blog-newsletter", {
        opacity: 0, y: 50, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".blog-newsletter", start: "top 85%" },
      });
    },
    { scope: container, dependencies: [filter] }
  );

  return (
    <main ref={container} className="min-h-screen text-white">
      {/* ─── HERO ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-20">
        <div className="blog-topic flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-section-topic" />
          <span className="text-section-topic text-base sm:text-xl lg:text-2xl">
            {t.blog.topic}
          </span>
        </div>

        <h1 className="mt-8 font-bold tracking-tight leading-[0.95]">
          <span className="blog-title-line block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] text-white">
            {t.blog.title1}
          </span>
          <span className="blog-title-line block text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9.5rem] ml-0 sm:ml-12 lg:ml-20 bg-gradient-to-r from-accent via-pill-magenta to-purple-hover bg-clip-text text-transparent">
            {t.blog.title2}
          </span>
        </h1>

        <p className="blog-sub mt-10 lg:mt-12 max-w-2xl text-lg sm:text-xl text-white/70 leading-relaxed">
          {t.blog.sub}
          <span className="text-white font-semibold">{t.blog.subAuthor}</span>.
        </p>
      </section>

      {/* ─── FEATURED ─── */}
      {featured && (
        <section className="px-6 sm:px-10 lg:px-24 pb-20 sm:pb-32">
          <Link
            href={`${base}/blog/${featured.slug}`}
            className="blog-featured group block rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-accent/50 transition-colors duration-500"
          >
            <article className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
                <Image
                  src={featured.img}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <span className="absolute top-5 left-5 rounded-full bg-accent text-white text-xs uppercase tracking-widest px-3 py-1.5 font-semibold">
                  {t.blog.featured}
                </span>
              </div>
              <div className="flex flex-col justify-between gap-6 p-6 sm:p-10 lg:p-14 bg-services-bg">
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/60">
                  <span>{featured.category}</span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span>{featured.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <time>{featured.date}</time>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05] text-white group-hover:text-purple-hover transition-colors duration-300">
                  {featured.title}
                </h2>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-purple-hover font-semibold text-base">
                  {t.blog.readEssay}{" "}
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </article>
          </Link>
        </section>
      )}

      {/* ─── CATEGORIES FILTER ─── */}
      <section className="blog-categories px-6 sm:px-10 lg:px-24 pb-10 sm:pb-12">
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
          <span className="text-xs uppercase tracking-widest text-white/50 mr-2">{t.blog.filter}</span>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`blog-category-chip rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                filter === c
                  ? "bg-accent border-accent text-white"
                  : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* ─── ARTICLES GRID ─── */}
      <section className="px-6 sm:px-10 lg:px-24 pb-24 sm:pb-32">
        {filtered.length === 0 ? (
          <p className="text-white/50 text-lg py-20 text-center">{t.blog.noPostsYet}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                href={`${base}/blog/${p.slug}`}
                className="blog-card group flex flex-col gap-4 sm:gap-5"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group-hover:border-accent/50 transition-colors duration-300">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-widest text-white/50">
                    <span className="text-purple-hover">{p.category}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>{p.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <time>{p.date}</time>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-snug text-white group-hover:text-purple-hover transition-colors duration-300">
                    {p.title}
                  </h2>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed line-clamp-3">
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ─── NEWSLETTER CTA ─── */}
      <section className="px-3 sm:px-12 pb-24 sm:pb-32">
        <div className="blog-newsletter rounded-3xl bg-gradient-to-br from-accent via-pill-magenta to-purple-hover px-6 sm:px-12 lg:px-20 py-16 sm:py-24 lg:py-32">
          <div className="flex flex-col gap-6 max-w-3xl">
            <span className="text-white/80 text-xs sm:text-sm uppercase tracking-widest">
              {t.blog.nlLabel}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white">
              {t.blog.nlTitle}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/85 leading-relaxed max-w-xl">
              {t.blog.nlDesc}
            </p>
            <form
              className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={t.blog.nlPlaceholder}
                aria-label={t.blog.nlPlaceholder}
                className="flex-1 rounded-full bg-white/15 border border-white/30 px-5 sm:px-6 h-12 sm:h-14 text-white placeholder-white/60 outline-none focus:border-white transition-colors duration-200"
              />
              <button
                type="submit"
                className="rounded-full bg-white text-bg font-bold px-6 sm:px-8 h-12 sm:h-14 hover:scale-105 transition-transform duration-200"
              >
                {t.blog.nlButton}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function BlogContent() {
  return (
    <SmoothScroll>
      <Nav />
      <BlogInner />
      <Footer />
    </SmoothScroll>
  );
}
