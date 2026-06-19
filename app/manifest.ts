import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mickael Vasquez — Creative Tech Designer",
    short_name: "Mickael Vasquez",
    description:
      "Creative Tech Designer — brand systems, AI-driven products and modern web experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#141414",
    theme_color: "#141414",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
