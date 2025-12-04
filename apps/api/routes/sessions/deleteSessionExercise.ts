import { deleteSessionExercise as deleteSessionExerciseDb } from "../../db/sessionExercises.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";
import type { Context } from "@oak/oak/context";

type ContextWithParams = Context & { params?: Record<string, string | undefined> };

export const deleteSessionExercise = async (context: ContextWithParams) => {
  const { response, params } = context;
  try {
    const { sessionid, exerciseid } = params || {};
    if (sessionid === undefined || exerciseid === undefined) {
      response.status = 400;
      response.body = getFormattedErrorBody("Missing session or exercise id", "BAD_REQUEST");
      return;
    }

    const result = await deleteSessionExerciseDb(parseInt(sessionid), parseInt(exerciseid));
    if (result) {
      response.status = 200;
      response.body = result.command;
    } else {
      response.status = 404;
      response.body = getFormattedErrorBody("Session exercise not found", "NOT_FOUND");
    }
  } catch (error) {
    console.error("Error deleting session exercise:", error);
    response.status = 500;
    response.body = getFormattedErrorBody("Failed to delete session exercise", "INTERNAL_SERVER_ERROR");
  }
};
