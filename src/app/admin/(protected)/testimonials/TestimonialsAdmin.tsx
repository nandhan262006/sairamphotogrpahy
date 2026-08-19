"use client";

import { useState } from "react";
import { UploadButton } from "@/components/admin/UploadButton";

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  location: string | null;
  quote: string;
  avatar_url: string | null;
  featured: number;
  sort_order: number;
}

interface TestimonialsAdminProps {
  initialItems: TestimonialItem[];
}

export function TestimonialsAdmin({ initialItems }: TestimonialsAdminProps) {
  const [items, setItems] = useState<TestimonialItem[]>(initialItems);
  const [editing, setEditing] = useState<TestimonialItem | null>(null);
  const [loading, setLoading] = useState(false);

  async function toggleFeatured(item: TestimonialItem) {
    const next = { ...item, featured: item.featured === 1 ? 0 : 1 };
    setItems((prev) => prev.map((i) => (i.id === item.id ? next : i)));
    try {
      const res = await fetch(`/api/testimonials/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: next.name,
          role: next.role,
          location: next.location,
          quote: next.quote,
          avatar_url: next.avatar_url,
          featured: next.featured,
          sort_order: next.sort_order,
        }),
      });
      if (!res.ok) throw new Error("Failed to update");
    } catch {
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    }
  }

  async function handleDelete(item: TestimonialItem) {
    if (!confirm(`Delete testimonial from "${item.name}"?`)) return;
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    try {
      await fetch(
        `/api/testimonials/${item.id}${
          item.avatar_url ? `?avatarUrl=${encodeURIComponent(item.avatar_url)}` : ""
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
          <h1 className="text-xl font-bold tracking-tight">Testimonials</h1>
          <p className="mt-1 text-sm text-muted">
            Client reviews and quotes shown in the testimonial marquee.
          </p>
        </div>
        <button
          onClick={() =>
            setEditing({
              id: 0,
              name: "",
              role: "",
              location: "",
              quote: "",
              avatar_url: null,
              featured: 1,
              sort_order: items.length,
            })
          }
          className="rounded-lg bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-deep"
        >
          + Add Testimonial
        </button>
      </div>

      {editing ? (
        <div className="mt-6 rounded-2xl border border-line bg-white p-6">
          <h2 className="font-bold">
            {editing.id === 0 ? "Add New Testimonial" : "Edit Testimonial"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold">Name</label>
              <input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold">Role</label>
              <input
                value={editing.role}
                onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
                placeholder="e.g. Wedding Client"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold">Location</label>
              <input
                value={editing.location || ""}
                onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
                placeholder="e.g. Rajamahendravaram"
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
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold">Quote</label>
              <textarea
                value={editing.quote}
                onChange={(e) => setEditing({ ...editing, quote: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold">Client Photo (optional)</label>
              <div className="flex flex-wrap items-center gap-3">
                {editing.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={editing.avatar_url}
                    alt="Avatar"
                    className="h-14 w-14 rounded-full border border-line object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-line bg-bg-secondary text-[10px] text-muted">
                    No photo
                  </div>
                )}
                <UploadButton
                  folder="testimonials"
                  fileType="image"
                  currentUrl={editing.avatar_url}
                  label="Upload photo"
                  onUploaded={(url) => setEditing({ ...editing, avatar_url: url })}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <button
              onClick={async () => {
                if (!editing.name || !editing.quote) return;
                setLoading(true);
                try {
                  if (editing.id === 0) {
                    const res = await fetch("/api/testimonials", {
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
                    await fetch(`/api/testimonials/${editing.id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        ...editing,
                        previousAvatar: prev?.avatar_url,
                      }),
                    });
                    setItems((prev) =>
                      prev.map((i) => (i.id === editing.id ? editing : i))
                    );
                  }
                  setEditing(null);
                } catch {
                  alert("Failed to save testimonial");
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

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-line bg-white p-5"
          >
            <div className="flex items-start gap-4">
              {item.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.avatar_url}
                  alt={item.name}
                  className="h-12 w-12 shrink-0 rounded-full border border-line object-cover"
                />
              ) : (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-bg-tint text-lg font-bold text-accent">
                  {item.name.charAt(0)}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold">{item.name}</h3>
                    <p className="text-xs text-muted">
                      {item.role}
                      {item.location ? ` · ${item.location}` : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleFeatured(item)}
                    title={item.featured === 1 ? "Hide from site" : "Show on site"}
                    className={`rounded-lg px-2 py-1 text-xs font-bold transition-colors ${
                      item.featured === 1
                        ? "bg-accent text-white hover:bg-accent-deep"
                        : "bg-bg-secondary text-muted hover:bg-bg-tint hover:text-accent"
                    }`}
                  >
                    {item.featured === 1 ? "★ Active" : "☆ Inactive"}
                  </button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  &ldquo;{item.quote}&rdquo;
                </p>
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
          </div>
        ))}
      </div>
    </div>
  );
}