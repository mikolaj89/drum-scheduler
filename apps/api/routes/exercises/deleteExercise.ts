import { deleteExercise as deleteExerciseDb } from "../../db/exercises.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";
import type { Context } from "@oak/oak/context";

type ContextWithParams = Context & { params?: Record<string, string | undefined> };

export const deleteExercise = async (context: ContextWithParams) => {
  const { params, response } = context;
  try {
    const id = params?.id;
    if (!id) {
      response.status = 400;
      response.body = getFormattedErrorBody("Missing exercise id", "BAD_REQUEST");
      return;
    }

    const result = await deleteExerciseDb(parseInt(id));

    if (result.rowCount === 0) {
      response.status = 404;
      response.body = getFormattedErrorBody("Exercise not found", "NOT_FOUND");
    } else {
      response.status = 204;
    }
  } catch (error) {
    console.error("Error deleting exercise:", error);
    response.status = 500;
    response.body = getFormattedErrorBody("Failed to delete exercise", "INTERNAL_SERVER_ERROR");
  }
};
