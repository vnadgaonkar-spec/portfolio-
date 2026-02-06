"use client";

import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Trash2, Upload, Image as ImageIcon } from "lucide-react";

export default function AdminDocumentaryUploadPage() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const [credits, setCredits] = useState([
    { role: "Lead Photographer", name: "" },
    { role: "Writer", name: "" },
  ]);
  const [tags, setTags] = useState(["Nomads", "Culture", "Steppe"]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handlePublish = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("location", location);
      formData.append("content", content);
      formData.append("credits", JSON.stringify(credits));
      formData.append("tags", JSON.stringify(tags));

      images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await fetch("/api/admin/documentary/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setMessage("Documentary published successfully 🎉");
      setImages([]);
      setTitle("");
      setSubject("");
      setLocation("");
      setContent("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#f6f6f8] min-h-screen flex justify-center py-14">
      <div className="max-w-[960px] w-full px-6 space-y-10 text-slate-900">
        {/* Heading */}
        <div>
          <h1 className="text-4xl font-extrabold font-serif">
            Add New Documentary Story
          </h1>
          <p className="text-slate-500 mt-2">
            Create and curate a photography editorial.
          </p>
        </div>

        {/* Status */}
        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Story Info */}
        <section className="bg-white rounded-xl border p-6 space-y-6">
          <h2 className="text-xl font-bold font-serif">Story Information</h2>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-12 px-4 border rounded-full"
            placeholder="Story title"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="h-12 px-4 border rounded-full"
              placeholder="Subject"
            />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 px-4 border rounded-full"
              placeholder="Location"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <label className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-black/5 w-fit">
              <Upload size={16} />
              <span className="text-sm font-medium">Upload Images</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => setImages(Array.from(e.target.files))}
              />
            </label>

            {images.length > 0 && (
              <div className="space-y-2">
                {images.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <ImageIcon size={14} />
                    <span>{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Editor */}
        <section className="bg-white rounded-xl border p-4">
          <h2 className="text-xl font-bold font-serif mb-4">Story Content</h2>

          <Editor
            tinymceScriptSrc="/tinymce/tinymce.min.js"
            value={content}
            onEditorChange={(value) => setContent(value)}
            init={{
              license_key: "gpl",
              height: 400,
              menubar: false,
              branding: false,
              plugins: ["lists", "link", "blockquote", "code"],
              toolbar:
                "bold italic | blockquote | bullist numlist | link | undo redo",
              content_style:
                "body { font-family: Georgia, serif; font-size:16px }",
            }}
          />
        </section>

        {/* Credits */}
        <section className="bg-white rounded-xl border p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold font-serif">Story Credits</h2>
            <button
              onClick={() => setCredits([...credits, { role: "", name: "" }])}
              className="text-sm hover:underline"
            >
              + Add another credit
            </button>
          </div>

          {credits.map((credit, index) => (
            <div key={index} className="border rounded-xl p-4 space-y-4">
              {/* Row with delete icon */}
              <div className="flex justify-end">
                <button
                  onClick={() =>
                    setCredits(credits.filter((_, i) => i !== index))
                  }
                  className="text-gray-400 hover:text-red-500 transition"
                  aria-label="Delete credit"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Role */}
              <input
                className="w-full h-12 px-4 border rounded-full"
                placeholder="Role"
                value={credit.role}
                onChange={(e) => {
                  const copy = [...credits];
                  copy[index].role = e.target.value;
                  setCredits(copy);
                }}
              />

              {/* Name */}
              <input
                className="w-full h-12 px-4 border rounded-full"
                placeholder="Full name"
                value={credit.name}
                onChange={(e) => {
                  const copy = [...credits];
                  copy[index].name = e.target.value;
                  setCredits(copy);
                }}
              />
            </div>
          ))}
        </section>
        {/* Tags */}
        <section className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-xl font-bold font-serif">Keywords & Tags</h2>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 text-sm"
              >
                {tag}
                <button
                  onClick={() => setTags(tags.filter((_, x) => x !== i))}
                  className="text-black/60 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          <input
            className="w-full h-12 px-4 border rounded-full"
            placeholder="Type a tag and press enter..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                setTags([...tags, e.target.value.trim()]);
                e.target.value = "";
              }
            }}
          />
        </section>

        {/* Actions */}
        <div className="flex justify-end">
          <button
            onClick={handlePublish}
            disabled={loading}
            className="px-8 py-3 bg-black text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Publishing…" : "Publish Documentary"}
          </button>
        </div>
      </div>
    </main>
  );
}
