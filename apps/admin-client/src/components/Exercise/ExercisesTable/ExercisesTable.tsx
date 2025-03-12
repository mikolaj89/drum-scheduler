"use client";
import {
  deleteExercise,
  fetchExercise,
  fetchExercises,
} from "@/utils/exercises-api";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExercisesColumns } from "./ExercisesTableHelper";
import { Button, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { EditExerciseModal } from "../EditExerciseModal";
import { EDITED_EXERCISE_ID_KEY } from "../ExerciseForm/exercise-form-helper";

export const ExercisesTable = () => {
  const queryClient = useQueryClient();
  const [isMounted, setIsMounted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data: queryData, isFetching } = useQuery({
    queryKey: ["exercises"],
    queryFn: fetchExercises,

    
  });
  const { data } = queryData ?? {};

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const result = await deleteExercise(id);
      if (result.error) {
        throw new Error(result.error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
  });

  const onDelete = (id: number) => deleteMutation.mutate(id);

  const onEditBtnClick = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["exercise", id],
      queryFn: () => fetchExercise(id),
    });
    queryClient.setQueryData([EDITED_EXERCISE_ID_KEY], id);

    setIsEditModalOpen(true);
  };

  const columns = getExercisesColumns({
    onDelete,
    onEditBtnClick,
  });
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <EditExerciseModal
        setIsOpen={setIsEditModalOpen}
        isOpen={isEditModalOpen}
      />
      {/* Button for tests, should be replaced by filters (either here on page.tsx level) */}
      <Button
        onClick={() =>
          queryClient.invalidateQueries({ queryKey: ["exercises"] })
        }
      >
        Re-fetch
      </Button>
      {!isMounted ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <DataGrid
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
          loading={isFetching}
          rows={data ?? []}
          columns={columns}
          disableRowSelectionOnClick
        />
      )}
    </>
  );
};
