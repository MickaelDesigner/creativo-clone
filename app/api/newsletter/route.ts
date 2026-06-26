import { NextRequest, NextResponse } from "next/server";

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export async function POST(req: NextRequest) {
  try {
    const { email, locale } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const res = await fetch(`${SB_URL}/rest/v1/newsletter`, {
      method: "POST",
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        locale: locale ?? "en",
        source: "mickaelvasquez.tech/blog",
      }),
    });

    if (res.status === 409) {
      // Already subscribed
      return NextResponse.json({ ok: true, message: "already-subscribed" });
    }

    if (!res.ok) {
      const text = await res.text();
      console.error("Supabase newsletter insert error:", res.status, text);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Newsletter route error:", msg);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
