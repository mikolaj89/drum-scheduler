"use client";
import { fetchSession } from "@/utils/sessions-api";
import { useQuery } from "@tanstack/react-query";
import { Paper } from "@mui/material";
import { SessionWithExercises } from "../../../../api/utils/session";
import { Exercise } from "../../../../api/db/exercises";
import ExercisesTable from "../Exercise/ExercisesTable/ExercisesTable";
import { useCallback, useState } from "react";
import { getExercisesColumns } from "../Exercise/ExercisesTable/ExercisesTableHelper";

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

  const deleteExercise = (id: number) => {
    console.log("delete exercise: ", id);
  };

  const columns = getExercisesColumns({ onDelete: deleteExercise });

  return (
    <>
      <h1>{name}</h1>
      <h2>Total duration: {totalDuration} minutes</h2>
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
