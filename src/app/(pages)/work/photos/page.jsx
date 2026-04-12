"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function WorkPage() {
  const [works, setWorks] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    fetch("/api/get-all-work")
      .then((res) => res.json())
      .then((data) => {
        setWorks(data.data || []);
        setPageLoading(false);
      });
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedImg(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section className="bg-[#f7f7f7] text-[#161413]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center">
          <h1 className="font-serif text-5xl sm:text-6xl">Work</h1>
          <p className="mt-4 text-[#161413]/60 max-w-xl mx-auto">
            A selection of editorial and commercial photography projects.
          </p>
        </div>

        {pageLoading && (
          <div className="mt-20 text-center text-xs tracking-widest uppercase text-[#161413]/50">
            Loading work…
          </div>
        )}

        {!pageLoading && (
          <div className="mt-12 space-y-16">
            {works.map((work) => (
              <div key={work._id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                  {work.images?.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden rounded-2xl border border-black/5 cursor-zoom-in"
                      onClick={() => setSelectedImg(img.url)}
                    >
                      <div className="relative w-full aspect-[3/4]">
                        <Image
                          src={img.url}
                          alt=""
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 text-center">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#161413]/40">
            Ready to shoot?
          </p>
          <Link
            href="/book-now"
            className="inline-flex mt-4 items-center justify-center rounded-full bg-[#1b1917] text-white px-10 h-12 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            onClick={() => setSelectedImg(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition cursor-pointer"
              onClick={() => setSelectedImg(null)}
            >
              <X size={20} />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl max-h-[90vh] aspect-[3/4]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImg}
                alt="Preview"
                fill
                className="object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}