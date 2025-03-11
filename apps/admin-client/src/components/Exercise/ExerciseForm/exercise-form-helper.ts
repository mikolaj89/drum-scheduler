import { SelectOption } from "@/components/Common/Field/Select";
import { Category } from "../../../../../api/db/categories";
import { z } from "zod";
import { Exercise } from "../../../../../api/db/exercises";

const MIN_BPM = 30;
const MAX_BPM = 350;
const MIN_DURATION = 1;
const MIN_NAME_LENGTH = 3;

function requireStr(schema: z.ZodString, fieldName: string) {
  return schema.refine(
    (val) => val !== undefined && val !== null && val.trim().length > 0,
    `${fieldName} cannot be empty`
  );
}

export const exerciseSchema = z.object({
  name: requireStr(z.string(), "Name").refine(
    (val) => val.length >= MIN_NAME_LENGTH,
    `Minimum name length is ${MIN_NAME_LENGTH}`
  ),

  description: z.string(),
  bpm: requireStr(z.string(), "BPM")
    .refine(
      (val) => !val || parseInt(val) >= MIN_BPM,
      `Minimum BPM is ${MIN_BPM}`
    )
    .refine(
      (val) => !val || parseInt(val) <= MAX_BPM,
      `Maximum BPM is ${MAX_BPM}`
    ),
  categoryId: z.string().nullable(),
  mp3Url: z
    .string()
    .nullable()
    .refine((val) => !val || val.startsWith("http"), "Invalid URL"),
  durationMinutes: requireStr(z.string(), "Duration").refine(
    (val) => !val || parseInt(val) >= MIN_DURATION,
    `Minimum duration is ${MIN_DURATION}`
  ),
});

export type ExerciseFormData = z.infer<typeof exerciseSchema>;
export type ExerciseSubmitData = Pick<
  Exercise,
  "name" | "description" | "mp3Url" | "categoryId" | "bpm" | "durationMinutes"
>;

export const getCategoryOpts = (categories: Category[]): SelectOption[] => {
  return categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));
};

export const getExercisesSubmitData = (
  data: ExerciseFormData
): ExerciseSubmitData => {
  const { name, description, mp3Url, categoryId, bpm, durationMinutes } = data;
  return {
    name,
    description,
    mp3Url,
    categoryId: categoryId ? parseInt(categoryId) : null,
    bpm: parseInt(bpm),
    durationMinutes: parseInt(durationMinutes),
  };
};
