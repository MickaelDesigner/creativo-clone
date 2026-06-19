"use client";

import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Footer from "./Footer";
import { useT, useLocale } from "../lib/LangContext";
import type { Post } from "../lib/posts";

export default function BlogPostContent({ post }: { post: Post }) {
  const t = useT();
  const locale = useLocale();
  const base = locale === "es" ? "/es" : "";

  return (
    <SmoothScroll>
      <Nav />
      <main className="min-h-screen text-white">
        {/* ─── HERO ─── */}
        <section className="px-6 sm:px-10 lg:px-24 pt-40 lg:pt-48 pb-12">
          <Link
            href={`${base}/blog`}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10 transition-colors duration-200"
          >
            {t.blog.backToBlog}
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-section-topic" />
            <span className="text-section-topic text-xl">
              {post.category} · {post.readTime} · <time>{post.date}</time>
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-bold tracking-tight leading-[0.95] max-w-5xl text-white">
            {post.title}
          </h1>

          <p className="mt-10 max-w-2xl text-xl sm:text-2xl text-white/70 leading-relaxed">
            {post.excerpt}
          </p>
        </section>

        {/* ─── COVER ─── */}
        <section className="px-6 sm:px-10 lg:px-24 pb-24">
          <div className="relative rounded-3xl overflow-hidden aspect-[16/9] lg:aspect-[16/7]">
            <Image
              src={post.img}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* ─── BODY or COMING SOON ─── */}
        {post.body ? (
          <section className="px-6 sm:px-10 lg:px-24 pb-40">
            <div
              className="max-w-3xl blog-body"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </section>
        ) : (
          <section className="px-6 sm:px-10 lg:px-24 pb-40">
            <div className="max-w-3xl border border-white/10 rounded-3xl bg-services-bg p-10 lg:p-16 flex flex-col gap-6">
              <span className="inline-flex items-center gap-2 text-section-topic text-sm uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-section-topic" />
                {t.blog.comingSoon.split(".")[0]}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                {t.blog.comingSoon}
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                {locale === "es"
                  ? "Este ensayo está siendo escrito. Suscríbete al newsletter y serás el primero en leerlo."
                  : "This field note is being written. Subscribe to the newsletter and you'll be the first to read it."}
              </p>
              <Link
                href={`${base}/blog`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 h-12 text-white font-semibold text-sm hover:opacity-90 transition-opacity w-fit"
              >
                {t.blog.backToBlog}
              </Link>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
