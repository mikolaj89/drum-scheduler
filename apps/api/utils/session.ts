import { Exercise } from "../db/exercises.ts";
import { Session } from "../db/sessions.ts";

export type SessionWithExercises = Session & {
  totalDuration: number;
  exercises: Exercise[];
};

// should return a formatted session, which includes total duration base on the exercises it contains
export const getFormattedSession = (
  session: Session,
  exercises: Exercise[]
): SessionWithExercises => {
  const totalDuration = exercises.reduce(
    (acc, exercise) => acc + (exercise.durationMinutes ?? 0),
    0
  );

  return {
    ...session,
    totalDuration,
    exercises,
  };
};
