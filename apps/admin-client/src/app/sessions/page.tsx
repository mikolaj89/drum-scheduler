import { fetchSessions } from "@/utils/sessions-api";
import { SessionsList } from "@/components/Session/SessionsList";

export default async function Page() {
  const { data, error } = await fetchSessions();

  console.log({ data, error });

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

  return <SessionsList sessionsData={data} />;
}
