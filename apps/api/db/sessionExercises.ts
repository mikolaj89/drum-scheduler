import { db } from "./drizzle.ts";
import { sessionexercisesSchema, exercisesSchema } from "./schema.ts";
import { and, eq } from "drizzle-orm";

export type SessionExercise = typeof sessionexercisesSchema.$inferSelect;
export type SessionExerciseInput = typeof sessionexercisesSchema.$inferInsert;



export async function getSessionExercises(sessionId: number) {
  return await db
    .select({
      id: exercisesSchema.id,
      name: exercisesSchema.name,
      bpm: exercisesSchema.bpm,
      durationMinutes: exercisesSchema.durationMinutes,
      description: exercisesSchema.description,
      createdAt: exercisesSchema.createdAt,
      mp3Url: exercisesSchema.mp3Url,
      categoryId: exercisesSchema.categoryId,
    })
    .from(sessionexercisesSchema)
    .innerJoin(
      exercisesSchema,
      eq(sessionexercisesSchema.exerciseId, exercisesSchema.id)
    )
    .where(eq(sessionexercisesSchema.sessionId, sessionId));
}

export const addSessionExercise = async (
  sessionExercise: SessionExerciseInput
) => {
  return await db.insert(sessionexercisesSchema).values(sessionExercise);
};

// delete sessionExercise

export const deleteSessionExercise = async (
  sessionId: number,
  exerciseId: number
) => {
  return await db
    .delete(sessionexercisesSchema)
    .where(
      and(
        eq(sessionexercisesSchema.sessionId, sessionId),
        eq(sessionexercisesSchema.exerciseId, exerciseId)
      )
    );
};
