"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TextField, Button, CircularProgress } from "@mui/material";
import { createExercise, fetchCategories } from "@/utils/exercises-api";
import { SelectField } from "../../Common/Field/Select";
import {
  exerciseSchema,
  ExerciseFormData,
  getCategoryOpts,
  getExerciseSubmitFormat,
} from "./exercise-form-helper";

export const ExerciseForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(exerciseSchema),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ExerciseFormData) => {
      const response = await createExercise(getExerciseSubmitFormat(data));
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] }); // Refetch exercises list
      reset();
    },
  });

  const categoriesData = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  }).data;

  const onSubmit = (data: ExerciseFormData) => mutation.mutate(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <TextField
        label="Exercise Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <SelectField
        control={control}
        errors={errors}
        label="Category"
        name="categoryId"
        options={getCategoryOpts(categoriesData ?? [])}
      />
      <TextField
        type="text"
        multiline
        label="Description (optional)"
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <TextField
        label="BPM"
        type="number"
        {...register("bpm")}
        error={!!errors.bpm}
        helperText={errors.bpm?.message}
      />
      <TextField
        label="Duration in minutes"
        type="number"
        {...register("durationMinutes")}
        error={!!errors.durationMinutes}
        helperText={errors.durationMinutes?.message}
      />
      <TextField
        label="MP3 URL (optional)"
        {...register("mp3Url")}
        error={!!errors.mp3Url}
        helperText={errors.mp3Url?.message}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? <CircularProgress size={24} /> : "Add Exercise"}
      </Button>
    </form>
  );
};
