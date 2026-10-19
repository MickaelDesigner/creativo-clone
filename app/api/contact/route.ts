import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const TO = "mickael.vc7@gmail.com";

// Must match the chips in app/components/ContactContent.tsx.
const SERVICES = ["UI/UX Design", "Web Development", "Brand Identity", "Product Engineering", "Other"] as const;
const BUDGETS = ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+"] as const;

const MIN_FILL_MS = 3000;
const SUBJECT_NAME_MAX = 80;

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  company: z.string().trim().max(120).optional(),
  service: z.enum(SERVICES).optional(),
  budget: z.union([z.enum(BUDGETS), z.literal("")]).optional(),
  message: z.string().trim().min(1).max(5000),
});

const GENERIC_BAD_REQUEST = { error: "Invalid request" };
const GENERIC_SERVER_ERROR = { error: "Something went wrong" };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function subjectSafe(value: string): string {
  return value.replace(/[\p{Cc}\p{Zl}\p{Zp}]+/gu, " ").trim().slice(0, SUBJECT_NAME_MAX);
}

/** Bots: honeypot filled, or form submitted faster than a human could. Pretend success. */
function looksLikeBot(raw: Record<string, unknown>, now: number): boolean {
  if (typeof raw.website === "string" && raw.website.trim() !== "") return true;
  if (typeof raw.ts === "number" && Number.isFinite(raw.ts) && now - raw.ts < MIN_FILL_MS) return true;
  return false;
}

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(GENERIC_BAD_REQUEST, { status: 400 });
  }

  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return NextResponse.json(GENERIC_BAD_REQUEST, { status: 400 });
  }

  if (looksLikeBot(raw as Record<string, unknown>, Date.now())) {
    console.warn("Contact route: bot signal, dropped without sending");
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(GENERIC_BAD_REQUEST, { status: 400 });
  }
  const { name, email, company, service, budget, message } = parsed.data;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Portafolio Contact <onboarding@resend.dev>",
      to: TO,
      replyTo: email,
      subject: `Nuevo contacto de ${subjectSafe(name)} — ${service ?? ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0a0a0a;color:#fff;border-radius:16px;">
          <h2 style="margin:0 0 24px;font-size:24px;color:#fff;">Nuevo mensaje de contacto</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;color:#999;width:130px;vertical-align:top;">Nombre</td><td style="padding:10px 0;color:#fff;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:10px 0;color:#999;vertical-align:top;">Email</td><td style="padding:10px 0;color:#fff;"><a href="mailto:${escapeHtml(email)}" style="color:#a855f7;">${escapeHtml(email)}</a></td></tr>
            ${company ? `<tr><td style="padding:10px 0;color:#999;vertical-align:top;">Empresa</td><td style="padding:10px 0;color:#fff;">${escapeHtml(company)}</td></tr>` : ""}
            ${service ? `<tr><td style="padding:10px 0;color:#999;vertical-align:top;">Servicio</td><td style="padding:10px 0;color:#fff;">${escapeHtml(service)}</td></tr>` : ""}
            ${budget ? `<tr><td style="padding:10px 0;color:#999;vertical-align:top;">Presupuesto</td><td style="padding:10px 0;color:#fff;">${escapeHtml(budget)}</td></tr>` : ""}
            <tr><td style="padding:10px 0;color:#999;vertical-align:top;">Mensaje</td><td style="padding:10px 0;color:#fff;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #222;margin:24px 0;" />
          <p style="margin:0;color:#555;font-size:12px;">Enviado desde mickaelvasquez.tech/contact</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json(GENERIC_SERVER_ERROR, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json(GENERIC_SERVER_ERROR, { status: 500 });
  }
}
