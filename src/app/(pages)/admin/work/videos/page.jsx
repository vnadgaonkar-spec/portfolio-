"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiTrash2 } from "react-icons/fi";

export default function AdminMotionVideosPage() {
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", type: "", link: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("/api/videos")
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(() => setMessage({ type: "error", text: "Failed to load videos" }));
  }, []);

  const toEmbed = (url) =>
    url.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0];

  const addVideo = async () => {
    if (!form.title || !form.type || !form.link) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/videos/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      setVideos([...videos, data.data]);
      setForm({ title: "", type: "", link: "" });
      setOpen(false);
      setMessage({ type: "success", text: "Video uploaded successfully" });
    } catch {
      setMessage({ type: "error", text: "Upload failed" });
    } finally {
      setLoading(false);
    }
  };

  const deleteVideo = async (id) => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/videos/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      setVideos(videos.filter(v => v._id !== id));
      setMessage({ type: "success", text: "Video deleted successfully" });
    } catch {
      setMessage({ type: "error", text: "Delete failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-16 md:px-24 lg:px-40">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row  justify-between mb-14">
          <h1 className="font-serif italic text-5xl">Motion / Videos</h1>
          <button
            onClick={() => setOpen(true)}
            className="h-11 px-5 rounded-full bg-black text-white cursor-pointer"
          >
            Upload Video
          </button>
        </div>

        {message && (
          <p
            className={`mb-6 ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((v) => (
            <motion.div key={v._id} className="flex flex-col gap-4">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`${toEmbed(v.link)}?rel=0`}
                  title={v.title}
                  allowFullScreen
                />
                <button
                  disabled={loading}
                  onClick={() => deleteVideo(v._id)}
                  className="absolute cursor-pointer top-3 right-3 bg-white/80 rounded-full text-xs px-2 py-2 "
                >
                  <FiTrash2 className="text-red-500 text-lg" />
                </button>
              </div>
              <div>
                <p className="text-xl font-semibold">{v.title}</p>
                <p className="uppercase text-red-600">{v.type}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <motion.div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-xl mb-6">Upload Video</h2>

              <input
                className="w-full border p-2 mb-3"
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
              <input
                className="w-full border p-2 mb-3"
                placeholder="Category"
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
              />
              <input
                className="w-full border p-2 mb-6"
                placeholder="YouTube link"
                value={form.link}
                onChange={e => setForm({ ...form, link: e.target.value })}
              />

              <div className="flex justify-end gap-3">
                <button onClick={() => setOpen(false)} className="border px-4 py-2">
                  Cancel
                </button>
                <button
                  onClick={addVideo}
                  disabled={loading}
                  className="bg-black text-white px-5 py-2 cursor-pointer"
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}