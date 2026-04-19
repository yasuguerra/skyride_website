import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/chat
 *
 * Conversational endpoint for Martin — the Sky Ride AI booking assistant.
 * Uses Google Vertex AI (Gemini) via the REST API with Application Default
 * Credentials (ADC), which are automatically available on Cloud Run.
 *
 * Request body: { messages: { role: "user"|"model", text: string }[], locale: "es"|"en" }
 * Response:     { reply: string }
 */

const PROJECT_ID = process.env.VERTEX_AI_PROJECT || process.env.GOOGLE_CLOUD_PROJECT || "";
const LOCATION = process.env.VERTEX_AI_LOCATION || "us-central1";
const MODEL = process.env.VERTEX_AI_MODEL || "gemini-2.0-flash";

const SYSTEM_PROMPT_ES = `Eres Martin, el asistente de reservas de Sky Ride Panama. Tu objetivo es ayudar al usuario a cotizar y reservar vuelos privados.

REGLAS:
- Responde siempre en español de manera profesional, amigable y concisa.
- Pregunta: destino, número de pasajeros, fecha deseada y tipo de servicio (charter, helicóptero, asiento disponible).
- Cuando tengas suficiente información, presenta una cotización estimada con la aeronave recomendada.
- Si el usuario pregunta algo fuera de aviación privada, redirige amablemente al tema.
- Nunca inventes precios exactos. Usa rangos basados en estos datos reales:
  • Panamá → Contadora: $950–$3,800 (según aeronave, 20 min)
  • Panamá → San Blas: $1,250–$3,800 (30 min)
  • Panamá → Bocas del Toro: $2,200–$3,800 (1 hora)
  • Panamá → Costa Rica: $3,200–$5,500 (1.5–2 horas)
  • Tour helicóptero ciudad: desde $350/persona (15–40 min)
- Para confirmar reserva, indica que un ejecutivo de Sky Ride contactará por WhatsApp.
- Flota: Cessna 206, Piper Azteca, Piper Cherokee, Cessna 172, Daher Kodiak, Cessna Grand Caravan, King Air F90, King Air 200, Robinson R44, Robinson R66, Eurocopter AS350 B3, Eurocopter EC130 B4.
- WhatsApp: +507 6840 0045`;

const SYSTEM_PROMPT_EN = `You are Martin, the booking assistant for Sky Ride Panama. Your goal is to help users quote and book private flights.

RULES:
- Always respond in English, professionally, friendly, and concisely.
- Ask for: destination, number of passengers, desired date, and service type (charter, helicopter, available seat).
- When you have enough info, present an estimated quote with the recommended aircraft.
- If the user asks about something outside private aviation, politely redirect.
- Never make up exact prices. Use ranges based on these real data points:
  • Panama → Contadora: $950–$3,800 (depending on aircraft, 20 min)
  • Panama → San Blas: $1,250–$3,800 (30 min)
  • Panama → Bocas del Toro: $2,200–$3,800 (1 hour)
  • Panama → Costa Rica: $3,200–$5,500 (1.5–2 hours)
  • Helicopter city tour: from $350/person (15–40 min)
- To confirm a booking, tell the user a Sky Ride executive will reach out via WhatsApp.
- Fleet: Cessna 206, Piper Azteca, Piper Cherokee, Cessna 172, Daher Kodiak, Cessna Grand Caravan, King Air F90, King Air 200, Robinson R44, Robinson R66, Eurocopter AS350 B3, Eurocopter EC130 B4.
- WhatsApp: +507 6840 0045`;

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

interface RequestBody {
  messages: ChatMessage[];
  locale: "es" | "en";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RequestBody;
    const { messages, locale } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages required" }, { status: 400 });
    }

    // Cap conversation length to prevent abuse
    const trimmed = messages.slice(-20);

    const systemPrompt = locale === "en" ? SYSTEM_PROMPT_EN : SYSTEM_PROMPT_ES;

    // Build Vertex AI request
    const contents = trimmed.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const vertexPayload = {
      contents,
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
        topP: 0.9,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      ],
    };

    // On Cloud Run, ADC provides the token automatically via metadata server.
    // For local dev, use `gcloud auth application-default login`.
    const accessToken = await getAccessToken();

    const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}:generateContent`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(vertexPayload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Vertex AI error:", response.status, errText);
      return NextResponse.json(
        { error: "AI service unavailable" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      (locale === "es"
        ? "Lo siento, no pude procesar tu solicitud. Por favor intenta de nuevo."
        : "Sorry, I couldn't process your request. Please try again.");

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Get an access token using Application Default Credentials.
 * On Cloud Run this hits the metadata server. Locally it uses
 * the token from `gcloud auth application-default login`.
 */
async function getAccessToken(): Promise<string> {
  // 1. Check for explicit API key (for local dev convenience)
  if (process.env.VERTEX_AI_API_KEY) {
    return process.env.VERTEX_AI_API_KEY;
  }

  // 2. Cloud Run metadata server (ADC)
  try {
    const res = await fetch(
      "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token",
      { headers: { "Metadata-Flavor": "Google" } }
    );
    if (res.ok) {
      const data = await res.json();
      return data.access_token;
    }
  } catch {
    // Not on GCP — fall through to local ADC
  }

  // 3. Local ADC via gcloud
  try {
    const { execSync } = await import("child_process");
    const token = execSync("gcloud auth application-default print-access-token", {
      encoding: "utf-8",
    }).trim();
    return token;
  } catch {
    throw new Error(
      "No Vertex AI credentials found. Run `gcloud auth application-default login` or set VERTEX_AI_API_KEY."
    );
  }
}
