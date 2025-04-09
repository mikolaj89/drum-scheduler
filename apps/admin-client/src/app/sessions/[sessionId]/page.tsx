import { fetchSession } from "@/utils/sessions-api";
import { SessionDetails } from "@/components/Session/SessionDetails";
import { Box, Typography } from "@mui/material";

type PageProps = {
  params: Promise<{
    sessionId: string;
  }>;
}

export default async function Page({ params } : PageProps) {
  const { sessionId } = await params;
  const { data, error } = await fetchSession(sessionId as string);

  if (data === null) {
    return <Box>Error: {error?.message}</Box>;
  }

  console.log({ data, error });
  return (
    <>
      <Typography variant="h1">{data.name}</Typography>
      <SessionDetails sessionData={data} />
    </>
  )
}
