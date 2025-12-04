import { Router } from "@oak/oak";
import { createSession } from "./sessions/createSession.ts";
import { getSessions } from "./sessions/getSessions.ts";
import { getSessionById } from "./sessions/getSessionById.ts";
import { deleteSession } from "./sessions/deleteSession.ts";
import { getSessionExercises } from "./sessions/getSessionExercises.ts";
import { addSessionExercise } from "./sessions/addSessionExercise.ts";
import { deleteSessionExercise } from "./sessions/deleteSessionExercise.ts";

const router = new Router();

export default router
 .get("/sessions", getSessions)
 .get("/sessions/:id", getSessionById)
 .post("/sessions", createSession)
 .delete("/sessions/:id", deleteSession)
 .get("/sessions/:id/exercises", getSessionExercises)
 .post("/sessions/:sessionid/exercises/:exerciseid", addSessionExercise)
 .delete("/sessions/:sessionid/exercises/:exerciseid", deleteSessionExercise);
