"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { X } from "lucide-react";

export default function AdminWorkPage() {
  const [works, setWorks] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);

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

  // Close modal on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedImg(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const deleteWork = async (id) => {
    if (!confirm("Delete this work permanently?")) return;
    const res = await fetch(`/api/admin/work/delete/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setApiMessage(data.message || "Work deleted");
    fetchWorks();
  };

  return (
    <section className="bg-[#f7f7f7] text-[#161413] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl">Work</h1>
            <p className="mt-2 text-[#161413]/60">Manage photography projects</p>
          </div>

          <button
            onClick={() => setShowUpload(true)}
            className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-[#1b1917] text-white px-8 h-11 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition"
          >
            <FiUpload /> Upload Work
          </button>
        </div>

        {apiMessage && (
          <p className="mt-6 text-sm text-green-600">{apiMessage}</p>
        )}

        {!pageLoading && (
          <div className="mt-12 space-y-16">
            {works.map((work) => (
              <div key={work._id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                  {work.images?.map((img, index) => (
                    <div key={index} className="relative group">
                      {/* Delete button only on first image */}
                      {index === 0 && (
                        <button
                          onClick={() => deleteWork(work._id)}
                          className="absolute z-10 top-3 right-3 bg-white/80 rounded-full p-2 cursor-pointer"
                        >
                          <FiTrash2 className="text-red-500" />
                        </button>
                      )}

                      <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden rounded-2xl border border-black/5 cursor-zoom-in"
                        onClick={() => setSelectedImg(img.url)}
                      >
                        <div className="relative w-full aspect-[3/4]">
                          <Image
                            src={img.url}
                            alt=""
                            fill
                            loading="lazy"
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div
          className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowUpload(false);
          }}
        >
          <form
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
                type="button"
                onClick={() => setShowUpload(false)}
                className="cursor-pointer px-6 h-11 rounded-full border border-black/20 text-xs font-bold uppercase tracking-widest hover:border-black/40 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="cursor-pointer px-6 h-11 rounded-full bg-[#1b1917] text-white text-xs font-bold uppercase tracking-widest disabled:opacity-60"
              >
                {uploading ? "Uploading…" : "Upload"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition cursor-pointer"
              onClick={() => setSelectedImg(null)}
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl max-h-[90vh] aspect-[3/4]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImg}
                alt="Preview"
                fill
                className="object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}