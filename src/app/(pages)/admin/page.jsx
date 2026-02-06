"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)] px-6 py-24">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-20 flex items-start justify-between">
          <div>
            <p className="text-xs tracking-widest uppercase mb-4">Admin</p>
            <h1 className="font-serif text-4xl">Studio Management</h1>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="
              px-4 py-2
              text-sm uppercase font-semibold tracking-widest
              border-black border rounded-full
              text-black/70 hover:text-black hover:border-black/30
              cursor-pointer transition
            "
          >
            Logout
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Work Photos */}
          <Link
            href="/admin/work/photos"
            className="block text-left border border-black/10 p-10 hover:border-black/30 transition cursor-pointer"
          >
            <h2 className="font-serif text-2xl mb-3">Work · Photos</h2>
            <p className="text-sm leading-relaxed text-black/70">
              Manage photography projects, view galleries, and curate the work
              archive shown on the website.
            </p>
            <p className="text-xs tracking-widest uppercase mt-10">
              View & Manage
            </p>
          </Link>

          {/* Work Videos */}
          <Link
            href="/admin/work/videos"
            className="block text-left border border-black/10 p-10 hover:border-black/30 transition cursor-pointer"
          >
            <h2 className="font-serif text-2xl mb-3">Work · Videos</h2>
            <p className="text-sm leading-relaxed text-black/70">
              Upload, manage, and curate cinematic videos, reels, and motion
              work displayed on the website.
            </p>
            <p className="text-xs tracking-widest uppercase mt-10">
              View & Manage
            </p>
          </Link>

          {/* Documentary */}
          <Link
            href="/admin/documentary"
            className="block text-left border border-black/10 p-10 hover:border-black/30 transition cursor-pointer"
          >
            <h2 className="font-serif text-2xl mb-3">Documentary</h2>
            <p className="text-sm leading-relaxed text-black/70">
              Create, edit, and publish long-form documentary stories with
              credits, tags, and editorial content.
            </p>
            <p className="text-xs tracking-widest uppercase mt-10">
              View & Manage
            </p>
          </Link>

          {/* Magazine */}
          <Link
            href="/admin/magazine"
            className="block text-left border border-black/10 p-10 hover:border-black/30 transition cursor-pointer"
          >
            <h2 className="font-serif text-2xl mb-3">Magazine</h2>
            <p className="text-sm leading-relaxed text-black/70">
              Manage magazine features, cover images, and editorial issues
              published on the website.
            </p>
            <p className="text-xs tracking-widest uppercase mt-10">
              View & Manage
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}