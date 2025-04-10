import { Router } from "@oak/oak";
import {
  addExercise,
  editExercise,
  deleteExercise,
  getExerciseById,
} from "../db/exercises.ts";
import { getExerciseErrors } from "../utils/validation/exercise-validation.ts";
import { getExercises } from "./exercises/getExercises.ts";

const router = new Router();

router
  // Fetch all exercises
  .get("/exercises", getExercises)
  // fetch a single exercise
  .get("/exercises/:id", async (context) => {
    try {
      const id = context.params.id;
      const result = await getExerciseById(parseInt(id));
      if (result.length > 0) {
        context.response.body = {data: result[0]};
      } else {
        context.response.status = 404;
        context.response.body = { error: "Exercise not found" };
      }
    } catch (error) {
      console.error("Error fetching exercise:", error);
      context.response.status = 500;
      context.response.body = { error: "Failed to fetch exercise" };
    }
  })


  // Add a new exercise
  .post("/exercises", async (context) => {
    try {
      const body = await context.request.body.json();

      // Server-side validation
      const errors = getExerciseErrors(body);
      // errors.push("This is a test error message");

      // If there are validation errors, return a 400 response
      if (errors.length > 0) {
        context.response.status = 400;
        context.response.body = { error: errors };
        return;
      }

      // Proceed with adding the exercise if validation passes
      const result = await addExercise({
        name: body.name,
        categoryId: body.categoryId,
        description: body.description,
        durationMinutes: body.durationMinutes,
        bpm: body.bpm,
      });

      context.response.status = 201;
      context.response.body = { data: result, success: true };
    } catch (error) {
      context.response.status = 500;
      context.response.body = {
        error: `Failed to add exercise: ${error.toString()}`,
      };
    }
  })

  .put("/exercises/:id", async (context) => {
    try {
      const id = context.params.id;
      const body = await context.request.body.json();
      const errors = getExerciseErrors(body);

      if (errors.length > 0) {
        context.response.status = 400;
        context.response.body = { error: errors };
        return;
      }

      const result = await editExercise(
        body,
        parseInt(id)
      );
      if (result.rowCount === 0) {
        context.response.status = 404;
        context.response.body = { error: "Exercise not found" };
      } else {
        console.log('result: ',result);
        context.response.status = 200;
        context.response.body = { success: true };
      }
    } catch (error) {
      console.error("Error updating exercise:", error);
      context.response.status = 500;
      context.response.body = {
        error: `Failed to update exercise : ${error.toString()} `,
      };
    }
  })

  .delete("/exercises/:id", async (context) => {
    try {
      const id = context.params.id;
      const result = await deleteExercise(parseInt(id));

      if (result.rowCount === 0) {
        context.response.status = 404;
        context.response.body = { error: "Exercise not found" };
      } else {
        context.response.status = 204; // No Content
      }
    } catch (error) {
      console.error("Error deleting exercise:", error);
      context.response.status = 500;
      context.response.body = {
        error: `Failed to delete exercise ${error.toString()}`,
      };
    }
  });

export default router;
