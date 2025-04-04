import { Session } from "../../../api/db/sessions";
import { SessionWithExercises } from "../../../api/utils/session";
import { fetchData } from "./request";
import { ApiClient as ApiClientV2 } from "../utils/api-client-v2";

export const fetchSessions = async () =>
  await fetchData<Session[]>("/sessions");

export const fetchSession = async (id: string) =>
  await fetchData<SessionWithExercises>(`/sessions/${id}`);

export const addExercisesToSession = async (sessionId: string, exerciseId: string) => {
  const apiClient = new ApiClientV2("http://localhost:8000");
  return await apiClient.post<SessionWithExercises>(`/sessions/${sessionId}/exercises/${exerciseId}`);
}
 
