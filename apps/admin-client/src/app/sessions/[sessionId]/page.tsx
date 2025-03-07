import { fetchSession } from "@/utils/sessions-api";
import { SessionDetails } from "@/components/Session/SessionDetails";
import { Box } from "@mui/material";

export default async function Page({ params }) {
  const { sessionId } =  params;
  const { data, error } = await fetchSession(sessionId as string);

  if (data === null) {
    return <Box>Error: {error?.message}</Box>;
  }

  console.log({ data, error });

  return <SessionDetails sessionData={data} />;
}
