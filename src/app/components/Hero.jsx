"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="max-w-[1200px] mx-auto px-3 sm:px-6 py-10 sm:py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
      >
        <div className="lg:col-span-5 flex flex-col gap-10">
          <div>
            <span className="text-[var(--primary)] font-bold text-xs uppercase tracking-[0.3em] block mb-4">
              Aesthetic Precision
            </span>

            <h1 className="font-serif text-[44px] leading-[0.95] sm:text-6xl md:text-8xl mb-6">
              Elevating <span className="italic font-normal">Modern</span>{" "}
              Brands.
            </h1>

            <p className="text-xl text-neutral-600 max-w-md leading-relaxed font-light mb-8">
              Premium visual storytelling for brands that demand high-end
              product clarity and editorial depth.
            </p>

            <ul className="space-y-4">
              {[
                "Studio & lifestyle product",
                "Editorial portraits",
                "Fast delivery & retouching",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <span className="inline-flex size-5 rounded-full bg-[var(--primary)]/15 items-center justify-center">
                    <span className="size-2 rounded-full bg-[var(--primary)]" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-8 border-t border-neutral-200 pt-8 mt-4">
            {[
              { v: "50+", l: "Shoots" },
              { v: "20+", l: "Brands" },
              { v: "5", l: "Years" },
            ].map((x, i) => (
              <div key={x.l} className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-serif">{x.v}</span>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                    {x.l}
                  </span>
                </div>
                {i !== 2 && <div className="w-px h-8 bg-neutral-200" />}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-12 gap-4 h-[550px] md:h-[650px]">
          <div
            className="col-span-8 h-full bg-cover bg-center rounded-2xl shadow-2xl"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjQG6oYFpzSQqzWmySTPHsbTfLNab2ER15uKG4BjXabH5TOCQ16AiDZPDUAPRED5UWICB4zHsuSKttKNm68Z5R_TezDPd7sIGiKrQ_8J-mfbJic6611PLDqNbW5-ZN1rM8GocV_o7d42q9I7FUTZzjtnu-e5sjmyP9AlLGm3YXP67FLT8zdhw0zj7DrzU9jnBJ6y1a91_Q5IgH42BNd3SowpNkQngpvq1IqN1C5ctXlPVaD203maJBtdePGeQ_VtEEk7pYipo8tGw")',
            }}
          />

          <div className="col-span-4 flex flex-col gap-4">
            <button
              type="button"
              className="h-[40%] bg-cover bg-center rounded-2xl shadow-lg relative group overflow-hidden
             outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f7f7]"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDcN1MZWZe9PX0hqhF3SUcbSWsOp-_taZx-DnSZQrd6n6gtqb--k4uZvrh6pXR200ebSNVmA7Foax5cQTO_1elzLb7fkrmnmrOSBvJtHz_JGemzltZGLA0KSLWDs9oZAr03UPeCAch7GiSWcNM-xI5jwBF6XjbQ2jUjctLZwug9Hsl6xkt6JyNkfyDxzjmaxkIDP4SQ4_JCBzfmijnHFEnbUfYkwWoyrYAShXib1TvNTxxWAMBHpilTfM_-l2HzUEgPZXNIJbe9YvM")',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-md bg-white/70 p-3 shadow-md backdrop-blur-sm">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>

            <div
              className="h-[60%] bg-cover bg-center rounded-2xl shadow-lg"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBpb-vwX0QhUdU27VaCHAWzFGeBDW7LLwSsU0Z0G3r8fSIckADNtrzuuCbmuSQwgmgTS5uLkugOe6FMynfdlI7PgxP0VeA5XhEiO-DovDuUmoGGn178KU8yQt4qnuOzs3AY1yq7BQrQigi-wJLkrvwFO74MlkbiEgh_VvRQfDafRol4G0VE2q6E0m2c0GRe-0SyniPGTgeQsdwguo73oFWC16R2P-yA_x1UnPZROPZhHf461K_ITGlRHDQACRl5zS_m4zZSSjn-Yu8")',
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
