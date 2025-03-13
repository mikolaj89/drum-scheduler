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

export const ExercisesTable = () => {
  const queryClient = useQueryClient();
  const [isMounted, setIsMounted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState<number | null>(null);
  
  const { data: queryData, isFetching } = useQuery({
    queryKey: ["exercises"],
    queryFn: fetchExercises,
    refetchOnMount: false,
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
    setEditingExerciseId(id);
    setIsEditModalOpen(true);
    
    // Optionally prefetch the data (still a good practice)
    queryClient.prefetchQuery({
      queryKey: ["exercise", id],
      queryFn: () => fetchExercise(id),
    });
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setEditingExerciseId(null);
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
        exerciseId={editingExerciseId}
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
      />
      <Button
        onClick={() => queryClient.invalidateQueries({ queryKey: ["exercises"] })}
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