/**
 * GA4 event tracking via GTM dataLayer.
 * All conversion events are pushed here and picked up by GTM → GA4.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    dataLayer?: Record<string, any>[];
  }
}

export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean>
) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event: eventName, ...params });
  }
}

// ─── Typed helpers for each conversion event ────────────────────

export function trackWhatsAppClick(pagePath: string, serviceType: string, locale: string) {
  trackEvent("whatsapp_click", { page_path: pagePath, service_type: serviceType, locale });
}

export function trackPhoneCallClick(pagePath: string, locale: string) {
  trackEvent("phone_call_click", { page_path: pagePath, locale });
}

export function trackFormSubmit(formType: string, locale: string, origin?: string, destination?: string) {
  trackEvent("form_submit", {
    form_type: formType,
    locale,
    ...(origin && { origin }),
    ...(destination && { destination }),
  });
}

export function trackMartinChatStart(pagePath: string, trigger: string, locale: string) {
  trackEvent("martin_chat_start", { page_path: pagePath, trigger, locale });
}

export function trackMartinWhatsAppTransfer(pagePath: string, messagesCount: number, locale: string) {
  trackEvent("martin_whatsapp_transfer", { page_path: pagePath, messages_count: messagesCount, locale });
}

export function trackFleetCardClick(aircraftName: string, aircraftType: string, locale: string) {
  trackEvent("fleet_card_click", { aircraft_name: aircraftName, aircraft_type: aircraftType, locale });
}

export function trackRouteCardClick(routeName: string, locale: string) {
  trackEvent("route_card_click", { route_name: routeName, locale });
}

export function trackBookingFormStep(step: number, pagePath: string) {
  trackEvent("booking_form_step", { step, page_path: pagePath });
}

export function trackCtaClick(ctaText: string, pagePath: string, section: string, locale: string) {
  trackEvent("cta_click", { cta_text: ctaText, page_path: pagePath, section, locale });
}

export function trackVideoPlay(videoTitle: string, pagePath: string) {
  trackEvent("video_play", { video_title: videoTitle, page_path: pagePath });
}

export function trackLanguageSwitch(fromLocale: string, toLocale: string, pagePath: string) {
  trackEvent("language_switch", { from_locale: fromLocale, to_locale: toLocale, page_path: pagePath });
}
