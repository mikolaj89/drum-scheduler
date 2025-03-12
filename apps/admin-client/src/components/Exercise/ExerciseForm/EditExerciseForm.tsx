"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TextField, Button, CircularProgress } from "@mui/material";
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
  EDITED_EXERCISE_ID_KEY,
  getExerciseFormDataFormat,
} from "./exercise-form-helper";
import { FormError } from "@/components/Common/Typography";
import { useEffect, useMemo } from "react";

type ExerciseFormProps = {
  handleClose: () => void;
};

export const EditExerciseForm = ({ handleClose }: ExerciseFormProps) => {
  const queryClient = useQueryClient();

  // Get the current editing ID from cache
  const editedExerciseId: number | undefined = queryClient.getQueryData([
    EDITED_EXERCISE_ID_KEY,
  ]);

  // Use that ID to get the exercise data
  const { data, isLoading : isFetching } = useQuery({
    queryKey: ["exercise", editedExerciseId],
    queryFn: () => (editedExerciseId ? fetchExercise(editedExerciseId) : null),
    // Only fetch if we have an ID
    enabled: !!editedExerciseId,
  });

  const initialValues = useMemo(() => {
    return data?.data ? getExerciseFormDataFormat(data?.data) : undefined;
  }, [data]);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, },
    getValues,
    reset,
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(exerciseSchema),
    
  });
  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const editMutation = useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: ExerciseFormData;
      id?: number;
    }) => {
      if (!id) {
        throw new Error("No id provided for editing exercise");
      }
      const response = await editExercise(getExerciseSubmitFormat(data), id);

      if (response.error) {
        throw new Error(response.error.message);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
      reset();
      handleClose();
    },
  });

  const categoriesData = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  }).data;

  const onEditSubmit = (data: ExerciseFormData) =>
    editMutation.mutate({ data, id: editedExerciseId });

  if(isFetching) {
    return <CircularProgress />
  };

  console.log("getValues: ",getValues());
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
        options={getCategoryOpts(categoriesData?.data ?? [])}
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
