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
  const { name, role, location, quote, avatar_url, featured, sort_order, previousAvatar } = body;

  if (!name || !quote) {
    return NextResponse.json({ error: "name and quote are required" }, { status: 400 });
  }

  await db.execute({
    sql: `UPDATE testimonials
          SET name = ?, role = ?, location = ?, quote = ?, avatar_url = ?, featured = ?, sort_order = ?,
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ?`,
    args: [
      name,
      role || "",
      location || "",
      quote,
      avatar_url || null,
      featured === false || featured === 0 ? 0 : 1,
      sort_order ?? 0,
      Number(id),
    ],
  });

  if (previousAvatar && previousAvatar !== avatar_url && previousAvatar.startsWith("https://")) {
    try {
      await deleteFromR2(previousAvatar);
    } catch (e) {
      console.error("Failed to delete old avatar from R2:", e);
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
  const avatarUrl = searchParams.get("avatarUrl");

  await db.execute({
    sql: "DELETE FROM testimonials WHERE id = ?",
    args: [Number(id)],
  });

  if (avatarUrl && avatarUrl.startsWith("https://")) {
    try {
      await deleteFromR2(avatarUrl);
    } catch (e) {
      console.error("Failed to delete avatar from R2:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
