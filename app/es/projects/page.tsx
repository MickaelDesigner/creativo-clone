import type { Metadata } from "next";
import { LangProvider } from "../../lib/LangContext";
import ProjectsIndexContent from "../../components/ProjectsIndexContent";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Proyectos — Trabajo seleccionado · Mickael Vasquez",
  description:
    "Casos de estudio de Mickael Vasquez — Nexus CRM, Vitrina Digital, Portfolio Web. Branding, ingeniería de producto y experiencias web modernas.",
  alternates: {
    canonical: "/es/projects",
    languages: { en: "/projects", es: "/es/projects", "x-default": "/projects" },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/es/projects",
    siteName: SITE.brand,
    title: "Proyectos — Mickael Vasquez",
    description: "Casos de estudio seleccionados: Nexus CRM · Vitrina Digital · Portfolio Web.",
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
};

export default function ProjectsPageEs() {
  return (
    <LangProvider locale="es">
      <ProjectsIndexContent />
    </LangProvider>
  );
}
