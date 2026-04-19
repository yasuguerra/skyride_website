"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { trackVideoPlay } from "@/lib/analytics";

/**
 * Lazy-loaded YouTube embed. Shows a high-quality thumbnail first,
 * then loads the iframe only when the user clicks play.
 * This avoids ~500KB of YouTube iframe payload on initial page load.
 */
export function VideoEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  const thumbnailUrl = `https://img.youtube.com/vi/${encodeURIComponent(videoId)}/maxresdefault.jpg`;

  if (loaded) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => { trackVideoPlay(title, pathname); setLoaded(true); }}
      className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl"
      aria-label={`Play video: ${title}`}
    >
      <div className="relative aspect-video">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30 transition group-hover:bg-slate-950/40">
          <svg
            viewBox="0 0 68 48"
            className="h-12 w-16 text-white drop-shadow-lg"
            fill="currentColor"
          >
            <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" />
            <path d="M45 24 27 14v20" fill="#f7f4ec" />
          </svg>
        </div>
      </div>
    </button>
  );
}
