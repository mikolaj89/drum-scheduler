import { Session } from "../../../api/db/sessions";
import { SessionWithExercises } from "../../../api/utils/session";
import { fetchData } from "./request";

export const fetchSessions = async () =>
  await fetchData<Session[]>("/sessions");

export const fetchSession = async (id: string) =>
  await fetchData<SessionWithExercises>(`/sessions/${id}`);
