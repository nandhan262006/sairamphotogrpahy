export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
  aspect_ratio: string;
  featured: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceItem {
  id: number;
  category: string;
  title: string;
  description: string;
  image_url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CinematicItem {
  id: number;
  title: string;
  video_url: string;
  thumbnail_url: string | null;
  featured: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  location: string | null;
  quote: string;
  avatar_url: string | null;
  featured: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type Section = "portfolio" | "services" | "cinematics" | "testimonials";
