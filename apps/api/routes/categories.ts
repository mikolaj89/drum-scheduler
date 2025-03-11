import { Router } from "@oak/oak";
import {
  getCategories,
  getCategoryExercises,
  deleteCategory,
} from "../db/categories.ts";

const router = new Router();

export default router
  .get("/categories", async (context) => {
    try {
      const result = await getCategories();
      context.response.body = { data: result };
    } catch (error) {
      console.error("Error fetching categories:", error);
      context.response.status = 500;
      context.response.body = {
        data: null,
        error: "Failed to fetch categories",
      };
    }
  })
  .get("/categories/:id/exercises", async (context) => {
    const { params, response } = context;
    try {
      const id = params.id;
      const result = await getCategoryExercises(parseInt(id));
      if (result) {
        response.body = result;
      } else {
        response.status = 404;
        response.body = { error: "Category not found" };
      }
    } catch (error) {
      console.error("Error fetching category exercises:", error);
      response.status = 500;
      response.body = { error: "Failed to fetch category exercises" };
    }
  })
  .delete("/categories/:id", async (context) => {
    const { params, response } = context;
    try {
      const id = params.id;
      const result = await deleteCategory(parseInt(id));
      if (result) {
        response.body = result;
      } else {
        response.status = 404;
        response.body = { error: "Category not found" };
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      response.status = 500;
      response.body = { error: "Failed to delete category" };
    }
  });
