import type { Metadata } from "next";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Nexus CRM — Case study",
  description:
    "AI-powered CRM for businesses in Bolivia. Centralize WhatsApp, Instagram and Email. Close more sales with a bot that works 24/7. Case study by Mickael Vasquez.",
  alternates: {
    canonical: "/projects/nexus-crm",
    languages: { en: "/projects/nexus-crm", es: "/es/projects/nexus-crm", "x-default": "/projects/nexus-crm" },
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "/projects/nexus-crm",
    siteName: SITE.brand,
    title: "Nexus CRM — Case study",
    description:
      "AI-powered CRM for businesses in Bolivia. Centralize WhatsApp, Instagram and Email. Close more sales with a bot that works 24/7. Case study by Mickael Vasquez.",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: "Nexus CRM — Case study" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
