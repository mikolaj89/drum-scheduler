import { fetchSession, fetchSessions } from "@/utils/sessions-api";
import { SessionDetails } from "@/components/Session/SessionDetails";

export default async function Page({ params }) {
  const { sessionId } =  params;
  const { data, error } = await fetchSession(sessionId as string);

  if (data === null) {
    return <div>Error: {error?.message}</div>;
  }

  console.log({ data, error });

  return <SessionDetails sessionData={data} />;
}
