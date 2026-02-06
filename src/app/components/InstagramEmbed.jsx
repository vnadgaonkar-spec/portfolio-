"use client";

import { useEffect } from "react";

export default function InstagramEmbed({ url }) {
  useEffect(() => {
    // load instagram embed script once
    if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
      const s = document.createElement("script");
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
      s.onload = () => {
        if (window.instgrm?.Embeds?.process) window.instgrm.Embeds.process();
      };
      return;
    }

    // process embeds if script already loaded
    if (window.instgrm?.Embeds?.process) window.instgrm.Embeds.process();
  }, [url]);

  return (
    <div className="w-full max-w-[540px] mx-auto overflow-hidden rounded-2xl border border-black/10 bg-white">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ margin: 0, width: "100%" }}
      />
    </div>
  );
}
