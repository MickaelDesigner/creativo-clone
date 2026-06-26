import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS } from "../../lib/posts";
import { LangProvider } from "../../lib/LangContext";
import BlogPostContent from "../../components/BlogPostContent";
import { SITE, SITE_URL } from "../../lib/site";

export function generateStaticParams() {
  return POSTS.filter((p) => p.body).map((p) => ({ slug: p.slug }));
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.img.startsWith("http") ? post.img : `${SITE_URL}${post.img}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Mickael Vasquez",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Mickael Vasquez",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <LangProvider locale="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </head>
      <BlogPostContent post={post} />
    </LangProvider>
  );
}
