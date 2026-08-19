import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { deleteFromR2 } from "@/lib/r2";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const { category, title, description, image_url, sort_order, previousImage } = body;

  if (!title || !image_url) {
    return NextResponse.json({ error: "title and image_url are required" }, { status: 400 });
  }

  await db.execute({
    sql: `UPDATE services
          SET category = ?, title = ?, description = ?, image_url = ?, sort_order = ?,
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ?`,
    args: [category || title, title, description || "", image_url, sort_order ?? 0, Number(id)],
  });

  if (previousImage && previousImage !== image_url && previousImage.startsWith("https://")) {
    try {
      await deleteFromR2(previousImage);
    } catch (e) {
      console.error("Failed to delete old image from R2:", e);
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const imageUrl = searchParams.get("imageUrl");

  await db.execute({
    sql: "DELETE FROM services WHERE id = ?",
    args: [Number(id)],
  });

  if (imageUrl && imageUrl.startsWith("https://")) {
    try {
      await deleteFromR2(imageUrl);
    } catch (e) {
      console.error("Failed to delete image from R2:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
