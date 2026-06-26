import type { Metadata } from "next";
import { LangProvider } from "../../lib/LangContext";
import AboutContent from "../../components/AboutContent";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Sobre mí — Mickael Vasquez · Creative Tech Designer",
  description:
    "La historia de Mickael: 15 años a través de publicidad, diseño e ingeniería. Construyendo sistemas de marca, productos con IA y experiencias web modernas.",
  alternates: {
    canonical: "/es/about",
    languages: { en: "/about", es: "/es/about", "x-default": "/about" },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/es/about",
    siteName: SITE.brand,
    title: "Sobre mí — Mickael Vasquez",
    description: "La historia detrás del trabajo — de la publicidad a la IA, 15 años de oficio.",
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
};

export default function AboutPageEs() {
  return (
    <LangProvider locale="es">
      <AboutContent />
    </LangProvider>
  );
}
