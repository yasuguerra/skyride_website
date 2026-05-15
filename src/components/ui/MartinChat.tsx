"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { trackMartinChatStart } from "@/lib/analytics";

interface Message {
  role: "user" | "model";
  text: string;
}

const WHATSAPP_HREF_ES = "https://wa.me/15557298766?text=Hola%2C%20necesito%20ayuda%20con%20un%20vuelo";
const WHATSAPP_HREF_EN = "https://wa.me/15557298766?text=Hi%2C%20I%20need%20help%20with%20a%20flight";

const t = {
  es: {
    placeholder: "Escribe tu destino, fecha y número de pasajeros...",
    send: "Enviar",
    greeting:
      "¡Hola! Soy Martin, concierge senior de Sky Ride. Dime tu destino, fecha y número de pasajeros — te doy una cotización en menos de un minuto.",
    error: "Error al conectar. Intenta de nuevo.",
    thinking: "Martin está pensando...",
    subtitle: "Concierge de vuelo · En línea",
    whatsappFallback: "¿Prefiere WhatsApp?",
    whatsappHref: WHATSAPP_HREF_ES,
  },
  en: {
    placeholder: "Type your destination, date, and number of passengers...",
    send: "Send",
    greeting:
      "Hi! I'm Martin, Sky Ride's senior concierge. Tell me your destination, date, and party size — I'll have a quote in under a minute.",
    error: "Connection error. Please try again.",
    thinking: "Martin is thinking...",
    subtitle: "Flight Concierge · Online",
    whatsappFallback: "Prefer WhatsApp?",
    whatsappHref: WHATSAPP_HREF_EN,
  },
};

export function MartinChat({ locale }: { locale: Locale }) {
  const copy = t[locale] || t.es;
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: copy.greeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    if (!started) {
      trackMartinChatStart(pathname, "user_message", locale);
      setStarted(true);
    }

    const userMsg: Message = { role: "user", text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, text: m.text })),
          locale,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "model", text: copy.error }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[480px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 bg-[#152c46] px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#20d1b3] text-sm font-bold text-white">
          M
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Martin</p>
          <p className="text-xs text-slate-400">{copy.subtitle}</p>
        </div>
        <div className="ml-auto flex h-2 w-2 rounded-full bg-emerald-400" />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4" aria-live="polite" aria-relevant="additions">
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#20d1b3] text-white"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-slate-100 px-4 py-2.5 text-sm text-slate-500">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce">•</span>
                  <span className="animate-bounce [animation-delay:0.1s]">•</span>
                  <span className="animate-bounce [animation-delay:0.2s]">•</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp fallback */}
      <div className="border-t border-slate-100 px-4 py-2 text-center">
        <a
          href={copy.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-[#25D366] hover:underline"
        >
          {copy.whatsappFallback} →
        </a>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-slate-100 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={copy.placeholder}
            disabled={loading}
            className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-[#20d1b3] focus:ring-1 focus:ring-[#20d1b3]/30 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-full bg-[#20d1b3] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3edcc2] disabled:opacity-50"
          >
            {copy.send}
          </button>
        </div>
      </form>
    </div>
  );
}
