import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS } from "../../lib/posts";
import { LangProvider } from "../../lib/LangContext";
import BlogPostContent from "../../components/BlogPostContent";
import { SITE, SITE_URL } from "../../lib/site";

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
      canonical: `/blog/${slug}`,
      languages: { en: `/blog/${slug}`, es: `/es/blog/${slug}` },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      siteName: SITE.brand,
      type: "article",
      images: [{ url: `${SITE_URL}/og?slug=${slug}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${SITE_URL}/og?slug=${slug}`],
      creator: SITE.twitterHandle,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <LangProvider locale="en">
      <BlogPostContent post={post} />
    </LangProvider>
  );
}
