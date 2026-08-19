"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Site Settings", href: "/admin/site-settings" },
  { label: "Portfolio", href: "/admin/portfolio" },
  { label: "Services", href: "/admin/services" },
  { label: "Cinematics", href: "/admin/cinematics" },
  { label: "Testimonials", href: "/admin/testimonials" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2.5">
              <Image
                src="/images/logo.png"
                alt="Sairam Photography"
                width={387}
                height={197}
                className="h-8 w-auto"
                priority
                unoptimized
              />
              <span className="text-sm font-bold tracking-tight">Sairam Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.sairamphotograph.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded border border-line px-3 py-1.5 text-xs font-semibold text-text transition-colors hover:border-accent hover:text-accent sm:flex"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
              </svg>
              View Live Site
            </a>
            <button
              onClick={handleLogout}
              className="rounded border border-line px-3 py-1.5 text-xs font-semibold text-text transition-colors hover:border-red-400 hover:text-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row">
        <aside className="lg:w-56 lg:shrink-0">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="Admin sections">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-white"
                      : "text-muted hover:bg-white hover:text-text"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}