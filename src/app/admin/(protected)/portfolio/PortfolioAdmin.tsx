"use client";

import { useState } from "react";
import { UploadButton } from "@/components/admin/UploadButton";

const CATEGORIES = ["portrait", "wedding", "events", "commercial", "fashion"];

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
  aspect_ratio: string;
  featured: number;
  sort_order: number;
}

interface PortfolioAdminProps {
  initialItems: PortfolioItem[];
}

export function PortfolioAdmin({ initialItems }: PortfolioAdminProps) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  async function toggleFeatured(item: PortfolioItem) {
    const next = { ...item, featured: item.featured === 1 ? 0 : 1 };
    setItems((prev) => prev.map((i) => (i.id === item.id ? next : i)));
    try {
      const res = await fetch(`/api/portfolio/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: next.title,
          category: next.category,
          image_url: next.image_url,
          aspect_ratio: next.aspect_ratio,
          featured: next.featured,
          sort_order: next.sort_order,
        }),
      });
      if (!res.ok) throw new Error("Failed to update");
    } catch {
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    }
  }

  async function handleDelete(item: PortfolioItem) {
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    try {
      await fetch(`/api/portfolio/${item.id}?imageUrl=${encodeURIComponent(item.image_url)}`, {
        method: "DELETE",
      });
    } catch {
      setItems((prev) => [...prev, item]);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Portfolio</h1>
          <p className="mt-1 text-sm text-muted">
            <span className="font-semibold text-accent">Featured</span> photos show on the
            homepage grid. Others appear on the Gallery page.
          </p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="rounded-lg bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-deep"
        >
          + Add Photo
        </button>
      </div>

      {adding ? (
        <div className="mt-6 rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">Add New Photo</h2>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            <UploadButton
              folder="portfolio"
              fileType="image"
              label="Choose image"
              onUploaded={(url) => {
                setEditing({
                  id: 0,
                  title: "New Photo",
                  category: "portrait",
                  image_url: url,
                  aspect_ratio: "4/5",
                  featured: 1,
                  sort_order: items.length,
                });
                setAdding(false);
              }}
            />
            <span className="text-xs text-muted">
              PNG, JPG, or WEBP up to 15 MB
            </span>
          </div>
        </div>
      ) : null}

      {editing ? (
        <div className="mt-6 rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">
            {editing.id === 0 ? "New Photo" : "Edit Photo"}
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
              <label className="mb-1.5 block text-xs font-semibold">Category</label>
              <select
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold">Aspect Ratio</label>
              <select
                value={editing.aspect_ratio}
                onChange={(e) => setEditing({ ...editing, aspect_ratio: e.target.value })}
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
              >
                <option value="4/5">4/5 (portrait)</option>
                <option value="1/1">1/1 (square)</option>
                <option value="3/2">3/2 (landscape)</option>
                <option value="16/9">16/9 (wide)</option>
                <option value="1440/1746">1440/1746</option>
              </select>
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
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold">Image</label>
              <div className="flex flex-wrap items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={editing.image_url}
                  alt="Preview"
                  className="h-20 w-20 rounded-lg border border-line object-cover"
                />
                <UploadButton
                  folder="portfolio"
                  fileType="image"
                  currentUrl={editing.image_url}
                  onUploaded={(url) => setEditing({ ...editing, image_url: url })}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <button
              onClick={async () => {
                if (!editing.title || !editing.image_url) return;
                setLoading(true);
                try {
                  if (editing.id === 0) {
                    const res = await fetch("/api/portfolio", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(editing),
                    });
                    const data = await res.json();
                    const saved = {
                      ...editing,
                      id: Number(data.id),
                      featured: 1,
                    };
                    setItems((prev) => [...prev, saved]);
                  } else {
                    const prevImage = items.find((i) => i.id === editing.id)?.image_url;
                    await fetch(`/api/portfolio/${editing.id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ ...editing, previousImage: prevImage }),
                    });
                    setItems((prev) =>
                      prev.map((i) => (i.id === editing.id ? editing : i))
                    );
                  }
                  setEditing(null);
                } catch {
                  alert("Failed to save photo");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
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
            <div className="relative aspect-[4/3] overflow-hidden bg-bg-secondary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image_url}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <span
                className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${
                  item.featured === 1 ? "bg-accent" : "bg-black/60"
                }`}
              >
                {item.featured === 1 ? "Featured" : "Gallery"}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <p className="text-xs capitalize text-muted">{item.category}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleFeatured(item)}
                    title={item.featured === 1 ? "Move to Gallery" : "Feature on homepage"}
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
    </div>
  );
}