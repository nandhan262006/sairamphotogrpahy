import Link from "next/link";
import { db } from "@/lib/db";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [portfolio, services, cinematics, testimonials] = await Promise.all([
    db.execute("SELECT COUNT(*) as count FROM portfolio"),
    db.execute("SELECT COUNT(*) as count FROM services"),
    db.execute("SELECT COUNT(*) as count FROM cinematics"),
    db.execute("SELECT COUNT(*) as count FROM testimonials"),
  ]);

  const cards = [
    {
      title: "Portfolio",
      count: Number(portfolio.rows[0].count),
      href: "/admin/portfolio",
      desc: "Gallery photos with featured toggle",
      icon: "🖼️",
    },
    {
      title: "Services",
      count: Number(services.rows[0].count),
      href: "/admin/services",
      desc: "Service cards with images",
      icon: "📸",
    },
    {
      title: "Cinematics",
      count: Number(cinematics.rows[0].count),
      href: "/admin/cinematics",
      desc: "Wedding films & videos",
      icon: "🎬",
    },
    {
      title: "Testimonials",
      count: Number(testimonials.rows[0].count),
      href: "/admin/testimonials",
      desc: "Client reviews & quotes",
      icon: "💬",
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Manage photos, videos, and content across your website.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/site-settings"
          className="group rounded-2xl border border-line bg-white p-5 transition-all hover:border-accent hover:shadow-sm"
        >
          <span className="text-2xl">⚙️</span>
          <h2 className="mt-3 font-bold">Site Settings</h2>
          <p className="mt-1 text-sm text-muted">
            Update the hero and about page images
          </p>
          <span className="mt-3 inline-block text-xs font-bold text-accent">
            Manage →
          </span>
        </Link>

        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group rounded-2xl border border-line bg-white p-5 transition-all hover:border-accent hover:shadow-sm"
          >
            <div className="flex items-start justify-between">
              <span className="text-2xl">{card.icon}</span>
              <span className="rounded-full bg-bg-tint px-3 py-1 text-xs font-bold text-accent">
                {card.count} items
              </span>
            </div>
            <h2 className="mt-3 font-bold">{card.title}</h2>
            <p className="mt-1 text-sm text-muted">{card.desc}</p>
            <span className="mt-3 inline-block text-xs font-bold text-accent">
              Manage →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}