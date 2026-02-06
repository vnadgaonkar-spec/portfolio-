"use client";

import { useMemo, useState } from "react";

function extractYouTubeId(input) {
  try {
    // if user passes just the id
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

    const u = new URL(input);

    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id) return id;
    }

    // youtube.com/watch?v=<id>
    const v = u.searchParams.get("v");
    if (v) return v;

    // youtube.com/embed/<id> or /shorts/<id>
    const parts = u.pathname.split("/").filter(Boolean);
    const embedIndex = parts.indexOf("embed");
    if (embedIndex !== -1 && parts[embedIndex + 1]) return parts[embedIndex + 1];
    const shortsIndex = parts.indexOf("shorts");
    if (shortsIndex !== -1 && parts[shortsIndex + 1]) return parts[shortsIndex + 1];

    return null;
  } catch {
    return null;
  }
}

export default function YouTubeEmbed({ url }) {
  const [play, setPlay] = useState(false);

  const id = useMemo(() => extractYouTubeId(url), [url]);

  if (!id) {
    return (
      <div className="w-full max-w-[820px] mx-auto rounded-2xl border border-black/10 bg-white p-4 text-sm text-neutral-600">
        Invalid YouTube URL
      </div>
    );
  }

  return (
    <div className="w-full max-w-[820px] mx-auto overflow-hidden rounded-2xl border border-black/10 bg-white">
      {!play ? (
        <button
          type="button"
          onClick={() => setPlay(true)}
          className="relative w-full aspect-video block"
          aria-label="Play video"
        >
          <img
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt="YouTube thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid place-items-center size-16 rounded-full bg-white/85 shadow-md">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#1b1917] ml-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      ) : (
        <div className="relative w-full aspect-video">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&rel=0`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
