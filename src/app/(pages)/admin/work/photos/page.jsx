"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiUpload, FiTrash2 } from "react-icons/fi";

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
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

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

        {apiMessage && (
          <p className="mt-6 text-sm text-green-600">{apiMessage}</p>
        )}

        <div className="mt-10 flex gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
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

        {!pageLoading && (
          <div className="mt-12 space-y-16">
            {list.map((work) => (
              <div key={work._id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                  {work.images?.map((img, index) => (
                    <div key={index} className="relative group">
                      {index === 0 && (
                        <button
                          onClick={() => deleteWork(work._id)}
                          className="absolute z-10 top-3 right-3 bg-white/80 rounded-full p-2"
                        >
                          <FiTrash2 className="text-red-500" />
                        </button>
                      )}

                      <motion.div
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
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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

            <select
              name="category"
              required
              className="w-full mb-4 h-11 px-4 border border-black/10 rounded-md bg-white"
            >
              <option value="">Select category</option>
              <option value="product">Product</option>
              <option value="portrait">Portrait</option>
            </select>

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
                type="submit"
                disabled={uploading}
                className="cursor-pointer px-6 h-11 rounded-full bg-[#1b1917] text-white text-xs font-bold uppercase tracking-widest"
              >
                {uploading ? "Uploading…" : "Upload"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}