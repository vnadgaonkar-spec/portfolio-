"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminDocumentaryPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 GET ALL
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch("/api/documentary");
        const data = await res.json();
        if (data.success) {
          setProjects(data.data);
        }
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  // 🔹 DELETE
  const handleDelete = async (id) => {
    if (!confirm("Delete this documentary?")) return;

    try {
      const res = await fetch(`/api/admin/documentary/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setProjects((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-black/60">Loading…</p>
      </main>
    );
  }

  return (
    <main className="bg-[#f7f7f7] text-[#161413] min-h-screen flex justify-center py-10 font-serif">
      <div className="max-w-[1200px] w-full px-6 md:px-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <h1 className="text-[48px] font-extrabold">
            Documentary (Admin)
          </h1>

          <Link href="/admin/documentary/upload">
            <button className="px-5 py-2 text-sm font-semibold rounded-md bg-black text-white hover:opacity-90 cursor-pointer">
              Upload New
            </button>
          </Link>
        </div>

        {/* Grid */}
        <div className="columns-1 md:columns-2 gap-12 space-y-16">
          {projects.map((item) => (
            <div key={item._id} className="break-inside-avoid relative">

              {/* Delete */}
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-3 right-3 z-10 bg-white text-black text-xs px-3 py-1 rounded-full shadow hover:bg-red-600 hover:text-white transition"
              >
                Delete
              </button>

              {/* Open Detail */}
              <Link href={`/documentary/${item._id}`}>
                <div className="overflow-hidden rounded-lg cursor-pointer">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    width={800}
                    height={1000}
                    className="w-full h-auto rounded-lg transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>
              </Link>

              <div className="px-2 mt-4">
                <h3 className="text-2xl font-semibold">
                  {item.title}
                </h3>

                {item.tags?.length > 0 && (
                  <p className="text-sm uppercase tracking-widest text-red-600">
                    {item.tags.join(" · ")}
                  </p>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
