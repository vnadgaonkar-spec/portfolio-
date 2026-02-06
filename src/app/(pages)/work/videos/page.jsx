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

  const toEmbed = (url) =>
    url.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0];

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
            A curated collection of cinematic stories, moving portraits, and commercial explorations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {videos.map((v, i) => (
            <motion.div
              key={v._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex flex-col gap-4"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`${toEmbed(v.link)}?rel=0&modestbranding=1`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

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
    </main>
  );
}