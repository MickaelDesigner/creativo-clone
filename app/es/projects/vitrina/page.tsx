import type { Metadata } from "next";
import { LangProvider } from "../../../lib/LangContext";
import VitrinaPage from "../../../projects/vitrina/page";
import { SITE } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Vitrina Digital — Caso de estudio · Mickael Vasquez",
  description:
    "Catálogo digital estilo Shopify Plus — pedidos directo por WhatsApp, sin comisiones, sin fricción. Caso de estudio de Mickael Vasquez.",
  alternates: {
    canonical: "/es/projects/vitrina",
    languages: { en: "/projects/vitrina", es: "/es/projects/vitrina" },
  },
  openGraph: {
    url: "/es/projects/vitrina",
    locale: "es_ES",
    siteName: SITE.brand,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
};

export default function VitrinaPageEs() {
  return (
    <LangProvider locale="es">
      <VitrinaPage />
    </LangProvider>
  );
}
