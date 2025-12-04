import { ContextWithParams } from "../../api-types.ts";
import { getExerciseById as getExerciseByIdDb } from "../../db/exercises.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";

export const getExerciseById = async (context: ContextWithParams) => {
  const { params, response } = context;
  try {
    const id = params?.id;
    if (!id) {
      response.status = 400;
      response.body = getFormattedErrorBody("Missing exercise id", "BAD_REQUEST");
      return;
    }

    const result = await getExerciseByIdDb(parseInt(id));
    if (result.length > 0) {
      response.body = { data: result[0] };
    } else {
      response.status = 404;
      response.body = getFormattedErrorBody("Exercise not found", "NOT_FOUND");
    }
  } catch (error) {
    console.error("Error fetching exercise:", error);
    response.status = 500;
    response.body = getFormattedErrorBody("Failed to fetch exercise", "INTERNAL_SERVER_ERROR");
  }
};
