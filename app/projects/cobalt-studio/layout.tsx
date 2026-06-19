import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cobalt Studio — Brand identity case study by Mickael Vasquez",
  description:
    "A complete brand identity system for a contemporary creative practice — color palette, typography, applications. Case study by Mickael Vasquez.",
  alternates: { canonical: "/projects/cobalt-studio" },
  openGraph: {
    title: "Cobalt Studio — Brand identity case study",
    description: "Brand identity system: palette, typography, applications.",
    url: "/projects/cobalt-studio",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
