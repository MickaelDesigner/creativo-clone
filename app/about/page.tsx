import type { Metadata } from "next";
import { LangProvider } from "../lib/LangContext";
import AboutContent from "../components/AboutContent";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  title: "About — Mickael Vasquez · Creative Tech Designer",
  description:
    "Mickael's story: 15 years across advertising, design and engineering. Building brand systems, AI-driven products and modern web experiences.",
  alternates: {
    canonical: "/about",
    languages: { en: "/about", es: "/es/about", "x-default": "/about" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/about",
    siteName: SITE.brand,
    title: "About — Mickael Vasquez",
    description: "The story behind the work — from advertising to AI, 15 years of craft.",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: "About Mickael Vasquez" }],
  },
};

export default function AboutPage() {
  return (
    <LangProvider locale="en">
      <AboutContent />
    </LangProvider>
  );
}
