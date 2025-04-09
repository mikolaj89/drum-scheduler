import { SessionExercisesOrderInput } from "../../api-types.ts";
import { reorderSessionExercises } from "../../db/sessionExercises.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";

export async function patchOrderHandler(context) {
  const { params, response, request } = context;

  try {
    const sessionId = params.id;
    const body =
      (await context.request.body.json()) as SessionExercisesOrderInput;
    const { exercises } = body;

    if (!exercises || exercises.length === 0) {
      response.status = 400;
      response.body = getFormattedErrorBody(
        "No exercises provided",
        "BAD_REQUEST"
      );
      return;
    }

    await reorderSessionExercises(parseInt(sessionId), exercises);

    response.status = 200;
    response.body = { data: null };
  } catch (error) {
    console.error("Error updating session:", error);
    response.status = 500;
    response.body = getFormattedErrorBody(
      "Failed to update session",
      "INTERNAL_SERVER_ERROR"
    );
  }
}
