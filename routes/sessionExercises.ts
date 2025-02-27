import { Router } from "@oak/oak";
import {
  addSessionExercise,
  getSessionExercises,
  deleteSessionExercise,
} from "../db/sessionExercises.ts";

const router = new Router();

export default router

  // get all exercises for session
  .get("/sessions/:id/exercises", async (context) => {
    const { params, response } = context;
    try {
      const id = params.id;
      const result = await getSessionExercises(parseInt(id));
      if (result) {
        response.body = result;
      } else {
        response.status = 404;
        response.body = { error: "Session not found" };
      }
    } catch (error) {
      console.error("Error fetching session exercises:", error);
      response.status = 500;
      response.body = { error: "Failed to fetch session exercises" };
    }
  })
  // add single exercise for session
  .post("/sessions/:sessionid/exercises/:exerciseid", async (context) => {
    const { response, params } = context;
    try {
      const { sessionid, exerciseid } = params;
      if (sessionid === undefined || exerciseid === undefined) {
        response.status = 400;
        return;
      }

      const result = await addSessionExercise({
        sessionId: parseInt(sessionid),
        exerciseId: parseInt(exerciseid),
      });

      response.status = 201;
      response.body = result.command;
    } catch (error) {
      console.error("Error adding session exercise:", error);
      response.status = 500;
      response.body = { error: "Failed to add session exercise" };
    }
  })
  // delete session exercise
  .delete("/sessions/:sessionid/exercises/:exerciseid", async (context) => {
    const { response, params } = context;
    try {
      const { sessionid, exerciseid } = params;
      const result = await deleteSessionExercise(
        parseInt(sessionid),
        parseInt(exerciseid)
      );
      if (result) {
        response.status = 200;
        response.body = result.command;
      } else {
        response.status = 404;
        response.body = { error: "Session exercise not found" };
      }
    } catch (error) {
      console.error("Error deleting session exercise:", error);
      response.status = 500;
      response.body = { error: "Failed to delete session exercise" };
    }
  });
