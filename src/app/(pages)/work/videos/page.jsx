"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MotionVideosPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data);
    };
    fetchVideos();
  }, []);

  const getLinkType = (url) => {
    if (!url) return "unknown";
    if (url.includes("instagram.com")) return "instagram";
    if (url.includes("youtu.be") || url.includes("youtube.com")) return "youtube";
    return "unknown";
  };

  const toYouTubeEmbed = (url) => {
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtube.com/watch")) {
      const id = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtube.com/shorts/")) {
      const id = url.split("youtube.com/shorts/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  const toInstagramEmbed = (url) => {
    const clean = url.split("?")[0].replace(/\/$/, "");
    return `${clean}/embed/`;
  };

  const renderYouTube = (v) => (
    <div
      className="relative w-full rounded-xl overflow-hidden bg-black"
      style={{ paddingTop: "56.25%" }}
    >
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`${toYouTubeEmbed(v.link)}?rel=0&modestbranding=1`}
        title={v.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );

  const renderInstagram = (v) => (
    <div
      className="relative w-full rounded-xl overflow-hidden bg-black"
      style={{ paddingTop: "125%" }}
    >
      <iframe
        src={toInstagramEmbed(v.link)}
        className="absolute inset-0 w-full h-full"
        style={{ border: "none" }}
        title={v.title}
        allowFullScreen
        scrolling="no"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      />
    </div>
  );

  const youtubeVideos = videos.filter((v) => getLinkType(v.link) === "youtube");
  const instagramVideos = videos.filter((v) => getLinkType(v.link) === "instagram");

  return (
    <main className="min-h-screen px-6 py-16 md:px-24 lg:px-40">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="font-serif italic text-5xl md:text-6xl">
            Motion / Videos
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-red-600">
            A curated collection of cinematic stories, moving portraits, and
            commercial explorations.
          </p>
        </motion.div>

        {/* YouTube Section */}
        {youtubeVideos.length > 0 && (
          <div className="mb-20">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">
              YouTube
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {youtubeVideos.map((v, i) => (
                <motion.div
                  key={v._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex flex-col gap-4"
                >
                  {renderYouTube(v)}
                  <div>
                    <p className="text-xl font-semibold">{v.title}</p>
                    <p className="text-base font-medium uppercase tracking-wider text-red-600">
                      {v.type}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Instagram Section */}
        {instagramVideos.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">
              Instagram
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {instagramVideos.map((v, i) => (
                <motion.div
                  key={v._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex flex-col gap-4"
                >
                  {renderInstagram(v)}
                  <div>
                    <p className="text-lg font-semibold">{v.title}</p>
                    <p className="text-sm font-medium uppercase tracking-wider text-pink-500">
                      {v.type}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}