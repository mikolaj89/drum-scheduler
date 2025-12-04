import { Router } from "@oak/oak";
import { getCategories } from "./categories/getCategories.ts";
import { getCategoryExercises } from "./categories/getCategoryExercises.ts";
import { deleteCategory } from "./categories/deleteCategory.ts";

const router = new Router();

router
  .get("/categories", getCategories)
  .get("/categories/:id/exercises", getCategoryExercises)
  .delete("/categories/:id", deleteCategory);

export default router;
