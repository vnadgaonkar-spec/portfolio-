"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiTrash2 } from "react-icons/fi";

export default function AdminMagazinePage() {
  const [magazines, setMagazines] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    issue: "",
    imageFile: null,
    preview: "",
  });

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 3000);
  };

  // 🔹 GET magazines
  useEffect(() => {
    fetch("/api/magazine")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMagazines(data.data);
      })
      .catch(() => {
        showToast("error", "Failed to load magazines");
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({
      ...form,
      imageFile: file,
      preview: URL.createObjectURL(file),
    });
  };

  // 🔹 UPLOAD magazine
  const addMagazine = async () => {
    if (!form.title || !form.issue || !form.imageFile) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("issue", form.issue);
      formData.append("image", form.imageFile);

      const res = await fetch("/api/admin/magazine/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setMagazines((prev) => [data.data, ...prev]);
        setForm({ title: "", issue: "", imageFile: null, preview: "" });
        setOpen(false);
        showToast("success", "Magazine uploaded successfully");
      } else {
        showToast("error", "Upload failed");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Server error while uploading");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 DELETE magazine
  const deleteMagazine = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this magazine?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/magazine/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setMagazines((prev) => prev.filter((m) => m._id !== id));
        showToast("success", "Magazine deleted successfully");
      } else {
        showToast("error", "Delete failed");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Server error while deleting");
    }
  };

  return (
    <main className="min-h-screen px-6 py-16 md:px-24 lg:px-40">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-20">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold">
              Magazine Features
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-500">
              Manage magazine features displayed on the website.
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="h-11 px-5 rounded-full bg-black text-white cursor-pointer hover:bg-black/80 transition mt-8 md:my-0"
          >
            Upload Magazine
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {magazines.map((m) => (
            <motion.div
              key={m._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4 group"
            >
              <div className="relative overflow-hidden">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={m.image.url}
                    alt={m.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <button
                  onClick={() => deleteMagazine(m._id)}
                  className="absolute cursor-pointer top-3 right-3 bg-white/80 rounded-full text-xs px-2 py-2 "
                >
                  <FiTrash2 className="text-red-500 text-lg" />
                </button>
              </div>

              <div>
                <p className="uppercase text-sm tracking-wider font-medium">
                  {m.title}
                </p>
                <p className="text-sm text-slate-500">{m.issue}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold mb-6">
                Upload Magazine
              </h2>

              <div className="space-y-4">
                <input
                  placeholder="Magazine Name"
                  className="w-full border rounded-lg px-4 py-2"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                />

                <input
                  placeholder="Issue (e.g. September 2023)"
                  className="w-full border rounded-lg px-4 py-2"
                  value={form.issue}
                  onChange={(e) =>
                    setForm({ ...form, issue: e.target.value })
                  }
                />

                <input
                  type="file"
                  accept="image/*"
                  className="w-full border rounded-lg px-4 py-2 cursor-pointer"
                  onChange={handleImageChange}
                />

                {form.preview && (
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={form.preview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={addMagazine}
                  disabled={loading}
                  className="px-5 py-2 bg-black text-white cursor-pointer hover:bg-black/80 transition disabled:opacity-60"
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-[100] px-5 py-3 rounded-lg text-white shadow-lg ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}