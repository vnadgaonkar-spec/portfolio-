// AdminWorkPage.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { X, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ─── Sortable Image Card ───────────────────────────────────────────────────
function SortableImage({ id, url, onPreview }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag handle for image */}
      <div
        {...attributes}
        {...listeners}
        className="absolute z-10 top-3 left-3 bg-white/80 rounded-full p-1.5 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition"
      >
        <GripVertical size={14} className="text-black/60" />
      </div>

      <div
        className="overflow-hidden border border-black/5 cursor-zoom-in"
        onClick={() => onPreview(url)}
      >
        <div className="relative w-full aspect-[3/4]">
          <Image
            src={url}
            alt=""
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Sortable Work (series) Block ─────────────────────────────────────────
function SortableWork({ work, onDelete, onImagesReorder, onPreview }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: work._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const imageIds = work.images.map((img) => img.url);

  function handleImageDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = work.images.findIndex((img) => img.url === active.id);
    const newIndex = work.images.findIndex((img) => img.url === over.id);
    const reordered = arrayMove(work.images, oldIndex, newIndex);
    onImagesReorder(work._id, reordered);
  }

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {/* Series drag handle + delete */}
      <div className="flex items-center gap-3 mb-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing bg-white border border-black/10 rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs text-black/50 hover:text-black/80 transition select-none"
        >
          <GripVertical size={14} />
          Drag series
        </div>

        <button
          onClick={() => onDelete(work._id)}
          className="cursor-pointer bg-white border border-red-200 rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs text-red-500 hover:bg-red-50 transition"
        >
          <FiTrash2 size={13} />
          Delete series
        </button>
      </div>

      {/* Images inside this series */}
      <DndContext
        sensors={useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))}
        collisionDetection={closestCenter}
        onDragEnd={handleImageDragEnd}
      >
        <SortableContext items={imageIds} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {work.images.map((img) => (
              <SortableImage
                key={img.url}
                id={img.url}
                url={img.url}
                onPreview={onPreview}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function AdminWorkPage() {
  const [works, setWorks] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const fetchWorks = () => {
    setPageLoading(true);
    fetch("/api/get-all-work")
      .then((res) => res.json())
      .then((data) => {
        setWorks(data.data || []);
        setPageLoading(false);
        setIsDirty(false);
      });
  };

  useEffect(() => { fetchWorks(); }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setSelectedImg(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Reorder works (series level)
  function handleWorkDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = works.findIndex((w) => w._id === active.id);
    const newIndex = works.findIndex((w) => w._id === over.id);
    setWorks(arrayMove(works, oldIndex, newIndex));
    setIsDirty(true);
  }

  // Reorder images within a series
  function handleImagesReorder(workId, reorderedImages) {
    setWorks((prev) =>
      prev.map((w) => (w._id === workId ? { ...w, images: reorderedImages } : w))
    );
    setIsDirty(true);
  }

  // Save order to DB
  async function saveOrder() {
    setSaving(true);
    const res = await fetch("/api/admin/work/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ works }),
    });
    const data = await res.json();
    setApiMessage(data.message || "Order saved");
    setSaving(false);
    setIsDirty(false);
  }

  const deleteWork = async (id) => {
    if (!confirm("Delete this work permanently?")) return;
    const res = await fetch(`/api/admin/work/delete/${id}`, { method: "DELETE" });
    const data = await res.json();
    setApiMessage(data.message || "Work deleted");
    fetchWorks();
  };

  const workIds = works.map((w) => w._id);

  return (
    <section className="bg-[#f7f7f7] text-[#161413] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl">Work</h1>
            <p className="mt-2 text-[#161413]/60">Manage photography projects</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Save Order button — only shows when something was dragged */}
            <AnimatePresence>
              {isDirty && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={saveOrder}
                  disabled={saving}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-green-600 text-white px-8 h-11 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save Order"}
                </motion.button>
              )}
            </AnimatePresence>

            <button
              onClick={() => setShowUpload(true)}
              className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-[#1b1917] text-white px-8 h-11 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition"
            >
              <FiUpload /> Upload Work
            </button>
          </div>
        </div>

        {apiMessage && <p className="mt-6 text-sm text-green-600">{apiMessage}</p>}

        {/* Works list — series drag context */}
        {!pageLoading && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleWorkDragEnd}
          >
            <SortableContext items={workIds} strategy={verticalListSortingStrategy}>
              <div className="mt-12 space-y-16">
                {works.map((work) => (
                  <SortableWork
                    key={work._id}
                    work={work}
                    onDelete={deleteWork}
                    onImagesReorder={handleImagesReorder}
                    onPreview={setSelectedImg}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div
          className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
          onMouseDown={(e) => { if (e.target === e.currentTarget) setShowUpload(false); }}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setUploading(true);
              setApiMessage("");
              const formData = new FormData(e.currentTarget);
              const res = await fetch("/api/admin/work/upload", { method: "POST", body: formData });
              const data = await res.json();
              setApiMessage(data.message || "Upload complete");
              setUploading(false);
              setShowUpload(false);
              fetchWorks();
            }}
            className="relative w-full max-w-lg bg-[#f7f7f7] rounded-2xl p-6"
          >
            <h2 className="font-serif text-2xl mb-6">Upload Work</h2>

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
                {files.map((file, i) => <li key={i} className="truncate">{file.name}</li>)}
              </ul>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowUpload(false)}
                className="cursor-pointer px-6 h-11 rounded-full border border-black/20 text-xs font-bold uppercase tracking-widest hover:border-black/40 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="cursor-pointer px-6 h-11 rounded-full bg-[#1b1917] text-white text-xs font-bold uppercase tracking-widest disabled:opacity-60"
              >
                {uploading ? "Uploading…" : "Upload"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition cursor-pointer"
              onClick={() => setSelectedImg(null)}
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl max-h-[90vh] aspect-[3/4]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImg} alt="Preview" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}