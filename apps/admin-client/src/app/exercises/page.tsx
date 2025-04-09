import { ExercisesTable } from "@/components/Exercise/ExercisesTable/ExercisesTable";
import { fetchExercises } from "@/utils/exercises-api";
import { ResponseData } from "@/utils/request";
import { Typography } from "@mui/material";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { CreateExercise } from "@/components/Exercise/CreateExercise";
import { Exercise } from "../../../../api/db/types";

export default async function ExercisesPage() {
  // Step 1: Create a new query client
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["exercises"],
    queryFn: fetchExercises,
  });

  const { data } =
    queryClient.getQueryData<ResponseData<Exercise[]>>(["exercises"]) ?? {};
  if (data === null) {
    return <div>Error: couldn't fetch exercises data</div>;
  }
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Typography variant="h1">Exercises</Typography>

        <CreateExercise />
        <ExercisesTable />
      </HydrationBoundary>
    </>
  );
}
