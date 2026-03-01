"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const filters = [
  { key: "all", label: "All" },
  { key: "product", label: "Products" },
  { key: "portrait", label: "Portraits" },
];

export default function WorkPage() {
  const [active, setActive] = useState("all");
  const [works, setWorks] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    fetch("/api/get-all-work")
      .then((res) => res.json())
      .then((data) => {
        setWorks(data.data || []);
        setPageLoading(false);
      });
  }, []);

  const list = useMemo(() => {
    if (active === "all") return works;
    return works.filter((w) => w.category === active);
  }, [active, works]);

  return (
    <section className="bg-[#f7f7f7] text-[#161413]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center">
          <h1 className="font-serif text-5xl sm:text-6xl">Work</h1>
          <p className="mt-4 text-[#161413]/60 max-w-xl mx-auto">
            A selection of editorial and commercial photography projects.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
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

        {pageLoading && (
          <div className="mt-20 text-center text-xs tracking-widest uppercase text-[#161413]/50">
            Loading work…
          </div>
        )}

        {!pageLoading && (
          <div className="mt-12 space-y-16">
            {list.map((work) => (
              <div key={work._id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                  {work.images?.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden rounded-2xl border border-black/5"
                    >
                      <div className="relative w-full aspect-[3/4]">
                        <Image
                          src={img.url}
                          alt=""
                          fill
                          loading="lazy"
                          className="object-cover"
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
    </section>
  );
}