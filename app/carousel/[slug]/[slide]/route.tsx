import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { POSTS, fetchPostBySlug } from "../../../lib/posts";

export const runtime = "nodejs";

const fontBold = readFileSync(join(process.cwd(), "public/assets/fonts/77a1779342baf612-s.p.woff"));
const fontRegular = readFileSync(join(process.cwd(), "public/assets/fonts/2c742133978d0b0d-s.p.woff"));

const BRAND_PURPLE = "#8643fb";
const BRAND_PINK = "#ff0055";
const DARK_BG = "#141414";
const CARD_BG = "#1a1a1a";

function extractKeyPoints(bodyHtml: string): string[] {
  const h2s = [...bodyHtml.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").trim()
  );
  const h3s = [...bodyHtml.matchAll(/<h3[^>]*>(.*?)<\/h3>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").trim()
  );
  const all = [...h2s, ...h3s].filter((t) => t.length > 0 && t.length < 80);
  return all.slice(0, 8);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string; slide: string }> }
) {
  const { slug, slide: slideStr } = await params;
  const slide = parseInt(slideStr, 10);

  if (isNaN(slide) || slide < 1 || slide > 6) {
    return new Response("Slide must be 1–6", { status: 400 });
  }

  const post = POSTS.find((p) => p.slug === slug) ?? (await fetchPostBySlug(slug));
  if (!post) return new Response("Not found", { status: 404 });

  const keyPoints = post.body ? extractKeyPoints(post.body) : [];

  const opts = {
    width: 1080,
    height: 1080,
    fonts: [
      { name: "Noir", data: fontRegular, weight: 400 as const, style: "normal" as const },
      { name: "Noir", data: fontBold, weight: 700 as const, style: "normal" as const },
    ],
  };

  /* ── Slide 1: Cover (título + autor) ── */
  if (slide === 1) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "1080px",
            height: "1080px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: DARK_BG,
            padding: "80px",
            fontFamily: "Noir",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(circle at 80% 20%, ${BRAND_PURPLE}22 0%, transparent 55%), radial-gradient(circle at 15% 80%, ${BRAND_PINK}14 0%, transparent 45%)`,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: BRAND_PINK }} />
            <span style={{ color: BRAND_PINK, fontSize: "20px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {post.category}
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "20px" }}>·</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "20px" }}>{post.readTime}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative", flex: 1, justifyContent: "center" }}>
            <h1 style={{ fontSize: post.title.length > 50 ? "62px" : "76px", fontWeight: 700, color: "#ffffff", lineHeight: 1.05, letterSpacing: "-0.03em", margin: 0 }}>
              {post.title}
            </h1>
            <p style={{ fontSize: "28px", color: "rgba(255,255,255,0.65)", lineHeight: 1.5, margin: 0, maxWidth: "820px" }}>
              {post.excerpt}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "28px" }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "22px", fontWeight: 500 }}>mickaelvasquez.tech</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: BRAND_PURPLE }} />
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "18px" }}>@MickaelDesigner</span>
            </div>
          </div>
        </div>
      ),
      opts
    );
  }

  /* ── Slides 2–5: Key points ── */
  if (slide >= 2 && slide <= 5) {
    const pointIdx = slide - 2;
    const point = keyPoints[pointIdx];
    const totalPoints = Math.min(keyPoints.length, 4);
    const dotRow = Array.from({ length: totalPoints }, (_, i) => i);

    return new ImageResponse(
      (
        <div
          style={{
            width: "1080px",
            height: "1080px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: DARK_BG,
            padding: "80px",
            fontFamily: "Noir",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(circle at 90% 10%, ${BRAND_PURPLE}18 0%, transparent 50%)`,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "18px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {post.category}
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              {dotRow.map((i) => (
                <div
                  key={i}
                  style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: i === pointIdx ? BRAND_PURPLE : "rgba(255,255,255,0.2)" }}
                />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", position: "relative" }}>
            <div style={{ width: "60px", height: "4px", backgroundColor: BRAND_PURPLE, marginBottom: "40px" }} />
            {point ? (
              <h2 style={{ fontSize: point.length > 60 ? "58px" : "72px", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.025em", margin: 0 }}>
                {point}
              </h2>
            ) : (
              <p style={{ fontSize: "36px", color: "rgba(255,255,255,0.4)", margin: 0 }}>…</p>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "28px" }}>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "18px" }}>mickaelvasquez.tech</span>
            <span style={{ color: BRAND_PURPLE, fontSize: "18px", fontWeight: 600 }}>{slide}/6</span>
          </div>
        </div>
      ),
      opts
    );
  }

  /* ── Slide 6: CTA ── */
  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1080px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: BRAND_PURPLE,
          fontFamily: "Noir",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 30% 70%, rgba(255,0,85,0.25) 0%, transparent 55%), radial-gradient(circle at 70% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px", textAlign: "center", position: "relative", padding: "0 80px" }}>
          <p style={{ fontSize: "24px", color: "rgba(255,255,255,0.8)", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>
            Artículo completo en
          </p>
          <h2 style={{ fontSize: "64px", fontWeight: 700, color: "#ffffff", margin: 0, lineHeight: 1 }}>
            mickaelvasquez.tech
          </h2>
          <div style={{ width: "80px", height: "3px", backgroundColor: "rgba(255,255,255,0.5)" }} />
          <p style={{ fontSize: "28px", color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.5, maxWidth: "800px" }}>
            {post.title}
          </p>
          <div
            style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "16px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "50px", padding: "16px 40px" }}
          >
            <span style={{ color: "#ffffff", fontSize: "26px", fontWeight: 600 }}>@MickaelDesigner</span>
          </div>
        </div>
      </div>
    ),
    opts
  );
}
