"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { MartinChat } from "@/components/ui/MartinChat";
import { trackMartinChatStart } from "@/lib/analytics";

const DWELL_TIME_MS = 15_000; // 15 seconds — premium sites need faster engagement

const dwellPrompts = {
  es: "¿No sabes qué aeronave necesitas? Te recomiendo la mejor opción en segundos.",
  en: "Not sure which aircraft fits your group? I'll recommend the best option in seconds.",
};

const triggerLabels = {
  es: "Concierge de vuelo",
  en: "Flight Concierge",
};

export function FloatingMartin({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [autoTriggered, setAutoTriggered] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // Dwell-time auto-trigger: after 30s with no CTA click, show prompt bubble
  useEffect(() => {
    if (autoTriggered || open) return;

    const timer = setTimeout(() => {
      setShowPrompt(true);
      setAutoTriggered(true);
      trackMartinChatStart(pathname, "auto_dwell", locale);
    }, DWELL_TIME_MS);

    return () => clearTimeout(timer);
  }, [autoTriggered, open, pathname, locale]);

  // Dismiss prompt when clicking anywhere else
  useEffect(() => {
    if (!showPrompt) return;
    const dismiss = () => setShowPrompt(false);
    const timer = setTimeout(dismiss, 8000); // auto-dismiss after 8s
    return () => clearTimeout(timer);
  }, [showPrompt]);

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3 lg:bottom-6">
      {/* Prompt bubble */}
      {showPrompt && !open && (
        <button
          onClick={() => {
            setOpen(true);
            setShowPrompt(false);
          }}
          className="max-w-[260px] animate-fade-in rounded-2xl rounded-br-sm border border-slate-200 bg-white p-4 text-left text-sm leading-relaxed text-slate-700 shadow-lg"
        >
          {dwellPrompts[locale]}
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={locale === "es" ? "Chat con Martin" : "Chat with Martin"}
          onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
          className="w-[340px] animate-slide-up sm:w-[380px]"
        >
          <div className="mb-2 flex justify-end">
            <button
              onClick={() => setOpen(false)}
              aria-label={locale === "es" ? "Cerrar chat" : "Close chat"}
              className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-300"
            >
              ✕
            </button>
          </div>
          <MartinChat locale={locale} />
        </div>
      )}

      {/* Toggle button — labeled pill with concierge role */}
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
            setShowPrompt(false);
            if (!autoTriggered) {
              trackMartinChatStart(pathname, "manual", locale);
            }
          }}
          className="flex items-center gap-2.5 rounded-full bg-[#152c46] py-3 pl-4 pr-5 text-sm font-semibold text-white shadow-xl transition hover:scale-105 hover:bg-[#1a3350]"
          aria-label={locale === "es" ? "Hablar con Martin" : "Chat with Martin"}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#20d1b3] text-xs font-bold">M</span>
          <span className="hidden sm:inline">{triggerLabels[locale]}</span>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
        </button>
      )}
    </div>
  );
}
