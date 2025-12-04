import { getCategories as getCategoriesDb } from "../../db/categories.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";
import { ContextWithParams } from "../../api-types.ts";

export const getCategories = async (context: ContextWithParams) => {
  try {
    const result = await getCategoriesDb();
    context.response.body = { data: result };
  } catch (error) {
    console.error("Error fetching categories:", error);
    context.response.status = 500;
    context.response.body = getFormattedErrorBody(
      "Failed to fetch categories",
      "INTERNAL_SERVER_ERROR"
    );
  }
};
