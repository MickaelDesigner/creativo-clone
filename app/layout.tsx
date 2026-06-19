import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL, SITE, SAME_AS } from "./lib/site";

const noir = localFont({
  variable: "--font-noir",
  src: [
    { path: "../public/assets/fonts/e4af272ccee01ff0-s.p.woff2", weight: "400", style: "normal" },
    { path: "../public/assets/fonts/2c742133978d0b0d-s.p.woff",  weight: "500", style: "normal" },
    { path: "../public/assets/fonts/f4a1dc55f1ad377f-s.p.woff",  weight: "600", style: "normal" },
    { path: "../public/assets/fonts/77a1779342baf612-s.p.woff",  weight: "700", style: "normal" },
  ],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#141414",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mickael Vasquez — Creative Tech Designer · Brand · UX · AI Systems",
    template: "%s · Mickael Vasquez",
  },
  description:
    "Mickael Vasquez — Creative Tech Designer building brand systems, AI-driven products and modern web experiences. UI/UX, branding, web development, no-code, animation. Open to new collaborations.",
  keywords: [
    "Mickael Vasquez",
    "MickaelDesigner",
    "Creative Tech Designer",
    "UI/UX Designer",
    "Brand Identity Designer",
    "Web Designer",
    "Front-end Developer",
    "Creative Director",
    "Product Designer",
    "AI Designer",
    "Design Systems",
    "No-code",
    "Next.js Developer",
    "Portfolio",
    "Diseñador",
    "Diseño Web",
  ],
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "es": "/es",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    url: SITE_URL,
    siteName: SITE.brand,
    title: "Mickael Vasquez — Creative Tech Designer",
    description:
      "Brand systems · UX · AI-driven products · Modern web experiences. Selected work and field notes by Mickael Vasquez.",
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "Mickael Vasquez — Creative Tech Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mickael Vasquez — Creative Tech Designer",
    description: "Brand systems · UX · AI · Web. Portfolio of Mickael Vasquez.",
    creator: SITE.twitterHandle,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/favicon.ico" },
  category: "Design Portfolio",
};

const JSON_LD_PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  alternateName: "MickaelDesigner",
  jobTitle: "Creative Tech Designer",
  description:
    "Creative Tech Designer building brand systems, AI-driven products and modern web experiences.",
  url: SITE_URL,
  email: `mailto:${SITE.email}`,
  image: `${SITE_URL}${SITE.ogImage}`,
  sameAs: SAME_AS,
  knowsAbout: [
    "UI/UX Design",
    "Brand Identity",
    "Web Development",
    "AI Systems",
    "Design Systems",
    "Front-end Engineering",
    "Product Design",
    "Animation",
  ],
};

const JSON_LD_WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.brand,
  url: SITE_URL,
  publisher: { "@type": "Person", name: SITE.name },
  inLanguage: ["en", "es"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${noir.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_PERSON) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_WEBSITE) }}
        />
      </head>
      <body className="bg-bg overflow-x-hidden min-h-screen">{children}</body>
    </html>
  );
}
