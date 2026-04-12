"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function GallerySection() {
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [cols, setCols] = useState(5);

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      try {
        const [workRes, magazineRes] = await Promise.all([
          fetch("/api/get-all-work").then((r) => r.json()),
          fetch("/api/magazine").then((r) => r.json()),
        ]);

        if (cancelled) return;

        const workImages = (workRes.data || []).flatMap(
          (work) => work.images || []
        );
        const magazineImages = (magazineRes.data || [])
          .filter((m) => m.image?.url)
          .map((m) => ({ url: m.image.url }));

        const allImages = [...workImages, ...magazineImages];
        const shuffled = allImages.sort(() => 0.5 - Math.random());

        setImages(shuffled);
      } catch (err) {
        console.error("Failed to fetch images", err);
      }
    };

    fetchAll();
    return () => { cancelled = true; };
  }, []);

  // Responsive column count
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setCols(2);
      else if (w < 768) setCols(3);
      else setCols(5);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedImg(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const columns = Array.from({ length: cols }, (_, colIdx) =>
    images.filter((_, i) => i % cols === colIdx)
  );

  return (
    <>
      <section className="w-full bg-black">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: "3px",
            alignItems: "start",
          }}
        >
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              style={{ display: "flex", flexDirection: "column", gap: "3px" }}
            >
              {col.map((img, rowIdx) => (
                <motion.div
                  key={`${colIdx}-${rowIdx}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: colIdx * 0.06 }}
                  className="relative overflow-hidden cursor-zoom-in group"
                  onClick={() => setSelectedImg(img.url)}
                >
                  <img
                    src={img.url}
                    alt=""
                    style={{ width: "100%", height: "auto", display: "block" }}
                    loading="lazy"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/25 rounded-full p-2 transition cursor-pointer z-10"
              onClick={() => setSelectedImg(null)}
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg}
                alt="Preview"
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}