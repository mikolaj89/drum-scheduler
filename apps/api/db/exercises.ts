import { db } from "./drizzle.ts";
import { exercisesSchema } from "./schema.ts";
import { eq } from "drizzle-orm";

export type Exercise = typeof exercisesSchema.$inferSelect;
export type ExerciseInput = typeof exercisesSchema.$inferInsert;

export async function getExercises() {
  return await db.select().from(exercisesSchema);
}

export const addExercise = async (exercise: ExerciseInput) => {
  return await db.insert(exercisesSchema).values(exercise);
};

export const editExercise = async (exerciseData: ExerciseInput, id: number) => {
  return await db
    .update(exercisesSchema)
    .set(exerciseData)
    .where(eq(exercisesSchema.id, id));
};

export const deleteExercise = async (id: number) => {
  return await db.delete(exercisesSchema).where(eq(exercisesSchema.id, id));
};
