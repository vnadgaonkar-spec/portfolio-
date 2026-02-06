"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DocumentaryPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocumentaries = async () => {
      try {
        const res = await fetch("/api/documentary");
        const data = await res.json();

        if (data.success) {
          setProjects(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch documentaries", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentaries();
  }, []);

  return (
    <main className="bg-[#f7f7f7] text-[#161413] min-h-screen flex justify-center py-10 font-serif">
      <div className="max-w-[1200px] w-full px-6 md:px-10">

        {/* Title */}
        <div className="flex flex-col items-center mb-16">
          <h1 className="text-[56px] md:text-[72px] font-extrabold">
            Documentary
          </h1>
          <div className="w-12 h-px bg-black my-6" />
          <p className="italic text-lg text-center max-w-2xl text-black/70">
            Visual narratives capturing the human condition through raw,
            unscripted moments.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-black/60">
            Loading documentaries…
          </p>
        )}

        {/* Masonry Grid */}
        {!loading && (
          <div className="columns-1 md:columns-2 gap-12 space-y-16">
            {projects.map((item) => (
              <div key={item._id} className="break-inside-avoid">
                
                {/* Image */}
                <Link href={`/documentary/${item._id}`}>
                  <div className="relative w-full overflow-hidden rounded-lg cursor-pointer">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      width={800}
                      height={1000}
                      className="w-full h-auto rounded-lg transition-transform duration-700 hover:scale-[1.02]"
                    />
                  </div>
                </Link>

                {/* Text */}
                <div className="px-2 mt-4">
                  <h3 className="text-2xl font-semibold">
                    {item.title}
                  </h3>

                  {item.tags?.length > 0 && (
                    <p className="text-sm uppercase tracking-widest text-black/50 mt-1">
                      {item.tags.join(" · ")}
                    </p>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
