import { db } from "@/lib/db";
import { SiteSettingsClient } from "./SiteSettingsClient";

export const revalidate = 0;

export default async function SiteSettingsPage() {
  const result = await db.execute("SELECT key, value FROM site_settings");
  const settings: Record<string, string> = {};
  for (const row of result.rows) {
    settings[String(row.key)] = String(row.value);
  }

  return <SiteSettingsClient initialSettings={settings} />;
}