import { getSessions as getSessionsDb } from "../../db/sessions.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";
import type { Context } from "@oak/oak/context";

export const getSessions = async (context: Context) => {
  const { response } = context;
  try {
    const result = await getSessionsDb();
    response.status = 200;
    response.body = { data: result };
  } catch (error) {
    console.error("Error fetching sessions:", error);
    response.status = 500;
    response.body = getFormattedErrorBody("Failed to fetch sessions", "INTERNAL_SERVER_ERROR");
  }
};
