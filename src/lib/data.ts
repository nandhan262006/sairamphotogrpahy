import { db } from "@/lib/db";

export const REVALIDATE = 60;

export interface PortfolioRow {
  id: number;
  title: string;
  category: string;
  image_url: string;
  aspect_ratio: string;
  featured: number;
  sort_order: number;
}

export interface ServiceRow {
  id: number;
  category: string;
  title: string;
  description: string;
  image_url: string;
  sort_order: number;
}

export interface CinematicRow {
  id: number;
  title: string;
  video_url: string;
  thumbnail_url: string | null;
  featured: number;
  sort_order: number;
}

export interface TestimonialRow {
  id: number;
  name: string;
  role: string;
  location: string | null;
  quote: string;
  avatar_url: string | null;
  featured: number;
  sort_order: number;
}

export async function getSettings(): Promise<Record<string, string>> {
  const result = await db.execute("SELECT key, value FROM site_settings");
  const settings: Record<string, string> = {};
  for (const row of result.rows) {
    settings[String(row.key)] = String(row.value);
  }
  return settings;
}

export async function getFeaturedPortfolio(): Promise<PortfolioRow[]> {
  const result = await db.execute(
    "SELECT * FROM portfolio WHERE featured = 1 ORDER BY sort_order ASC, id ASC"
  );
  return result.rows.map((row) => ({
    id: Number(row.id),
    title: String(row.title),
    category: String(row.category),
    image_url: String(row.image_url),
    aspect_ratio: String(row.aspect_ratio),
    featured: Number(row.featured),
    sort_order: Number(row.sort_order),
  }));
}

export async function getGalleryPortfolio(): Promise<PortfolioRow[]> {
  const result = await db.execute(
    "SELECT * FROM portfolio ORDER BY sort_order ASC, id ASC"
  );
  return result.rows.map((row) => ({
    id: Number(row.id),
    title: String(row.title),
    category: String(row.category),
    image_url: String(row.image_url),
    aspect_ratio: String(row.aspect_ratio),
    featured: Number(row.featured),
    sort_order: Number(row.sort_order),
  }));
}

export async function getServices(): Promise<ServiceRow[]> {
  const result = await db.execute("SELECT * FROM services ORDER BY sort_order ASC, id ASC");
  return result.rows.map((row) => ({
    id: Number(row.id),
    category: String(row.category),
    title: String(row.title),
    description: String(row.description),
    image_url: String(row.image_url),
    sort_order: Number(row.sort_order),
  }));
}

export async function getCinematics(): Promise<CinematicRow[]> {
  const result = await db.execute("SELECT * FROM cinematics ORDER BY sort_order ASC, id ASC");
  return result.rows.map((row) => ({
    id: Number(row.id),
    title: String(row.title),
    video_url: String(row.video_url),
    thumbnail_url: row.thumbnail_url ? String(row.thumbnail_url) : null,
    featured: Number(row.featured),
    sort_order: Number(row.sort_order),
  }));
}

export async function getFeaturedCinematics(): Promise<CinematicRow[]> {
  const result = await db.execute(
    "SELECT * FROM cinematics WHERE featured = 1 ORDER BY sort_order ASC, id ASC"
  );
  return result.rows.map((row) => ({
    id: Number(row.id),
    title: String(row.title),
    video_url: String(row.video_url),
    thumbnail_url: row.thumbnail_url ? String(row.thumbnail_url) : null,
    featured: Number(row.featured),
    sort_order: Number(row.sort_order),
  }));
}

export async function getTestimonials(): Promise<TestimonialRow[]> {
  const result = await db.execute(
    "SELECT * FROM testimonials WHERE featured = 1 ORDER BY sort_order ASC, id ASC"
  );
  return result.rows.map((row) => ({
    id: Number(row.id),
    name: String(row.name),
    role: String(row.role),
    location: row.location ? String(row.location) : null,
    quote: String(row.quote),
    avatar_url: row.avatar_url ? String(row.avatar_url) : null,
    featured: Number(row.featured),
    sort_order: Number(row.sort_order),
  }));
}

export async function getAllTestimonials(): Promise<TestimonialRow[]> {
  const result = await db.execute(
    "SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC"
  );
  return result.rows.map((row) => ({
    id: Number(row.id),
    name: String(row.name),
    role: String(row.role),
    location: row.location ? String(row.location) : null,
    quote: String(row.quote),
    avatar_url: row.avatar_url ? String(row.avatar_url) : null,
    featured: Number(row.featured),
    sort_order: Number(row.sort_order),
  }));
}