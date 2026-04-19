import type { Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";

const faqData = {
  es: [
    {
      category: "Vuelos Chárter",
      questions: [
        { q: "¿Qué es un vuelo chárter?", a: "Un vuelo chárter es un vuelo privado donde usted alquila toda la aeronave. Elige su horario, destino y viaja solo con su grupo." },
        { q: "¿Cuánto cuesta un vuelo chárter?", a: "Los precios varían según destino, aeronave y número de pasajeros. Vuelos a Contadora desde $950, a San Blas desde $1,250, a Costa Rica desde $3,400. Contáctenos para una cotización personalizada." },
        { q: "¿Con cuánta anticipación debo reservar?", a: "Recomendamos reservar con al menos 48 horas de anticipación, aunque podemos organizar vuelos en 24 horas según disponibilidad." },
        { q: "¿Qué documentos necesito?", a: "Solo necesita una identificación válida (cédula o pasaporte). Para vuelos internacionales, se requiere pasaporte vigente." },
      ],
    },
    {
      category: "Paseos en Helicóptero",
      questions: [
        { q: "¿Cuánto cuesta un paseo en helicóptero?", a: "Los precios comienzan desde $350 por persona para vuelos de 15 minutos. Tours VIP y traslados tienen precios personalizados." },
        { q: "¿Es seguro volar en helicóptero?", a: "Absolutamente. Todos nuestros helicópteros cumplen con las regulaciones de la DGAC y nuestros pilotos tienen miles de horas de experiencia." },
        { q: "¿Cuántas personas pueden volar?", a: "Depende del helicóptero: Robinson R44 (3 pasajeros), R66 (4), Eurocopter AS350 B3 (5), EC130 B4 (6)." },
      ],
    },
    {
      category: "Asientos Disponibles",
      questions: [
        { q: "¿Qué son los asientos disponibles?", a: "Son asientos individuales en vuelos privados compartidos. Usted paga por asiento, no por la aeronave completa, lo que reduce significativamente el costo." },
        { q: "¿A qué destinos hay asientos disponibles?", a: "Principalmente a Contadora y San Blas. La disponibilidad varía según la temporada." },
      ],
    },
    {
      category: "Pagos y Reservas",
      questions: [
        { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos tarjetas de crédito/débito (Visa, Mastercard), transferencia bancaria y Wompi." },
        { q: "¿Cuál es la política de cancelación?", a: "Las cancelaciones con más de 48 horas de anticipación reciben reembolso completo. Para más detalles, consulte nuestros términos y condiciones." },
      ],
    },
  ],
  en: [
    {
      category: "Charter Flights",
      questions: [
        { q: "What is a charter flight?", a: "A charter flight is a private flight where you rent the entire aircraft. You choose your schedule, destination, and travel only with your group." },
        { q: "How much does a charter flight cost?", a: "Prices vary by destination, aircraft, and number of passengers. Flights to Contadora from $950, to San Blas from $1,250, to Costa Rica from $3,400. Contact us for a personalized quote." },
        { q: "How far in advance should I book?", a: "We recommend booking at least 48 hours in advance, though we can organize flights in 24 hours based on availability." },
        { q: "What documents do I need?", a: "You only need a valid ID (national ID or passport). For international flights, a valid passport is required." },
      ],
    },
    {
      category: "Helicopter Rides",
      questions: [
        { q: "How much does a helicopter ride cost?", a: "Prices start from $350 per person for 15-minute flights. VIP tours and transfers have custom pricing." },
        { q: "Is it safe to fly in a helicopter?", a: "Absolutely. All our helicopters comply with DGAC regulations and our pilots have thousands of hours of experience." },
        { q: "How many people can fly?", a: "It depends on the helicopter: Robinson R44 (3 passengers), R66 (4), Eurocopter AS350 B3 (5), EC130 B4 (6)." },
      ],
    },
    {
      category: "Available Seats",
      questions: [
        { q: "What are available seats?", a: "Individual seats on shared private flights. You pay per seat, not for the entire aircraft, which significantly reduces cost." },
        { q: "What destinations have available seats?", a: "Mainly Contadora and San Blas. Availability varies by season." },
      ],
    },
    {
      category: "Payments & Bookings",
      questions: [
        { q: "What payment methods do you accept?", a: "We accept credit/debit cards (Visa, Mastercard), bank transfer, and Wompi." },
        { q: "What is the cancellation policy?", a: "Cancellations more than 48 hours in advance receive a full refund. For more details, see our terms and conditions." },
      ],
    },
  ],
};

export function FAQPage({ locale }: { locale: Locale }) {
  const data = faqData[locale];
  const pageUrl = locale === "en" ? "/en/faq" : "/preguntas-frecuentes";
  const title = locale === "es" ? "Preguntas Frecuentes" : "FAQ";

  const allQuestions = data.flatMap((c) =>
    c.questions.map((q) => ({ question: q.q, answer: q.a })),
  );

  return (
    <div className="min-h-screen bg-[#f7f4ec]">
      <Header locale={locale} />
      <Breadcrumbs locale={locale} items={[{ name: title, href: pageUrl }]} />
      <JsonLd data={faqSchema(allQuestions)} />

      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
        <h1 className="font-serif text-4xl text-slate-950 sm:text-5xl">
          {locale === "es" ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          {locale === "es"
            ? "Respuestas a las preguntas más comunes sobre nuestros servicios."
            : "Answers to the most common questions about our services."}
        </p>

        <div className="mt-12 space-y-12">
          {data.map((category) => (
            <div key={category.category}>
              <h2 className="font-serif text-2xl text-slate-950">
                {category.category}
              </h2>
              <div className="mt-4 space-y-3">
                {category.questions.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl border border-slate-200 bg-white"
                  >
                    <summary className="cursor-pointer p-5 text-sm font-semibold text-slate-900">
                      {item.q}
                    </summary>
                    <p className="border-t border-slate-100 p-5 text-sm leading-7 text-slate-600">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}
