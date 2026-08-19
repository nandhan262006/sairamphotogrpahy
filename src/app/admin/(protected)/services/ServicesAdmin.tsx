"use client";

import { useState } from "react";
import { UploadButton } from "@/components/admin/UploadButton";

interface ServiceItem {
  id: number;
  category: string;
  title: string;
  description: string;
  image_url: string;
  sort_order: number;
}

interface ServicesAdminProps {
  initialItems: ServiceItem[];
}

export function ServicesAdmin({ initialItems }: ServicesAdminProps) {
  const [items, setItems] = useState<ServiceItem[]>(initialItems);
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleDelete(item: ServiceItem) {
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    try {
      await fetch(`/api/services/${item.id}?imageUrl=${encodeURIComponent(item.image_url)}`, {
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
          <h1 className="text-xl font-bold tracking-tight">Services</h1>
          <p className="mt-1 text-sm text-muted">
            Manage the service cards shown on your homepage.
          </p>
        </div>
        <button
          onClick={() => {
            setEditing({
              id: 0,
              category: "",
              title: "",
              description: "",
              image_url: "",
              sort_order: items.length,
            });
          }}
          className="rounded-lg bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-deep"
        >
          + Add Service
        </button>
      </div>

      {editing ? (
        <div className="mt-6 rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">
            {editing.id === 0 ? "Add New Service" : "Edit Service"}
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
              <input
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
                placeholder="e.g. Wedding, Model, Family"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold">Description</label>
              <textarea
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                rows={3}
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
              <label className="mb-1.5 block text-xs font-semibold">Image</label>
              <div className="flex flex-wrap items-center gap-3">
                {editing.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={editing.image_url}
                    alt="Preview"
                    className="h-20 w-20 rounded-lg border border-line object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-dashed border-line bg-bg-secondary text-[10px] text-muted">
                    No image
                  </div>
                )}
                <UploadButton
                  folder="services"
                  fileType="image"
                  currentUrl={editing.image_url || null}
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
                    const res = await fetch("/api/services", {
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
                    const prevImage = items.find((i) => i.id === editing.id)?.image_url;
                    await fetch(`/api/services/${editing.id}`, {
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
                  alert("Failed to save service");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading || !editing.image_url}
              className="rounded-lg bg-accent px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-accent-deep disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setEditing(null);
              }}
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
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold">{item.title}</h3>
              <p className="mt-1 text-xs text-muted line-clamp-2">{item.description}</p>
              <div className="mt-3 flex items-center gap-2">
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
        ))}
      </div>
    </div>
  );
}