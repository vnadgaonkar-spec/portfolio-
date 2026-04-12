"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

export default function AdminMotionVideosPage() {
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", type: "", link: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch(() => setMessage({ type: "error", text: "Failed to load videos" }));
  }, []);

  const getLinkType = (url) => {
    if (!url) return "unknown";
    if (url.includes("instagram.com")) return "instagram";
    if (url.includes("youtu.be") || url.includes("youtube.com")) return "youtube";
    return "unknown";
  };

  const toYouTubeEmbed = (url) => {
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtube.com/watch")) {
      const id = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtube.com/shorts/")) {
      const id = url.split("youtube.com/shorts/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  const toInstagramEmbed = (url) => {
    const clean = url.split("?")[0].replace(/\/$/, "");
    return `${clean}/embed/`;
  };

  const renderEmbed = (v) => {
    const type = getLinkType(v.link);

    if (type === "youtube") {
      return (
        // Fixed 16:9 aspect for YouTube
        <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingTop: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`${toYouTubeEmbed(v.link)}?rel=0&modestbranding=1`}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    if (type === "instagram") {
      // Fixed portrait aspect for Instagram (4:5)
      return (
        <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ paddingTop: "125%" }}>
          <iframe
            src={toInstagramEmbed(v.link)}
            className="absolute inset-0 w-full h-full"
            style={{ border: "none" }}
            title={v.title}
            allowFullScreen
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      );
    }

    return (
      <div className="relative w-full rounded-xl overflow-hidden bg-neutral-100 flex items-center justify-center" style={{ paddingTop: "56.25%" }}>
        <span className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400">Unsupported link</span>
      </div>
    );
  };

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
      const res = await fetch(`/api/admin/videos/delete/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error();
      setVideos(videos.filter((v) => v._id !== id));
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
        <div className="flex flex-col md:flex-row justify-between mb-14">
          <h1 className="font-serif italic text-5xl">Motion / Videos</h1>
          <button
            onClick={() => setOpen(true)}
            className="h-11 px-5 rounded-full bg-black text-white cursor-pointer"
          >
            Upload Video
          </button>
        </div>

        {message && (
          <p className={`mb-6 text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </p>
        )}

        {/* Separate grids for YouTube (16:9) and Instagram (portrait) */}
        {videos.some((v) => getLinkType(v.link) === "youtube") && (
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">YouTube</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.filter((v) => getLinkType(v.link) === "youtube").map((v) => (
                <motion.div
                  key={v._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3"
                >
                  <div className="relative">
                    {renderEmbed(v)}
                    <button
                      disabled={loading}
                      onClick={() => deleteVideo(v._id)}
                      className="absolute cursor-pointer top-3 right-3 bg-white/80 rounded-full px-2 py-2 z-10"
                    >
                      <FiTrash2 className="text-red-500 text-lg" />
                    </button>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{v.title}</p>
                    <p className="uppercase text-red-600 text-xs tracking-wider">{v.type}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {videos.some((v) => getLinkType(v.link) === "instagram") && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">Instagram</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {videos.filter((v) => getLinkType(v.link) === "instagram").map((v) => (
                <motion.div
                  key={v._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3"
                >
                  <div className="relative">
                    {renderEmbed(v)}
                    <button
                      disabled={loading}
                      onClick={() => deleteVideo(v._id)}
                      className="absolute cursor-pointer top-3 right-3 bg-white/80 rounded-full px-2 py-2 z-10"
                    >
                      <FiTrash2 className="text-red-500 text-lg" />
                    </button>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{v.title}</p>
                    <p className="uppercase text-pink-500 text-xs tracking-wider">{v.type}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-semibold mb-6">Upload Video</h2>
              <div className="space-y-3">
                <input
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Category"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                />
                <input
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="YouTube or Instagram link"
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                />
                {form.link && (
                  <p className={`text-xs font-semibold uppercase tracking-widest ${
                    getLinkType(form.link) === "instagram"
                      ? "text-pink-500"
                      : getLinkType(form.link) === "youtube"
                      ? "text-red-500"
                      : "text-neutral-400"
                  }`}>
                    {getLinkType(form.link) === "instagram"
                      ? "✓ Instagram link detected"
                      : getLinkType(form.link) === "youtube"
                      ? "✓ YouTube link detected"
                      : "⚠ Unrecognized link"}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setOpen(false)} className="border px-4 py-2 rounded-lg cursor-pointer">
                  Cancel
                </button>
                <button
                  onClick={addVideo}
                  disabled={loading}
                  className="bg-black text-white px-5 py-2 rounded-lg cursor-pointer disabled:opacity-60"
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