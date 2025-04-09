import { SessionWithExercises } from "../../../api/utils/session";
import { fetchData } from "./request";
import { ApiClient as ApiClientV2 } from "../utils/api-client-v2";
import { Session } from "../../../api/db/types";

export const fetchSessions = async () =>
  await fetchData<Session[]>("/sessions");

export const fetchSession = async (id: string) =>
  await fetchData<SessionWithExercises>(`/sessions/${id}`);

export const addExercisesToSession = async (
  sessionId: number,
  exerciseId: string
) => {
  const apiClient = new ApiClientV2("http://localhost:8000");
  return await apiClient.post<SessionWithExercises>(
    `/sessions/${sessionId}/exercises/${exerciseId}`
  );
};

export const removeExerciseFromSession = async (
  sessionId: number,
  exerciseId: number
) => {
  const apiClient = new ApiClientV2("http://localhost:8000");
  return await apiClient.delete<null>(
    `/sessions/${sessionId}/exercises/${exerciseId}`
  );
};
