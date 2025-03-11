import { Exercise } from "../../../api/db/exercises";
import { fetchData, postData } from "./request";
import {Category} from "../../../api/db/categories";
import { ExerciseSubmitData } from "@/components/Exercise/ExerciseForm/exercise-form-helper";
import { ApiClient } from "./api-client";

export const fetchCategories = async () =>
  await fetchData<Category[]>("/categories");

export const fetchExercises = async () =>
  await fetchData<Exercise[]>("/exercises");

export const createExercise = async (data: ExerciseSubmitData) => {
  const apiClient = new ApiClient("http://localhost:8000");
  return apiClient.post<Exercise>("/exercises", data);
}
 
