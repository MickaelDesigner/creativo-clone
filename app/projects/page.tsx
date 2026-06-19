import type { Metadata } from "next";
import { LangProvider } from "../lib/LangContext";
import ProjectsIndexContent from "../components/ProjectsIndexContent";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  title: "Projects — Selected Work · Mickael Vasquez",
  description:
    "Case studies from Mickael Vasquez — Nexus CRM, Vitrina Digital, Portfolio Web. Brand, product engineering, and modern web experiences.",
  alternates: {
    canonical: "/projects",
    languages: { en: "/projects", es: "/es/projects", "x-default": "/projects" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/projects",
    siteName: SITE.brand,
    title: "Projects — Mickael Vasquez",
    description: "Selected case studies: Nexus CRM · Vitrina Digital · Portfolio Web.",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: "Projects — Mickael Vasquez" }],
  },
};

export default function ProjectsPage() {
  return (
    <LangProvider locale="en">
      <ProjectsIndexContent />
    </LangProvider>
  );
}
