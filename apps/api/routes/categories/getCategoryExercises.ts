import { ContextWithParams } from "../../api-types.ts";
import { getCategoryExercises as getCategoryExercisesDb } from "../../db/categories.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";

export const getCategoryExercises = async (context : ContextWithParams) => {
  const { params, response } = context;
  try {
    const id = params?.id;

    if(!id) {
      response.status = 400;
      response.body = getFormattedErrorBody(
        "Missing category id",
        "BAD_REQUEST"
      );
      return;
    }

    const result = await getCategoryExercisesDb(parseInt(id));
    if (result) {
      response.body = { data: result };
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
    response.body = getFormattedErrorBody(
      "Failed to fetch category exercises",
      "INTERNAL_SERVER_ERROR"
    );
  }
};
