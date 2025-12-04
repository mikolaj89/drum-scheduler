import { addExercise as addExerciseDb } from "../../db/exercises.ts";
import { getExerciseErrors } from "../../utils/validation/exercise-validation.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";
import { ContextWithParams } from "../../api-types.ts";

export const createExercise = async (context: ContextWithParams) => {
  const { request, response } = context;
  try {
    const body = await request.body.json();

    const errors = getExerciseErrors(body);
    if (errors.length > 0) {
      response.status = 400;
      response.body = getFormattedErrorBody("Validation failed", "VALIDATION_ERROR");
      return;
    }

    const result = await addExerciseDb({
      name: body.name,
      categoryId: body.categoryId,
      description: body.description,
      durationMinutes: body.durationMinutes,
      bpm: body.bpm,
    });

    response.status = 201;
    response.body = { data: result, success: true };
  } catch (error) {
    console.error("Failed to add exercise:", error);
    response.status = 500;
    response.body = getFormattedErrorBody("Failed to add exercise", "INTERNAL_SERVER_ERROR");
  }
};
