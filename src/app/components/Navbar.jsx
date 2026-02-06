"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#eeedec] bg-[var(--bg-light)]/90 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="text-[var(--accent)]">
            <svg className="size-6" viewBox="0 0 48 48" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-black tracking-tighter uppercase italic">
            Studio
          </h2>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-widest hover:text-[var(--primary)]"
          >
            Home
          </Link>

          <Link
            href="/services"
            className="text-xs font-bold uppercase tracking-widest hover:text-[var(--primary)]"
          >
            Services
          </Link>

          {/* Work Dropdown */}
          <div className="relative group">
            <span className="text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-[var(--primary)]">
              Work
            </span>

            <div className="absolute left-0 top-full mt-3 w-40 bg-white shadow-lg border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <Link
                href="/work/photos"
                className="block px-4 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-neutral-100"
              >
                Photos
              </Link>
              <Link
                href="/work/videos"
                className="block px-4 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-neutral-100"
              >
                Videos
              </Link>
            </div>
          </div>

          <Link
            href="/documentary"
            className="text-xs font-bold uppercase tracking-widest hover:text-[var(--primary)]"
          >
            Documentary
          </Link>

          <Link
            href="/magazine"
            className="text-xs font-bold uppercase tracking-widest hover:text-[var(--primary)]"
          >
            Magazine
          </Link>

          <Link
            href="/about"
            className="text-xs font-bold uppercase tracking-widest hover:text-[var(--primary)]"
          >
            About
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex flex-col items-end gap-1">
          <Link
            href="/book-now"
            className="bg-[var(--accent)] text-white px-7 py-3 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition-all"
          >
            Book Now
          </Link>
          <span className="text-[10px] text-neutral-400 font-medium">
            Reply within 24 hours
          </span>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-[2px] bg-black"></span>
          <span className="w-6 h-[2px] bg-black"></span>
          <span className="w-6 h-[2px] bg-black"></span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />

            {/* menu panel */}
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute top-0 left-0 w-full bg-[var(--bg-light)] border-b border-[#eeedec]"
            >
              <div className="flex flex-col px-6 py-6 gap-5">
                <Link href="/" onClick={() => setOpen(false)}>
                  Home
                </Link>
                <Link href="/services" onClick={() => setOpen(false)}>
                  Services
                </Link>
                <Link href="/work/photos" onClick={() => setOpen(false)}>
                  Photos
                </Link>
                <Link href="/work/videos" onClick={() => setOpen(false)}>
                  Videos
                </Link>
                <Link href="/documentary" onClick={() => setOpen(false)}>
                  Documentary
                </Link>
                <Link href="/magazine" onClick={() => setOpen(false)}>
                  Magazine
                </Link>
                <Link href="/about" onClick={() => setOpen(false)}>
                  About
                </Link>

                <Link
                  href="/book-now"
                  onClick={() => setOpen(false)}
                  className="mt-4 bg-[var(--accent)] text-white px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest text-center"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
