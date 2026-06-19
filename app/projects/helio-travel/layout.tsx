import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Helio Travel — Discovery platform case study by Mickael Vasquez",
  description:
    "A discovery platform for curious wanderers, built around stories. Case study by Mickael Vasquez: web design, animation, brand strategy.",
  alternates: { canonical: "/projects/helio-travel" },
  openGraph: {
    title: "Helio Travel — Discovery platform case study",
    description: "Web design, animation and strategy for a travel discovery platform.",
    url: "/projects/helio-travel",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
