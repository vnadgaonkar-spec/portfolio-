"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const CATEGORIES = ["Beauty", "Fashion", "Celebrities", "Food", "Travel", "Others"];

export default function MagazinePage() {
  const [magazines, setMagazines] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

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

  // 🔹 Filter
  const filtered =
    activeCategory === "All"
      ? magazines
      : magazines.filter((m) => m.category === activeCategory);

  return (
    <main className="min-h-screen px-6 py-16 md:px-24 lg:px-40">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold">
            Magazine Features
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">
            A curated archive of editorial photography published in leading
            global titles across fashion, art, and culture.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide border transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-neutral-300 hover:border-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {filtered.map((m) => (
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