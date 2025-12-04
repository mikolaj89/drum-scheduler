import { getSession as getSessionDb } from "../../db/sessions.ts";
import { getSessionExercises as getSessionExercisesDb } from "../../db/sessionExercises.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";
import { getFormattedSession } from "../../utils/session.ts";
import type { Context } from "@oak/oak/context";

type ContextWithParams = Context & { params?: Record<string, string | undefined> };

export const getSessionById = async (context: ContextWithParams) => {
  const { params, response } = context;
  try {
    const id = params?.id;
    if (!id) {
      response.status = 400;
      response.body = getFormattedErrorBody("Missing session id", "BAD_REQUEST");
      return;
    }

    const result = await getSessionDb(parseInt(id));
    if (result.length === 0) {
      response.status = 404;
      response.body = getFormattedErrorBody("Session not found", "NOT_FOUND");
    } else {
      const exercises = await getSessionExercisesDb(parseInt(id));
      const sessionWithExercises = getFormattedSession(result[0], exercises);
      response.status = 200;
      response.body = { data: sessionWithExercises };
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    response.status = 500;
    response.body = getFormattedErrorBody("Failed to fetch session", "INTERNAL_SERVER_ERROR");
  }
};
