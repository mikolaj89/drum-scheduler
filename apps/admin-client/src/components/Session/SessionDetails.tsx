"use client";
import { fetchSession } from "@/utils/sessions-api";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Paper, Typography } from "@mui/material";
import { SessionWithExercises } from "../../../../api/utils/session";
import { Exercise } from "../../../../api/db/exercises";
import ExercisesTable from "../Exercise/ExercisesTable/SessionExercisesTable";
import { useCallback, useState } from "react";
import { getSessionExercisesColumns } from "../Exercise/ExercisesTable/ExercisesTableHelper";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import { SelectExerciseModal } from "./AddExerciseToSessionModal/AddExerciseToSessionModal";

export const SessionDetails = ({
  sessionData,
}: {
  sessionData: SessionWithExercises;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["session", sessionData.id],
    queryFn: ({ queryKey }) => fetchSession(queryKey[1].toString()),
    initialData: { data: sessionData },
    refetchOnMount: false,
  }).data;

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
      <SelectExerciseModal sessionId={sessionData.id.toString()} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
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
          draggable={true}
          onChange={handleChangeRows}
          rows={rows}
          columns={columns}
        />
      </Paper>
    </>
  );
};
