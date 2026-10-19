import type { Metadata } from "next";
import { SITE } from "../../lib/site";

export const metadata: Metadata = {
  title: "Portfolio Web — Case study",
  description:
    "The site you're reading: designed and built from scratch as a sales tool and technical showcase. Case study by Mickael Vasquez.",
  alternates: {
    canonical: "/projects/portfolio-web",
    languages: { en: "/projects/portfolio-web", es: "/es/projects/portfolio-web", "x-default": "/projects/portfolio-web" },
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "/projects/portfolio-web",
    siteName: SITE.brand,
    title: "Portfolio Web — Case study",
    description:
      "The site you're reading: designed and built from scratch as a sales tool and technical showcase. Case study by Mickael Vasquez.",
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: "Portfolio Web — Case study" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
