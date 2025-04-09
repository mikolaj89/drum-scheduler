import { Box, Skeleton } from "@mui/material";

export default function Loading(){
    console.log('LOADING sessions page');
  return (
    <div>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Skeleton variant="rectangular" height={60} width="100%" />
        <Skeleton variant="rectangular" height={400} width="100%" />
      </Box>
    </div>
  );
};
