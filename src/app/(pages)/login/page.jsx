"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-light)] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Micro label */}
        <p className="text-xs tracking-widest uppercase mb-4">
          Studio Access
        </p>

        {/* Heading */}
        <h1 className="font-serif text-4xl mb-12">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Error */}
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Username */}
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-b border-black/20 py-2 outline-none focus:border-black"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-black/20 py-2 outline-none focus:border-black"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 inline-block bg-[var(--accent)] text-white px-8 py-3 text-sm tracking-widest uppercase disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
