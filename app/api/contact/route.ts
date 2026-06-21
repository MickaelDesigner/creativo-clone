import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO = "hola@mickaelvasquez.tech";

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, service, budget, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from:    "Mickael Vasquez <hola@mickaelvasquez.tech>",
      to:      TO,
      replyTo: email,
      subject: `Nuevo contacto de ${name} — ${service ?? ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0a0a0a;color:#fff;border-radius:16px;">
          <h2 style="margin:0 0 24px;font-size:24px;color:#fff;">Nuevo mensaje de contacto</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;color:#999;width:130px;vertical-align:top;">Nombre</td><td style="padding:10px 0;color:#fff;">${name}</td></tr>
            <tr><td style="padding:10px 0;color:#999;vertical-align:top;">Email</td><td style="padding:10px 0;color:#fff;"><a href="mailto:${email}" style="color:#a855f7;">${email}</a></td></tr>
            ${company ? `<tr><td style="padding:10px 0;color:#999;vertical-align:top;">Empresa</td><td style="padding:10px 0;color:#fff;">${company}</td></tr>` : ""}
            ${service ? `<tr><td style="padding:10px 0;color:#999;vertical-align:top;">Servicio</td><td style="padding:10px 0;color:#fff;">${service}</td></tr>` : ""}
            ${budget  ? `<tr><td style="padding:10px 0;color:#999;vertical-align:top;">Presupuesto</td><td style="padding:10px 0;color:#fff;">${budget}</td></tr>`  : ""}
            <tr><td style="padding:10px 0;color:#999;vertical-align:top;">Mensaje</td><td style="padding:10px 0;color:#fff;white-space:pre-wrap;">${message}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #222;margin:24px 0;" />
          <p style="margin:0;color:#555;font-size:12px;">Enviado desde mickaelvasquez.tech/contact</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Failed to send email", detail: (error as { message?: string }).message ?? String(error) },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Contact route error:", msg);
    return NextResponse.json({ error: "Server error", detail: msg }, { status: 500 });
  }
}
