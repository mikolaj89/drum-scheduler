import { fetchExercises } from "@/utils/exercises-api";
import { Typography } from "@mui/material";
import { Suspense } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getExercisesColumns } from "@/components/Exercise/ExercisesTable/ExercisesTableHelper";

export default async function ExercisesPage() {
//   const { data } = await fetchExercises();
//   if (data === null) {
//     return <div>Error: couldn't fetch exercises data</div>;
//   }
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: false,
    },
    {
      field: "description",
      headerName: "Description",

      width: 400,
      editable: false,
    },
    {
      field: "durationMinutes",
      headerName: "Duration (minutes)",
      type: "number",
      width: 150,

      editable: false,
    },
  ];

  const testData = [
    {
      id: 1,
      name: "Test Exercise",
      description: "Test Description",
      durationMinutes: 10,
    },
    {
      id: 2,
      name: "Test Exercise 2",
      description: "Test Description 2",
      durationMinutes: 20,
    },
  ];
  return (
    <>
      <Typography variant="h1">Exercises</Typography>
      <Suspense fallback={<p>Loading table...</p>}>
        <DataGrid rows={testData} columns={columns}></DataGrid>
      </Suspense>
    </>
  );
}
