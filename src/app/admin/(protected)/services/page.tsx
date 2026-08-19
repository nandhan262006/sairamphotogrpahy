import { db } from "@/lib/db";
import { ServicesAdmin } from "./ServicesAdmin";

export const revalidate = 0;

export default async function AdminServicesPage() {
  const result = await db.execute("SELECT * FROM services ORDER BY sort_order ASC, id ASC");
  const items = result.rows.map((row) => ({
    id: Number(row.id),
    category: String(row.category),
    title: String(row.title),
    description: String(row.description),
    image_url: String(row.image_url),
    sort_order: Number(row.sort_order),
  }));

  return <ServicesAdmin initialItems={items} />;
}