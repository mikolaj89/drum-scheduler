import Box from "@mui/material/Box";
import { PropsWithChildren } from "react";

export const TableButtonsWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ paddingY: 2, display: "flex", justifyContent: "space-between" }}>
      {children}
    </Box>
  );
};

export const ButtonsWrapper = ({ children }: PropsWithChildren) => {
  return <Box sx={{ display: "flex", gap: 1 }}>{children}</Box>;
};
