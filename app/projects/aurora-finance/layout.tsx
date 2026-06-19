import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Finance — Fintech case study by Mickael Vasquez",
  description:
    "A narrative-first fintech reimagined for the next generation. Case study by Mickael Vasquez: branding, UI/UX, web development. +127% sign-up conversion, $4.2M raised, 98 Lighthouse score.",
  alternates: { canonical: "/projects/aurora-finance" },
  openGraph: {
    title: "Aurora Finance — Fintech case study",
    description: "Branding, UI/UX and web development for a next-generation fintech.",
    url: "/projects/aurora-finance",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
