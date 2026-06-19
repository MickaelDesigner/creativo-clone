import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
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
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/projects/aurora-finance`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/projects/helio-travel`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/projects/pulse-health`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/projects/cobalt-studio`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/projects/drift-commerce`, lastModified, changeFrequency: "monthly", priority: 0.85 },
  ];
}
