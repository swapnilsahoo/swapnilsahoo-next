import "server-only";
import { programmes } from "./programmes";
import type { LabProgramme } from "./types";
import { defaultAvailability, labPublicConfig, type ProgrammeAvailability } from "./config";
import { getDatabase, LabUnavailable } from "./server/database";
export type PublicLabProgramme = LabProgramme & { availability: ProgrammeAvailability };
export async function getPublicProgrammes(): Promise<PublicLabProgramme[]> {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.LAB_LOCAL_MODE !== "true" &&
    !process.env.LAB_DATABASE_URL
  )
    return programmes.map((p) => ({ ...p, availability: defaultAvailability }));
  try {
    const db = await getDatabase();
    const rows = (await db.execute("SELECT * FROM lab_programme")).rows;
    return programmes.map((base) => {
      const row = rows.find((x) => x.slug === base.slug);
      if (!row) return { ...base, availability: defaultAvailability };
      const content = JSON.parse(String(row.content)) as LabProgramme;
      return {
        ...content,
        availability: labPublicConfig.launchApproved
          ? {
              status: row.status as ProgrammeAvailability["status"],
              startsAt: row.starts_at ? String(row.starts_at) : null,
              feeInr: row.fee_inr === null ? null : Number(row.fee_inr),
              capacity: row.capacity === null ? null : Number(row.capacity),
            }
          : defaultAvailability,
      };
    });
  } catch (error) {
    if (error instanceof LabUnavailable)
      return programmes.map((p) => ({ ...p, availability: defaultAvailability }));
    throw error;
  }
}
export async function getPublicProgramme(slug: string) {
  return (await getPublicProgrammes()).find((p) => p.slug === slug);
}
export async function seedProgrammeContent() {
  const db = await getDatabase();
  await db.batch(
    programmes.map((p) => ({
      sql: "INSERT OR IGNORE INTO lab_programme(slug,content,updated_at) VALUES(?,?,?)",
      args: [p.slug, JSON.stringify(p), Date.now()],
    })),
    "write"
  );
}
