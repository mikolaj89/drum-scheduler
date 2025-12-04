import { deleteCategory as deleteCategoryDb } from "../../db/categories.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";
import { ContextWithParams } from "../../api-types.ts";


export const deleteCategory = async (context: ContextWithParams) => {
  const { params, response } = context;
  try {
    const id = params?.id;
    if (!id) {
      response.status = 400;
      response.body = getFormattedErrorBody("Missing category id", "BAD_REQUEST");
      return;
    }
    
    const result = await deleteCategoryDb(parseInt(id));
    if (result) {
      response.body = result;
    } else {
      response.status = 404;
      response.body = getFormattedErrorBody("Category not found", "NOT_FOUND");
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    response.status = 500;
    response.body = getFormattedErrorBody("Failed to delete category", "INTERNAL_SERVER_ERROR");
  }
};
