import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const result = await db.execute("SELECT * FROM services ORDER BY sort_order ASC, id ASC");
  return NextResponse.json(result.rows);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { category, title, description, image_url, sort_order } = body;

  if (!title || !image_url) {
    return NextResponse.json({ error: "title and image_url are required" }, { status: 400 });
  }

  const result = await db.execute({
    sql: `INSERT INTO services (category, title, description, image_url, sort_order)
          VALUES (?, ?, ?, ?, ?)`,
    args: [category || title, title, description || "", image_url, sort_order ?? 0],
  });

  return NextResponse.json({ ok: true, id: Number(result.lastInsertRowid) }, { status: 201 });
}
