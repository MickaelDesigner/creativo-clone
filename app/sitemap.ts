import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import { POSTS } from "./lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: { en: SITE_URL, es: `${SITE_URL}/es` } },
    },
    {
      url: `${SITE_URL}/es`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: { languages: { en: SITE_URL, es: `${SITE_URL}/es` } },
    },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.85,
      alternates: { languages: { en: `${SITE_URL}/about`, es: `${SITE_URL}/es/about` } } },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.9,
      alternates: { languages: { en: `${SITE_URL}/contact`, es: `${SITE_URL}/es/contact` } } },
    { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.8,
      alternates: { languages: { en: `${SITE_URL}/blog`, es: `${SITE_URL}/es/blog` } } },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "weekly", priority: 0.9,
      alternates: { languages: { en: `${SITE_URL}/projects`, es: `${SITE_URL}/es/projects` } } },
  ];

  // Real project pages
  const projectPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/projects/nexus-crm`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/projects/vitrina`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/projects/portfolio-web`, lastModified, changeFrequency: "monthly", priority: 0.85 },
  ];

  // Blog posts with published content (have body)
  const blogPages: MetadataRoute.Sitemap = POSTS
    .filter((p) => p.body)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...projectPages, ...blogPages];
}
