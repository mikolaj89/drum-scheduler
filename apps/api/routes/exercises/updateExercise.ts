import { editExercise as editExerciseDb } from "../../db/exercises.ts";
import { getExerciseErrors } from "../../utils/validation/exercise-validation.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";
import { ContextWithParams } from "../../api-types.ts";



export const updateExercise = async (context: ContextWithParams) => {
  const { params, request, response } = context;
  try {
    const id = params?.id;
    if (!id) {
      response.status = 400;
      response.body = getFormattedErrorBody("Missing exercise id", "BAD_REQUEST");
      return;
    }

    const body = await request.body.json();
    const errors = getExerciseErrors(body);
    if (errors.length > 0) {
      response.status = 400;
      response.body = getFormattedErrorBody("Validation failed", "VALIDATION_ERROR");
      return;
    }

    const result = await editExerciseDb(body, parseInt(id));
    if (result.rowCount === 0) {
      response.status = 404;
      response.body = getFormattedErrorBody("Exercise not found", "NOT_FOUND");
    } else {
      response.status = 200;
      response.body = { success: true };
    }
  } catch (error) {
    console.error("Error updating exercise:", error);
    response.status = 500;
    response.body = getFormattedErrorBody("Failed to update exercise", "INTERNAL_SERVER_ERROR");
  }
};
