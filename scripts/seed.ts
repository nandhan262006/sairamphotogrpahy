import { db } from "../src/lib/db";
import { r2, getPublicUrl } from "../src/lib/r2";
import { PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";
import { join } from "path";
import { hash } from "bcryptjs";

const BUCKET = process.env.R2_BUCKET!;

async function objectExists(key: string): Promise<boolean> {
  try {
    await r2.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function uploadToR2(localPath: string, r2Key: string): Promise<string> {
  if (await objectExists(r2Key)) {
    console.log(`  exists, skipping: ${r2Key}`);
    return getPublicUrl(r2Key);
  }
  const file = readFileSync(localPath);
  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: r2Key,
      Body: file,
      ContentType: getContentType(r2Key),
    })
  );
  return getPublicUrl(r2Key);
}

function getContentType(key: string): string {
  if (key.endsWith(".mp4")) return "video/mp4";
  if (key.endsWith(".webm")) return "video/webm";
  if (key.endsWith(".png")) return "image/png";
  if (key.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

async function main() {
  console.log("Creating tables...");

  await db.batch([
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS portfolio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT NOT NULL,
      aspect_ratio TEXT DEFAULT '4/5',
      featured INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS cinematics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      video_url TEXT NOT NULL,
      thumbnail_url TEXT,
      featured INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      location TEXT,
      quote TEXT NOT NULL,
      avatar_url TEXT,
      featured INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
  ]);

  console.log("Tables created.");

  // Idempotent: clear existing seed data so re-running doesn't duplicate
  await db.execute("DELETE FROM portfolio");
  await db.execute("DELETE FROM services");
  await db.execute("DELETE FROM cinematics");
  await db.execute("DELETE FROM testimonials");
  await db.execute("DELETE FROM site_settings");

  // Seed admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@sairam.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "sairam2026";
  const passwordHash = await hash(adminPassword, 10);

  await db.execute({
    sql: "INSERT OR IGNORE INTO users (email, password_hash) VALUES (?, ?)",
    args: [adminEmail, passwordHash],
  });
  console.log(`Admin user seeded: ${adminEmail}`);

  // Upload hero and about images to R2
  const publicDir = join(process.cwd(), "public");
  const imagesDir = join(publicDir, "images");
  const videosDir = join(publicDir, "videos");

  console.log("Uploading hero image to R2...");
  const heroUrl = await uploadToR2(join(imagesDir, "hero.png"), "site/hero.png");
  await db.execute({
    sql: "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)",
    args: ["hero_image", heroUrl],
  });

  console.log("Uploading about image to R2...");
  const aboutUrl = await uploadToR2(join(imagesDir, "about.png"), "site/about.png");
  await db.execute({
    sql: "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)",
    args: ["about_image", aboutUrl],
  });

  // Upload portfolio images
  console.log("Uploading portfolio images to R2...");
  const portfolioData = [
    { title: "Portraits", category: "portrait", file: "gallery1.jpg", ratio: "4/5", featured: 1, order: 0 },
    { title: "Weddings", category: "wedding", file: "gallery2.jpg", ratio: "4/5", featured: 1, order: 1 },
    { title: "Events", category: "events", file: "gallery3.jpg", ratio: "4/5", featured: 1, order: 2 },
    { title: "Commercial", category: "commercial", file: "gallery4.jpg", ratio: "4/5", featured: 1, order: 3 },
    { title: "Fashion", category: "fashion", file: "gallery5.jpg", ratio: "1440/1746", featured: 1, order: 4 },
    { title: "Portraits", category: "portrait", file: "gallery6.jpg", ratio: "1440/1746", featured: 1, order: 5 },
    { title: "Weddings", category: "wedding", file: "gallery7.jpg", ratio: "4/5", featured: 1, order: 6 },
    { title: "Events", category: "events", file: "gallery8.jpg", ratio: "4/5", featured: 1, order: 7 },
    { title: "Commercial", category: "commercial", file: "gallery9.jpg", ratio: "4/5", featured: 1, order: 8 },
    { title: "Fashion", category: "fashion", file: "gallery10.jpg", ratio: "4/5", featured: 1, order: 9 },
    { title: "Portraits", category: "portrait", file: "gallery11.webp", ratio: "4/5", featured: 0, order: 10 },
    { title: "Weddings", category: "wedding", file: "gallery12.jpg", ratio: "4/5", featured: 0, order: 11 },
  ];

  for (const item of portfolioData) {
    const url = await uploadToR2(join(imagesDir, item.file), `portfolio/${item.file}`);
    await db.execute({
      sql: "INSERT INTO portfolio (title, category, image_url, aspect_ratio, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
      args: [item.title, item.category, url, item.ratio, item.featured, item.order],
    });
  }

  // Upload service images
  console.log("Uploading service images to R2...");
  const serviceData = [
    { category: "Model", title: "Model Photography", description: "Professional model portfolios that capture your personality and tell your story.", file: "MODEL.jpg" },
    { category: "Weddings", title: "Wedding Photography", description: "Documenting your special day beautifully, from first look to final dance.", file: "WEDDING.jpg" },
    { category: "Couple", title: "Couple Photography", description: "Romantic couple shoots that celebrate your bond and unique story.", file: "COUPLE.jpg" },
    { category: "Family", title: "Family Photography", description: "Creative family portraits that capture love, connection, and precious moments.", file: "FAMILY.jpg" },
    { category: "Engagement", title: "Engagement Photography", description: "Celebrate your engagement with timeless, heartfelt photos.", file: "ENGAGEMENT.jpg" },
    { category: "Haldi", title: "Haldi Photography", description: "Capturing the vibrant colors and joy of your haldi ceremony.", file: "HALDI.jpg" },
    { category: "Kids", title: "Kids Photography", description: "Playful, candid shots that freeze the magic of childhood.", file: "KIDS.jpg" },
    { category: "Newborn", title: "Newborn Photography", description: "Delicate, tender portraits of your newest little love.", file: "NEWBORN.jpg" },
    { category: "Pre-Wedding", title: "Pre-Wedding Photography", description: "Beautiful pre-wedding stories that build excitement for your big day.", file: "PREWEDDING.jpg" },
  ];

  for (let i = 0; i < serviceData.length; i++) {
    const item = serviceData[i];
    const url = await uploadToR2(join(imagesDir, item.file), `services/${item.file}`);
    await db.execute({
      sql: "INSERT INTO services (category, title, description, image_url, sort_order) VALUES (?, ?, ?, ?, ?)",
      args: [item.category, item.title, item.description, url, i],
    });
  }

  // Upload cinematic videos
  console.log("Uploading cinematic videos to R2...");
  const cinematicData = [
    { title: "Wedding Film", file: "CINEMATICS1.mp4" },
    { title: "Portrait Story", file: "CINEMATICS2.mp4" },
    { title: "Event Reel", file: "CINEMATICS3.mp4" },
    { title: "Commercial Spot", file: "CINEMATICS4.mp4" },
  ];

  for (let i = 0; i < cinematicData.length; i++) {
    const item = cinematicData[i];
    console.log(`  Uploading ${item.file} (this may take a moment)...`);
    const url = await uploadToR2(join(videosDir, item.file), `cinematics/${item.file}`);
    await db.execute({
      sql: "INSERT INTO cinematics (title, video_url, featured, sort_order) VALUES (?, ?, ?, ?)",
      args: [item.title, url, 1, i],
    });
  }

  // Seed testimonials
  console.log("Seeding testimonials...");
  const testimonialData = [
    { name: "Anitha & Ravi", role: "Wedding Clients", location: "Rajahmundry", quote: "Sairam captured our wedding so beautifully that we relive it every time we watch the album. Truly the best photographer in Rajahmundry." },
    { name: "Kiran Kumar", role: "Portrait Session", location: "Rajahmundry", quote: "Professional, patient, and incredibly talented. The portraits came out stunning — worth every rupee. Highly recommended." },
    { name: "Sravani Devi", role: "Event Client", location: "Rajahmundry", quote: "Our family function was documented with so much care and creativity. Every photo tells a story. Five stars all the way." },
    { name: "Mohan Rao", role: "Commercial Client", location: "Rajahmundry", quote: "The product and brand images Sairam delivered elevated our business presence completely. Exceptional eye for detail." },
    { name: "Lakshmi Prasanna", role: "Maternity Shoot", location: "Rajahmundry", quote: "He made us feel so comfortable and natural in front of the camera. The memories we now have are priceless." },
    { name: "Suresh Babu", role: "Birthday Shoot", location: "Rajahmundry", quote: "Sairam is the most reliable photographer I have worked with. Timely, creative, and the results are always outstanding." },
    { name: "Divya Sree", role: "Fashion Shoot", location: "Rajahmundry", quote: "Bold, artistic, and unique. He sees things others miss. My portfolio shots turned out magazine-quality." },
    { name: "Venkatesh & Padma", role: "Anniversary Shoot", location: "Rajahmundry", quote: "We had the best experience. He turned simple moments into beautiful memories. Cannot thank him enough." },
  ];

  for (let i = 0; i < testimonialData.length; i++) {
    const t = testimonialData[i];
    await db.execute({
      sql: "INSERT INTO testimonials (name, role, location, quote, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
      args: [t.name, t.role, t.location, t.quote, 1, i],
    });
  }

  console.log("Seed complete!");
}

main().catch(console.error);
