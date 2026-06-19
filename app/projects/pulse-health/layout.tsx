import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pulse Health — Mobile wellness app case study by Mickael Vasquez",
  description:
    "A mobile-first wellness companion for iOS and Android. Case study by Mickael Vasquez: product design, design system, 2.4M users, 4.9 App Store rating.",
  alternates: { canonical: "/projects/pulse-health" },
  openGraph: {
    title: "Pulse Health — Mobile wellness case study",
    description: "Product design and design system for a mobile-first wellness app.",
    url: "/projects/pulse-health",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
