import { addSessionExercise as addSessionExerciseDb } from "../../db/sessionExercises.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";
import type { Context } from "@oak/oak/context";

type ContextWithParams = Context & { params?: Record<string, string | undefined> };

export const addSessionExercise = async (context: ContextWithParams) => {
  const { response, params } = context;
  try {
    const { sessionid, exerciseid } = params || {};

    if (sessionid === undefined || exerciseid === undefined) {
      response.status = 400;
      response.body = getFormattedErrorBody("Missing session or exercise id", "BAD_REQUEST");
      return;
    }

    const result = await addSessionExerciseDb({
      sessionId: parseInt(sessionid),
      exerciseId: parseInt(exerciseid),
    });

    response.status = 201;
    response.body = result.command;
  } catch (error) {
    console.error("Error adding session exercise:", error);
    response.status = 500;
    response.body = getFormattedErrorBody("Failed to add session exercise", "INTERNAL_SERVER_ERROR");
  }
};
