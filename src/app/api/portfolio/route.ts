import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const featured = request.nextUrl.searchParams.get("featured");
  let sql = "SELECT * FROM portfolio";
  const args: string[] = [];

  if (featured === "1") {
    sql += " WHERE featured = 1";
  } else if (featured === "0") {
    sql += " WHERE featured = 0";
  }

  sql += " ORDER BY sort_order ASC, id ASC";
  const result = await db.execute({ sql, args });
  return NextResponse.json(result.rows);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { title, category, image_url, aspect_ratio, featured, sort_order } = body;

  if (!title || !category || !image_url) {
    return NextResponse.json({ error: "title, category, and image_url are required" }, { status: 400 });
  }

  const result = await db.execute({
    sql: `INSERT INTO portfolio (title, category, image_url, aspect_ratio, featured, sort_order)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [
      title,
      category,
      image_url,
      aspect_ratio || "4/5",
      featured === false || featured === 0 ? 0 : 1,
      sort_order ?? 0,
    ],
  });

  return NextResponse.json({ ok: true, id: Number(result.lastInsertRowid) }, { status: 201 });
}
