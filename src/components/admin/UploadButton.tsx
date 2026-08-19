"use client";

import { useRef, useState } from "react";

const IMAGE_LIMIT = 15 * 1024 * 1024;
const VIDEO_LIMIT = 200 * 1024 * 1024;

interface UploadButtonProps {
  folder: string;
  fileType: "image" | "video";
  label?: string;
  currentUrl?: string | null;
  onUploaded: (publicUrl: string) => void;
  className?: string;
}

function uploadWithProgress(
  url: string,
  file: File,
  onProgress: (pct: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`Upload failed (HTTP ${xhr.status})`));
    };
    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.ontimeout = () => reject(new Error("Upload timed out"));
    xhr.send(file);
  });
}

export function UploadButton({
  folder,
  fileType,
  label,
  currentUrl,
  onUploaded,
  className,
}: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const maxSize = fileType === "image" ? IMAGE_LIMIT : VIDEO_LIMIT;
  const accept = fileType === "image" ? ".jpg,.jpeg,.png,.webp" : ".mp4,.mov,.webm";

  async function handleFile(file: File) {
    setError("");
    if (file.size > maxSize) {
      setError(`File too large. Max ${fileType === "image" ? "15 MB" : "200 MB"}.`);
      return;
    }

    setUploading(true);
    setProgress(0);
    try {
      const res = await fetch("/api/upload/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          folder,
          fileType,
          size: file.size,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to get upload URL");
      }

      const { uploadUrl, publicUrl } = await res.json();

      await uploadWithProgress(uploadUrl, file, setProgress);

      onUploaded(publicUrl);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className={
          className ||
          "flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2 text-xs font-semibold text-text transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
        }
      >
        {uploading ? (
          <>
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            Uploading {progress}%
          </>
        ) : currentUrl ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="M17 8l-5-5-5 5" />
              <path d="M12 3v12" />
            </svg>
            Replace
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="M17 8l-5-5-5 5" />
              <path d="M12 3v12" />
            </svg>
            {label || "Upload"}
          </>
        )}
      </button>
      {uploading ? (
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-bg-secondary">
          <div
            className="h-full bg-accent transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : null}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {error ? <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p> : null}
    </div>
  );
}