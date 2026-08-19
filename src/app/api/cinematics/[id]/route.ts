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
  const { title, video_url, thumbnail_url, featured, sort_order, previousVideo, previousThumbnail } = body;

  if (!title || !video_url) {
    return NextResponse.json({ error: "title and video_url are required" }, { status: 400 });
  }

  await db.execute({
    sql: `UPDATE cinematics
          SET title = ?, video_url = ?, thumbnail_url = ?, featured = ?, sort_order = ?,
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ?`,
    args: [
      title,
      video_url,
      thumbnail_url || null,
      featured === false || featured === 0 ? 0 : 1,
      sort_order ?? 0,
      Number(id),
    ],
  });

  if (previousVideo && previousVideo !== video_url && previousVideo.startsWith("https://")) {
    try {
      await deleteFromR2(previousVideo);
    } catch (e) {
      console.error("Failed to delete old video from R2:", e);
    }
  }
  if (previousThumbnail && previousThumbnail !== thumbnail_url && previousThumbnail.startsWith("https://")) {
    try {
      await deleteFromR2(previousThumbnail);
    } catch (e) {
      console.error("Failed to delete old thumbnail from R2:", e);
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
  const videoUrl = searchParams.get("videoUrl");
  const thumbnailUrl = searchParams.get("thumbnailUrl");

  await db.execute({
    sql: "DELETE FROM cinematics WHERE id = ?",
    args: [Number(id)],
  });

  if (videoUrl && videoUrl.startsWith("https://")) {
    try {
      await deleteFromR2(videoUrl);
    } catch (e) {
      console.error("Failed to delete video from R2:", e);
    }
  }
  if (thumbnailUrl && thumbnailUrl.startsWith("https://")) {
    try {
      await deleteFromR2(thumbnailUrl);
    } catch (e) {
      console.error("Failed to delete thumbnail from R2:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
