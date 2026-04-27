import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  phone: z.string().min(5).max(30).optional().or(z.literal("")),
  origin: z.string().max(120).optional().or(z.literal("")),
  destination: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10).max(2000),
  locale: z.enum(["es", "en"]).optional(),
  // Honeypot
  website: z.string().max(0).optional().or(z.literal("")),
});

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = "mg.skyride.city";
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@skyride.city";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || `noreply@${MAILGUN_DOMAIN}`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid form data" },
        { status: 400 },
      );
    }

    const { name, email, phone, origin, destination, message, locale, website } =
      parsed.data;

    // Honeypot trap
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!MAILGUN_API_KEY) {
      console.warn("MAILGUN_API_KEY not set — skipping email send");
      return NextResponse.json({
        ok: true,
        warning: "Email service not configured",
      });
    }

    const subject =
      locale === "en"
        ? `New quote request from ${name}`
        : `Nueva solicitud de cotización de ${name}`;

    const html = `
      <h2>${subject}</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      ${origin ? `<p><strong>Origin:</strong> ${escapeHtml(origin)}</p>` : ""}
      ${destination ? `<p><strong>Destination:</strong> ${escapeHtml(destination)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      <hr>
      <p style="color:#888;font-size:12px">Submitted via skyride.city (${locale ?? "es"})</p>
    `;

    const formData = new URLSearchParams();
    formData.append("from", `Sky Ride Website <${CONTACT_FROM_EMAIL}>`);
    formData.append("to", CONTACT_TO_EMAIL);
    formData.append("h:Reply-To", email);
    formData.append("subject", subject);
    formData.append("html", html);

    const credentials = Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64");

    const mgResponse = await fetch(
      `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      },
    );

    if (!mgResponse.ok) {
      const errText = await mgResponse.text();
      console.error("Mailgun error:", mgResponse.status, errText);
      return NextResponse.json(
        { ok: false, error: "Failed to send" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
