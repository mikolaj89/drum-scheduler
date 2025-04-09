"use client";

import { createSession } from "@/utils/sessions-api";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SessionFormData, sessionSchema } from "./session-form-helper";
import { useRouter } from "next/navigation";
import { FormError } from "@/components/Common/Typography";

export const SessionForm = () => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sessionSchema),
  });
  const mutation = useMutation({
    mutationFn: async (data: SessionFormData) => {
      return await createSession(data);
      // if ("error" in result) {
      //   if(result.error.fieldErrors){
      //     setFieldErrors(result.error.fieldErrors);
      //   }
      //   throw new Error(result.error.message);
      // }
    },
    onSuccess: (result) => {
      if ("data" in result) {
        push(`/sessions/${result.data?.id}`);
      }
    },
    onError: (error, data) => {
      console.error("Error creating session:", error);
    },
  });
  const { data } = mutation;

  const onSubmit = (data: SessionFormData) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      {data && "error" in data && (
        <FormError error>{data.error.message}</FormError>
      )}

      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        disabled={mutation.isPending}
      />
      <TextField
        label="Notes"
        {...register("notes")}
        error={!!errors.notes}
        helperText={errors.notes?.message}
        disabled={mutation.isPending}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? <CircularProgress size={24} /> : "Add Exercise"}
      </Button>
    </form>
  );
};
