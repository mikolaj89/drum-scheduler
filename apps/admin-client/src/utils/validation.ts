import { z } from "zod";

export function requireStr(schema: z.ZodString, fieldName: string) {
  return schema.refine(
    (val) => val !== undefined && val !== null && val.trim().length > 0,
    `${fieldName} cannot be empty`
  );
}