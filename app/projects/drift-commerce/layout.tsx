import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drift Commerce — No-code e-commerce case study by Mickael Vasquez",
  description:
    "A no-code storefront stack built in 6 weeks for a direct-to-consumer brand. Case study by Mickael Vasquez: +412% sessions, $8.7M GMV, 12 markets.",
  alternates: { canonical: "/projects/drift-commerce" },
  openGraph: {
    title: "Drift Commerce — No-code e-commerce case study",
    description: "No-code storefront stack for a direct-to-consumer brand.",
    url: "/projects/drift-commerce",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
