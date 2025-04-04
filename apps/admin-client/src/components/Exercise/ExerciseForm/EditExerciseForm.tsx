"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TextField, Button, CircularProgress, Box, Skeleton } from "@mui/material";
import {
  editExercise,
  fetchCategories,
  fetchExercise,
} from "@/utils/exercises-api";
import { SelectField } from "../../Common/Field/Select";
import {
  exerciseSchema,
  ExerciseFormData,
  getCategoryOpts,
  getExerciseSubmitFormat,
  getExerciseFormDataFormat,
} from "./exercise-form-helper";
import { FormError } from "@/components/Common/Typography";
import { useEffect, useMemo } from "react";

type ExerciseFormProps = {
  handleClose: () => void;
  exerciseId: number;
};

export const EditExerciseForm = ({ handleClose, exerciseId }: ExerciseFormProps) => {
  const queryClient = useQueryClient();

  // Use the directly passed ID to get the exercise data
  const { data, isLoading: isFetching } = useQuery({
    queryKey: ["exercise", exerciseId],
    queryFn: () => fetchExercise(exerciseId),
    // Will be enabled since exerciseId is guaranteed to exist
  });

  const initialValues = useMemo(() => {
    return data?.data ? getExerciseFormDataFormat(data?.data) : undefined;
  }, [data]);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(exerciseSchema),
  });
  
  // Reset form when data changes
  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const editMutation = useMutation({
    mutationFn: async (data: ExerciseFormData) => {
      const response = await editExercise(getExerciseSubmitFormat(data), exerciseId);

      if (response.error) {
        throw new Error(response.error.message);
      }
      return response;
    },
    onSuccess: () => {
      // More precise invalidation
      queryClient.invalidateQueries({ queryKey: ["exercise", exerciseId] });
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      reset();
      handleClose();
    },
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const onEditSubmit = (data: ExerciseFormData) => editMutation.mutate(data);

  if (isFetching) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={56} />
        <Skeleton variant="rectangular" height={40} width="100%" />
      </Box>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onEditSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      {editMutation.error && (
        <FormError error>{editMutation.error.message}</FormError>
      )}
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
        disabled={editMutation.isPending}
      >
        {editMutation.isPending ? (
          <CircularProgress size={24} />
        ) : (
          "Save Exercise"
        )}
      </Button>
    </form>
  );
};