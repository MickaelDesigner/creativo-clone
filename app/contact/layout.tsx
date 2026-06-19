import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Start a project with Mickael Vasquez",
  description:
    "Get in touch with Mickael Vasquez, Creative Tech Designer. Brand systems, UX/UI, AI products and modern web experiences. Remote-first, worldwide. Response within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Start a project with Mickael Vasquez",
    description:
      "Brand systems, UX/UI, AI products and modern web experiences. Remote-first, worldwide.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
