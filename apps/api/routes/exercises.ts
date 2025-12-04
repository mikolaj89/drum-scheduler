import { Router } from "@oak/oak";
import { getExercises } from "./exercises/getExercises.ts";
import { getExerciseById } from "./exercises/getExerciseById.ts";
import { createExercise } from "./exercises/createExercise.ts";
import { updateExercise } from "./exercises/updateExercise.ts";
import { deleteExercise } from "./exercises/deleteExercise.ts";

const router = new Router();

router
 .get("/exercises", getExercises)
 .get("/exercises/:id", getExerciseById)
 .post("/exercises", createExercise)
 .put("/exercises/:id", updateExercise)
 .delete("/exercises/:id", deleteExercise);

export default router;
