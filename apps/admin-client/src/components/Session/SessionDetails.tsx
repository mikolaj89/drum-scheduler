"use client";
import { fetchSession, removeExerciseFromSession } from "@/utils/sessions-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box, Button, Paper, Typography } from "@mui/material";
import { SessionWithExercises } from "../../../../api/utils/session";
import ExercisesTable from "../Exercise/ExercisesTable/SessionExercisesTable";
import { useCallback, useEffect, useState } from "react";
import { getSessionExercisesColumns } from "../Exercise/ExercisesTable/ExercisesTableHelper";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import { SelectExerciseModal } from "./AddExerciseToSessionModal/AddExerciseToSessionModal";
import { Exercise } from "../../../../api/db/types";

export const SessionDetails = ({
  sessionData,
}: {
  sessionData: SessionWithExercises;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const {
    data: { data },
    isFetching,
  } = useQuery({
    queryKey: ["session", sessionData.id],
    queryFn: ({ queryKey }) => fetchSession(queryKey[1].toString()),
    initialData: { data: sessionData },
    refetchOnMount: false,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteSession", sessionData.id],
    mutationFn: async ({
      sessionId,
      exerciseId,
    }: {
      sessionId: number;
      exerciseId: number;
    }) => {
      const result = await removeExerciseFromSession(sessionId, exerciseId);
      if ("error" in result) {
        throw new Error(result.error.message);
      }
    },
  });

  const [rows, setRows] = useState(data?.exercises ?? []);
  const handleChangeRows = useCallback(
    (rows: Exercise[]) => {
      setRows(rows);
    },
    [setRows]
  );

  useEffect(() => {
    if (data?.exercises) {
      setRows(data.exercises);
    }
  }, [data?.exercises]);

  // useEffect(( => {
  //   // update re-ordered rows here
  // }, [rows]);

  const onDelete = (exerciseId: number) => {
    mutate({
      sessionId: sessionData.id,
      exerciseId: exerciseId,
    });
    setRows((prev) => prev.filter((exercise) => exercise.id !== exerciseId));
  };

  const columns = getSessionExercisesColumns({
    onDelete,
    onEditBtnClick: onDelete,
  });

  return (
    <>
      {/* consider adding a total duration once i figure out how to sum it up with mp3 length. Otherwise it doesn't make sense  */}
      {/* <Typography variant="h2">  
        Total duration: {totalDuration} minutes
      </Typography> */}
      <SelectExerciseModal
        sessionId={sessionData.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Divider />
      <Box sx={{ paddingY: 2 }}>
        <Button
          variant="contained"
          color="primary"
          type="button"
          size="medium"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          Add exercise
        </Button>
      </Box>
      <Paper>
        <ExercisesTable
          isLoading={isFetching || isPending}
          draggable={true}
          onChange={handleChangeRows}
          rows={rows}
          columns={columns}
        />
      </Paper>
    </>
  );
};
