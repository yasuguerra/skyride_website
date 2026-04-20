import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const products = [
  { slug: "cessna-172",     url: "https://www.skyride.city/producto/%f0%9f%9b%ab-cessna-172-hasta-3-pasajeros/" },
  { slug: "piper-cherokee", url: "https://www.skyride.city/producto/%e2%9c%88-piper-cherokee-3-pasajeros/" },
  { slug: "piper-azteca",   url: "https://www.skyride.city/producto/%e2%9c%88-piper-azteca-5-pasajeros/" },
  { slug: "cessna-206",     url: "https://www.skyride.city/producto/%f0%9f%9b%a9-cessna-206-5-pasajeros/" },
  { slug: "king-air-f90",   url: "https://www.skyride.city/producto/%f0%9f%9b%ab-king-air-f90-6-pasajeros/" },
  { slug: "king-air-200",   url: "https://www.skyride.city/producto/%f0%9f%9b%a9-king-air-200-hasta-9-pasajeros/" },
  { slug: "robinson-r44",   url: "https://www.skyride.city/producto/%f0%9f%9a%81-robinson-r44-3-pasajeros/" },
  { slug: "robinson-r66",   url: "https://www.skyride.city/producto/%f0%9f%9a%81-robinson-r66-4-pasajeros/" },
  { slug: "eurocopter-b3",  url: "https://www.skyride.city/producto/%f0%9f%9a%81-eurocopter-b3-as350-5-pasajeros/" },
  { slug: "eurocopter-b4",  url: "https://www.skyride.city/producto/%f0%9f%9a%81-eurocopter-b4-ec130-6-pasajeros/" },
  { slug: "daher-kodiak",   url: "https://www.skyride.city/producto/%e2%9c%88-daher-kodiak-hasta-9-pasajeros/" },
  { slug: "piper-saratoga", url: "https://www.skyride.city/producto/%f0%9f%9b%ab-piper-saratoga-5-pasajeros/" },
  { slug: "cessna-caravan", url: "https://www.skyride.city/producto/%f0%9f%9b%a9-cessna-grand-caravan-12-pasajeros/" },
];

function fetchUrl(url, redirects = 5) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client
      .get(url, { headers: { "User-Agent": "Mozilla/5.0 SkyRideScraper/1.0" } }, (res) => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirects > 0) {
          const next = new URL(res.headers.location, url).toString();
          resolve(fetchUrl(next, redirects - 1));
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

function extractProductImages(html) {
  const urls = new Set();
  // WooCommerce product gallery: wp-post-image, woocommerce-product-gallery__image
  const regexes = [
    /<img[^>]+class="[^"]*wp-post-image[^"]*"[^>]+src="([^"]+)"/gi,
    /<img[^>]+src="([^"]+)"[^>]+class="[^"]*wp-post-image[^"]*"/gi,
    /data-large_image="([^"]+)"/gi,
    /<meta property="og:image"[^>]+content="([^"]+)"/gi,
    /woocommerce-product-gallery__image[^>]*>[\s\S]*?href="([^"]+\.(?:jpe?g|png|webp))"/gi,
  ];
  for (const re of regexes) {
    let m;
    while ((m = re.exec(html)) !== null) {
      let u = m[1];
      // Strip size suffix like -300x300 to get full-size
      u = u.replace(/-\d{2,4}x\d{2,4}(?=\.(?:jpe?g|png|webp))/i, "");
      urls.add(u);
    }
  }
  return [...urls];
}

const outDir = path.resolve("public/images/fleet/scraped");
fs.mkdirSync(outDir, { recursive: true });

const manifest = [];
for (const p of products) {
  try {
    console.log(`\n>>> ${p.slug}: ${p.url}`);
    const html = (await fetchUrl(p.url)).toString("utf8");
    const imgs = extractProductImages(html);
    if (!imgs.length) {
      console.log("  no images found");
      manifest.push({ slug: p.slug, ok: false, reason: "no images" });
      continue;
    }
    console.log(`  found ${imgs.length} images`);
    imgs.slice(0, 5).forEach((u) => console.log("   -", u));
    // Download first image as primary
    const primary = imgs[0];
    const ext = (primary.match(/\.(jpe?g|png|webp)(?:\?|$)/i)?.[1] || "jpg").toLowerCase();
    const fileName = `${p.slug}.${ext === "jpeg" ? "jpg" : ext}`;
    const buf = await fetchUrl(primary);
    fs.writeFileSync(path.join(outDir, fileName), buf);
    console.log(`  saved ${fileName} (${Math.round(buf.length / 1024)} KB)`);
    manifest.push({ slug: p.slug, ok: true, image: fileName, sourceUrl: primary, allUrls: imgs });
  } catch (e) {
    console.error("  ERROR:", e.message);
    manifest.push({ slug: p.slug, ok: false, reason: e.message });
  }
}

fs.writeFileSync(
  path.resolve("docs/scraped-aircraft-manifest.json"),
  JSON.stringify(manifest, null, 2),
);
console.log("\n=== DONE ===");
console.log(manifest.map((m) => `${m.slug}: ${m.ok ? m.image : "FAIL — " + m.reason}`).join("\n"));
