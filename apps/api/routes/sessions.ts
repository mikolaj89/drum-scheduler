import { Router } from "@oak/oak";
import {
  getSessions,
  getSession,
  addSession,
  deleteSession,
} from "../db/sessions.ts";
import {
  addSessionExercise,
  getSessionExercises,
  deleteSessionExercise,
} from "../db/sessionExercises.ts";
import { getFormattedSession } from "../utils/session.ts";
import { SessionInput } from "../db/types.ts";

const router = new Router();
 
// below is the router for sessions


export default router
  // Fetch all sessions
  .get("/sessions", async (context) => {
    try {
      const result = await getSessions();
      context.response.status = 200;
      context.response.body = { data: result };
    } catch (error) {
      console.error("Error fetching sessions:", error);
      context.response.status = 500;
      context.response.body = {data: null,  error: "Failed to fetch sessions" };
    }
  })
  // get single session by id
  .get("/sessions/:id", async (context) => {
    const { params, response } = context;
    try {
      const id = params.id;
      const result = await getSession(parseInt(id));
      if (result.length === 0) {
        response.status = 404;
        response.body = {data: null, error: "Session not found" };
       
      } else {
        const exercises = await getSessionExercises(parseInt(id));
        const sessionWithExercises =  getFormattedSession(result[0], exercises);
        response.status = 200;
        response.body = {data: sessionWithExercises};
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      response.status = 500;
      response.body = {data: null, error: "Failed to fetch session" };
    }
  })
  // Add a new session
  .post("/sessions", async (context) => {
    const { request, response } = context;
    try {
      const { name, notes } = (await request.body.json()) as SessionInput;

      if (typeof name !== "string" || typeof notes !== "string") {
        response.status = 400;
        response.body = {
          error: "Invalid session data. Name and notes are required",
        };
        return;
      }

      const result = await addSession({
        name,
        notes,
      });

      response.status = 201;
      response.body = result.command;
    } catch (error) {
      console.error("Error adding session:", error);
      response.status = 500;
      response.body = { error: "Failed to add session" };
    }
  })
  // delete session
  .delete("/sessions/:id", async (context) => {
    const { params, response } = context;
    try {
      const id = params.id;
      const result = await deleteSession(parseInt(id));
      if (result) {
        response.status = 200;
        response.body = result.command;
      } else {
        response.status = 404;
        response.body = { error: "Session not found" };
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      response.status = 500;
      response.body = { error: "Failed to delete session" };
    }
  })
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

      // const { exerciseId, sessionId } = (await request.body.json()) as SessionExerciseInput;

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
      const result = await deleteSessionExercise(parseInt(sessionid), parseInt(exerciseid));
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
  })
