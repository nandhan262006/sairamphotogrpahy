import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getSession } from "@/lib/auth";
import { getPresignedUploadUrl, getPublicUrl } from "@/lib/r2";

const IMAGE_LIMIT = 15 * 1024 * 1024;
const VIDEO_LIMIT = 200 * 1024 * 1024;

const ALLOWED_IMAGE_EXT = ["jpg", "jpeg", "png", "webp"];
const ALLOWED_VIDEO_EXT = ["mp4", "mov", "webm"];

function getExt(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { filename, folder, fileType } = body as {
    filename?: string;
    folder?: string;
    fileType?: string;
  };

  if (!filename || !folder || !fileType) {
    return NextResponse.json({ error: "filename, folder, and fileType are required" }, { status: 400 });
  }

  const ext = getExt(filename);
  const isImage = fileType === "image";
  const isVideo = fileType === "video";

  if (!isImage && !isVideo) {
    return NextResponse.json({ error: "fileType must be 'image' or 'video'" }, { status: 400 });
  }

  const allowedExts = isImage ? ALLOWED_IMAGE_EXT : ALLOWED_VIDEO_EXT;
  if (!allowedExts.includes(ext)) {
    return NextResponse.json(
      { error: `Invalid file type. Allowed: ${allowedExts.join(", ")}` },
      { status: 400 }
    );
  }

  const maxSize = isImage ? IMAGE_LIMIT : VIDEO_LIMIT;
  if (body.size && body.size > maxSize) {
    return NextResponse.json(
      { error: `File too large. Max ${isImage ? "15 MB" : "200 MB"}` },
      { status: 413 }
    );
  }

  const key = `${folder}/${randomUUID()}.${ext}`;
  const uploadUrl = await getPresignedUploadUrl(key);

  return NextResponse.json({
    uploadUrl,
    publicUrl: getPublicUrl(key),
    key,
  });
}
