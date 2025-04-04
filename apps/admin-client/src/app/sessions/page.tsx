import { fetchSessions } from "@/utils/sessions-api";
import { SessionsList } from "@/components/Session/SessionsList";
import { Typography } from "@mui/material";

export default async function Page() {
  const { data, error } = await fetchSessions();

  if (data === null) {
    return (
      <>
        <h1>Oops! Something went wrong</h1>
        {error !== undefined && (
          <>
            <p>
              Error message: <b>{error.message}</b>
            </p>
          </>
        )}
      </>
    );
  }
  return (
    <>
      <Typography variant="h1">Sessions</Typography>
      <SessionsList sessionsData={data} />
    </>
  );
}
