import type { Metadata } from "next";
import { LangProvider } from "../../lib/LangContext";
import ContactContent from "../../components/ContactContent";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contacto — Empieza un proyecto con Mickael Vasquez · Mickael Vasquez",
  description:
    "¿Tienes un proyecto en mente? Cuéntame sobre él. Trabajo con fundadores y equipos de producto en todo el mundo.",
  alternates: {
    canonical: "/es/contact",
    languages: { en: "/contact", es: "/es/contact", "x-default": "/contact" },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/es/contact",
    siteName: SITE.brand,
    title: "Contacto — Mickael Vasquez",
    description: "Empieza un proyecto. Respondo en menos de 24 horas.",
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
};

export default function ContactPageEs() {
  return (
    <LangProvider locale="es">
      <ContactContent />
    </LangProvider>
  );
}
