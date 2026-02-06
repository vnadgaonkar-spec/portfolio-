"use client";

import { motion } from "framer-motion";

export default function ClientVoices() {
  const items = [
    {
      quote:
        '"The attention to detail in the product shots was exceptional. They captured the material texture exactly as we hoped."',
      name: "Creative Director, Aura",
    },
    {
      quote:
        '"Professional, fast, and remarkably talented. The editorial portraits completely refreshed our brand’s presence."',
      name: "Founder, Nomad Editorial",
    },
    {
      quote:
        '"The delivery time was incredible. We had polished, high-res selects ready for launch in under 48 hours."',
      name: "Marketing Lead, Form Group",
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-3 sm:px-6 py-20 sm:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-serif text-center mb-14 sm:mb-16"
      >
        Client Voices
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {items.map((t) => (
          <div
            key={t.name}
            className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100"
          >
            <div className="flex gap-1 text-[var(--primary)] mb-4">
              {"★★★★★".split("").map((s, i) => (
                <span key={i} className="text-sm">
                  ★
                </span>
              ))}
            </div>
            <p className="text-neutral-600 italic mb-6 leading-relaxed">
              {t.quote}
            </p>
            <div className="font-bold text-sm">{t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
