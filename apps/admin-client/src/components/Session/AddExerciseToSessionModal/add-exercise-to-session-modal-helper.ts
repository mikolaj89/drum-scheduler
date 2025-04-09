import { fetchCategoryExercises } from "@/utils/exercises-api";
import { addExercisesToSession } from "@/utils/sessions-api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddExerciseToSession = (
  sessionId: number,
  exerciseId: string,
  onSuccess: (id: number) => void
) =>
  useMutation({
    mutationFn: async () => {
      if (!sessionId || !exerciseId)
        throw new Error("Both sessionId and exerciseId are required.");

      const response = await addExercisesToSession(sessionId, exerciseId);
      if ("error" in response) {
        throw new Error(response.error.message);
      }

      return sessionId;
    },
    onSuccess
  });

export const useCategoryExercisesQuery = (categoryId: string) =>
  useQuery({
    queryKey: ["categoryExercises", categoryId],
    queryFn: async () => {
      if (!categoryId) {
        return [];
      }
      const result = await fetchCategoryExercises(categoryId);

      if ("error" in result) {
        throw new Error(result.error.message);
      }
      if (!result.data) {
        throw new Error("No data found");
      }
      return result.data;
    },
    enabled: !!categoryId,
    retry: false,
  });
