import type { Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

const legalContent: Record<string, { title: { es: string; en: string }; content: { es: string; en: string } }> = {
  terms: {
    title: { es: "Términos y Condiciones", en: "Terms & Conditions" },
    content: {
      es: `Última actualización: Abril 2026

1. SERVICIOS
Sky Ride Panamá ofrece servicios de transporte aéreo privado incluyendo vuelos chárter, paseos en helicóptero y asientos disponibles en vuelos compartidos. Todos los vuelos están sujetos a disponibilidad y condiciones meteorológicas.

2. RESERVAS Y PAGOS
Las reservas se confirman una vez recibido el pago total o el depósito acordado. Aceptamos tarjetas de crédito/débito (Visa, Mastercard), transferencia bancaria y Wompi. Los precios están sujetos a cambio sin previo aviso.

3. CANCELACIONES Y REEMBOLSOS
Cancelaciones con más de 48 horas de anticipación: reembolso completo. Cancelaciones entre 24-48 horas: 50% de reembolso. Cancelaciones con menos de 24 horas: sin reembolso. Cancelaciones por condiciones meteorológicas: reprogramación sin costo adicional o reembolso completo.

4. RESPONSABILIDAD
Sky Ride Panamá cumple con todas las regulaciones de la Dirección General de Aeronáutica Civil (DGAC) de Panamá. Nuestras aeronaves y pilotos cumplen con todos los requisitos de seguridad aplicables.

5. EQUIPAJE
El equipaje está sujeto a las restricciones de peso de cada aeronave. Se informará al pasajero sobre los límites de equipaje al momento de la reserva.

6. CONTACTO
Para cualquier consulta sobre estos términos, contáctenos en info@skyride.city o al +507 6840 0045.`,
      en: `Last updated: April 2026

1. SERVICES
Sky Ride Panama offers private air transport services including charter flights, helicopter rides, and available seats on shared flights. All flights are subject to availability and weather conditions.

2. BOOKINGS AND PAYMENTS
Bookings are confirmed upon receipt of full payment or agreed deposit. We accept credit/debit cards (Visa, Mastercard), bank transfer, and Wompi. Prices are subject to change without notice.

3. CANCELLATIONS AND REFUNDS
Cancellations more than 48 hours in advance: full refund. Cancellations 24-48 hours: 50% refund. Cancellations less than 24 hours: no refund. Weather-related cancellations: free rescheduling or full refund.

4. LIABILITY
Sky Ride Panama complies with all regulations of Panama's Directorate General of Civil Aviation (DGAC). Our aircraft and pilots meet all applicable safety requirements.

5. LUGGAGE
Luggage is subject to the weight restrictions of each aircraft. Passengers will be informed of luggage limits at the time of booking.

6. CONTACT
For any inquiries about these terms, contact us at info@skyride.city or +507 6840 0045.`,
    },
  },
  privacy: {
    title: { es: "Política de Privacidad", en: "Privacy Policy" },
    content: {
      es: `Última actualización: Abril 2026

1. INFORMACIÓN QUE RECOPILAMOS
Recopilamos información personal que usted nos proporciona directamente: nombre, correo electrónico, teléfono, origen y destino de vuelo. También recopilamos datos de uso del sitio web a través de Google Analytics y Microsoft Clarity.

2. USO DE LA INFORMACIÓN
Utilizamos su información para: procesar reservas de vuelos, enviar cotizaciones y confirmaciones, mejorar nuestros servicios, y comunicarnos con usted sobre sus vuelos.

3. COMPARTIR INFORMACIÓN
No vendemos ni compartimos su información personal con terceros, excepto cuando sea necesario para completar su reserva (operadores aéreos) o cuando la ley lo requiera.

4. COOKIES Y ANÁLISIS
Utilizamos cookies de Google Tag Manager, Google Analytics 4 y Microsoft Clarity para analizar el uso del sitio web. Puede desactivar las cookies en la configuración de su navegador.

5. SEGURIDAD
Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, alteración o destrucción.

6. SUS DERECHOS
Usted tiene derecho a acceder, corregir o eliminar su información personal. Contáctenos en info@skyride.city para ejercer estos derechos.

7. CONTACTO
Para consultas sobre privacidad: info@skyride.city | +507 6840 0045`,
      en: `Last updated: April 2026

1. INFORMATION WE COLLECT
We collect personal information that you provide directly: name, email, phone, flight origin and destination. We also collect website usage data through Google Analytics and Microsoft Clarity.

2. USE OF INFORMATION
We use your information to: process flight bookings, send quotes and confirmations, improve our services, and communicate with you about your flights.

3. SHARING INFORMATION
We do not sell or share your personal information with third parties, except when necessary to complete your booking (air operators) or when required by law.

4. COOKIES AND ANALYTICS
We use cookies from Google Tag Manager, Google Analytics 4, and Microsoft Clarity to analyze website usage. You can disable cookies in your browser settings.

5. SECURITY
We implement technical and organizational security measures to protect your personal information against unauthorized access, alteration, or destruction.

6. YOUR RIGHTS
You have the right to access, correct, or delete your personal information. Contact us at info@skyride.city to exercise these rights.

7. CONTACT
For privacy inquiries: info@skyride.city | +507 6840 0045`,
    },
  },
};

export function LegalPage({
  locale,
  pageId,
}: {
  locale: Locale;
  pageId: string;
}) {
  const data = legalContent[pageId];
  if (!data) return null;

  const pageUrl =
    locale === "en"
      ? `/en/${pageId === "terms" ? "terms-and-conditions" : "privacy-policy"}`
      : `/${pageId === "terms" ? "terminos-y-condiciones" : "politica-de-privacidad"}`;

  return (
    <div className="min-h-screen bg-[#f7f4ec]">
      <Header locale={locale} />
      <Breadcrumbs
        locale={locale}
        items={[{ name: data.title[locale], href: pageUrl }]}
      />

      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
        <h1 className="font-serif text-4xl text-slate-950 sm:text-5xl">
          {data.title[locale]}
        </h1>
        <div className="mt-10 space-y-4 whitespace-pre-line text-sm leading-7 text-slate-700">
          {data.content[locale]}
        </div>
      </section>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}
