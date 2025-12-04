import { getSessionExercises as getSessionExercisesDb } from "../../db/sessionExercises.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";
import type { Context } from "@oak/oak/context";

type ContextWithParams = Context & { params?: Record<string, string | undefined> };

export const getSessionExercises = async (context: ContextWithParams) => {
  const { params, response } = context;
  try {
    const id = params?.id;
    if (!id) {
      response.status = 400;
      response.body = getFormattedErrorBody("Missing session id", "BAD_REQUEST");
      return;
    }

    const result = await getSessionExercisesDb(parseInt(id));
    if (result) {
      response.body = result;
    } else {
      response.status = 404;
      response.body = getFormattedErrorBody("Session not found", "NOT_FOUND");
    }
  } catch (error) {
    console.error("Error fetching session exercises:", error);
    response.status = 500;
    response.body = getFormattedErrorBody("Failed to fetch session exercises", "INTERNAL_SERVER_ERROR");
  }
};
