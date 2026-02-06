"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

const filters = [
  { key: "all", label: "All" },
  { key: "product", label: "Products" },
  { key: "portrait", label: "Portraits" },
];

export default function AdminWorkPage() {
  const [active, setActive] = useState("all");
  const [works, setWorks] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [currentWorkId, setCurrentWorkId] = useState(null);

  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [apiMessage, setApiMessage] = useState("");

  /* ======================
     FETCH ALL WORK
  ====================== */
  const fetchWorks = () => {
    setPageLoading(true);
    fetch("/api/get-all-work")
      .then((res) => res.json())
      .then((data) => {
        setWorks(data.data || []);
        setPageLoading(false);
      });
  };

  useEffect(() => {
    fetchWorks();
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
    setCurrentWorkId(null);
    setLoadingGallery(false);
  };

  const openWork = async (work) => {
    setOpenIndex(0);
    setGallery([]);
    setCurrentWorkId(work._id);
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
     DELETE FROM CARD
  ====================== */
  const deleteWork = async (id) => {
    if (!confirm("Delete this work permanently?")) return;

    const res = await fetch(`/api/admin/work/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    setApiMessage(data.message || "Work deleted");
    fetchWorks();
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <section className="bg-[#f7f7f7] text-[#161413] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl">Work</h1>
            <p className="mt-2 text-[#161413]/60">
              Manage photography projects
            </p>
          </div>

          <button
            onClick={() => setShowUpload(true)}
            className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-[#1b1917] text-white px-8 h-11 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition"
          >
            <FiUpload /> Upload Work
          </button>
        </div>

        {/* MESSAGE */}
        {apiMessage && (
          <p className="mt-6 text-sm text-green-600">{apiMessage}</p>
        )}

        {/* FILTERS */}
        <div className="mt-10 flex gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setActive(f.key);
                close();
              }}
              className={[
                "cursor-pointer px-5 h-10 rounded-full text-xs font-bold uppercase tracking-widest transition",
                active === f.key
                  ? "bg-[#1b1917] text-white"
                  : "bg-white border border-black/10 hover:border-black/20",
              ].join(" ")}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        {!pageLoading && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {list.map((work) => (
              <div key={work._id} className="relative group cursor-pointer">
                {/* DELETE BUTTON */}
                <button
                  onClick={() => deleteWork(work._id)}
                  className="absolute cursor-pointer z-10 top-3 right-3 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                >
                  <FiTrash2 className="text-red-500" />
                </button>

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
      </div>

      {/* ======================
          WORK MODAL
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
                          openIndex === idx ? "ring-2 ring-white" : "opacity-60"
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

      {/* ======================
          UPLOAD MODAL
      ====================== */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setShowUpload(false);
            }}
          >
            <motion.form
              onSubmit={async (e) => {
                e.preventDefault();
                setUploading(true);
                setApiMessage("");

                const formData = new FormData(e.currentTarget);

                const res = await fetch("/api/admin/work/upload", {
                  method: "POST",
                  body: formData,
                });

                const data = await res.json();
                setApiMessage(data.message || "Upload complete");

                setUploading(false);
                setShowUpload(false);
                fetchWorks();
              }}
              className="relative w-full max-w-lg bg-[#f7f7f7] rounded-2xl p-6"
            >
              <h2 className="font-serif text-2xl mb-6">Upload Work</h2>

              <input
                name="title"
                required
                placeholder="Title"
                className="w-full mb-4 h-11 px-4 border border-black/10 rounded-md bg-white"
              />

              <select
                name="category"
                required
                className="w-full mb-4 h-11 px-4 border border-black/10 rounded-md bg-white"
              >
                <option value="">Select category</option>
                <option value="product">Product</option>
                <option value="portrait">Portrait</option>
              </select>

              {/* FILE INPUT */}
              <label className="cursor-pointer flex items-center gap-3 px-4 py-3 border border-dashed rounded-md bg-white text-sm">
                <FiUpload />
                Select Images
                <input
                  name="files"
                  type="file"
                  multiple
                  required
                  className="hidden"
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                />
              </label>

              {/* FILE LIST */}
              {files.length > 0 && (
                <ul className="mt-3 space-y-1 text-xs text-black/70">
                  {files.map((file, i) => (
                    <li key={i} className="truncate">
                      {file.name}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="submit"
                  disabled={uploading}
                  className="cursor-pointer px-6 h-11 rounded-full bg-[#1b1917] text-white text-xs font-bold uppercase tracking-widest"
                >
                  {uploading ? "Uploading…" : "Upload"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
