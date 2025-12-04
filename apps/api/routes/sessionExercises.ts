import { Router } from "@oak/oak";
import { patchOrderHandler } from "./sessions/patchOrder.ts";
import { getSessionExercises } from "./sessions/getSessionExercises.ts";
import { addSessionExercise } from "./sessions/addSessionExercise.ts";
import { deleteSessionExercise } from "./sessions/deleteSessionExercise.ts";

const router = new Router();

export default router
  .get("/sessions/:id/exercises", getSessionExercises)
  .patch("/sessions/:id/exercises-order", patchOrderHandler)
  .post("/sessions/:sessionid/exercises/:exerciseid", addSessionExercise)
  .delete("/sessions/:sessionid/exercises/:exerciseid", deleteSessionExercise)
