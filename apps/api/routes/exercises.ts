import { Router } from "@oak/oak";
import {
  addExercise,
  editExercise,
  Exercise,
  getExercises,
  deleteExercise,
} from "../db/exercises.ts";
import { getExerciseErrors } from "../utils/validation/exercise-validation.ts";

const router = new Router();

router
  // Fetch all exercises
  .get("/exercises", async (context) => {
    try {
      const result: Exercise[] = await getExercises();
      context.response.body = { data: result };
    } catch (error) {
      console.error("Error fetching exercises:", error);
      context.response.status = 500;
      context.response.body = { error: "Failed to fetch exercises" };
    }
  })

  // Add a new exercise
  .post("/exercises", async (context) => {
    try {
      const body = await context.request.body.json();

      // Server-side validation
      const errors = getExerciseErrors(body);

      // If there are validation errors, return a 400 response
      if (errors.length > 0) {
        context.response.status = 400;
        context.response.body = { errors };
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
      console.error("Error adding exercise:", error);
      context.response.status = 500;
      context.response.body = { error: "Failed to add exercise" };
    }
  })

  .put("/exercises/:id", async (context) => {
    try {
      const id = context.params.id;
      const { name, categoryId, description, durationMinutes, bpm } =
        await context.request.body.json();

      const result = await editExercise(
        { name, categoryId, description, durationMinutes, bpm },
        parseInt(id)
      );
      if (result.rowCount === 0) {
        context.response.status = 404;
        context.response.body = { error: "Exercise not found" };
      } else {
        context.response.body = result.rows[0];
      }
    } catch (error) {
      console.error("Error updating exercise:", error);
      context.response.status = 500;
      context.response.body = { error: "Failed to update exercise" };
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
      context.response.body = { error: "Failed to delete exercise" };
    }
  });

export default router;
