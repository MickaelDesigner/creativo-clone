import type { Metadata } from "next";
import { LangProvider } from "../../../lib/LangContext";
import NexusCrmPage from "../../../projects/nexus-crm/page";
import { SITE } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Nexus CRM — Caso de estudio · Mickael Vasquez",
  description:
    "CRM con IA para negocios en Bolivia. Centraliza WhatsApp, Instagram y Email. Cierra más ventas con un bot que trabaja 24/7.",
  alternates: {
    canonical: "/es/projects/nexus-crm",
    languages: { en: "/projects/nexus-crm", es: "/es/projects/nexus-crm" },
  },
  openGraph: {
    url: "/es/projects/nexus-crm",
    locale: "es_ES",
    siteName: SITE.brand,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
};

export default function NexusCrmPageEs() {
  return (
    <LangProvider locale="es">
      <NexusCrmPage />
    </LangProvider>
  );
}
