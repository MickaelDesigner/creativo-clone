import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { POSTS } from "../lib/posts";

export const runtime = "nodejs";

const fontBold = readFileSync(
  join(process.cwd(), "public/assets/fonts/77a1779342baf612-s.p.woff")
);
const fontRegular = readFileSync(
  join(process.cwd(), "public/assets/fonts/2c742133978d0b0d-s.p.woff")
);

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") ?? "";
  const post = POSTS.find((p) => p.slug === slug);

  const title = post?.title ?? "Mickael Vasquez";
  const category = post?.category ?? "Blog";
  const readTime = post?.readTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#141414",
          padding: "64px",
          fontFamily: "Noir",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid noise overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(134,67,251,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,0,85,0.08) 0%, transparent 40%)",
          }}
        />

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ff0055" }} />
          <span style={{ color: "#ff0055", fontSize: "18px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {category}
          </span>
          {readTime && (
            <>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "18px" }}>·</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "18px", fontWeight: 400 }}>{readTime}</span>
            </>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            position: "relative",
            paddingTop: "32px",
            paddingBottom: "32px",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 60 ? "56px" : "72px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom: brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "20px", fontWeight: 500, letterSpacing: "0.05em" }}>
            mickaelvasquez.tech
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#8643fb" }} />
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "16px", fontWeight: 400 }}>
              Diseño · Sistemas autónomos
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Noir", data: fontRegular, weight: 400, style: "normal" },
        { name: "Noir", data: fontBold, weight: 700, style: "normal" },
      ],
    }
  );
}
