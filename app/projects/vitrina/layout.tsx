import type { Metadata } from "next";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Vitrina Digital — Case study",
  description:
    "Shopify Plus-style digital catalog: orders direct via WhatsApp, zero commissions, zero friction. Case study by Mickael Vasquez.",
  alternates: {
    canonical: "/projects/vitrina",
    languages: { en: "/projects/vitrina", es: "/es/projects/vitrina", "x-default": "/projects/vitrina" },
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "/projects/vitrina",
    siteName: SITE.brand,
    title: "Vitrina Digital — Case study",
    description:
      "Shopify Plus-style digital catalog: orders direct via WhatsApp, zero commissions, zero friction. Case study by Mickael Vasquez.",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: "Vitrina Digital — Case study" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
