import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Field notes on design, AI & web by Mickael Vasquez",
  description:
    "Essays and field notes from Mickael Vasquez, Creative Tech Designer. Topics: brand systems, AI products, design engineering, UX, modern web, animation.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Field notes by Mickael Vasquez",
    description:
      "Essays on brand systems, AI products, design engineering and modern web.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
