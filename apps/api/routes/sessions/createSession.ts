import { Context } from "@oak/oak/context";
import { addSession } from "../../db/sessions.ts";
import { SessionInput } from "../../db/types.ts";
import {
  ApiSuccessResponse,
  getFormattedErrorBody,
} from "../../utils/response.ts";

export type CreateSessionResponse = { id: number };

type ApiResponse = ApiSuccessResponse<CreateSessionResponse>;

export const createSession = async (context : Context) => {
  const { request, response } = context;
  try {
    const { name, notes } = (await request.body.json()) as SessionInput;

    if (typeof name !== "string" || typeof notes !== "string") {
      console.error("Invalid input data:", { name, notes });
      response.status = 400;
      response.body = getFormattedErrorBody("Invalid input", "BAD_REQUEST");
      return;
    }

    const result = await addSession({
      name,
      notes,
    });
    response.status = 201;
    if (result.length === 1) {
      const { id } = result[0];
      response.body = {
        data: {
          id,
        },
      } as ApiResponse;
    }
  } catch (error) {
    console.error("Error creating session:", error);
    response.status = 500;
    response.body = getFormattedErrorBody(
      "Internal server error",
      "INTERNAL_SERVER_ERROR"
    );
  }
};
