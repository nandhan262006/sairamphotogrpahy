import { db } from "@/lib/db";
import { TestimonialsAdmin } from "./TestimonialsAdmin";

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const result = await db.execute("SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC");
  const items = result.rows.map((row) => ({
    id: Number(row.id),
    name: String(row.name),
    role: String(row.role),
    location: row.location ? String(row.location) : null,
    quote: String(row.quote),
    avatar_url: row.avatar_url ? String(row.avatar_url) : null,
    featured: Number(row.featured),
    sort_order: Number(row.sort_order),
  }));

  return <TestimonialsAdmin initialItems={items} />;
}