import { db } from "@/lib/db";
import { CinematicsAdmin } from "./CinematicsAdmin";

export const revalidate = 0;

export default async function AdminCinematicsPage() {
  const result = await db.execute("SELECT * FROM cinematics ORDER BY sort_order ASC, id ASC");
  const items = result.rows.map((row) => ({
    id: Number(row.id),
    title: String(row.title),
    video_url: String(row.video_url),
    thumbnail_url: row.thumbnail_url ? String(row.thumbnail_url) : null,
    featured: Number(row.featured),
    sort_order: Number(row.sort_order),
  }));

  return <CinematicsAdmin initialItems={items} />;
}