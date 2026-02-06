"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MagazinePage() {
  const [magazines, setMagazines] = useState([]);

  // 🔹 GET magazines
  useEffect(() => {
    fetch("/api/magazine")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMagazines(data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch magazines", err);
      });
  }, []);

  return (
    <main className="min-h-screen px-6 py-16 md:px-24 lg:px-40">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold">
            Magazine Features
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">
            A curated archive of editorial photography published in leading global titles across fashion, art, and culture.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {magazines.map((m) => (
            <motion.div
              key={m._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 group"
            >
              <div className="relative overflow-hidden">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={m.image.url}
                    alt={m.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              <div>
                <p className="uppercase text-sm tracking-wider font-medium">
                  {m.title}
                </p>
                <p className="text-sm text-slate-500">{m.issue}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}