"use client";
import { fetchExercises } from "@/utils/exercises-api";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getExercisesColumns } from "./ExercisesTableHelper";
import { Box, Button, CircularProgress, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

export const ExercisesTable = () => {
  const queryClient = useQueryClient();
  const [isMounted, setIsMounted] = useState(false);
  const { data: queryData, isFetching } = useQuery({
    queryKey: ["exercises"],
    queryFn: fetchExercises,

    refetchOnMount: false,
  });
  const { data } = queryData ?? {};

  const columns = getExercisesColumns({ onDelete: () => {} });
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
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
