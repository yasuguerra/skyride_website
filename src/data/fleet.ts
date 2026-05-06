export interface Aircraft {
  id: string;
  slug: string;
  name: string;
  type: "airplane" | "helicopter";
  passengers: number;
  description: { es: string; en: string };
  specs: {
    range?: string;
    speed?: string;
    altitude?: string;
    engines?: string;
  };
  image: string;
  gallery?: string[];
  highlight?: { es: string; en: string };
  priceFrom?: { es: string; en: string };
  routes: string[];
}

export const fleet: Aircraft[] = [
  {
    id: "cessna-206",
    slug: "cessna-206-5-pasajeros",
    name: "Cessna 206",
    type: "airplane",
    passengers: 5,
    description: {
      es: "Avión monomotor versátil, ideal para vuelos cortos y medianos. Excelente para traslados a islas y destinos cercanos en Panamá.",
      en: "Versatile single-engine aircraft, ideal for short and medium flights. Excellent for island transfers and nearby destinations in Panama.",
    },
    specs: { range: "1,300 km", speed: "278 km/h", altitude: "15,700 ft", engines: "1 × Continental IO-520" },
    image: "/images/fleet/cessna-206.jpg",
    priceFrom: { es: "Desde $514", en: "From $514" },
    routes: ["panama-contadora", "panama-san-blas", "panama-bocas-del-toro"],
  },
  {
    id: "piper-azteca",
    slug: "piper-azteca-5-pasajeros",
    name: "Piper Azteca",
    type: "airplane",
    passengers: 5,
    description: {
      es: "Bimotor confiable para vuelos regionales. La seguridad de dos motores para rutas sobre agua y montaña.",
      en: "Reliable twin-engine for regional flights. The safety of two engines for overwater and mountain routes.",
    },
    specs: { range: "1,820 km", speed: "330 km/h", altitude: "23,500 ft", engines: "2 × Lycoming IO-540" },
    image: "/images/fleet/piper-azteca.jpg",
    priceFrom: { es: "Desde $674", en: "From $674" },
    routes: ["panama-contadora", "panama-san-blas", "panama-bocas-del-toro"],
  },
  {
    id: "piper-saratoga",
    slug: "piper-saratoga-5-pasajeros",
    name: "Piper Saratoga",
    type: "airplane",
    passengers: 5,
    description: {
      es: "Monomotor de alto rendimiento con cabina amplia. Confort premium para grupos pequeños.",
      en: "High-performance single-engine with a spacious cabin. Premium comfort for small groups.",
    },
    specs: { range: "1,700 km", speed: "296 km/h", altitude: "20,000 ft" },
    image: "/images/fleet/piper-saratoga.jpg",
    highlight: {
      es: "El Piper Saratoga es el favorito de viajeros que buscan vuelos chárter privados en Panamá sin sacrificar comodidad ni velocidad. Con una velocidad de crucero de 296 km/h y un alcance de 1,700 km, conecta Ciudad de Panamá con Contadora, San Blas, Bocas del Toro y otros destinos remotos en cuestión de minutos. Su cabina amplia y silenciosa acomoda hasta 5 pasajeros con equipaje de mano, convirtiendo cada trayecto en una experiencia premium accesible. La opción inteligente para grupos pequeños, escapadas de fin de semana y viajes de negocios.",
      en: "The Piper Saratoga is the go-to choice for travelers seeking private charter flights in Panama without sacrificing comfort or speed. Cruising at 296 km/h with a 1,700 km range, it connects Panama City to Contadora, San Blas, Bocas del Toro, and other remote destinations in minutes. Its spacious, quiet cabin comfortably seats up to 5 passengers with carry-on luggage, turning every flight into an accessible luxury experience. The smart pick for small groups, weekend getaways, and business travel.",
    },
    gallery: [
      "/images/fleet/Saratoga%20Conta.jpg",
      "/images/fleet/Saratoga%20Int%201.jpeg",
      "/images/fleet/Saratoga%20Int%202.jpg",
    ],
    priceFrom: { es: "Desde $770", en: "From $770" },
    routes: ["panama-contadora", "panama-san-blas"],
  },
  {
    id: "piper-cherokee",
    slug: "piper-cherokee-3-pasajeros",
    name: "Piper Cherokee",
    type: "airplane",
    passengers: 3,
    description: {
      es: "Avión compacto perfecto para parejas y grupos pequeños. Económico y confiable.",
      en: "Compact aircraft perfect for couples and small groups. Affordable and reliable.",
    },
    specs: { range: "1,100 km", speed: "220 km/h", altitude: "14,000 ft" },
    image: "/images/fleet/piper-cherokee.jpg",
    priceFrom: { es: "Desde $398", en: "From $398" },
    routes: ["panama-contadora"],
  },
  {
    id: "cessna-172",
    slug: "cessna-172-hasta-3-pasajeros",
    name: "Cessna 172",
    type: "airplane",
    passengers: 3,
    description: {
      es: "El avión más popular del mundo. Ideal para vuelos cortos panorámicos y traslados ligeros.",
      en: "The world's most popular aircraft. Ideal for short scenic flights and light transfers.",
    },
    specs: { range: "1,185 km", speed: "226 km/h", altitude: "14,000 ft" },
    image: "/images/fleet/cessna-172.jpg",
    priceFrom: { es: "Desde $402", en: "From $402" },
    routes: ["panama-contadora"],
  },
  {
    id: "daher-kodiak",
    slug: "daher-kodiak-hasta-9-pasajeros",
    name: "Daher Kodiak 100",
    type: "airplane",
    passengers: 9,
    description: {
      es: "Turbopropulsor robusto diseñado para pistas cortas y destinos remotos. La mejor opción para San Blas y Bocas del Toro.",
      en: "Rugged turboprop designed for short runways and remote destinations. The best choice for San Blas and Bocas del Toro.",
    },
    specs: { range: "2,224 km", speed: "338 km/h", altitude: "25,000 ft", engines: "1 × PT6A-34AG" },
    image: "/images/fleet/Kkodiak%20SK.jpg",
    highlight: {
      es: "El Daher Kodiak 100 es la aeronave definitiva para explorar los destinos más remotos de Panamá. Su motor turbohélice PT6A-34AG y su capacidad para operar en pistas de tierra cortas lo convierten en el único avión privado capaz de llevar a 9 pasajeros directamente a las playas vírgenes de San Blas o a las costas tropicales de Bocas del Toro sin escalas. Con una velocidad de crucero de 338 km/h y un alcance de 2,224 km, combina la robustez de una aeronave de trabajo con el confort de un vuelo privado premium. Si buscas aventura sin sacrificar comodidad, el Kodiak es tu aeronave.",
      en: "The Daher Kodiak 100 is the ultimate aircraft for reaching Panama's most remote destinations. Its PT6A-34AG turboprop engine and ability to land on short dirt strips make it the only private aircraft capable of carrying 9 passengers directly to the untouched beaches of San Blas or the tropical shores of Bocas del Toro — no connections. Cruising at 338 km/h with a 2,224 km range, it blends the toughness of a workhorse aircraft with the comfort of a premium private flight. If you want adventure without sacrificing comfort, the Kodiak is your aircraft.",
    },
    gallery: [
      "/images/fleet/Kkodiak%20SK.jpg",
      "/images/fleet/Kodiak%20Interior%201.jpg",
      "/images/fleet/Kodiak%20Interior%202.jpg",
      "/images/fleet/Kodiak%20Perfil.png",
    ],
    priceFrom: { es: "Desde $1,391", en: "From $1,391" },
    routes: ["panama-san-blas", "panama-bocas-del-toro", "panama-contadora"],
  },
  {
    id: "cessna-caravan",
    slug: "cessna-grand-caravan-12-pasajeros",
    name: "Cessna Grand Caravan",
    type: "airplane",
    passengers: 12,
    description: {
      es: "El caballo de trabajo de la aviación regional. Capacidad para grupos grandes con alcance y velocidad superiores.",
      en: "The workhorse of regional aviation. Capacity for large groups with superior range and speed.",
    },
    specs: { range: "1,982 km", speed: "340 km/h", altitude: "25,000 ft", engines: "1 × PT6A-140" },
    image: "/images/fleet/cessna-caravan.jpg",
    priceFrom: { es: "Desde $2,408", en: "From $2,408" },
    routes: ["panama-contadora", "panama-san-blas", "panama-costa-rica", "panama-bocas-del-toro"],
  },
  {
    id: "king-air-f90",
    slug: "king-air-f90-6-pasajeros",
    name: "King Air F90",
    type: "airplane",
    passengers: 6,
    description: {
      es: "Bimotor turbopropulsor ejecutivo. Cabina presurizada para vuelos de negocios de largo alcance.",
      en: "Executive twin turboprop. Pressurized cabin for long-range business flights.",
    },
    specs: { range: "2,232 km", speed: "500 km/h", altitude: "31,000 ft", engines: "2 × PT6A-135" },
    image: "/images/fleet/king-air-f90.png",
    priceFrom: { es: "Desde $1,798", en: "From $1,798" },
    routes: ["panama-costa-rica", "panama-medellin"],
  },
  {
    id: "king-air-200",
    slug: "king-air-200-hasta-9-pasajeros",
    name: "King Air 200",
    type: "airplane",
    passengers: 8,
    description: {
      es: "La referencia en aviación ejecutiva regional. Dos motores, cabina presurizada y autonomía para rutas internacionales.",
      en: "The benchmark in regional executive aviation. Twin engines, pressurized cabin, and range for international routes.",
    },
    specs: { range: "3,338 km", speed: "536 km/h", altitude: "35,000 ft", engines: "2 × PT6A-42" },
    image: "/images/fleet/king-air-200.png",
    priceFrom: { es: "Desde $2,183", en: "From $2,183" },
    routes: ["panama-costa-rica", "panama-medellin", "panama-miami", "panama-dominican-republic"],
  },
  {
    id: "robinson-r44",
    slug: "robinson-r44-3-pasajeros",
    name: "Robinson R44",
    type: "helicopter",
    passengers: 3,
    description: {
      es: "Helicóptero ligero ideal para paseos panorámicos sobre la Ciudad de Panamá. Experiencia íntima y accesible.",
      en: "Light helicopter ideal for scenic tours over Panama City. Intimate and accessible experience.",
    },
    specs: { range: "563 km", speed: "210 km/h", altitude: "14,000 ft", engines: "1 × Lycoming IO-540" },
    image: "/images/fleet/robinson-r44.jpg",
    priceFrom: { es: "Desde $588 (hasta 3 pax)", en: "From $588 (up to 3 pax)" },
    routes: [],
  },
  {
    id: "robinson-r66",
    slug: "robinson-r66-4-pasajeros",
    name: "Robinson R66",
    type: "helicopter",
    passengers: 4,
    description: {
      es: "Helicóptero turbina con mayor potencia y alcance. Perfecto para tours extendidos y traslados cortos.",
      en: "Turbine helicopter with greater power and range. Perfect for extended tours and short transfers.",
    },
    specs: { range: "648 km", speed: "240 km/h", altitude: "14,000 ft", engines: "1 × RR300" },
    image: "/images/fleet/robinson-r66.jpg",
    priceFrom: { es: "Desde $875 (hasta 4 pax)", en: "From $875 (up to 4 pax)" },
    routes: [],
  },
  {
    id: "eurocopter-b3",
    slug: "eurocopter-b3-as350-5-pasajeros",
    name: "Eurocopter AS350 B3",
    type: "helicopter",
    passengers: 5,
    description: {
      es: "Helicóptero de alto rendimiento para grupos medianos. Amplia visibilidad y potencia para cualquier condición.",
      en: "High-performance helicopter for medium groups. Wide visibility and power for any condition.",
    },
    specs: { range: "680 km", speed: "287 km/h", altitude: "23,000 ft", engines: "1 × Arriel 2B1" },
    image: "/images/fleet/eurocopter-b3.jpg",
    priceFrom: { es: "Desde $1,284 (hasta 5 pax)", en: "From $1,284 (up to 5 pax)" },
    routes: [],
  },
  {
    id: "eurocopter-b4",
    slug: "eurocopter-b4-ec130-6-pasajeros",
    name: "Eurocopter EC130 B4",
    type: "helicopter",
    passengers: 6,
    description: {
      es: "El helicóptero premium de nuestra flota. Cabina panorámica amplia, ideal para tours VIP y eventos corporativos.",
      en: "The premium helicopter in our fleet. Wide panoramic cabin, ideal for VIP tours and corporate events.",
    },
    specs: { range: "616 km", speed: "287 km/h", altitude: "23,000 ft", engines: "1 × Arriel 2B1" },
    image: "/images/fleet/eurocopter-b4.jpg",
    gallery: [
      "/images/fleet/eurocopter-b4-ext.jpg",
      "/images/fleet/eurocopter-b4-side.jpg",
    ],
    priceFrom: { es: "Desde $1,337 (hasta 6 pax)", en: "From $1,337 (up to 6 pax)" },
    routes: [],
  },
];

/** Get aircraft by ID */
export function getAircraft(id: string): Aircraft | undefined {
  return fleet.find((a) => a.id === id);
}

/** Get aircraft by slug */
export function getAircraftBySlug(slug: string): Aircraft | undefined {
  return fleet.find((a) => a.slug === slug);
}

/** Get aircraft by type */
export function getAircraftByType(type: "airplane" | "helicopter"): Aircraft[] {
  return fleet.filter((a) => a.type === type);
}
