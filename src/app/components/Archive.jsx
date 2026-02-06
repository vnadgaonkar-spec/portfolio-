"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const ITEMS = [
  { id: 1, src: "/products/product1.webp", alt: "Product" },
  { id: 1, src: "/products/product2.webp", alt: "Product" },
  { id: 3, src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=80", alt: "Product" },
  { id: 4, src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1800&q=80", alt: "Product" },
  { id: 5, src: "https://images.unsplash.com/photo-1524503033411-f7a2b7b1c3b2?auto=format&fit=crop&w=1800&q=80", alt: "Portrait" },
  { id: 6, src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1800&q=80", alt: "Product" },
  { id: 7, src: "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1800&q=80", alt: "Product" },
  { id: 8, src: "https://images.unsplash.com/photo-1520962917960-54d0d93b5b73?auto=format&fit=crop&w=1800&q=80", alt: "Portrait" },
  { id: 9, src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1800&q=80", alt: "Product" },
];

export default function ArchivePreview() {
  return (
    <section
      id="archive"
      className="max-w-[1200px] mx-auto px-3 sm:px-6 py-14 sm:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
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

      {/* Masonry (no width/height data) */}
      <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 [column-fill:_balance]">
        {ITEMS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.03 }}
            className="mb-5 break-inside-avoid"
          >
            <div className="group overflow-hidden rounded-2xl bg-white shadow-sm border border-black/5">
              <Image
                src={item.src}
                alt={item.alt}
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
