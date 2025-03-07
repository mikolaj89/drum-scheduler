"use client";
import { fetchSession } from "@/utils/sessions-api";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Paper, Typography } from "@mui/material";
import { SessionWithExercises } from "../../../../api/utils/session";
import { Exercise } from "../../../../api/db/exercises";
import ExercisesTable from "../Exercise/ExercisesTable/ExercisesTable";
import { useCallback, useState } from "react";
import { getExercisesColumns } from "../Exercise/ExercisesTable/ExercisesTableHelper";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";

export const SessionDetails = ({
  sessionData,
}: {
  sessionData: SessionWithExercises;
}) => {
  const { data } = useQuery({
    queryKey: ["session", sessionData.id],
    queryFn: ({ queryKey }) => fetchSession(queryKey[1].toString()),
    initialData: { data: sessionData },
    refetchOnMount: false,
  }).data;

  const { name, totalDuration } = data ?? {};

  const [rows, setRows] = useState(data?.exercises ?? []);
  const handleChangeRows = useCallback(
    (rows: Exercise[]) => {
      setRows(rows);
    },
    [setRows]
  );

  const onDelete = (id: number) => {
    console.log("delete exercise: ", id);
  };

  const columns = getExercisesColumns({ onDelete });

  return (
    <>
      <Typography variant="h1">{name}</Typography>
      <Typography variant="h2">
        Total duration: {totalDuration} minutes
      </Typography>
      <Divider />
      <Box sx={{ paddingY: 2 }}>
        <Button
          variant="contained"
          color="primary"
          type="button"
          size="medium"
          startIcon={<AddIcon />}
        >
          Add exercise
        </Button>
      </Box>
      <Paper>
        <ExercisesTable
          onChange={handleChangeRows}
          rows={rows}
          columns={columns}
        />
      </Paper>
    </>
  );
};
