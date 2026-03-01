"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ArchivePreview() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api/get-all-work")
      .then((res) => res.json())
      .then((data) => {
        const works = data.data || [];

        // flatten all images
        const allImages = works.flatMap((work) => work.images || []);

        // shuffle
        const shuffled = allImages.sort(() => 0.5 - Math.random());

        // take 15
        setImages(shuffled.slice(0, 15));
      });
  }, []);

  return (
    <section
      id="archive"
      className="max-w-[1200px] mx-auto px-3 sm:px-6 py-14 sm:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-end justify-between gap-6"
      >
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">
            Archive Preview
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl mt-2">My Work</h2>
        </div>

        <Link
          href="/work"
          className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
        >
          View All
        </Link>
      </motion.div>

      <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.03 }}
            className="mb-5 break-inside-avoid"
          >
            <div className="group overflow-hidden rounded-2xl bg-white shadow-sm border border-black/5">
              <Image
                src={img.url}
                alt=""
                width={1200}
                height={1600}
                className="w-full h-auto object-cover transition duration-700 group-hover:scale-[1.03] grayscale group-hover:grayscale-0"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/work"
          className="rounded-full border border-black/10 bg-white px-7 h-11 inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest hover:border-black/20 transition"
        >
          Load More
        </Link>
      </div>
    </section>
  );
}