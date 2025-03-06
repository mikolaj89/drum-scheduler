import { Session } from "../../../api/db/sessions";
import { SessionWithExercises } from "../../../api/utils/session";
import { fetchData } from "./request";

export const fetchSessions = async () =>
  await fetchData<Session[]>("http://localhost:8000/sessions");

export const fetchSession = async (id: string) =>
  await fetchData<SessionWithExercises>(`http://localhost:8000/sessions/${id}`);
