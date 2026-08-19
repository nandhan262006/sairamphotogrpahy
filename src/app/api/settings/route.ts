import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { deleteFromR2 } from "@/lib/r2";

export async function GET() {
  const result = await db.execute("SELECT key, value FROM site_settings");
  const settings: Record<string, string> = {};
  for (const row of result.rows) {
    settings[String(row.key)] = String(row.value);
  }
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { key, value, previousValue } = body as {
    key?: string;
    value?: string;
    previousValue?: string;
  };

  if (!key || !value) {
    return NextResponse.json({ error: "key and value are required" }, { status: 400 });
  }

  if (!["hero_image", "about_image"].includes(key)) {
    return NextResponse.json({ error: "Invalid settings key" }, { status: 400 });
  }

  await db.execute({
    sql: "INSERT OR REPLACE INTO site_settings (key, value) VALUES (?, ?)",
    args: [key, value],
  });

  // Clean up old R2 object if it was replaced
  if (previousValue && previousValue.startsWith("https://") && previousValue !== value) {
    try {
      await deleteFromR2(previousValue);
    } catch (e) {
      console.error("Failed to delete old image from R2:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
