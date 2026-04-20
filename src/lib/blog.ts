import { promises as fs } from "fs";
import path from "path";

import type { Locale } from "@/i18n/routing";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Load a markdown blog post body by slug + locale.
 * Returns null if the file doesn't exist (falls back to excerpt in template).
 */
export async function loadBlogContent(
  slug: string,
  locale: Locale,
): Promise<string | null> {
  const filePath = path.join(BLOG_DIR, locale, `${slug}.md`);
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

/** Minimal safe markdown → HTML renderer (headings, bold, links, paragraphs, lists). */
export function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let inList = false;

  const inline = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-sky-700 underline">$1</a>',
      );

  for (const raw of lines) {
    const line = raw.trim();

    if (line.startsWith("## ")) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(
        `<h2 class="mt-10 font-sans font-bold text-3xl text-slate-950">${inline(line.slice(3))}</h2>`,
      );
    } else if (line.startsWith("### ")) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(
        `<h3 class="mt-8 font-sans font-bold text-2xl text-slate-950">${inline(line.slice(4))}</h3>`,
      );
    } else if (line.startsWith("- ")) {
      if (!inList) {
        html.push('<ul class="mt-4 list-disc space-y-2 pl-6 text-slate-700">');
        inList = true;
      }
      html.push(`<li>${inline(line.slice(2))}</li>`);
    } else if (line === "") {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
    } else {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(
        `<p class="mt-4 leading-8 text-slate-700">${inline(line)}</p>`,
      );
    }
  }

  if (inList) html.push("</ul>");
  return html.join("\n");
}
