import { db } from "./drizzle.ts";
import { categoriesSchema, exercisesSchema } from "./schema.ts";
import { eq } from "drizzle-orm";

export async function getCategories() {
  return await db.select().from(categoriesSchema);
}

// get exercises for category

export async function getCategoryExercises(categoryId: number) {
  return await db
    .select()
    .from(exercisesSchema)
    .where(eq(exercisesSchema.categoryId, categoryId));
}

// delete category

export const deleteCategory = async (id: number) => {
  return await db.delete(categoriesSchema).where(eq(categoriesSchema.id, id));
};
