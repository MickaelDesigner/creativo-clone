import type { Metadata } from "next";
import HomeContent from "../components/HomeContent";
import { LangProvider } from "../lib/LangContext";
import { SITE } from "../lib/site";

export const metadata: Metadata = {
  title: "Mickael Vasquez — Creative Tech Designer · Marca · UX · IA",
  description:
    "Mickael Vasquez — Creative Tech Designer. Sistemas de marca, productos con IA y experiencias web modernas: UI/UX, branding, desarrollo web, no-code y animación. Disponible para nuevas colaboraciones.",
  alternates: {
    canonical: "/es",
    languages: {
      en: "/",
      es: "/es",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    url: "/es",
    siteName: SITE.brand,
    title: "Mickael Vasquez — Creative Tech Designer",
    description:
      "Sistemas de marca · UX · Productos con IA · Experiencias web modernas. Trabajo seleccionado de Mickael Vasquez.",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: "Mickael Vasquez — Creative Tech Designer" }],
  },
};

export default function HomeEs() {
  return (
    <LangProvider locale="es">
      <HomeContent />
    </LangProvider>
  );
}
