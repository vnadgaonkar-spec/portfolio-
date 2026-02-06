"use client";

import { motion } from "framer-motion";

export default function FreeConsultation() {
  return (
    <footer className="bg-[var(--accent)] text-white py-20 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-5xl md:text-6xl font-serif mb-6">
              Free consultation
            </h2>
            <p className="text-white/60 text-lg mb-10 font-light max-w-xl">
              Let&apos;s discuss your next project. We offer a 15-minute call to
              align on your creative vision and brand requirements.
            </p>

            <div className="space-y-4 text-white/80">
              <p className="flex items-center gap-4 text-sm">
                <span className="text-[var(--primary)]">✉</span>{" "}
                shoots@studio-photography.com
              </p>
              <p className="flex items-center gap-4 text-sm">
                <span className="text-[var(--primary)]">⏱</span> Average
                response: 2 hours
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            className="bg-white/5 backdrop-blur-lg p-7 sm:p-8 rounded-2xl border border-white/10"
          >
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="bg-white/10 border border-white/20 rounded-lg py-4 px-5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm text-white placeholder-white/40"
                  placeholder="Name"
                  type="text"
                />
                <input
                  className="bg-white/10 border border-white/20 rounded-lg py-4 px-5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm text-white placeholder-white/40"
                  placeholder="Email"
                  type="email"
                />
              </div>

              <select
                defaultValue=""
                className="w-full bg-white/10 border border-white/20 rounded-lg py-4 px-5
             focus:outline-none focus:ring-2 focus:ring-[var(--primary)]
             text-sm text-white appearance-none"
              >
                <option
                  value=""
                  disabled
                  className="bg-[var(--accent)] text-white"
                >
                  Shoot Type
                </option>
                <option
                  value="product"
                  className="bg-[var(--accent)] text-white"
                >
                  Product Photography
                </option>
                <option
                  value="portrait"
                  className="bg-[var(--accent)] text-white"
                >
                  Editorial Portrait
                </option>
                <option
                  value="campaign"
                  className="bg-[var(--accent)] text-white"
                >
                  Full Brand Campaign
                </option>
              </select>

              <button
                className="w-full bg-white text-[var(--accent)] font-black uppercase tracking-widest py-5 rounded-lg hover:bg-neutral-200 transition-colors text-xs"
                type="submit"
              >
                Request a callback
              </button>

              <p className="text-[10px] text-center text-white/40 uppercase tracking-widest mt-4 italic">
                No commitment required
              </p>
            </form>
          </motion.div>
        </div>

        <div className="mt-20 sm:mt-24 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
          <div className="flex items-center gap-3">
            <div className="size-6 bg-white/20 rounded-md" />
            <span className="text-xs font-bold uppercase tracking-widest">
              © 2024 Photography Studio
            </span>
          </div>

          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            <a className="hover:text-[var(--primary)]" href="#">
              Instagram
            </a>
            <a className="hover:text-[var(--primary)]" href="#">
              Behance
            </a>
            <a className="hover:text-[var(--primary)]" href="#">
              Vimeo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
