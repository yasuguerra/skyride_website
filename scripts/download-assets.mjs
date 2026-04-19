import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const BASE = "https://www.skyride.city/wp-content/uploads";

const downloads = [
  // Favicon
  [`${BASE}/2021/10/cropped-skyride-favicon-2-192x192.png`, "public/images/favicon/favicon-192.png"],
  [`${BASE}/2021/10/cropped-skyride-favicon-2-32x32.png`, "public/images/favicon/favicon-32.png"],

  // Hero / banner
  [`${BASE}/2025/11/Cabecera-charter-panama-skyride.webp`, "public/images/hero/cabecera-charter.webp"],
  [`${BASE}/2024/09/adobestock_98400582-1024x683.webp`, "public/images/hero/charter-interior.webp"],
  [`${BASE}/2025/07/Vuelos-Privados-y-Charter-1024x683.jpg.webp`, "public/images/hero/charter-exterior.webp"],

  // Destinations
  [`${BASE}/2024/10/vuelo-privado-a-contadora-300x200.jpg`, "public/images/destinations/contadora.jpg"],
  [`${BASE}/2024/10/vuelos-privados-baratos-300x300.jpg`, "public/images/destinations/vuelos-privados.jpg"],

  // Fleet aircraft (full-size where available)
  [`${BASE}/2025/03/Kkodiak-SK2-300x300.jpg`, "public/images/fleet/kodiak.jpg"],
  [`${BASE}/2025/03/Azteca-ext2-300x300.jpeg`, "public/images/fleet/piper-azteca.jpeg"],
  [`${BASE}/2025/03/Caravan-Ext-2-scaled-300x300.jpg`, "public/images/fleet/cessna-caravan.jpg"],
  [`${BASE}/2025/05/B3-Front-Black-300x300.jpg`, "public/images/fleet/eurocopter-b3.jpg"],
  [`${BASE}/2025/05/B4-Flying-300x300.jpg`, "public/images/fleet/eurocopter-b4.jpg"],
  [`${BASE}/2025/03/R44-Ext-2-scaled-300x300.jpg`, "public/images/fleet/robinson-r44.jpg"],
  [`${BASE}/2025/05/R66-ext-300x300.jpg`, "public/images/fleet/robinson-r66.jpg"],
  [`${BASE}/2025/03/C206-Exterior-Sol-rotated-300x300.jpg`, "public/images/fleet/cessna-206.jpg"],
  [`${BASE}/2025/05/King-Ext-4-300x300.png`, "public/images/fleet/king-air-200.png"],
  [`${BASE}/2025/05/King-90.png`, "public/images/fleet/king-air-f90.png"],
  [`${BASE}/2025/03/20210810_075008-scaled-300x300.jpg`, "public/images/fleet/cessna-172.jpg"],
  [`${BASE}/2025/03/Exterior-1-300x300.jpeg`, "public/images/fleet/piper-cherokee.jpeg"],
  [`${BASE}/2025/03/Main-Profile-Photo-300x300.jpg`, "public/images/fleet/catamaran-main.jpg"],
  [`${BASE}/2025/03/catamaran-home-300x300.jpg`, "public/images/fleet/catamaran-home.jpg"],
  [`${BASE}/2025/03/Just-Wanna-Have-fun-300x300.jpg`, "public/images/fleet/catamaran-zenith.jpg"],
  [`${BASE}/2025/05/B4-Ext-2-scaled-300x300.jpg`, "public/images/fleet/eurocopter-b4-ext.jpg"],
  [`${BASE}/2025/05/B4-Ext-scaled-300x300.jpg`, "public/images/fleet/eurocopter-b4-side.jpg"],
  [`${BASE}/2025/03/20210810_074826-scaled-300x300.jpg`, "public/images/fleet/kodiak-gallery-1.jpg"],
  [`${BASE}/2025/03/20210810_074846-scaled-300x300.jpg`, "public/images/fleet/kodiak-gallery-2.jpg"],
  [`${BASE}/2025/03/20210810_074857-scaled-300x300.jpg`, "public/images/fleet/kodiak-gallery-3.jpg"],
  [`${BASE}/2025/03/20210810_075052-scaled-300x300.jpg`, "public/images/fleet/kodiak-gallery-4.jpg"],
  [`${BASE}/2025/03/Exterior-3-scaled-300x300.jpeg`, "public/images/fleet/cherokee-ext.jpeg"],
];

// Also try full-size versions (strip -300x300, -1024x683 etc.)
const fullSizeDownloads = downloads.map(([url, target]) => {
  const fullUrl = url.replace(/-\d+x\d+\./, ".");
  return [fullUrl, target];
});

let ok = 0;
let fail = 0;

for (const [url, target] of fullSizeDownloads) {
  try {
    await mkdir(dirname(target), { recursive: true });
    const resp = await fetch(url);
    if (!resp.ok) {
      // Fall back to the thumbnail URL
      const thumbUrl = downloads.find(([, t]) => t === target)?.[0];
      if (thumbUrl && thumbUrl !== url) {
        const resp2 = await fetch(thumbUrl);
        if (resp2.ok) {
          const buf = Buffer.from(await resp2.arrayBuffer());
          await writeFile(target, buf);
          console.log(`OK  ${target} (thumbnail ${buf.length} bytes)`);
          ok++;
          continue;
        }
      }
      console.log(`FAIL ${target} - HTTP ${resp.status}`);
      fail++;
      continue;
    }
    const buf = Buffer.from(await resp.arrayBuffer());
    await writeFile(target, buf);
    console.log(`OK  ${target} (${buf.length} bytes)`);
    ok++;
  } catch (e) {
    console.log(`FAIL ${target} - ${e.message}`);
    fail++;
  }
  // Small delay to avoid rate limiting
  await new Promise((r) => setTimeout(r, 300));
}

console.log(`\nDone: ${ok} downloaded, ${fail} failed`);
