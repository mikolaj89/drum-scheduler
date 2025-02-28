import { db } from "./drizzle.ts";
import { sessionsSchema } from "./schema.ts";
import { eq } from "drizzle-orm";

export type Session = typeof sessionsSchema.$inferSelect;
export type SessionInput = typeof sessionsSchema.$inferInsert;

export async function getSession(id: number) {
  return await db
    .select()
    .from(sessionsSchema)
    .where(eq(sessionsSchema.id, id));
}

export async function getSessions() {
  return await db.select().from(sessionsSchema);
}

export const addSession = async (session: SessionInput) => {
  return await db.insert(sessionsSchema).values(session);
};

export const deleteSession = async (id: number) => {
  return await db.delete(sessionsSchema).where(eq(sessionsSchema.id, id));
};
