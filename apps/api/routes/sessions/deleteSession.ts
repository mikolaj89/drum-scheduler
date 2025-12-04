import { deleteSession as deleteSessionDb } from "../../db/sessions.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";
import type { Context } from "@oak/oak/context";

type ContextWithParams = Context & { params?: Record<string, string | undefined> };

export const deleteSession = async (context: ContextWithParams) => {
  const { params, response } = context;
  try {
    const id = params?.id;
    if (!id) {
      response.status = 400;
      response.body = getFormattedErrorBody("Missing session id", "BAD_REQUEST");
      return;
    }

    const result = await deleteSessionDb(parseInt(id));
    if (result) {
      response.status = 200;
      response.body = result.command;
    } else {
      response.status = 404;
      response.body = getFormattedErrorBody("Session not found", "NOT_FOUND");
    }
  } catch (error) {
    console.error("Error deleting session:", error);
    response.status = 500;
    response.body = getFormattedErrorBody("Failed to delete session", "INTERNAL_SERVER_ERROR");
  }
};
