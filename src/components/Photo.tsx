"use client";

import { useState } from "react";
import Image from "next/image";

export function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-bg-secondary ${className}`}>
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-bg-tint via-bg-secondary to-bg-secondary">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 text-accent">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
              <circle cx="12" cy="13" r="3.2" />
            </svg>
          </div>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted">
            Photo coming soon
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 430px) 100vw, 1280px"
          className={`object-cover ${imgClassName}`}
          onError={() => setFailed(true)}
          priority={priority}
          unoptimized
        />
      )}
    </div>
  );
}
