import { Context } from "@oak/oak/context";
import { filterExercises } from "../../db/exercises.ts";
import { getFormattedErrorBody } from "../../utils/response.ts";



export const getExercises = async (context: Context) => {
  try {
    const url = new URL(context.request.url);
    const name = url.searchParams.get("name");
    const categoryId = url.searchParams.get("categoryId");

    const exercises = await filterExercises({ name, categoryId });
    context.response.body = { data: exercises };
  } catch (error) {
    console.error("Error fetching exercises:", error);
    context.response.status = 500;
    context.response.body = getFormattedErrorBody(
      "Failed to fetch exercises",
      "INTERNAL_SERVER_ERROR"
    );
  }
};
