"use client";

import { useState } from "react";
import { UploadButton } from "@/components/admin/UploadButton";

interface CinematicItem {
  id: number;
  title: string;
  video_url: string;
  thumbnail_url: string | null;
  featured: number;
  sort_order: number;
}

interface CinematicsAdminProps {
  initialItems: CinematicItem[];
}

export function CinematicsAdmin({ initialItems }: CinematicsAdminProps) {
  const [items, setItems] = useState<CinematicItem[]>(initialItems);
  const [editing, setEditing] = useState<CinematicItem | null>(null);
  const [preview, setPreview] = useState<CinematicItem | null>(null);
  const [loading, setLoading] = useState(false);

  async function toggleFeatured(item: CinematicItem) {
    const next = { ...item, featured: item.featured === 1 ? 0 : 1 };
    setItems((prev) => prev.map((i) => (i.id === item.id ? next : i)));
    try {
      const res = await fetch(`/api/cinematics/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: next.title,
          video_url: next.video_url,
          thumbnail_url: next.thumbnail_url,
          featured: next.featured,
          sort_order: next.sort_order,
        }),
      });
      if (!res.ok) throw new Error("Failed to update");
    } catch {
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    }
  }

  async function handleDelete(item: CinematicItem) {
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    try {
      await fetch(
        `/api/cinematics/${item.id}?videoUrl=${encodeURIComponent(item.video_url)}${
          item.thumbnail_url ? `&thumbnailUrl=${encodeURIComponent(item.thumbnail_url)}` : ""
        }`,
        { method: "DELETE" }
      );
    } catch {
      setItems((prev) => [...prev, item]);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Cinematics</h1>
          <p className="mt-1 text-sm text-muted">
            Wedding films and cinematic videos shown on your website.
          </p>
        </div>
        <button
          onClick={() =>
            setEditing({
              id: 0,
              title: "",
              video_url: "",
              thumbnail_url: null,
              featured: 1,
              sort_order: items.length,
            })
          }
          className="rounded-lg bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-deep"
        >
          + Add Film
        </button>
      </div>

      {editing ? (
        <div className="mt-6 rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">
            {editing.id === 0 ? "Add New Film" : "Edit Film"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold">Title</label>
              <input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold">Sort Order</label>
              <input
                type="number"
                value={editing.sort_order}
                onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold">Video</label>
              <div className="flex flex-wrap items-center gap-3">
                {editing.video_url ? (
                  <video
                    src={editing.video_url}
                    className="h-20 w-32 rounded-lg border border-line object-cover"
                    muted
                    preload="metadata"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="flex h-20 w-32 items-center justify-center rounded-lg border border-dashed border-line bg-bg-secondary text-[10px] text-muted">
                    No video
                  </div>
                )}
                <UploadButton
                  folder="cinematics"
                  fileType="video"
                  currentUrl={editing.video_url || null}
                  label="Upload video"
                  onUploaded={(url) => setEditing({ ...editing, video_url: url })}
                />
              </div>
              <p className="mt-1.5 text-xs text-muted">
                MP4, MOV, or WEBM up to 200 MB
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold">Thumbnail (poster)</label>
              <div className="flex flex-wrap items-center gap-3">
                {editing.thumbnail_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={editing.thumbnail_url}
                    alt="Thumbnail"
                    className="h-20 w-20 rounded-lg border border-line object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-dashed border-line bg-bg-secondary text-[10px] text-muted">
                    No thumb
                  </div>
                )}
                <UploadButton
                  folder="cinematics"
                  fileType="image"
                  currentUrl={editing.thumbnail_url}
                  label="Upload thumbnail"
                  onUploaded={(url) => setEditing({ ...editing, thumbnail_url: url })}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <button
              onClick={async () => {
                if (!editing.title || !editing.video_url) return;
                setLoading(true);
                try {
                  if (editing.id === 0) {
                    const res = await fetch("/api/cinematics", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(editing),
                    });
                    const data = await res.json();
                    setItems((prev) => [
                      ...prev,
                      { ...editing, id: Number(data.id) },
                    ]);
                  } else {
                    const prev = items.find((i) => i.id === editing.id);
                    await fetch(`/api/cinematics/${editing.id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        ...editing,
                        previousVideo: prev?.video_url,
                        previousThumbnail: prev?.thumbnail_url,
                      }),
                    });
                    setItems((prev) =>
                      prev.map((i) => (i.id === editing.id ? editing : i))
                    );
                  }
                  setEditing(null);
                } catch {
                  alert("Failed to save film");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading || !editing.video_url}
              className="rounded-lg bg-accent px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-accent-deep disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="rounded-lg border border-line px-4 py-2 text-xs font-bold text-muted hover:text-text"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-line bg-white"
          >
            <button
              type="button"
              onClick={() => setPreview(item)}
              aria-label={`Preview ${item.title}`}
              className="relative block aspect-video w-full overflow-hidden bg-bg-secondary"
            >
              {item.thumbnail_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.thumbnail_url}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <video
                  src={`${item.video_url}#t=0.5`}
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  preload="auto"
                  crossOrigin="anonymous"
                />
              )}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">{item.title}</h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleFeatured(item)}
                    title={item.featured === 1 ? "Hide from homepage" : "Show on homepage"}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${
                      item.featured === 1
                        ? "bg-accent text-white hover:bg-accent-deep"
                        : "bg-bg-secondary text-muted hover:bg-bg-tint hover:text-accent"
                    }`}
                  >
                    {item.featured === 1 ? "★ Featured" : "☆ Feature"}
                  </button>
                  <button
                    onClick={() => setEditing(item)}
                    className="rounded-lg border border-line px-2.5 py-1.5 text-xs font-bold text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="rounded-lg border border-line px-2.5 py-1.5 text-xs font-bold text-muted transition-colors hover:border-red-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {preview ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setPreview(null)}
        >
          <button
            type="button"
            aria-label="Close preview"
            onClick={() => setPreview(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white hover:border-accent hover:text-accent"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 2l12 12M14 2L2 14" />
            </svg>
          </button>
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <video
              src={preview.video_url}
              className="max-h-[80vh] w-full rounded-xl bg-black"
              controls
              autoPlay
              playsInline
              crossOrigin="anonymous"
            />
            <p className="mt-3 text-center text-sm font-semibold text-white">
              {preview.title}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}