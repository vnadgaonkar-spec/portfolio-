"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

const filters = [
  { key: "all", label: "All" },
  { key: "product", label: "Products" },
  { key: "portrait", label: "Portraits" },
];

export default function WorkPage() {
  const [active, setActive] = useState("all");
  const [works, setWorks] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const [openIndex, setOpenIndex] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);

  /* ======================
     FETCH ALL WORK (GRID)
  ====================== */
  useEffect(() => {
    fetch("/api/get-all-work")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);

        setWorks(data.data || []);
        setPageLoading(false);
      });
  }, []);

  const list = useMemo(() => {
    if (active === "all") return works;
    return works.filter((w) => w.category === active);
  }, [active, works]);

  /* ======================
     MODAL HANDLERS
  ====================== */
  const close = () => {
    setOpenIndex(null);
    setGallery([]);
    setLoadingGallery(false);
  };

  const openWork = async (work) => {
    setOpenIndex(0);
    setGallery([]);
    setLoadingGallery(true);

    try {
      const res = await fetch(`/api/get-work-by-id/${work._id}`);
      const data = await res.json();
      setGallery(data.data.images || []);
    } finally {
      setLoadingGallery(false);
    }
  };

  const prev = () => {
    setOpenIndex((i) =>
      i === null || gallery.length === 0
        ? i
        : (i - 1 + gallery.length) % gallery.length,
    );
  };

  const next = () => {
    setOpenIndex((i) =>
      i === null || gallery.length === 0 ? i : (i + 1) % gallery.length,
    );
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <section className="bg-[#f7f7f7] text-[#161413]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-serif text-5xl sm:text-6xl">Work</h1>
          <p className="mt-4 text-[#161413]/60 max-w-xl mx-auto">
            A selection of editorial and commercial photography projects.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setActive(f.key);
                  close();
                }}
                className={[
                  "px-5 h-10 rounded-full text-xs font-bold uppercase tracking-widest transition",
                  active === f.key
                    ? "bg-[#1b1917] text-white"
                    : "bg-white border border-black/10 hover:border-black/20",
                ].join(" ")}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* GRID LOADING */}
        {pageLoading && (
          <div className="mt-20 text-center text-xs tracking-widest uppercase text-[#161413]/50">
            Loading work…
          </div>
        )}

        {/* GRID */}
        {!pageLoading && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {list.map((work) => (
              <div key={work._id} className="relative group cursor-pointer">
                {/* DELETE BUTTON */}
                <motion.button
                  onClick={() => openWork(work)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="block w-full text-left"
                >
                  <div className="overflow-hidden rounded-2xl border border-black/5">
                    <div className="relative w-full aspect-[3/4]">
                      <Image
                        src={work.image.url}
                        alt={work.title}
                        fill
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* TITLE BELOW CARD */}
                  <p className="mt-3 text-sm font-medium">{work.title}</p>
                </motion.button>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
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

      {/* ======================
          MODAL GALLERY
      ====================== */}
      <AnimatePresence>
                {openIndex !== null && (
                  <motion.div
                    className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onMouseDown={(e) => {
                      if (e.target === e.currentTarget) close();
                    }}
                  >
                    <button
                      onClick={close}
                      className="absolute top-6 right-6 text-white text-2xl cursor-pointer"
                      aria-label="Close"
                    >
                      ✕
                    </button>
      
                    <motion.div className="relative w-full max-w-4xl flex flex-col items-center">
                      {loadingGallery && (
                        <div className="h-[70vh] flex items-center justify-center text-xs tracking-widest uppercase text-white/80">
                          Loading images…
                        </div>
                      )}
      
                      {!loadingGallery && gallery.length > 0 && (
                        <>
                          <div className="relative w-full max-h-[75vh] aspect-[3/4] flex items-center justify-center">
                            <button
                              onClick={prev}
                              className="absolute left-0 text-2xl sm:-left-14 flex items-center justify-center bg-white/10 text-white rounded-full size-10"
                            >
                              <MdNavigateBefore />
                            </button>
      
                            <Image
                              src={gallery[openIndex].url}
                              alt=""
                              fill
                              className="object-contain"
                            />
      
                            <button
                              onClick={next}
                              className="absolute text-2xl sm:-right-14 flex items-center justify-center bg-white/10 text-white rounded-full size-10"
                            >
                              <MdNavigateNext />
      
                            </button>
                          </div>
      
              
                          {/* THUMBNAILS */}
                          <div className="mt-4 flex gap-3 justify-center overflow-x-auto px-4">
                            {gallery.map((img, idx) => (
                              <button
                                key={idx}
                                onClick={() => setOpenIndex(idx)}
                                className={`relative w-16 h-16 rounded-md overflow-hidden ${
                                  openIndex === idx
                                    ? "ring-2 ring-white"
                                    : "opacity-60"
                                }`}
                              >
                                <Image
                                  src={img.url}
                                  alt=""
                                  fill
                                  className="object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </motion.div>
                  </motion.div>
                )}
            </AnimatePresence>
    </section>
  );
}
