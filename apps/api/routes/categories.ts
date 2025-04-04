import { Router } from "@oak/oak";
import {
  getCategories,
  getCategoryExercises,
  deleteCategory,
} from "../db/categories.ts";
import { getFormattedErrorBody } from "../utils/response.ts";

const router = new Router();

export default router
  .get("/categories", async (context) => {
    try {
      const result = await getCategories();
      context.response.body = { data: result };
    } catch (error) {
      console.error("Error fetching categories:", error);
      context.response.status = 500;
      context.response.body = getFormattedErrorBody(
        "Failed to fetch categories",
        "INTERNAL_SERVER_ERROR"
      );
    }
  })
  .get("/categories/:id/exercises", async (context) => {
    const { params, response } = context;
    try {
      const id = params.id;
      const result = await getCategoryExercises(parseInt(id));
      if (result) {
        response.body = { data: result};
      } else {
        response.status = 404;
        response.body = getFormattedErrorBody(
          "Category exercises not found",
          "NOT_FOUND"
        );
      }
    } catch (error) {
      console.error("Error fetching category exercises:", error);
      response.status = 500;
      response.body = {
        error: {
          message: "Failed to fetch category exercises",
          errorCode: "INTERNAL_SERVER_ERROR",
        },
      };
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
