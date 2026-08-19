"use client";

import { useState } from "react";
import { UploadButton } from "@/components/admin/UploadButton";

interface Settings {
  hero_image?: string;
  about_image?: string;
}

export function SiteSettingsClient({ initialSettings }: { initialSettings: Settings }) {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  async function saveSetting(key: string, value: string, previousValue?: string) {
    setSaving(key);
    setSaved(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value, previousValue }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSettings((s) => ({ ...s, [key]: value }));
      setSaved(key);
      setTimeout(() => setSaved(null), 3000);
    } catch {
      alert("Failed to save setting");
    } finally {
      setSaving(null);
    }
  }

  const sections = [
    {
      key: "hero_image",
      title: "Hero Image",
      desc: "The large image on the homepage hero section",
      current: settings.hero_image,
    },
    {
      key: "about_image",
      title: "About Image",
      desc: "The photo of Sairam shown in the About sections",
      current: settings.about_image,
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight">Site Settings</h1>
      <p className="mt-1 text-sm text-muted">
        Update the main images used across your website.
      </p>

      <div className="mt-6 space-y-6">
        {sections.map((section) => (
          <div
            key={section.key}
            className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 md:flex-row md:items-start"
          >
            <div className="md:w-72">
              <h2 className="font-bold">{section.title}</h2>
              <p className="mt-1 text-sm text-muted">{section.desc}</p>
            </div>
            <div className="flex-1">
              {section.current ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={section.current}
                  alt={section.title}
                  className="h-48 w-full max-w-xs rounded-xl border border-line object-cover"
                />
              ) : (
                <div className="flex h-48 w-full max-w-xs items-center justify-center rounded-xl border border-dashed border-line bg-bg-secondary text-sm text-muted">
                  No image set
                </div>
              )}
            </div>
            <div className="flex flex-col items-start gap-2 md:items-end">
              <UploadButton
                folder="site"
                fileType="image"
                currentUrl={section.current}
                onUploaded={(url) => saveSetting(section.key, url, section.current)}
              />
              {saving === section.key ? (
                <span className="text-xs font-medium text-accent">Saving...</span>
              ) : saved === section.key ? (
                <span className="text-xs font-medium text-green-600">Saved ✓</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}