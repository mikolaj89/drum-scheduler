import { SessionWithExercises } from "../../../api/utils/session";
import { fetchData } from "./request";
import { ApiClient as ApiClientV2 } from "../utils/api-client-v2";
import { Session } from "../../../api/db/types";
import { SessionExercisesOrderInput } from "../../../api/api-types";
import { CreateSessionResponse } from "../../../api/routes/sessions/createSession";
import { SessionFormData } from "@/components/Session/SessionForm/session-form-helper";

export const fetchSession = async (id: string) =>
  await fetchData<SessionWithExercises>(`/sessions/${id}`);

export const fetchSessions = async () =>
  await fetchData<Session[]>("/sessions");

export const createSession = async (session: SessionFormData) => {
  const apiClient = new ApiClientV2("http://localhost:8000");
  return await apiClient.post<CreateSessionResponse>("/sessions", session);
};

export const deleteSession = async (id: number) => {
  const apiClient = new ApiClientV2("http://localhost:8000");
  return await apiClient.delete<null>(`/sessions/${id}`);
}

export const reorderSessionExercises = async (
  sessionId: number,
  exercises: SessionExercisesOrderInput
) => {
  const apiClient = new ApiClientV2("http://localhost:8000");
  return await apiClient.patch<null>(
    `/sessions/${sessionId}/exercises-order`,
    exercises
  );
};

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
