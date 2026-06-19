import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS } from "../../../lib/posts";
import { LangProvider } from "../../../lib/LangContext";
import BlogPostContent from "../../../components/BlogPostContent";
import { SITE } from "../../../lib/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} · Mickael Vasquez`,
    description: post.excerpt,
    alternates: {
      canonical: `/es/blog/${slug}`,
      languages: { en: `/blog/${slug}`, es: `/es/blog/${slug}` },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/es/blog/${slug}`,
      siteName: SITE.brand,
      locale: "es_ES",
      images: [{ url: post.img, width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPageEs({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <LangProvider locale="es">
      <BlogPostContent post={post} />
    </LangProvider>
  );
}
