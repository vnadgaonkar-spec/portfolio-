"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function DocumentaryDetailPage() {
  const { slug } = useParams(); // slug = documentary _id
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (doc) {
    console.log(doc.content);
  }
}, [doc]);

  useEffect(() => {
    if (!slug) return;

    const fetchDoc = async () => {
      try {
        const res = await fetch(`/api/documentary/${slug}`);
        const data = await res.json();

        if (data.success) {
          setDoc(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch documentary", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-black/60">Loading documentary…</p>
      </main>
    );
  }

  if (!doc) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Documentary not found</p>
      </main>
    );
  }

  return (
    <main className="bg-[#f7f7f7] text-[#161413] mb-20">
      <div className="w-[95%] px-6 max-w-[1200px] mx-auto space-y-12">

        {/* Title */}
        <section className="text-center border-b border-black/10 py-12">
          <h1 className="font-serif text-5xl md:text-8xl mb-4 tracking-tight text-wrap">
            {doc.title}
          </h1>

          {(doc.subject || doc.location) && (
            <p className="text-sm uppercase tracking-[0.3em] font-bold text-red-600">
              {[doc.subject, doc.location].filter(Boolean).join(" · ")}
            </p>
          )}
        </section>

        {/* Hero Image */}
        <section className="mb-12 w-full flex items-center justify-center">
          <Image
            src={doc.coverImage}
            alt={doc.title}
            width={1200}
            height={500}
            className="w-full md:w-[70vw] object-cover rounded-xl"
            priority
          />
        </section>

        {/* CONTENT */}
        <div className="flex flex-col md:flex-row md:gap-16 lg:gap-20">

          {/* LEFT : ARTICLE */}
          <article
            className="text-lg leading-relaxed md:w-[65%] lg:w-[68%] prose max-w-none"
            dangerouslySetInnerHTML={{ __html: doc.content }}
          />

          {/* RIGHT : CREDITS */}
          <aside className="md:w-[35%] lg:w-[32%] mt-16 md:mt-0">
            <h3 className="text-xs uppercase font-bold text-red-600 tracking-wider pb-4 border-b border-red-600">
              Credits
            </h3>

            <div className="pt-8 space-y-8 text-sm">
              {doc.credits?.map((c, i) => (
                <div key={i}>
                  <p className="text-[10px] uppercase opacity-60 mb-1 tracking-wider font-bold">
                    {c.role}
                  </p>
                  <p className="font-medium">{c.name}</p>
                </div>
              ))}

              {/* Keywords */}
              {doc.tags?.length > 0 && (
                <div>
                  <p className="text-xs uppercase font-bold text-red-600 pb-4 border-b border-red-600 tracking-wider">
                    Keywords
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">
                    {doc.tags.map((k) => (
                      <span
                        key={k}
                        className="px-4 py-2 text-[10px] uppercase border border-red-600 rounded-full tracking-wider font-medium"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
