import type { Metadata } from "next";
import { LangProvider } from "../../lib/LangContext";
import BlogContent from "../../components/BlogContent";
import { SITE } from "../../lib/site";
import { POSTS } from "../../lib/posts";

export const metadata: Metadata = {
  title: "Blog — Notas de campo sobre diseño, IA y web · Mickael Vasquez",
  description:
    "Ensayos y notas de campo de Mickael Vasquez, Creative Tech Designer. Temas: sistemas de marca, productos con IA, ingeniería de diseño, UX, web moderna, animación.",
  alternates: {
    canonical: "/es/blog",
    languages: { en: "/blog", es: "/es/blog", "x-default": "/blog" },
  },
  openGraph: {
    title: "Blog — Notas de campo · Mickael Vasquez",
    description: "Ensayos sobre sistemas de marca, productos con IA, ingeniería de diseño y web moderna.",
    url: "/es/blog",
    type: "website",
    locale: "es_ES",
    siteName: SITE.brand,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
};

export default async function BlogPageEs() {
  const posts = POSTS.filter((p) => p.body);
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  return (
    <LangProvider locale="es">
      <BlogContent posts={posts} categories={categories} />
    </LangProvider>
  );
}
