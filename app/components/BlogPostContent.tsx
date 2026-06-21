"use client";

import Image from "next/image";
import Link from "next/link";
import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Footer from "./Footer";
import { useT, useLocale } from "../lib/LangContext";
import type { Post } from "../lib/posts";
import { SITE_URL } from "../lib/site";

function ShareButtons({ post, base }: { post: Post; base: string }) {
  const url = `${SITE_URL}${base}/blog/${post.slug}`;
  const text = encodeURIComponent(post.title);
  const encodedUrl = encodeURIComponent(url);

  const shares = [
    {
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${text}%20${encodedUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      ),
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${text}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-16 pt-10 border-t border-white/10">
      <p className="text-white/40 text-xs uppercase tracking-widest mb-5">Compartir</p>
      <div className="flex items-center gap-3 flex-wrap">
        {shares.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartir en ${s.label}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 h-10 text-white/60 hover:text-white hover:border-white/40 transition-all duration-200 text-sm"
          >
            {s.icon}
            <span className="hidden sm:inline">{s.label}</span>
          </a>
        ))}
        <button
          type="button"
          aria-label="Copiar enlace"
          onClick={() => navigator.clipboard.writeText(url)}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 h-10 text-white/60 hover:text-white hover:border-accent transition-all duration-200 text-sm"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="hidden sm:inline">Copiar link</span>
        </button>
      </div>
    </div>
  );
}

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
            <div className="max-w-3xl">
              <div
                className="blog-body"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
              <ShareButtons post={post} base={base} />
            </div>
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
