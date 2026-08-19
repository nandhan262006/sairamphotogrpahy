import { db } from "@/lib/db";
import { PortfolioAdmin } from "./PortfolioAdmin";

export const revalidate = 0;

export default async function AdminPortfolioPage() {
  const result = await db.execute(
    "SELECT * FROM portfolio ORDER BY featured DESC, sort_order ASC, id ASC"
  );
  const items = result.rows.map((row) => ({
    id: Number(row.id),
    title: String(row.title),
    category: String(row.category),
    image_url: String(row.image_url),
    aspect_ratio: String(row.aspect_ratio),
    featured: Number(row.featured),
    sort_order: Number(row.sort_order),
  }));

  return <PortfolioAdmin initialItems={items} />;
}