import { Context } from "@oak/oak/context";
import { Exercise } from "./db/types.ts";

export type SessionExercisesOrderInput = {
  exercises: Exercise[];
};

export type ContextWithParams = Context & { params?: Record<string, string | undefined> };
