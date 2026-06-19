import type { Metadata } from "next";
import { LangProvider } from "../../../lib/LangContext";
import PortfolioWebPage from "../../../projects/portfolio-web/page";
import { SITE } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Portfolio Web — Caso de estudio · Mickael Vasquez",
  description:
    "El sitio que estás leyendo — diseñado y construido desde cero como herramienta de venta y vitrina técnica. Caso de estudio de Mickael Vasquez.",
  alternates: {
    canonical: "/es/projects/portfolio-web",
    languages: { en: "/projects/portfolio-web", es: "/es/projects/portfolio-web" },
  },
  openGraph: {
    url: "/es/projects/portfolio-web",
    locale: "es_ES",
    siteName: SITE.brand,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
};

export default function PortfolioWebPageEs() {
  return (
    <LangProvider locale="es">
      <PortfolioWebPage />
    </LangProvider>
  );
}
